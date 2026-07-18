'use client';

import { useState, useMemo, useEffect } from 'react';

const FOTOS = [
  { id: 1,  src: '/images/galeria/canada-01.jpg',    alt: 'Estudiante mexicana en Universidad de Toronto, Canadá',        destino: 'Canadá',         categoria: 'Idiomas'            },
  { id: 2,  src: '/images/galeria/canada-02.jpg',    alt: 'Grupo de estudiantes en Vancouver con certificado de idiomas',  destino: 'Canadá',         categoria: 'Idiomas'            },
  { id: 3,  src: '/images/galeria/canada-03.jpg',    alt: 'Estudiante durante programa Work and Study en Montreal',        destino: 'Canadá',         categoria: 'Estudia y Trabaja'  },
  { id: 4,  src: '/images/galeria/irlanda-01.jpg',   alt: 'Estudiante en Dublín al terminar su curso de inglés',          destino: 'Irlanda',        categoria: 'Idiomas'            },
  { id: 5,  src: '/images/galeria/irlanda-02.jpg',   alt: 'Grupo CILC en escuela de idiomas en Cork, Irlanda',            destino: 'Irlanda',        categoria: 'Idiomas'            },
  { id: 6,  src: '/images/galeria/uk-01.jpg',        alt: 'Estudiante en Londres con certificado Cambridge',               destino: 'Reino Unido',    categoria: 'Idiomas'            },
  { id: 7,  src: '/images/galeria/uk-02.jpg',        alt: 'Año académico en colegio de Brighton, Reino Unido',             destino: 'Reino Unido',    categoria: 'Años Académicos'    },
  { id: 8,  src: '/images/galeria/australia-01.jpg', alt: 'Estudiante en Sydney durante programa Work and Holiday',        destino: 'Australia',      categoria: 'Estudia y Trabaja'  },
  { id: 9,  src: '/images/galeria/australia-02.jpg', alt: 'Grupo de jóvenes en Melbourne durante curso de inglés',         destino: 'Australia',      categoria: 'Idiomas'            },
  { id: 10, src: '/images/galeria/usa-01.jpg',       alt: 'Estudiante en campus de universidad en Nueva York, EUA',        destino: 'Estados Unidos', categoria: 'Años Académicos'    },
  { id: 11, src: '/images/galeria/france-01.jpg',    alt: 'Au Pair mexicana con familia anfitriona en París, Francia',     destino: 'Francia',        categoria: 'Au Pair'            },
  { id: 12, src: '/images/galeria/germany-01.jpg',   alt: 'Estudiante en curso de alemán en Berlín, Alemania',             destino: 'Alemania',       categoria: 'Idiomas'            },
];

const TODOS = 'Todos';
const destinos = [TODOS, ...Array.from(new Set(FOTOS.map((f) => f.destino)))];

export default function GaleriaPage() {
  const [filtro, setFiltro]       = useState(TODOS);
  const [lightbox, setLightbox]   = useState<number | null>(null);
  const [gridVisible, setGridVisible] = useState(false);

  const fotosFiltradas = useMemo(
    () => filtro === TODOS ? FOTOS : FOTOS.filter((f) => f.destino === filtro),
    [filtro]
  );

  // Re-trigger stagger when filter changes
  useEffect(() => {
    setGridVisible(false);
    const t = setTimeout(() => setGridVisible(true), 40);
    return () => clearTimeout(t);
  }, [fotosFiltradas]);

  const goNext = () => setLightbox((i) => i !== null ? (i + 1) % fotosFiltradas.length : null);
  const goPrev = () => setLightbox((i) => i !== null ? (i - 1 + fotosFiltradas.length) % fotosFiltradas.length : null);

  return (
    <div style={{ background: 'var(--surface-2)', minHeight: '100vh' }}>

      {/* ── Hero ── */}
      <section className="relative py-24 overflow-hidden" style={{ background: 'var(--dark)' }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 55% 60% at 30% 50%, rgba(27,103,232,0.18) 0%, transparent 65%)' }} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 50% 60% at 75% 50%, rgba(227,30,36,0.13) 0%, transparent 65%)' }} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="badge badge-dark mb-5">Nuestros Estudiantes</span>
          <h1 className="text-5xl sm:text-6xl font-extrabold text-white mb-5"
            style={{ letterSpacing: '-0.04em', lineHeight: '1.04' }}>
            Galería de<br />
            <span className="gradient-text-light">Experiencias</span>
          </h1>
          <p className="text-slate-400 text-xl max-w-xl mx-auto leading-relaxed">
            Historias reales de estudiantes mexicanos que transformaron su futuro con CILC.
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(27,103,232,0.5) 30%, rgba(227,30,36,0.5) 70%, transparent)' }} />
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* ── Filtros ── */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {destinos.map((d) => (
            <button
              key={d}
              onClick={() => setFiltro(d)}
              className="px-4 py-1.5 rounded-full text-sm font-semibold border transition-all duration-200 cursor-pointer"
              style={filtro === d
                ? { background: '#1B67E8', borderColor: '#1B67E8', color: '#fff', boxShadow: '0 4px 16px rgba(27,103,232,0.30)' }
                : { background: '#fff', borderColor: 'rgba(15,23,42,0.12)', color: '#64748b' }
              }
            >
              {d}
            </button>
          ))}
          <span className="ml-auto text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
            {fotosFiltradas.length} foto{fotosFiltradas.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* ── Grid ── */}
        {fotosFiltradas.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {fotosFiltradas.map((foto, idx) => (
              <button
                key={foto.id}
                onClick={() => setLightbox(idx)}
                className={`group relative overflow-hidden rounded-2xl bg-slate-200 focus:outline-none focus-visible:ring-2 reveal-scale ${gridVisible ? 'is-visible' : ''}`}
                style={{ transitionDelay: `${Math.min(idx, 8) * 55}ms`, aspectRatio: '1' }}
                aria-label={`Ver foto: ${foto.alt}`}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-108 transition-transform duration-500 ease-out"
                  style={{ backgroundImage: `url('${foto.src}')` }}
                  role="img"
                  aria-label={foto.alt}
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 transition-all duration-400"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.70) 0%, transparent 55%)' }}
                />
                {/* Category pill */}
                <div className="absolute top-2.5 left-2.5">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold text-white"
                    style={{ background: 'rgba(27,103,232,0.75)', backdropFilter: 'blur(6px)' }}>
                    {foto.categoria}
                  </span>
                </div>
                {/* Bottom info revealed on hover */}
                <div className="absolute bottom-0 left-0 right-0 p-3
                  opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0
                  transition-all duration-300">
                  <p className="text-white text-[11px] font-semibold leading-snug line-clamp-2 text-left">
                    {foto.destino}
                  </p>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center rounded-2xl bg-white"
            style={{ border: '1px solid rgba(15,23,42,0.07)' }}>
            <p className="text-slate-700 font-semibold mb-1">Sin fotos para este destino</p>
            <p className="text-slate-400 text-sm">Prueba seleccionando otro filtro.</p>
          </div>
        )}
      </div>

      {/* ── Lightbox ── */}
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

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape')     onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft')  onPrev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, onNext, onPrev]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div className="relative max-w-4xl w-full mx-4 flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}>
        <img
          src={foto.src}
          alt={foto.alt}
          className="max-h-[72vh] max-w-full object-contain rounded-2xl"
          style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.6)' }}
        />
        <p className="text-white/80 text-sm mt-4 text-center leading-snug max-w-lg">{foto.alt}</p>
        <p className="text-white/40 text-xs mt-1">{foto.destino} · {foto.categoria}</p>
        <p className="text-white/30 text-xs mt-1">{index + 1} / {fotos.length}</p>

        {/* Dots */}
        <div className="flex gap-1.5 mt-4">
          {fotos.map((_, i) => (
            <button
              key={i}
              onClick={() => onGo(i)}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: i === index ? '20px' : '6px',
                background: i === index ? '#1B67E8' : 'rgba(255,255,255,0.3)',
              }}
            />
          ))}
        </div>
      </div>

      {/* Cerrar */}
      <button
        onClick={onClose}
        aria-label="Cerrar"
        className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
        style={{ background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.15)' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Flecha izquierda */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="Foto anterior"
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
        style={{ background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.15)' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Flecha derecha */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="Siguiente foto"
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
        style={{ background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.15)' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
