import ProgramPage from '@/components/shared/ProgramPage';
import { programs } from '@/lib/data/programs';

export default function IdiomasPage() {
  const program = programs.find((p) => p.id === 'idiomas')!;
  return <ProgramPage program={program} />;
}
