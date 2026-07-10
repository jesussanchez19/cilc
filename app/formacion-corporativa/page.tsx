import type { Metadata } from 'next';
import ProgramPage from '@/components/shared/ProgramPage';
import { programs } from '@/lib/data/programs';
import { programSchema, breadcrumbSchema } from '@/lib/seo/schemas';

export const metadata: Metadata = {
  title: 'Formación Corporativa Internacional | CILC',
  description: 'Programas de idiomas ejecutivos, inmersión empresarial y formación especializada en destinos clave. Diseñados a la medida de cada empresa.',
};

export default function FormacionCorporativaPage() {
  const program = programs.find((p) => p.id === 'formacion-corporativa')!;
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(programSchema(program)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: 'Inicio', url: '/' }, { name: program.title, url: '/formacion-corporativa' }])) }} />
      <ProgramPage program={program} />
    </>
  );
}
