export const revalidate = 60;
export const dynamicParams = false;

import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ProgramPage from '@/components/shared/ProgramPage';
import { programs } from '@/lib/data/programs';
import { programSchema, breadcrumbSchema } from '@/lib/seo/schemas';
import {
  getProgramaData,
  getTestimoniosPorPrograma,
  getDestinosPorPrograma,
  getWhatsAppPrincipal,
  getContactInfo,
} from '@/lib/sanity/queries';
import QrFlotante from '@/components/shared/QrFlotante';
import { generarQrSvg } from '@/lib/qr';
import { urlFor } from '@/lib/sanity/image';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return programs.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const sanity = await getProgramaData(slug);
  const base   = programs.find((p) => p.slug === slug);
  const title  = sanity?.titulo ?? base?.title ?? slug;
  const desc   = sanity?.descripcion ?? base?.description ?? '';
  return {
    title: `${title} | CILC`,
    description: desc,
  };
}

export default async function ProgramaPage({ params }: Props) {
  const { slug } = await params;

  const [sanity, destinos, waPrincipal, contacto] = await Promise.all([
    getProgramaData(slug),
    getDestinosPorPrograma(slug),
    getWhatsAppPrincipal(),
    getContactInfo(),
  ]);

  // El QR se dibuja aquí, en el servidor, y viaja como marcado ya hecho: así el
  // navegador no descarga la librería que lo genera.
  const qrSvg = await generarQrSvg(contacto.urlQR);

  const base = programs.find((p) => p.slug === slug);
  if (!base && !sanity) notFound();

  const title = sanity?.titulo ?? base?.title ?? slug;

  const testimonios = await getTestimoniosPorPrograma(title);

  const program = {
    id:              slug,
    slug,
    title,
    subtitle:        sanity?.subtitulo        ?? base?.subtitle        ?? '',
    description:     sanity?.descripcion      ?? base?.description     ?? '',
    icon:            sanity?.icono            ?? base?.icon            ?? '📚',
    color:           sanity?.color            ?? base?.color           ?? 'blue',
    countries:       base?.countries          ?? [],
    duration:        sanity?.duracion         ?? base?.duration        ?? '',
    ageRange:        sanity?.rangoEdad        ?? base?.ageRange        ?? '',
    highlights:      sanity?.puntosClave ? sanity.puntosClave.map((p) => p.texto) : (base?.highlights ?? []),
    includes:        sanity?.queIncluye  ? sanity.queIncluye.map((p)  => p.texto) : (base?.includes  ?? []),
    highlightTooltips: sanity?.puntosClave
      ? Object.fromEntries(sanity.puntosClave.map((p) => [p.texto, p.tooltip ?? '']))
      : undefined,
    includeTooltips: sanity?.queIncluye
      ? Object.fromEntries(sanity.queIncluye.map((p) => [p.texto, p.tooltip ?? '']))
      : undefined,
    idealFor:        sanity?.paraQuien        ?? base?.idealFor        ?? '',
    whatsappMessage: sanity?.whatsappMessage  ?? base?.whatsappMessage ?? '',
    heroImageUrl:    sanity?.imagenHero?.asset?._ref
                       ? urlFor(sanity.imagenHero).width(1920).quality(85).url()
                       : undefined,
    sections:        sanity?.secciones
                       ? sanity.secciones.map((s) => ({ title: s.titulo, description: s.descripcion, items: s.items }))
                       : base?.sections,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(programSchema(program)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Inicio', url: '/' },
              { name: program.title, url: `/programas/${slug}` },
            ]),
          ),
        }}
      />
      <ProgramPage
        program={program}
        waPrincipal={waPrincipal}
        testimoniosSanity={testimonios}
        destinosSanity={destinos.length ? destinos : undefined}
      />

      {qrSvg && contacto.urlQR && (
        <QrFlotante
          svg={qrSvg}
          url={contacto.urlQR}
          texto={contacto.textoQR ?? 'Escanea y descubre tu destino ideal'}
        />
      )}
    </>
  );
}
