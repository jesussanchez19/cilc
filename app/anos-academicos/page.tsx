import ProgramPage from '@/components/shared/ProgramPage';
import { programs } from '@/lib/data/programs';

export default function AnosAcademicosPage() {
  const program = programs.find((p) => p.id === 'anos-academicos')!;
  return <ProgramPage program={program} />;
}
