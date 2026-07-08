import type { Metadata } from 'next';
import ProgramPage from '@/components/shared/ProgramPage';
import { programs } from '@/lib/data/programs';

export const metadata: Metadata = {
  title: 'Estudia y Trabaja en el Extranjero | CILC',
  description: 'Combina clases de idioma con experiencia laboral real en el extranjero. Cubre parte de tus gastos mientras construyes un perfil profesional internacional.',
};

export default function EstudioTrabajaPage() {
  const program = programs.find((p) => p.id === 'estudia-trabaja')!;
  return <ProgramPage program={program} />;
}
