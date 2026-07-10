import type { Metadata } from 'next';
import ProgramPage from '@/components/shared/ProgramPage';
import { programs } from '@/lib/data/programs';
import { programSchema, breadcrumbSchema } from '@/lib/seo/schemas';

export const metadata: Metadata = {
  title: 'Estudia y Trabaja en el Extranjero | CILC',
  description: 'Combina clases de idioma con experiencia laboral real en el extranjero. Cubre parte de tus gastos mientras construyes un perfil profesional internacional.',
};

export default function EstudioTrabajaPage() {
  const program = programs.find((p) => p.id === 'estudia-trabaja')!;
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(programSchema(program)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: 'Inicio', url: '/' }, { name: program.title, url: '/estudia-trabaja' }])) }} />
      <ProgramPage program={program} />
    </>
  );
}
