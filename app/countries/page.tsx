import { countries } from '@/lib/data/countries';
import Card from '@/components/shared/Card';

export default function CountriesPage() {
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4">Países Disponibles</h1>
          <p className="text-xl text-gray-600">
            Explora nuestras opciones de estudio en los mejores destinos del mundo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {countries.map((country) => (
            <Card
              key={country.id}
              title={`${country.flag} ${country.name}`}
              description={country.description}
              image={country.image}
              href={`/countries/${country.id}`}
              footer={
                <div className="space-y-1 text-xs">
                  <div>🎓 {country.universities} universidades</div>
                  <div>💰 ${country.costOfLiving}/mes</div>
                  <div>🌍 {country.region}</div>
                </div>
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
