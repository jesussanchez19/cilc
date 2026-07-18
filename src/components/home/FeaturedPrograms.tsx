import Link from 'next/link';
import { programs, programColorMap } from '@/lib/data/programs';
import AnimateIn from '@/components/shared/AnimateIn';

const programImages: Record<string, string> = {
  'idiomas':               '/images/programs/idiomas.png',
  'au-pair':               '/images/programs/au-pair.png',
  'anos-academicos':       '/images/programs/anos-academicos.png',
  'estudia-trabaja':       '/images/programs/estudia-trabaja.png',
  'formacion-corporativa': '/images/programs/formacion-corporativa.png',
  'idiomas-en-linea':      '/images/programs/idiomas-en-linea.png',
};

export default function FeaturedPrograms() {
  return (
    <section className="py-24" style={{ background: 'var(--surface-2)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <AnimateIn animation="up" className="text-center mb-16">
          <span className="badge mb-5">Programas</span>
          <h2
            className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4"
            style={{ letterSpacing: '-0.03em', lineHeight: '1.08' }}
          >
            Rutas internacionales
            <br className="hidden sm:block" />
            <span className="gradient-text"> a tu medida</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            No vendemos paquetes. Diseñamos tu experiencia según tu perfil,
            objetivos y presupuesto.
          </p>
        </AnimateIn>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {programs.map((program, i) => {
            const colors = programColorMap[program.color];
            const imgSrc = programImages[program.slug] ?? '';

            return (
              <AnimateIn key={program.id} animation="scale" delay={i * 90} className="h-full">
              <Link href={`/${program.slug}`} className="group block h-full">
                <div className="premium-card h-full flex flex-col overflow-hidden">

                  {/* Image */}
                  <div className="relative h-48 overflow-hidden shrink-0 bg-slate-100">
                    {imgSrc ? (
                      <div
                        className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500 ease-out"
                        style={{ backgroundImage: `url('${imgSrc}')` }}
                      />
                    ) : (
                      <div className={`absolute inset-0 ${colors.light} flex items-center justify-center`}>
                        <span className="text-5xl">{program.icon}</span>
                      </div>
                    )}
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Duration badge */}
                    <span className="absolute top-3 right-3 px-2.5 py-1 rounded-lg text-[11px] font-semibold text-white"
                      style={{ background: 'rgba(15,23,42,0.65)', backdropFilter: 'blur(8px)' }}>
                      {program.duration}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="text-[17px] font-bold text-slate-900 leading-snug">{program.title}</h3>
                      <span className={`shrink-0 text-xl mt-0.5`}>{program.icon}</span>
                    </div>
                    <p className={`text-sm font-semibold ${colors.text} mb-3`}>{program.subtitle}</p>
                    <p className="text-slate-500 text-sm flex-1 leading-relaxed">{program.description}</p>

                    <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs text-slate-400 font-medium">
                        {program.ageRange}
                      </span>
                      <span className="text-xs font-semibold flex items-center gap-1 group-hover:gap-2 transition-all duration-200" style={{ color: 'var(--blue-600)' }}>
                        Ver programa
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
              </AnimateIn>
            );
          })}
        </div>

        {/* CTA */}
        <AnimateIn animation="up" delay={programs.length * 90} className="text-center mt-14">
          <Link href="/contact" className="btn-primary">
            Agenda tu Diagnóstico Gratuito
          </Link>
        </AnimateIn>
      </div>
    </section>
  );
}
