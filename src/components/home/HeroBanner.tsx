'use client';

import Link from 'next/link';
import Image from 'next/image';
import { countries } from '@/lib/data/countries';

const STATS = [
  { value: '+23', label: 'años de exp.' },
  { value: '+500', label: 'estudiantes/año' },
  { value: `${countries.length}`, label: 'países destino' },
];

export default function HeroBanner() {
  return (
    <section className="relative flex items-center overflow-hidden" style={{ minHeight: '94vh' }}>

      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-banner.png"
          alt="Estudiante mexicana en el extranjero"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Layered gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-[#0a0f1e]/90 via-[#0a0f1e]/60 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-[#0a0f1e]/50 via-transparent to-transparent" />
      </div>

      {/* Subtle grid texture on dark side */}
      <div
        className="absolute inset-0 z-1 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage: 'linear-gradient(to right, black 40%, transparent 70%)',
          WebkitMaskImage: 'linear-gradient(to right, black 40%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 w-full">
        <div className="max-w-160">

          {/* Badge */}
          <div
            className="badge badge-dark inline-flex mb-7 animate-slide-up"
            style={{ animationDelay: '0ms' }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--red)' }} />
            Canadian &amp; International Language Centers · +23 años
          </div>

          {/* Title */}
          <h1
            className="hero-title text-white mb-6 animate-slide-up"
            style={{ animationDelay: '120ms', animationFillMode: 'both' }}
          >
            Estudios en el{' '}
            <span className="gradient-text-light">Extranjero</span>{' '}
            que Transforman tu Futuro
          </h1>

          {/* Subtitle */}
          <p
            className="text-lg sm:text-xl text-slate-300 mb-10 leading-relaxed max-w-lg animate-slide-up"
            style={{ animationDelay: '240ms', animationFillMode: 'both' }}
          >
            Asesoría personalizada sin costo para estudiar en Canadá,
            Estados Unidos, Inglaterra, Irlanda y más.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row gap-3 animate-slide-up"
            style={{ animationDelay: '360ms', animationFillMode: 'both' }}
          >
            <Link href="/countries" className="btn-primary">
              Explorar Destinos
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <Link href="/contact" className="btn-ghost">
              Quiero mi asesoría gratis
            </Link>
          </div>

          {/* Stats */}
          <div
            className="flex gap-1 mt-14 animate-slide-up"
            style={{ animationDelay: '480ms', animationFillMode: 'both' }}
          >
            {STATS.map(({ value, label }, i) => (
              <div key={label} className="flex items-center gap-1">
                {i > 0 && <div className="w-px h-8 bg-white/10 mx-3" />}
                <div>
                  <p className="text-2xl font-extrabold tracking-tight gradient-text-light">{value}</p>
                  <p className="text-[11px] text-slate-400 uppercase tracking-wider mt-0.5">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating accent — bottom right glow en rojo logo */}
      <div
        className="absolute bottom-0 right-0 w-125 h-100 pointer-events-none z-1"
        style={{
          background: 'radial-gradient(ellipse at bottom right, rgba(227,30,36,0.18) 0%, transparent 65%)',
        }}
      />

      {/* Accent line — gradiente de marca azul→rojo en el borde inferior */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0.75 pointer-events-none z-10"
        style={{ background: 'linear-gradient(90deg, #1B67E8 0%, #E31E24 100%)' }}
      />
    </section>
  );
}
