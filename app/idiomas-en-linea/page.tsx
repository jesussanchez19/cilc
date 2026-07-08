import type { Metadata } from 'next';
import ProgramPage from '@/components/shared/ProgramPage';
import { programs } from '@/lib/data/programs';

export const metadata: Metadata = {
  title: 'Idiomas en Línea | CILC',
  description: 'Clases en vivo con profesor, grupos reducidos o modalidad individual. Inglés, Francés y Alemán con evaluación de nivel gratuita y horarios flexibles.',
};

export default function IdiomasEnLineaPage() {
  const program = programs.find((p) => p.id === 'idiomas-en-linea')!;
  return <ProgramPage program={program} />;
}
