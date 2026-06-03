'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function HeroBanner() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden">

      {/* Fondo */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-banner.png"
          alt="Estudiante mexicana en París frente a la Torre Eiffel de mis videos"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
        <div className="max-w-2xl">

          <p
            className="
              text-blue-300 text-xs sm:text-sm font-semibold uppercase tracking-widest mb-5
              animate-slide-up
            "
            style={{ animationDelay: '0ms' }}
          >
            Canadian &amp; International Language Centers · +23 años de experiencia
          </p>

          {/* Título principal */}
          <h1
            className="
              text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6
              animate-slide-up
            "
            style={{ animationDelay: '150ms', animationFillMode: 'both' }}
          >
            Estudios en el{' '}
            <span className="text-blue-300">Extranjero</span>{' '}
            que Transforman tu Futuro
          </h1>

          {/* Subtítulo */}
          <p
            className="
              text-lg sm:text-xl text-gray-200 mb-10 leading-relaxed
              animate-slide-up
            "
            style={{ animationDelay: '300ms', animationFillMode: 'both' }}
          >
            Asesoría personalizada sin costo ni compromiso para estudiar en
            Canadá, Estados Unidos, Inglaterra, Irlanda y más.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 animate-slide-up"
            style={{ animationDelay: '450ms', animationFillMode: 'both' }}
          >
            <Link
              href="/countries"
              className="
                px-8 py-4 bg-blue-500 hover:bg-blue-400 text-white
                rounded-xl font-bold text-base transition-all duration-200
                shadow-lg hover:shadow-blue-500/40 hover:-translate-y-0.5
                text-center
              "
            >
              🌍 Explorar Países
            </Link>
            <Link
              href="/contact"
              className="
                px-8 py-4 bg-white/10 hover:bg-white/20 text-white
                rounded-xl font-bold text-base transition-all duration-200
                border border-white/40 hover:border-white/70
                backdrop-blur-sm hover:-translate-y-0.5
                text-center
              "
            >
              Quiero mi asesoría gratis →
            </Link>
          </div>

          <div
            className="flex flex-wrap gap-6 mt-12 animate-slide-up"
            style={{ animationDelay: '600ms', animationFillMode: 'both' }}
          >
            {[
              { value: '+23', label: 'años de experiencia' },
              { value: '+500', label: 'estudiantes al año' },
              { value: '4', label: 'países destino' },
            ].map(({ value, label }) => (
              <div key={label} className="text-white">
                <p className="text-2xl font-extrabold text-blue-300">{value}</p>
                <p className="text-xs text-gray-300 uppercase tracking-wide">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ANIMACIÓN CSS */}
      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(32px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          opacity: 0;
          animation: slideUp 0.65s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
      `}</style>
    </section>
  );
}
