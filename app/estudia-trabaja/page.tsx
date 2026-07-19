export const revalidate = 60;

import type { Metadata } from 'next';
import ProgramPage from '@/components/shared/ProgramPage';
import { programs } from '@/lib/data/programs';
import { programSchema, breadcrumbSchema } from '@/lib/seo/schemas';
import { getProgramaData, getTestimoniosPorPrograma, getDestinosPorPrograma } from '@/lib/sanity/queries';

export const metadata: Metadata = {
  title: 'Estudia y Trabaja en el Extranjero | CILC',
  description: 'Combina clases de idioma con experiencia laboral real en el extranjero. Cubre parte de tus gastos mientras construyes un perfil profesional internacional.',
};

export default async function EstudioTrabajaPage() {
  const program = programs.find((p) => p.id === 'estudia-trabaja')!;
  const [sanity, testimonios, destinos] = await Promise.all([
    getProgramaData('estudia-trabaja'),
    getTestimoniosPorPrograma('Estudia y Trabaja'),
    getDestinosPorPrograma('estudia-trabaja'),
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: 'Inicio', url: '/' }, { name: merged.title, url: '/estudia-trabaja' }])) }} />
      <ProgramPage program={merged} testimoniosSanity={testimonios} destinosSanity={destinos.length ? destinos : undefined} />
    </>
  );
}
