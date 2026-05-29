import ProgramPage from '@/components/shared/ProgramPage';
import { programs } from '@/lib/data/programs';

export default function AuPairPage() {
  const program = programs.find((p) => p.id === 'au-pair')!;
  return <ProgramPage program={program} />;
}
