import type { Metadata } from 'next';
import ProgramPage from '@/components/shared/ProgramPage';
import { programs } from '@/lib/data/programs';
import { programSchema, breadcrumbSchema } from '@/lib/seo/schemas';

export const metadata: Metadata = {
  title: 'Au Pair | CILC',
  description: 'Experiencia cultural única: vive con una familia, apoya en el cuidado de niños y recibe beneficios económicos y educativos mientras mejoras tu idioma.',
};

export default function AuPairPage() {
  const program = programs.find((p) => p.id === 'au-pair')!;
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(programSchema(program)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: 'Inicio', url: '/' }, { name: program.title, url: '/au-pair' }])) }} />
      <ProgramPage program={program} />
    </>
  );
}
