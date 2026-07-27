import { countries } from '@/lib/data/countries';
import CountryGrid from '@/components/shared/CountryGrid';
import DestinosStats from '@/components/destinos/DestinosStats';
import AnimateIn from '@/components/shared/AnimateIn';

export const metadata = {
  title: 'Destinos | CILC',
  description: 'Explora los países destino para estudiar en el extranjero con CILC.',
};

export default function DestinosPage() {
  return (
    <div>

      {/* ── Hero ── */}
      <section className="relative pt-24 pb-20 overflow-hidden" style={{ background: 'var(--dark)' }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 120%, rgba(37,99,235,0.16) 0%, transparent 70%)' }} />
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }} />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="badge badge-dark mb-6 animate-slide-up inline-flex"
            style={{ animationDelay: '0ms', animationFillMode: 'both' }}>Destinos</span>
          <h1
            className="text-5xl sm:text-6xl font-extrabold text-white mb-5 animate-slide-up"
            style={{ letterSpacing: '-0.04em', lineHeight: '1.04', animationDelay: '100ms', animationFillMode: 'both' }}
          >
            El mundo es tu{' '}
            <span className="gradient-text-light">aula</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed animate-slide-up"
            style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
            Explora los países donde puedes estudiar con CILC.
            Filtra por región o idioma para encontrar el destino perfecto para ti.
          </p>

          {/* Quick stats — count-up on scroll */}
          <DestinosStats />
        </div>
      </section>

      {/* ── Grid con filtros ── */}
      <section className="py-16 min-h-screen" style={{ background: 'var(--surface-2)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CountryGrid countries={countries} columns={3} />
        </div>
      </section>

    </div>
  );
}
