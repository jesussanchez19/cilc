import { Country, University } from '@/lib/types';
import Link from 'next/link';

interface CountryDetailProps {
  country: Country;
  universities: University[];
}

export default function CountryDetail({ country, universities }: CountryDetailProps) {
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="mb-12 bg-gradient-to-r from-blue-600 to-blue-800 text-white p-12 rounded-lg">
          <div className="flex items-start gap-6">
            <div className="text-7xl">{country.flag}</div>
            <div>
              <h1 className="text-5xl font-bold mb-4">{country.name}</h1>
              <p className="text-xl mb-6">{country.description}</p>
              <Link
                href="/contact"
                className="inline-block px-6 py-3 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-100 transition"
              >
                Solicitar Información
              </Link>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-blue-50 p-6 rounded-lg text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {country.universities.toLocaleString()}
            </div>
            <p className="text-gray-600 text-sm">Universidades</p>
          </div>
          <div className="bg-green-50 p-6 rounded-lg text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              ${country.costOfLiving.toLocaleString()}
            </div>
            <p className="text-gray-600 text-sm">Costo de vida/mes</p>
          </div>
          <div className="bg-purple-50 p-6 rounded-lg text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {(country.students / 1000).toFixed(0)}K
            </div>
            <p className="text-gray-600 text-sm">Estudiantes internacionales</p>
          </div>
          <div className="bg-orange-50 p-6 rounded-lg text-center">
            <div className="text-2xl font-bold text-orange-600 mb-2 leading-tight">
              {country.language}
            </div>
            <p className="text-gray-600 text-sm">Idioma principal</p>
          </div>
        </div>

        {/* Info + Reasons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-2xl font-bold mb-6">Información General</h2>
            <div className="space-y-4">
              <div>
                <p className="text-gray-500 text-sm font-semibold uppercase tracking-wide">Región</p>
                <p className="text-lg text-gray-900">{country.region}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm font-semibold uppercase tracking-wide">Clima</p>
                <p className="text-lg text-gray-900">{country.climate}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm font-semibold uppercase tracking-wide">Idioma</p>
                <p className="text-lg text-gray-900">{country.language}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm font-semibold uppercase tracking-wide">Código de País</p>
                <p className="text-lg text-gray-900">{country.code}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-2xl font-bold mb-6">¿Por qué estudiar aquí?</h2>
            <ul className="space-y-3">
              {[
                'Universidades reconocidas a nivel mundial',
                'Excelente calidad de vida y seguridad',
                'Amplias oportunidades profesionales',
                'Comunidad internacional diversa',
              ].map((reason) => (
                <li key={reason} className="flex items-start gap-3">
                  <span className="text-green-500 font-bold text-lg mt-0.5">✓</span>
                  <span className="text-gray-700">{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Universities */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">
            Universidades en {country.name}
            <span className="ml-3 text-lg font-normal text-gray-500">
              ({universities.length} registradas)
            </span>
          </h2>
          {universities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {universities.map((uni) => (
                <div
                  key={uni.id}
                  className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold">{uni.name}</h3>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-semibold whitespace-nowrap ml-2">
                      #{uni.ranking}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-1 text-sm">
                    <span className="font-semibold">Costo anual aprox.: </span>
                    ${uni.costPerYear.toLocaleString()} USD
                  </p>
                  <a
                    href={uni.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-sm hover:underline mb-3 inline-block"
                  >
                    {uni.website.replace('https://', '')}
                  </a>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {uni.specialties.map((spec) => (
                      <span
                        key={spec}
                        className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <p className="text-gray-500 text-lg">
                No hay universidades registradas para este país aún.
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Contáctanos para obtener información directa.
              </p>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="bg-blue-50 border border-blue-100 p-12 rounded-lg text-center">
          <h2 className="text-3xl font-bold mb-4">
            ¿Interesado en estudiar en {country.name}?
          </h2>
          <p className="text-gray-600 mb-8 text-lg max-w-xl mx-auto">
            Contáctanos para obtener más información sobre programas, becas y el proceso de admisión.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition"
          >
            Contactar Ahora
          </Link>
        </div>
      </div>
    </div>
  );
}
