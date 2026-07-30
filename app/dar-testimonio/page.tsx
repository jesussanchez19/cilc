import { notFound } from 'next/navigation';
import TestimonioForm from '@/components/shared/TestimonioForm';
import TokenGate from '@/components/shared/TokenGate';
import { getAllDestinos, getWhatsAppPrincipal } from '@/lib/sanity/queries';

interface Props {
  searchParams: Promise<{ acceso?: string }>;
}

export const metadata = { robots: 'noindex, nofollow' };

const PROGRAMA_LABEL: Record<string, string> = {
  'idiomas':               'Idiomas',
  'au-pair':               'Au Pair',
  'anos-academicos':       'Años Académicos',
  'estudia-trabaja':       'Estudia y Trabaja',
  'formacion-corporativa': 'Formación Corporativa',
  'idiomas-en-linea':      'Idiomas en Línea',
};

export default async function DarTestimonioPage({ searchParams }: Props) {
  const { acceso } = await searchParams;

  if (!acceso) notFound();

  const waPrincipal = await getWhatsAppPrincipal();

  const esMasterToken = acceso === process.env.TESTIMONIAL_ACCESS_TOKEN;

  // Cargar países en paralelo — si falla, los selects quedan vacíos (no crítico)
  let paisesPorPrograma: Record<string, string[]> = {};
  try {
    const destinos = await getAllDestinos();
    for (const destino of destinos) {
      for (const programaId of (destino.programas ?? [])) {
        const label = PROGRAMA_LABEL[programaId];
        if (!label) continue;
        if (!paisesPorPrograma[label]) paisesPorPrograma[label] = [];
        const nombre = destino.nombre ?? destino.countryId;
        if (nombre && !paisesPorPrograma[label].includes(nombre)) {
          paisesPorPrograma[label].push(nombre);
        }
      }
    }
  } catch { /* los selects de país quedan vacíos */ }

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-xl">
        {esMasterToken ? (
          <>
            <div className="text-center mb-10">
              <span className="badge mb-4 inline-flex">Tu experiencia</span>
              <h1 className="text-3xl font-extrabold text-slate-900 mb-3" style={{ letterSpacing: '-0.03em' }}>
                Comparte tu testimonio
              </h1>
              <p className="text-slate-500 text-base leading-relaxed">
                Cuéntanos cómo fue tu experiencia estudiando en el extranjero con CILC.
                Tu historia puede inspirar a otros estudiantes.
              </p>
            </div>
            <div className="premium-card p-8">
              <TestimonioForm paisesPorPrograma={paisesPorPrograma} waPrincipal={waPrincipal} />
            </div>
          </>
        ) : (
          <TokenGate token={acceso} paisesPorPrograma={paisesPorPrograma} waPrincipal={waPrincipal} />
        )}
      </div>
    </main>
  );
}
