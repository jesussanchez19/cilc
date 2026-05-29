import Link from 'next/link';
import { programs, programColorMap } from '@/lib/data/programs';

export default function FeaturedPrograms() {
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
            return (
              <Link key={program.id} href={`/${program.slug}`}>
                <div className={`bg-white rounded-xl border-2 ${colors.border} hover:shadow-lg transition h-full flex flex-col p-6`}>
                  <div className={`w-14 h-14 ${colors.light} rounded-xl flex items-center justify-center text-3xl mb-4`}>
                    {program.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{program.title}</h3>
                  <p className={`text-sm font-medium ${colors.text} mb-3`}>{program.subtitle}</p>
                  <p className="text-gray-600 text-sm flex-1 leading-relaxed">{program.description}</p>
                  <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between text-xs text-gray-500">
                    <span>⏱ {program.duration}</span>
                    <span>👤 {program.ageRange}</span>
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
