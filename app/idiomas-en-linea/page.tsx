import ProgramPage from '@/components/shared/ProgramPage';
import { programs } from '@/lib/data/programs';

export default function IdiomasEnLineaPage() {
  const program = programs.find((p) => p.id === 'idiomas-en-linea')!;
  return <ProgramPage program={program} />;
}
