import type { Metadata } from 'next';
import ProgramPage from '@/components/shared/ProgramPage';
import { programs } from '@/lib/data/programs';
import { programSchema, breadcrumbSchema } from '@/lib/seo/schemas';

export const metadata: Metadata = {
  title: 'Idiomas en el Extranjero | CILC',
  description: 'Programas de inglés, francés, alemán, japonés, coreano y mandarín en escuelas internacionalmente acreditadas. Desde 2 semanas, con certificación oficial.',
};

export default function IdiomasPage() {
  const program = programs.find((p) => p.id === 'idiomas')!;
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(programSchema(program)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: 'Inicio', url: '/' }, { name: program.title, url: '/idiomas' }])) }} />
      <ProgramPage program={program} />
    </>
  );
}
