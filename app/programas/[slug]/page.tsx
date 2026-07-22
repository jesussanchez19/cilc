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
} from '@/lib/sanity/queries';
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

  const [sanity, destinos] = await Promise.all([
    getProgramaData(slug),
    getDestinosPorPrograma(slug),
  ]);

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
    highlights:      sanity?.puntosClave      ?? base?.highlights      ?? [],
    includes:        sanity?.queIncluye       ?? base?.includes        ?? [],
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
        testimoniosSanity={testimonios}
        destinosSanity={destinos.length ? destinos : undefined}
      />
    </>
  );
}
