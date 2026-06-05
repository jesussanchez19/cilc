'use client';

import { useState, useMemo } from 'react';
import { Country } from '@/lib/types';
import Card from './Card';

interface CountryGridProps {
  countries: Country[];
  columns?: 2 | 3 | 4;
}

export default function CountryGrid({ countries, columns = 3 }: CountryGridProps) {
  const [regionFilter, setRegionFilter] = useState('');
  const [langFilter, setLangFilter]     = useState('');

  // Listas 
  const regions  = useMemo(() => [...new Set(countries.map((c) => c.region))].sort(),  [countries]);
  const languages = useMemo(() => [...new Set(countries.map((c) => c.language))].sort(), [countries]);

  // Filtro
  const filtered = useMemo(() =>
    countries.filter((c) => {
      const byRegion = regionFilter ? c.region   === regionFilter : true;
      const byLang   = langFilter   ? c.language === langFilter   : true;
      return byRegion && byLang;
    }),
  [countries, regionFilter, langFilter]);

  const colClass =
    columns === 2 ? 'md:grid-cols-2' :
    columns === 4 ? 'md:grid-cols-2 lg:grid-cols-4' :
                    'md:grid-cols-2 lg:grid-cols-3';

  const chipBase  = 'px-4 py-1.5 rounded-full text-sm font-medium border transition-all cursor-pointer whitespace-nowrap';
  const chipOff   = 'bg-white border-gray-300 text-gray-600 hover:border-blue-400 hover:text-blue-600';
  const chipOn    = 'bg-blue-600 border-blue-600 text-white shadow-sm';

  return (
    <div>
      <div className="mb-8 space-y-4">

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">Región</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setRegionFilter('')}
              className={`${chipBase} ${regionFilter === '' ? chipOn : chipOff}`}
            >
              Todas
            </button>
            {regions.map((r) => (
              <button
                key={r}
                onClick={() => setRegionFilter(r === regionFilter ? '' : r)}
                className={`${chipBase} ${regionFilter === r ? chipOn : chipOff}`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">Idioma</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setLangFilter('')}
              className={`${chipBase} ${langFilter === '' ? chipOn : chipOff}`}
            >
              Todos
            </button>
            {languages.map((l) => (
              <button
                key={l}
                onClick={() => setLangFilter(l === langFilter ? '' : l)}
                className={`${chipBase} ${langFilter === l ? chipOn : chipOff}`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <p className="text-sm text-gray-500">
            {filtered.length} destino{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}
          </p>
          {(regionFilter || langFilter) && (
            <button
              onClick={() => { setRegionFilter(''); setLangFilter(''); }}
              className="text-sm text-blue-600 hover:underline"
            >
              Limpiar filtros ✕
            </button>
          )}
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className={`grid grid-cols-1 ${colClass} gap-6`}>
          {filtered.map((country) => (
            <Card
              key={country.id}
              title={`${country.flag} ${country.name}`}
              description={country.description}
              image={country.image}
              href={`/destinos/${country.id}`}
              footer={
                <div className="space-y-1 text-xs">
                  <div>🎓 {country.universities.toLocaleString()} universidades</div>
                  <div>💰 ${country.costOfLiving.toLocaleString()}/mes est. vida</div>
                  <div>🌍 {country.region}</div>
                </div>
              }
            />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center text-gray-400">
          <p className="text-lg font-medium">Sin resultados para estos filtros</p>
          <p className="text-sm mt-1">Prueba combinando otros filtros o limpia la selección.</p>
        </div>
      )}
    </div>
  );
}
