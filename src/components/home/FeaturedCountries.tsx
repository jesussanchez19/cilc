'use client';

import { countries } from '@/lib/data/countries';
import Card from '@/components/shared/Card';

export default function FeaturedCountries() {
  const featured = countries.slice(0, 6);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-4">Países Destacados</h2>
          <p className="text-gray-600 text-lg">
            Descubre los mejores destinos para estudiar en el extranjero
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((country) => (
            <Card
              key={country.id}
              title={`${country.flag} ${country.name}`}
              description={country.description}
              image={country.image}
              href={`/countries/${country.id}`}
              footer={
                <div className="flex justify-between text-xs">
                  <span>🎓 {country.universities} universidades</span>
                  <span>💰 ${country.costOfLiving}/mes</span>
                </div>
              }
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="/countries"
            className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition"
          >
            Ver Todos los Países
          </a>
        </div>
      </div>
    </section>
  );
}
