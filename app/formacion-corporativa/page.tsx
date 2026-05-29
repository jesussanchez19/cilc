import ProgramPage from '@/components/shared/ProgramPage';
import { programs } from '@/lib/data/programs';

export default function FormacionCorporativaPage() {
  const program = programs.find((p) => p.id === 'formacion-corporativa')!;
  return <ProgramPage program={program} />;
}
