import { universities } from '@/lib/data/universities';
import Card from '@/components/shared/Card';
import AnimateIn from '@/components/shared/AnimateIn';

export const metadata = {
  title: 'Universidades | CILC',
  description: 'Las mejores universidades del mundo para continuar tu educación internacional con CILC.',
};

export default function UniversitiesPage() {
  const sortedUniversities = [...universities].sort((a, b) => a.ranking - b.ranking);

  return (
    <div>

      {/* ── Hero ── */}
      <section className="relative py-24 overflow-hidden" style={{ background: 'var(--dark)' }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 50% at 20% 50%, rgba(27,103,232,0.18) 0%, transparent 65%)' }} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 50% 50% at 80% 50%, rgba(227,30,36,0.12) 0%, transparent 65%)' }} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn animation="up">
            <span className="badge badge-dark mb-5">Red global</span>
            <h1 className="text-5xl sm:text-6xl font-extrabold text-white mb-5"
              style={{ letterSpacing: '-0.04em', lineHeight: '1.04' }}>
              Universidades<br />
              <span className="gradient-text-light">de clase mundial</span>
            </h1>
            <p className="text-slate-400 text-xl max-w-2xl leading-relaxed">
              Seleccionamos las mejores instituciones del mundo para que tu educación
              internacional sea una inversión con retorno comprobado.
            </p>
          </AnimateIn>

          <AnimateIn animation="up" delay={140} className="flex flex-wrap gap-8 mt-12">
            {[
              { valor: `${sortedUniversities.length}+`, label: 'Universidades aliadas' },
              { valor: '16+', label: 'Países destino' },
              { valor: 'Top 200', label: 'Rankings QS / THE' },
            ].map(({ valor, label }) => (
              <div key={label} className="text-center">
                <p className="text-2xl font-extrabold tracking-tight gradient-text-light">{valor}</p>
                <p className="text-[11px] text-slate-500 uppercase tracking-widest mt-1">{label}</p>
              </div>
            ))}
          </AnimateIn>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(27,103,232,0.5) 30%, rgba(227,30,36,0.5) 70%, transparent)' }} />
      </section>

      {/* ── Grid ── */}
      <section className="py-20" style={{ background: 'var(--surface-2)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <AnimateIn animation="up" className="mb-12">
            <span className="badge mb-4">Ranking global</span>
            <h2 className="text-3xl font-extrabold text-slate-900"
              style={{ letterSpacing: '-0.03em' }}>
              Ordenadas por <span className="gradient-text">posición mundial</span>
            </h2>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedUniversities.map((uni, i) => (
              <AnimateIn key={uni.id} animation="scale" delay={Math.min(i, 8) * 70}>
                <Card
                  title={uni.name}
                  description={`${uni.country} · Ranking #${uni.ranking}`}
                  image={uni.image}
                  footer={
                    <div className="space-y-2">
                      <div className="text-sm text-slate-600">
                        <span className="font-semibold" style={{ color: 'var(--blue-600)' }}>
                          ${uni.costPerYear.toLocaleString('es-MX')}
                        </span>
                        <span className="text-slate-400"> /año</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {uni.specialties.slice(0, 2).map((spec) => (
                          <span
                            key={spec}
                            className="px-2 py-0.5 rounded-full text-[11px] font-semibold"
                            style={{ background: 'rgba(27,103,232,0.10)', color: 'var(--blue-600)' }}
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  }
                />
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
