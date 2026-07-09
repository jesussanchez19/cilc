'use client';

import { useState, useMemo } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
//  FOTOS DE LA GALERÍA
//  Coloca las imágenes en: public/images/galeria/<nombre>.jpg
//  Agrega o edita las entradas del array para agregar fotos reales.
// ─────────────────────────────────────────────────────────────────────────────
const FOTOS = [
  { id: 1,  src: '/images/galeria/canada-01.jpg',   alt: 'Estudiante mexicana en Universidad de Toronto, Canadá',     destino: 'Canadá',        categoria: 'Idiomas'           },
  { id: 2,  src: '/images/galeria/canada-02.jpg',   alt: 'Grupo de estudiantes en Vancouver con certificado de idiomas', destino: 'Canadá',        categoria: 'Idiomas'           },
  { id: 3,  src: '/images/galeria/canada-03.jpg',   alt: 'Estudiante durante programa Work and Study en Montreal',    destino: 'Canadá',        categoria: 'Estudia y Trabaja'  },
  { id: 4,  src: '/images/galeria/irlanda-01.jpg',  alt: 'Estudiante en Dublín al terminar su curso de inglés',       destino: 'Irlanda',       categoria: 'Idiomas'           },
  { id: 5,  src: '/images/galeria/irlanda-02.jpg',  alt: 'Grupo CILC en escuela de idiomas en Cork, Irlanda',         destino: 'Irlanda',       categoria: 'Idiomas'           },
  { id: 6,  src: '/images/galeria/uk-01.jpg',       alt: 'Estudiante en Londres con certificado Cambridge',            destino: 'Reino Unido',   categoria: 'Idiomas'           },
  { id: 7,  src: '/images/galeria/uk-02.jpg',       alt: 'Año académico en colegio de Brighton, Reino Unido',          destino: 'Reino Unido',   categoria: 'Años Académicos'   },
  { id: 8,  src: '/images/galeria/australia-01.jpg',alt: 'Estudiante en Sydney durante programa Work and Holiday',     destino: 'Australia',     categoria: 'Estudia y Trabaja'  },
  { id: 9,  src: '/images/galeria/australia-02.jpg',alt: 'Grupo de jóvenes en Melbourne durante curso de inglés',      destino: 'Australia',     categoria: 'Idiomas'           },
  { id: 10, src: '/images/galeria/usa-01.jpg',      alt: 'Estudiante en campus de universidad en Nueva York, EUA',     destino: 'Estados Unidos',categoria: 'Años Académicos'   },
  { id: 11, src: '/images/galeria/france-01.jpg',   alt: 'Au Pair mexicana con familia anfitriona en París, Francia',  destino: 'Francia',       categoria: 'Au Pair'           },
  { id: 12, src: '/images/galeria/germany-01.jpg',  alt: 'Estudiante en curso de alemán en Berlín, Alemania',          destino: 'Alemania',      categoria: 'Idiomas'           },
];

const TODOS = 'Todos';
const destinos = [TODOS, ...Array.from(new Set(FOTOS.map((f) => f.destino)))];

export default function GaleriaPage() {
  const [filtro, setFiltro] = useState(TODOS);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const fotosFiltradas = useMemo(
    () => filtro === TODOS ? FOTOS : FOTOS.filter((f) => f.destino === filtro),
    [filtro]
  );

  // Navegación en el lightbox
  const goNext = () => setLightbox((i) => i !== null ? (i + 1) % fotosFiltradas.length : null);
  const goPrev = () => setLightbox((i) => i !== null ? (i - 1 + fotosFiltradas.length) % fotosFiltradas.length : null);

  // Cerrar con Escape / flechas
  if (typeof window !== 'undefined') {
    // Usamos el evento del lightbox si está abierto — ver useEffect en componente real
  }

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* ── Encabezado ── */}
      <div className="bg-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-3 py-1 bg-white/20 text-white text-xs font-semibold uppercase tracking-widest rounded-full mb-4">
            Nuestros Estudiantes
          </span>
          <h1 className="text-4xl font-extrabold mb-3">Galería de Experiencias</h1>
          <p className="text-blue-100 text-lg max-w-xl mx-auto">
            Conoce las historias reales de estudiantes mexicanos que transformaron su futuro con CILC.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* ── Filtros por destino ── */}
        <div className="flex flex-wrap gap-2 mb-8">
          {destinos.map((d) => (
            <button
              key={d}
              onClick={() => setFiltro(d)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                filtro === d
                  ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                  : 'bg-white border-gray-300 text-gray-600 hover:border-blue-400 hover:text-blue-600'
              }`}
            >
              {d}
            </button>
          ))}
          <span className="ml-auto text-sm text-gray-400 self-center">
            {fotosFiltradas.length} foto{fotosFiltradas.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* ── Grid — 2 columnas en móvil, 3 en desktop ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {fotosFiltradas.map((foto, idx) => (
            <button
              key={foto.id}
              onClick={() => setLightbox(idx)}
              className="group relative overflow-hidden rounded-xl bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              aria-label={`Ver foto: ${foto.alt}`}
            >
              <div
                className="w-full aspect-square bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                style={{ backgroundImage: `url('${foto.src}')` }}
                role="img"
                aria-label={foto.alt}
              />
              {/* Overlay con destino */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-end">
                <span className="text-white text-xs font-medium px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {foto.destino} · {foto.categoria}
                </span>
              </div>
            </button>
          ))}
        </div>

        {fotosFiltradas.length === 0 && (
          <p className="text-center text-gray-400 py-20">No hay fotos para este destino aún.</p>
        )}
      </div>

      {/* ── LIGHTBOX ── */}
      {lightbox !== null && (
        <GaleriaLightbox
          fotos={fotosFiltradas}
          index={lightbox}
          onClose={() => setLightbox(null)}
          onNext={goNext}
          onPrev={goPrev}
          onGo={(i) => setLightbox(i)}
        />
      )}
    </div>
  );
}

// ── Lightbox separado para manejar useEffect limpiamente ─────────────────────
function GaleriaLightbox({
  fotos, index, onClose, onNext, onPrev, onGo,
}: {
  fotos: typeof FOTOS;
  index: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  onGo: (i: number) => void;
}) {
  const foto = fotos[index];

  // Teclado
  useState(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape')      onClose();
      if (e.key === 'ArrowRight')  onNext();
      if (e.key === 'ArrowLeft')   onPrev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  });

  // Bloquear scroll
  useState(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  });

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
      onClick={onClose}
    >
      <div className="relative max-w-4xl w-full mx-4 flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
        <img
          src={foto.src}
          alt={foto.alt}
          className="max-h-[75vh] max-w-full object-contain rounded-xl shadow-2xl"
        />
        <p className="text-white/80 text-sm mt-3 text-center">{foto.alt}</p>
        <p className="text-white/50 text-xs mt-1">{foto.destino} · {foto.categoria}</p>
        <p className="text-white/40 text-xs mt-1">{index + 1} / {fotos.length}</p>

        {/* Dots */}
        <div className="flex gap-2 mt-4">
          {fotos.map((_, i) => (
            <button key={i} onClick={() => onGo(i)}
              className={`w-2 h-2 rounded-full transition-all ${i === index ? 'bg-white w-5' : 'bg-white/40'}`}
            />
          ))}
        </div>
      </div>

      {/* Cerrar */}
      <button onClick={onClose} aria-label="Cerrar" className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Flechas */}
      <button onClick={(e) => { e.stopPropagation(); onPrev(); }} aria-label="Foto anterior"
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button onClick={(e) => { e.stopPropagation(); onNext(); }} aria-label="Siguiente foto"
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
