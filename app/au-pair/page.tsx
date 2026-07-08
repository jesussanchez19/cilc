import type { Metadata } from 'next';
import ProgramPage from '@/components/shared/ProgramPage';
import { programs } from '@/lib/data/programs';

export const metadata: Metadata = {
  title: 'Au Pair | CILC',
  description: 'Experiencia cultural única: vive con una familia, apoya en el cuidado de niños y recibe beneficios económicos y educativos mientras mejoras tu idioma.',
};

export default function AuPairPage() {
  const program = programs.find((p) => p.id === 'au-pair')!;
  return <ProgramPage program={program} />;
}
