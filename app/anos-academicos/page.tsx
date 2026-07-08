import type { Metadata } from 'next';
import ProgramPage from '@/components/shared/ProgramPage';
import { programs } from '@/lib/data/programs';

export const metadata: Metadata = {
  title: 'Años Académicos en el Extranjero | CILC',
  description: 'Estudia Secundaria, Preparatoria o Universidad en el extranjero con integración total al sistema académico oficial. Una experiencia que transforma tu futuro.',
};

export default function AnosAcademicosPage() {
  const program = programs.find((p) => p.id === 'anos-academicos')!;
  return <ProgramPage program={program} />;
}
