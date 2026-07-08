'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

export interface Testimonial {
  nombre: string;
  pais: string;
  bandera: string;
  programa: string;
  texto: string;
  foto: string;        // ruta en /public/images/testimonios/<nombre>.png
}

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
  autoPlayMs?: number; // default 4500ms
}

export default function TestimonialsCarousel({
  testimonials,
  autoPlayMs = 4500,
}: TestimonialsCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const total = testimonials.length;

  // Detectar prefers-reduced-motion (Actividad 1.5)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = () => setReducedMotion(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + total) % total), [total]);

  // Auto-play — se pausa en hover y con prefers-reduced-motion
  useEffect(() => {
    if (paused || reducedMotion) return;
    const id = setInterval(next, autoPlayMs);
    return () => clearInterval(id);
  }, [paused, reducedMotion, next, autoPlayMs]);

  // Swipe touch (móvil)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) delta < 0 ? next() : prev();
    touchStartX.current = null;
  };

  const t = testimonials[current];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Encabezado */}
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold uppercase tracking-widest rounded-full mb-4">
            Testimonios
          </span>
          <h2 className="text-4xl font-extrabold text-gray-900">Lo que dicen nuestros estudiantes</h2>
        </div>

        {/* Carrusel */}
        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          aria-roledescription="carrusel"
          aria-label="Testimonios de estudiantes"
        >
          {/* Tarjeta activa */}
          <div
            key={current}
            className={`bg-white rounded-2xl shadow-md p-8 md:p-12 text-center ${
              reducedMotion ? '' : 'animate-fade-in'
            }`}
          >
            {/* Foto */}
            <div
              className="w-20 h-20 rounded-full bg-cover bg-center mx-auto mb-5 ring-4 ring-blue-100"
              style={{ backgroundImage: `url('${t.foto}')` }}
              role="img"
              aria-label={`Foto de ${t.nombre}`}
            />

            {/* Estrellas */}
            <div className="flex justify-center gap-1 text-yellow-400 text-xl mb-4" aria-label="5 estrellas">
              {'★★★★★'}
            </div>

            {/* Texto */}
            <blockquote className="text-gray-700 text-lg leading-relaxed mb-6 italic max-w-2xl mx-auto">
              "{t.texto}"
            </blockquote>

            {/* Info */}
            <p className="font-bold text-gray-900 text-base">{t.nombre}</p>
            <p className="text-sm text-blue-600 font-medium mt-0.5">
              {t.bandera} {t.pais} · {t.programa}
            </p>
          </div>

          {/* Flechas */}
          <button
            onClick={prev}
            aria-label="Testimonio anterior"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-8 w-10 h-10 rounded-full bg-white shadow-md border border-gray-200 hover:bg-gray-50 flex items-center justify-center transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            aria-label="Siguiente testimonio"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-8 w-10 h-10 rounded-full bg-white shadow-md border border-gray-200 hover:bg-gray-50 flex items-center justify-center transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8" role="tablist" aria-label="Seleccionar testimonio">
          {testimonials.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === current}
              aria-label={`Ir al testimonio ${i + 1}`}
              onClick={() => setCurrent(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i === current ? 'bg-blue-600 w-6' : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Indicador de pausa por reduced-motion */}
        {reducedMotion && (
          <p className="text-center text-xs text-gray-400 mt-3">
            Auto-play desactivado (preferencia de movimiento reducido)
          </p>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
