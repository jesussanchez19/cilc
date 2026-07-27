'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Country } from '@/lib/types';

interface CountryGridProps {
  countries: Country[];
  columns?: 2 | 3 | 4;
}

export default function CountryGrid({ countries, columns = 3 }: CountryGridProps) {
  const [regionFilter, setRegionFilter] = useState('');
  const [langFilter, setLangFilter] = useState('');
  const [gridVisible, setGridVisible] = useState(false);

  const regions = useMemo(() => [...new Set(countries.map((c) => c.region))].sort(), [countries]);
  const languages = useMemo(() => [...new Set(countries.map((c) => c.language))].sort(), [countries]);

  const filtered = useMemo(() =>
    countries.filter((c) => {
      const byRegion = regionFilter ? c.region === regionFilter : true;
      const byLang = langFilter ? c.language === langFilter : true;
      return byRegion && byLang;
    }),
  [countries, regionFilter, langFilter]);

  // Re-trigger stagger animation whenever the filtered list changes
  useEffect(() => {
    setGridVisible(false);
    const t = setTimeout(() => setGridVisible(true), 40);
    return () => clearTimeout(t);
  }, [filtered]);

  const colClass =
    columns === 2 ? 'md:grid-cols-2' :
    columns === 4 ? 'md:grid-cols-2 lg:grid-cols-4' :
                    'md:grid-cols-2 lg:grid-cols-3';

  const chipBase = 'px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 cursor-pointer whitespace-nowrap';
  const chipOff = 'bg-white border-slate-200 text-slate-600 hover:border-blue-400 hover:text-blue-600';
  const chipOn = 'bg-blue-600 border-blue-600 text-white shadow-sm';

  return (
    <div>
      {/* Filtros */}
      <div
        className="rounded-2xl p-6 mb-8"
        style={{ background: 'white', border: '1px solid rgba(15,23,42,0.07)', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
      >
        <div className="space-y-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2.5">Región</p>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setRegionFilter('')} className={`${chipBase} ${regionFilter === '' ? chipOn : chipOff}`}>
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
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2.5">Idioma</p>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setLangFilter('')} className={`${chipBase} ${langFilter === '' ? chipOn : chipOff}`}>
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

          <div className="flex items-center justify-between pt-1 border-t border-slate-100">
            <p className="text-sm text-slate-500 font-medium">
              <span className="font-bold text-slate-900">{filtered.length}</span>{' '}
              destino{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}
            </p>
            {(regionFilter || langFilter) && (
              <button
                onClick={() => { setRegionFilter(''); setLangFilter(''); }}
                className="text-sm text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1 transition-colors duration-150"
              >
                Limpiar filtros
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className={`grid grid-cols-1 ${colClass} gap-4`}>
          {filtered.map((country, i) => (
            <Link
              key={country.id}
              href={`/destinos/${country.id}`}
              className={`group relative overflow-hidden rounded-2xl reveal-scale ${gridVisible ? 'is-visible' : ''}`}
              style={{ height: '260px', transitionDelay: `${Math.min(i, 8) * 55}ms` }}
            >
              <Image
                src={country.image}
                alt={country.name}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />

              {/* Gradient overlay */}
              <div
                className="absolute inset-0 transition-all duration-500"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 55%, rgba(0,0,0,0.05) 100%)' }}
              />

              {/* Flag + language pill */}
              <div className="absolute top-3 right-3 flex items-center gap-1.5">
                <span
                  className="px-2.5 py-1 rounded-full text-xs font-semibold text-white"
                  style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.15)' }}
                >
                  {country.language}
                </span>
                <span
                  className="px-2 py-1 rounded-full text-base leading-none"
                  style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)' }}
                >
                  {country.flag}
                </span>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-slate-400 text-[9px] font-bold uppercase tracking-widest mb-0.5">
                  {country.region}
                </p>
                <h3 className="text-white font-extrabold text-xl leading-tight mb-2">
                  {country.name}
                </h3>

                {/* Stats row */}
                <div className="flex items-center gap-3 text-xs text-slate-300 mb-3">
                  <span>{country.universities.toLocaleString()} universidades</span>
                  <span className="w-px h-3 bg-slate-600" />
                  <span>~${country.costOfLiving.toLocaleString()}/mes</span>
                </div>

                {/* CTA revealed on hover */}
                <div
                  className="flex items-center gap-1.5 text-xs font-semibold
                    opacity-0 translate-y-1.5 group-hover:opacity-100 group-hover:translate-y-0
                    transition-all duration-300"
                  style={{ color: '#93c5fd' }}
                >
                  Ver destino
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="py-24 text-center rounded-2xl" style={{ background: 'white', border: '1px solid rgba(15,23,42,0.07)' }}>
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ background: 'rgba(15,23,42,0.05)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </div>
          <p className="text-slate-700 font-semibold text-base mb-1">Sin resultados</p>
          <p className="text-slate-400 text-sm">Prueba con otros filtros o limpia la selección.</p>
        </div>
      )}
    </div>
  );
}
