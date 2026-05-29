import { countries } from '@/lib/data/countries';
import { universities } from '@/lib/data/universities';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default function CountryDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const country = countries.find((c) => c.id === params.id);

  if (!country) {
    notFound();
  }

  const countryUniversities = universities.filter(
    (u) => u.countryCode === country.code
  );

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mb-12 bg-gradient-to-r from-blue-600 to-blue-800 text-white p-12 rounded-lg">
          <div className="flex items-start gap-6">
            <div className="text-7xl">{country.flag}</div>
            <div>
              <h1 className="text-5xl font-bold mb-4">{country.name}</h1>
              <p className="text-xl mb-4">{country.description}</p>
              <Link
                href="/contact"
                className="inline-block px-6 py-3 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-100 transition"
              >
                Solicitar Información
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-blue-50 p-6 rounded-lg text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {country.universities}
            </div>
            <p className="text-gray-600">Universidades</p>
          </div>

          <div className="bg-green-50 p-6 rounded-lg text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">${country.costOfLiving}</div>
            <p className="text-gray-600">Costo de vida mensual</p>
          </div>

          <div className="bg-purple-50 p-6 rounded-lg text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {(country.students / 1000).toFixed(0)}K
            </div>
            <p className="text-gray-600">Estudiantes internacionales</p>
          </div>

          <div className="bg-orange-50 p-6 rounded-lg text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">{country.language}</div>
            <p className="text-gray-600">Idioma principal</p>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-2xl font-bold mb-6">Información General</h2>
            <div className="space-y-4">
              <div>
                <p className="text-gray-600 font-semibold">Región</p>
                <p className="text-lg text-gray-900">{country.region}</p>
              </div>
              <div>
                <p className="text-gray-600 font-semibold">Clima</p>
                <p className="text-lg text-gray-900">{country.climate}</p>
              </div>
              <div>
                <p className="text-gray-600 font-semibold">Código de País</p>
                <p className="text-lg text-gray-900">{country.code}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-2xl font-bold mb-6">Razones para Estudiar Aquí</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-2xl">✓</span>
                <span className="text-gray-700">Universidades de clase mundial</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">✓</span>
                <span className="text-gray-700">Excelente calidad de vida</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">✓</span>
                <span className="text-gray-700">Oportunidades profesionales</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">✓</span>
                <span className="text-gray-700">Comunidad internacional diversa</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Universities Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Universidades en {country.name}</h2>
          {countryUniversities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {countryUniversities.map((uni) => (
                <div
                  key={uni.id}
                  className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition"
                >
                  <h3 className="text-xl font-bold mb-2">{uni.name}</h3>
                  <p className="text-gray-600 mb-4">
                    <span className="font-semibold">Ranking: </span>#{uni.ranking}
                  </p>
                  <p className="text-gray-600 mb-4">
                    <span className="font-semibold">Costo anual: </span>${uni.costPerYear.toLocaleString()}
                  </p>
                  <div>
                    <p className="text-gray-600 font-semibold mb-2">Especialidades:</p>
                    <div className="flex flex-wrap gap-2">
                      {uni.specialties.map((spec) => (
                        <span
                          key={spec}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-lg">No hay universidades registradas para este país aún.</p>
          )}
        </div>

        {/* CTA */}
        <div className="bg-blue-50 p-12 rounded-lg text-center">
          <h2 className="text-3xl font-bold mb-4">¿Interesado en estudiar en {country.name}?</h2>
          <p className="text-gray-600 mb-8 text-lg">
            Contáctanos para obtener más información sobre programas, becas y proceso de admisión.
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
