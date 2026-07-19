export const revalidate = 60;

import type { Metadata } from 'next';
import ProgramPage from '@/components/shared/ProgramPage';
import { programs } from '@/lib/data/programs';
import { programSchema, breadcrumbSchema } from '@/lib/seo/schemas';
import { getProgramaData, getTestimoniosPorPrograma, getDestinosPorPrograma } from '@/lib/sanity/queries';

export const metadata: Metadata = {
  title: 'Au Pair | CILC',
  description: 'Experiencia cultural única: vive con una familia, apoya en el cuidado de niños y recibe beneficios económicos y educativos mientras mejoras tu idioma.',
};

export default async function AuPairPage() {
  const program = programs.find((p) => p.id === 'au-pair')!;
  const [sanity, testimonios, destinos] = await Promise.all([
    getProgramaData('au-pair'),
    getTestimoniosPorPrograma('Au Pair'),
    getDestinosPorPrograma('au-pair'),
  ]);
  const merged = {
    ...program,
    ...(sanity?.descripcion            && { description: sanity.descripcion }),
    ...(sanity?.duracion               && { duration:    sanity.duracion }),
    ...(sanity?.rangoEdad              && { ageRange:    sanity.rangoEdad }),
    ...(sanity?.puntosClave?.length    && { highlights:  sanity.puntosClave }),
    ...(sanity?.queIncluye?.length     && { includes:    sanity.queIncluye }),
    ...(sanity?.paraQuien              && { idealFor:    sanity.paraQuien }),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(programSchema(merged)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: 'Inicio', url: '/' }, { name: merged.title, url: '/au-pair' }])) }} />
      <ProgramPage program={merged} testimoniosSanity={testimonios} destinosSanity={destinos.length ? destinos : undefined} />
    </>
  );
}
