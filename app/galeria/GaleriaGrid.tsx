'use client';

import { useState, useMemo, useEffect } from 'react';

export interface FotoGaleria {
  id: string;
  src: string;
  srcFull: string;
  nombre: string;
  programa: string;
  pais: string;
}

const TODOS = 'Todos';

export default function GaleriaGrid({ fotos }: { fotos: FotoGaleria[] }) {
  const programas = useMemo(
    () => [TODOS, ...Array.from(new Set(fotos.map((f) => f.programa).filter(Boolean)))],
    [fotos],
  );

  const [filtro, setFiltro]         = useState(TODOS);
  const [lightbox, setLightbox]     = useState<number | null>(null);
  const [gridVisible, setGridVisible] = useState(false);

  const fotosFiltradas = useMemo(
    () => filtro === TODOS ? fotos : fotos.filter((f) => f.programa === filtro),
    [filtro, fotos],
  );

  useEffect(() => {
    setGridVisible(false);
    const t = setTimeout(() => setGridVisible(true), 40);
    return () => clearTimeout(t);
  }, [fotosFiltradas]);

  useEffect(() => {
    setGridVisible(true);
  }, []);

  const goNext = () => setLightbox((i) => i !== null ? (i + 1) % fotosFiltradas.length : null);
  const goPrev = () => setLightbox((i) => i !== null ? (i - 1 + fotosFiltradas.length) % fotosFiltradas.length : null);

  if (fotos.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="rounded-2xl py-20 px-8 bg-white" style={{ border: '1px solid rgba(15,23,42,0.07)' }}>
          <p className="text-4xl mb-4">📷</p>
          <p className="text-slate-700 font-semibold mb-1">Aún no hay fotos en la galería</p>
          <p className="text-slate-400 text-sm">Las fotos de testimonios aprobados aparecerán aquí.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      {/* Filtros por programa */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        {programas.map((p) => (
          <button
            key={p}
            onClick={() => setFiltro(p)}
            className="px-4 py-1.5 rounded-full text-sm font-semibold border transition-all duration-200 cursor-pointer"
            style={filtro === p
              ? { background: '#1B67E8', borderColor: '#1B67E8', color: '#fff', boxShadow: '0 4px 16px rgba(27,103,232,0.30)' }
              : { background: '#fff', borderColor: 'rgba(15,23,42,0.12)', color: '#64748b' }
            }
          >
            {p}
          </button>
        ))}
        <span className="ml-auto text-sm font-medium text-slate-400">
          {fotosFiltradas.length} foto{fotosFiltradas.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Grid */}
      {fotosFiltradas.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {fotosFiltradas.map((foto, idx) => (
            <button
              key={foto.id}
              onClick={() => setLightbox(idx)}
              className={`group relative overflow-hidden rounded-2xl bg-slate-200 focus:outline-none focus-visible:ring-2 reveal-scale ${gridVisible ? 'is-visible' : ''}`}
              style={{ transitionDelay: `${Math.min(idx, 10) * 50}ms`, aspectRatio: '1' }}
              aria-label={`Ver foto de ${foto.nombre}`}
            >
              {/* Imagen */}
              <div
                className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500 ease-out"
                style={{ backgroundImage: `url('${foto.src}')` }}
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 50%)' }} />
              {/* Programa pill */}
              {foto.programa && (
                <div className="absolute top-2.5 left-2.5">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold text-white"
                    style={{ background: 'rgba(27,103,232,0.75)', backdropFilter: 'blur(6px)' }}>
                    {foto.programa}
                  </span>
                </div>
              )}
              {/* Info en hover */}
              <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <p className="text-white text-xs font-semibold leading-snug">{foto.nombre}</p>
                {foto.pais && <p className="text-white/60 text-[10px] mt-0.5">{foto.pais}</p>}
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="py-24 text-center rounded-2xl bg-white" style={{ border: '1px solid rgba(15,23,42,0.07)' }}>
          <p className="text-slate-700 font-semibold mb-1">Sin fotos para este programa</p>
          <p className="text-slate-400 text-sm">Prueba seleccionando otro filtro.</p>
        </div>
      )}

      {/* Lightbox */}
      {lightbox !== null && (
        <Lightbox
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

function Lightbox({
  fotos, index, onClose, onNext, onPrev, onGo,
}: {
  fotos: FotoGaleria[];
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
      style={{ background: 'rgba(0,0,0,0.93)', backdropFilter: 'blur(10px)' }}
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full mx-4 flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={foto.srcFull}
          alt={`Foto de ${foto.nombre}`}
          className="max-h-[72vh] max-w-full object-contain rounded-2xl"
          style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.6)' }}
        />
        <div className="text-center mt-4">
          <p className="text-white font-semibold text-sm">{foto.nombre}</p>
          <p className="text-white/50 text-xs mt-0.5">
            {[foto.programa, foto.pais].filter(Boolean).join(' · ')}
          </p>
          <p className="text-white/30 text-xs mt-1">{index + 1} / {fotos.length}</p>
        </div>

        {/* Dots */}
        {fotos.length <= 20 && (
          <div className="flex gap-1.5 mt-3">
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
        )}
      </div>

      {/* Cerrar */}
      <button onClick={onClose} aria-label="Cerrar"
        className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
        style={{ background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.15)' }}>
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Prev */}
      <button onClick={(e) => { e.stopPropagation(); onPrev(); }} aria-label="Foto anterior"
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
        style={{ background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.15)' }}>
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Next */}
      <button onClick={(e) => { e.stopPropagation(); onNext(); }} aria-label="Siguiente foto"
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
        style={{ background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.15)' }}>
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
