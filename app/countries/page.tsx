import { countries } from '@/lib/data/countries';
import CountryGrid from '@/components/shared/CountryGrid';

export default function CountriesPage() {
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4">Países Disponibles</h1>
          <p className="text-xl text-gray-600">
            Explora {countries.length} destinos para estudiar en el extranjero.
          </p>
        </div>
        <CountryGrid countries={countries} />
      </div>
    </div>
  );
}
