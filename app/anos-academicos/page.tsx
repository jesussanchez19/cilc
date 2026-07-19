export const revalidate = 60;

import type { Metadata } from 'next';
import ProgramPage from '@/components/shared/ProgramPage';
import { programs } from '@/lib/data/programs';
import { programSchema, breadcrumbSchema } from '@/lib/seo/schemas';
import { getProgramaData, getTestimoniosPorPrograma, getDestinosPorPrograma } from '@/lib/sanity/queries';

export const metadata: Metadata = {
  title: 'Años Académicos en el Extranjero | CILC',
  description: 'Estudia Secundaria, Preparatoria o Universidad en el extranjero con integración total al sistema académico oficial. Una experiencia que transforma tu futuro.',
};

export default async function AnosAcademicosPage() {
  const program = programs.find((p) => p.id === 'anos-academicos')!;
  const [sanity, testimonios, destinos] = await Promise.all([
    getProgramaData('anos-academicos'),
    getTestimoniosPorPrograma('Años Académicos'),
    getDestinosPorPrograma('anos-academicos'),
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: 'Inicio', url: '/' }, { name: merged.title, url: '/anos-academicos' }])) }} />
      <ProgramPage program={merged} testimoniosSanity={testimonios} destinosSanity={destinos.length ? destinos : undefined} />
    </>
  );
}
