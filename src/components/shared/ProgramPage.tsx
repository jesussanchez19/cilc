import Link from 'next/link';
import { Program, programColorMap } from '@/lib/data/programs';

interface ProgramPageProps {
  program: Program;
}

export default function ProgramPage({ program }: ProgramPageProps) {
  const colors = programColorMap[program.color];

  return (
    <div>
      {/* Hero */}
      <div className={`${colors.bg} text-white py-20`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-6xl mb-6">{program.icon}</div>
            <h1 className="text-5xl font-bold mb-4">{program.title}</h1>
            <p className="text-xl opacity-90 mb-6">{program.subtitle}</p>
            <p className="text-lg opacity-80 mb-8 leading-relaxed">{program.description}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-block px-8 py-4 bg-white text-gray-900 rounded-lg font-bold hover:bg-gray-100 transition text-center"
              >
                Solicitar Información
              </Link>
              <a
                href="https://wa.me/525518944494"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-4 bg-green-500 text-white rounded-lg font-bold hover:bg-green-600 transition text-center"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Quick stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className={`${colors.light} p-6 rounded-xl text-center`}>
            <div className={`text-2xl font-bold ${colors.text} mb-1`}>{program.duration}</div>
            <p className="text-gray-600 text-sm">Duración</p>
          </div>
          <div className={`${colors.light} p-6 rounded-xl text-center`}>
            <div className={`text-2xl font-bold ${colors.text} mb-1`}>{program.ageRange}</div>
            <p className="text-gray-600 text-sm">Rango de edad</p>
          </div>
          <div className={`${colors.light} p-6 rounded-xl text-center`}>
            <div className={`text-2xl font-bold ${colors.text} mb-1`}>{program.countries.length}</div>
            <p className="text-gray-600 text-sm">Destinos disponibles</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Highlights */}
          <div>
            <h2 className="text-3xl font-bold mb-6">Puntos clave</h2>
            <ul className="space-y-4">
              {program.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3">
                  <span className={`${colors.text} font-bold text-lg mt-0.5`}>✓</span>
                  <span className="text-gray-700">{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Includes */}
          <div>
            <h2 className="text-3xl font-bold mb-6">¿Qué incluye?</h2>
            <ul className="space-y-4">
              {program.includes.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-gray-400 mt-1">→</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Countries */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Destinos disponibles</h2>
          <div className="flex flex-wrap gap-3">
            {program.countries.map((country) => (
              <span
                key={country}
                className={`px-4 py-2 ${colors.light} ${colors.text} rounded-full font-medium text-sm border ${colors.border}`}
              >
                {country}
              </span>
            ))}
          </div>
        </div>

        {/* Ideal for */}
        <div className={`${colors.light} border ${colors.border} rounded-xl p-8 mb-16`}>
          <h2 className="text-2xl font-bold mb-3">¿Para quién es este programa?</h2>
          <p className="text-gray-700 text-lg">{program.idealFor}</p>
        </div>

        {/* CTA */}
        <div className="bg-gray-900 text-white rounded-xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Te interesa este programa?</h2>
          <p className="text-gray-300 mb-8 text-lg max-w-xl mx-auto">
            Agenda tu Diagnóstico Internacional Estratégico — es gratuito y sin compromiso.
            Te ayudamos a diseñar tu ruta ideal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className={`inline-block px-8 py-4 ${colors.bg} text-white rounded-lg font-bold hover:opacity-90 transition`}
            >
              Solicitar Información
            </Link>
            <a
              href="https://wa.me/525518944494?text=Hola%2C%20me%20interesa%20el%20programa%20de%20{program.title}"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
