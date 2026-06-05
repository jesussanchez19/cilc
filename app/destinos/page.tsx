import { countries } from '@/lib/data/countries';
import CountryGrid from '@/components/shared/CountryGrid';

export const metadata = {
  title: 'Destinos | CILC',
  description: 'Explora los países destino para estudiar en el extranjero con CILC.',
};

export default function DestinosPage() {
  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Encabezado */}
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold uppercase tracking-widest rounded-full mb-4">
            Destinos
          </span>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">
            Elige tu próximo destino
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Explora los países donde puedes estudiar con CILC. Filtra por región o idioma para encontrar el que mejor se adapta a ti.
          </p>
        </div>

        {/* Filtro de países */}
        <CountryGrid countries={countries} columns={3} />

      </div>
    </div>
  );
}
