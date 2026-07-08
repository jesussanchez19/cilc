import type { Metadata } from 'next';
import ProgramPage from '@/components/shared/ProgramPage';
import { programs } from '@/lib/data/programs';

export const metadata: Metadata = {
  title: 'Idiomas en el Extranjero | CILC',
  description: 'Programas de inglés, francés, alemán, japonés, coreano y mandarín en escuelas internacionalmente acreditadas. Desde 2 semanas, con certificación oficial.',
};

export default function IdiomasPage() {
  const program = programs.find((p) => p.id === 'idiomas')!;
  return <ProgramPage program={program} />;
}
