'use client';

import { useState, useEffect, useRef } from 'react';

export interface GalleryPhoto {
  src: string;
  alt: string;       // alt descriptivo real (Actividad 4)
  caption?: string;
}

interface PhotoGalleryProps {
  photos: GalleryPhoto[];
  columns?: 2 | 3 | 4;
}

export default function PhotoGallery({ photos, columns = 3 }: PhotoGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const isOpen = lightboxIndex !== null;
  const total = photos.length;

  // Cerrar con Escape, navegar con ← →
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape')      setLightboxIndex(null);
      if (e.key === 'ArrowRight')  setLightboxIndex((i) => ((i ?? 0) + 1) % total);
      if (e.key === 'ArrowLeft')   setLightboxIndex((i) => ((i ?? 0) - 1 + total) % total);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, total]);

  // Bloquear scroll de body cuando el lightbox está abierto
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Swipe en el lightbox (móvil)
  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd   = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) {
      delta < 0
        ? setLightboxIndex((i) => ((i ?? 0) + 1) % total)
        : setLightboxIndex((i) => ((i ?? 0) - 1 + total) % total);
    }
    touchStartX.current = null;
  };

  const colClass =
    columns === 2 ? 'grid-cols-2' :
    columns === 4 ? 'grid-cols-2 sm:grid-cols-4' :
                    'grid-cols-2 sm:grid-cols-3';

  const current = lightboxIndex !== null ? photos[lightboxIndex] : null;

  return (
    <>
      {/* ── Grid con altura uniforme ── */}
      <div className={`grid ${colClass} gap-3`}>
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            onClick={() => setLightboxIndex(i)}
            className="group relative overflow-hidden rounded-xl bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-label={`Ver foto: ${photo.alt}`}
          >
            {/* Todas las celdas tienen la misma altura con aspect-ratio */}
            <div
              className="w-full aspect-[4/3] bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
              style={{ backgroundImage: `url('${photo.src}')` }}
              role="img"
              aria-label={photo.alt}
            />
            {/* Overlay sutil en hover */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0015.803 15.803zM10.5 7.5v6m3-3h-6" />
              </svg>
            </div>
          </button>
        ))}
      </div>

      {/* ── LIGHTBOX ── */}
      {isOpen && current && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={() => setLightboxIndex(null)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          aria-modal="true"
          role="dialog"
          aria-label={`Imagen: ${current.alt}`}
        >
          {/* Contenedor imagen — detener propagación para no cerrar al hacer clic en la imagen */}
          <div
            className="relative max-w-5xl w-full mx-4 max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={current.src}
              alt={current.alt}
              className="max-h-[80vh] max-w-full object-contain rounded-xl shadow-2xl"
            />
            {current.caption && (
              <p className="text-white/80 text-sm mt-3 text-center px-4">{current.caption}</p>
            )}
            {/* Contador */}
            <p className="text-white/50 text-xs mt-2">
              {(lightboxIndex ?? 0) + 1} / {total}
            </p>
          </div>

          {/* Botón cerrar */}
          <button
            onClick={() => setLightboxIndex(null)}
            aria-label="Cerrar galería"
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Flecha anterior */}
          <button
            onClick={(e) => { e.stopPropagation(); setLightboxIndex((i) => ((i ?? 0) - 1 + total) % total); }}
            aria-label="Foto anterior"
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Flecha siguiente */}
          <button
            onClick={(e) => { e.stopPropagation(); setLightboxIndex((i) => ((i ?? 0) + 1) % total); }}
            aria-label="Siguiente foto"
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots de navegación */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {photos.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setLightboxIndex(i); }}
                aria-label={`Ir a foto ${i + 1}`}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === lightboxIndex ? 'bg-white w-5' : 'bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
