'use client';

import Link from 'next/link';
import Image from 'next/image';
import { countries } from '@/lib/data/countries';

export default function FeaturedCountries() {
  const featured = countries.slice(0, 6);
  const large = featured.slice(0, 2);
  const small = featured.slice(2, 6);

  return (
    <section className="py-24" style={{ background: 'var(--dark)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="badge badge-dark mb-5">Destinos</span>
          <h2
            className="text-4xl sm:text-5xl font-extrabold text-white mb-4"
            style={{ letterSpacing: '-0.03em', lineHeight: '1.08' }}
          >
            Estudia donde el mundo{' '}
            <span className="gradient-text-light">te espera</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-lg mx-auto">
            Elige entre los mejores destinos para tu experiencia internacional.
            Cada país, una oportunidad única.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">

          {/* Large featured cards — top row, each spans 2 cols */}
          {large.map((country) => (
            <Link
              key={country.id}
              href={`/countries/${country.id}`}
              className="group col-span-2 relative overflow-hidden rounded-2xl"
              style={{ height: '300px' }}
            >
              <Image
                src={country.image}
                alt={country.name}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

              {/* Gradient overlay */}
              <div
                className="absolute inset-0 transition-all duration-500"
                style={{
                  background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.05) 100%)',
                }}
              />

              {/* Flag pill */}
              <div
                className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-xl"
                style={{
                  background: 'rgba(255,255,255,0.12)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                {country.flag}
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">
                  {country.region} · {country.language}
                </p>
                <h3 className="text-white font-extrabold text-2xl leading-tight mb-2">
                  {country.name}
                </h3>
                <div className="flex items-center gap-3 text-xs text-slate-300 mb-3">
                  <span>{country.universities.toLocaleString()} universidades</span>
                  <span className="w-px h-3 bg-slate-600" />
                  <span>~${country.costOfLiving.toLocaleString()}/mes</span>
                </div>

                {/* CTA revealed on hover */}
                <div
                  className="flex items-center gap-1.5 text-blue-400 text-sm font-semibold
                    opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0
                    transition-all duration-300"
                >
                  Explorar destino
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}

          {/* Small cards — bottom row */}
          {small.map((country) => (
            <Link
              key={country.id}
              href={`/countries/${country.id}`}
              className="group col-span-1 relative overflow-hidden rounded-2xl"
              style={{ height: '220px' }}
            >
              <Image
                src={country.image}
                alt={country.name}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />

              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.15) 60%, transparent 100%)',
                }}
              />

              {/* Flag */}
              <div
                className="absolute top-3 right-3 px-2 py-1 rounded-full text-base leading-none"
                style={{
                  background: 'rgba(255,255,255,0.12)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                {country.flag}
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-slate-400 text-[9px] font-bold uppercase tracking-widest mb-0.5">
                  {country.region}
                </p>
                <h3 className="text-white font-bold text-base leading-tight mb-2">
                  {country.name}
                </h3>
                <div
                  className="flex items-center gap-1 text-blue-400 text-xs font-semibold
                    opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0
                    transition-all duration-300"
                >
                  Ver más
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="text-center mt-10">
          <Link
            href="/destinos"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white transition-all duration-200 hover:scale-105"
            style={{
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.13)',
            }}
          >
            Ver todos los destinos
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
