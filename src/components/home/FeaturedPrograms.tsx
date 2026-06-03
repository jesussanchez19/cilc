import Link from 'next/link';
import { programs, programColorMap } from '@/lib/data/programs';

export default function FeaturedPrograms() {
  // ─────────────────────────────────────────────────────────────────
  //  Mapa de imágenes por program.slug
  //  Coloca tus imágenes en: public/images/programs/<nombre>.png
  //  Solo cambia el nombre del archivo si es diferente.
  // ─────────────────────────────────────────────────────────────────
  const programImages: Record<string, string> = {
    'idiomas':               '/images/programs/idiomas.png',
    'au-pair':               '/images/programs/au-pair.png',
    'anos-academicos':       '/images/programs/anos-academicos.png',
    'estudia-trabaja':       '/images/programs/estudia-trabaja.png',
    'formacion-corporativa': '/images/programs/formacion-corporativa.png',
    'idiomas-en-linea':      '/images/programs/idiomas-en-linea.png',
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Nuestros Programas</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Diseñamos rutas internacionales personalizadas según tu perfil, objetivos y presupuesto.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program) => {
            const colors = programColorMap[program.color];
            const imgSrc = programImages[program.slug] ?? '';

            return (
              <Link key={program.id} href={`/${program.slug}`} className="group block h-full">
                <div className={`bg-white rounded-xl border-2 ${colors.border} hover:shadow-xl transition-shadow duration-300 h-full flex flex-col overflow-hidden`}>

                  {/* ── Imagen de cabecera — clara, sin blur, sin icono ── */}
                  <div className="relative h-44 overflow-hidden shrink-0">
                    {imgSrc ? (
                      <div
                        className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                        style={{ backgroundImage: `url('${imgSrc}')` }}
                      />
                    ) : (
                      /* Fallback si aún no tienes imagen: fondo de color de marca */
                      <div className={`absolute inset-0 ${colors.light} flex items-center justify-center`}>
                        <span className="text-5xl">{program.icon}</span>
                      </div>
                    )}
                  </div>

                  {/* ── Contenido de texto ── */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{program.title}</h3>
                    <p className={`text-sm font-medium ${colors.text} mb-3`}>{program.subtitle}</p>
                    <p className="text-gray-600 text-sm flex-1 leading-relaxed">{program.description}</p>
                    <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between text-xs text-gray-500">
                      <span>⏱ {program.duration}</span>
                      <span>👤 {program.ageRange}</span>
                    </div>
                  </div>

                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition"
          >
            Agenda tu Diagnóstico Gratuito
          </Link>
        </div>
      </div>
    </section>
  );
}
