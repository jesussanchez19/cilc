export const revalidate = 60;

import type { Metadata } from 'next';
import ProgramPage from '@/components/shared/ProgramPage';
import { programs } from '@/lib/data/programs';
import { programSchema, breadcrumbSchema } from '@/lib/seo/schemas';
import { getProgramaData, getTestimoniosPorPrograma, getDestinosPorPrograma } from '@/lib/sanity/queries';

export const metadata: Metadata = {
  title: 'Idiomas en Línea | CILC',
  description: 'Clases en vivo con profesor, grupos reducidos o modalidad individual. Inglés, Francés y Alemán con evaluación de nivel gratuita y horarios flexibles.',
};

export default async function IdiomasEnLineaPage() {
  const program = programs.find((p) => p.id === 'idiomas-en-linea')!;
  const [sanity, testimonios, destinos] = await Promise.all([
    getProgramaData('idiomas-en-linea'),
    getTestimoniosPorPrograma('Idiomas en Línea'),
    getDestinosPorPrograma('idiomas-en-linea'),
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: 'Inicio', url: '/' }, { name: merged.title, url: '/idiomas-en-linea' }])) }} />
      <ProgramPage program={merged} testimoniosSanity={testimonios} destinosSanity={destinos.length ? destinos : undefined} />
    </>
  );
}
