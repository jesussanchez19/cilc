import ProgramPage from '@/components/shared/ProgramPage';
import { programs } from '@/lib/data/programs';

export default function EstudioTrabajaPage() {
  const program = programs.find((p) => p.id === 'estudia-trabaja')!;
  return <ProgramPage program={program} />;
}
