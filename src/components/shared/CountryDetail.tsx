'use client';

import { Country, University } from '@/lib/types';
import Link from 'next/link';
import { useState } from 'react';

interface CountryDetailProps {
  country: Country;
  universities: University[];
}

function getCountryImages(id: string) {
  const base = `/images/countries/${id}`;
  return {
    hero:    `${base}/hero.png`,
    gallery: [
      `${base}/gallery-1.png`,
      `${base}/gallery-2.png`,
      `${base}/gallery-3.png`,
    ],
  };
}

function Carrusel({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  return (
    <div className="relative w-full overflow-hidden rounded-2xl shadow-lg aspect-video bg-gray-100">
      {images.map((src, i) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-500 ${i === current ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('${src}')` }} />
        </div>
      ))}

      <button onClick={prev} aria-label="Anterior"
        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition backdrop-blur-sm">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button onClick={next} aria-label="Siguiente"
        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition backdrop-blur-sm">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${i === current ? 'bg-white scale-125' : 'bg-white/50'}`} />
        ))}
      </div>
    </div>
  );
}

export default function CountryDetail({ country, universities }: CountryDetailProps) {
  const imgs = getCountryImages(country.id);

  const stats = [
    { label: 'Universidades',              value: country.universities.toLocaleString(), icon: '🎓', bg: 'bg-blue-50',   text: 'text-blue-600'   },
    { label: 'Costo de vida/mes',          value: `$${country.costOfLiving.toLocaleString()}`, icon: '💰', bg: 'bg-green-50',  text: 'text-green-600'  },
    { label: 'Estudiantes internacionales',value: `${(country.students / 1000).toFixed(0)}K`,  icon: '🌍', bg: 'bg-purple-50', text: 'text-purple-600' },
    { label: 'Idioma principal',           value: country.language,                             icon: '💬', bg: 'bg-orange-50', text: 'text-orange-600' },
  ];

  return (
    <div>

      <div className="relative min-h-[420px] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${imgs.hero}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 pt-32 w-full">
          <div className="flex items-center gap-4 mb-3">
            <span className="text-6xl">{country.flag}</span>
            <h1 className="text-5xl font-bold text-white">{country.name}</h1>
          </div>
          <p className="text-xl text-white/85 max-w-2xl mb-8">{country.description}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/contact"
              className="inline-block px-8 py-4 bg-white text-gray-900 rounded-xl font-bold hover:bg-gray-100 transition text-center">
              Solicitar Información
            </Link>
            <a href="https://wa.me/525518944494"
              target="_blank" rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition text-center">
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map(({ label, value, icon, bg, text }) => (
            <div key={label} className={`${bg} p-6 rounded-2xl text-center`}>
              <div className="text-3xl mb-2">{icon}</div>
              <div className={`text-2xl font-extrabold ${text} mb-1 leading-tight`}>{value}</div>
              <p className="text-gray-500 text-xs uppercase tracking-wide">{label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold mb-6">Información General</h2>
            <div className="space-y-4">
              {[
                { label: 'Región',  value: country.region   },
                { label: 'Clima',   value: country.climate  },
                { label: 'Idioma',  value: country.language },
                { label: 'Código',  value: country.code     },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-gray-400 text-xs font-semibold uppercase tracking-wide">{label}</p>
                  <p className="text-gray-900 text-base mt-0.5">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold mb-6">¿Por qué estudiar aquí?</h2>
            <ul className="space-y-3">
              {[
                'Universidades reconocidas a nivel mundial',
                'Excelente calidad de vida y seguridad',
                'Amplias oportunidades profesionales',
                'Comunidad internacional diversa',
              ].map((r) => (
                <li key={r} className="flex items-start gap-3">
                  <span className="text-green-500 font-bold text-lg mt-0.5">✓</span>
                  <span className="text-gray-700">{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Galería de {country.name}</h2>
          <Carrusel images={imgs.gallery} />
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6">
            Universidades en {country.name}
            <span className="ml-3 text-lg font-normal text-gray-400">
              ({universities.length} registradas)
            </span>
          </h2>
          {universities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {universities.map((uni) => (
                <div key={uni.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold">{uni.name}</h3>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-semibold whitespace-nowrap ml-2">
                      #{uni.ranking}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-1 text-sm">
                    <span className="font-semibold">Costo anual aprox.: </span>
                    ${uni.costPerYear.toLocaleString()} USD
                  </p>
                  <a href={uni.website} target="_blank" rel="noopener noreferrer"
                    className="text-blue-600 text-sm hover:underline mb-3 inline-block">
                    {uni.website.replace('https://', '')}
                  </a>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {uni.specialties.map((spec) => (
                      <span key={spec} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-2xl p-8 text-center">
              <p className="text-gray-500 text-lg">No hay universidades registradas para este país aún.</p>
              <p className="text-gray-400 text-sm mt-2">Contáctanos para obtener información directa.</p>
            </div>
          )}
        </div>

        <div className="bg-blue-700 text-white rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Interesado en estudiar en {country.name}?</h2>
          <p className="text-blue-100 mb-8 text-lg max-w-xl mx-auto">
            Contáctanos para obtener más información sobre programas, becas y el proceso de admisión.
          </p>
          <Link href="/contact"
            className="inline-block px-8 py-4 bg-white text-blue-700 rounded-xl font-bold hover:bg-blue-50 transition">
            Contactar Ahora
          </Link>
        </div>

      </div>
    </div>
  );
}
