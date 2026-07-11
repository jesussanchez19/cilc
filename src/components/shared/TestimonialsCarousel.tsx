'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

export interface Testimonial {
  nombre: string;
  pais: string;
  bandera: string;
  programa: string;
  texto: string;
  foto: string;
  videoUrl?: string;
}

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
  autoPlayMs?: number;
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

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = () => setReducedMotion(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + total) % total), [total]);

  useEffect(() => {
    if (paused || reducedMotion) return;
    const id = setInterval(next, autoPlayMs);
    return () => clearInterval(id);
  }, [paused, reducedMotion, next, autoPlayMs]);

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
    <section className="py-24" style={{ background: 'var(--dark)', position: 'relative', overflow: 'hidden' }}>

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 100%, rgba(99,102,241,0.12) 0%, transparent 70%)' }} />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="badge badge-dark mb-5">Testimonios</span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white"
            style={{ letterSpacing: '-0.03em', lineHeight: '1.08' }}>
            Lo que dicen{' '}
            <span className="gradient-text-light">nuestros estudiantes</span>
          </h2>
        </div>

        {/* Carousel */}
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          aria-roledescription="carrusel"
          aria-label="Testimonios de estudiantes"
          className="relative"
        >
          <div
            key={current}
            className={`rounded-2xl p-8 md:p-12 text-center ${reducedMotion ? '' : 'animate-fade-in'}`}
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(12px)',
            }}
          >
            {/* Avatar */}
            <div
              className="w-20 h-20 rounded-full bg-cover bg-center mx-auto mb-6"
              style={{
                backgroundImage: `url('${t.foto}')`,
                boxShadow: '0 0 0 3px rgba(255,255,255,0.1), 0 0 0 6px rgba(99,102,241,0.2)',
              }}
              role="img"
              aria-label={`Foto de ${t.nombre}`}
            />

            {/* Stars */}
            <div className="flex justify-center gap-1 mb-5" aria-label="5 estrellas">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            {/* Quote */}
            <blockquote className="text-slate-300 text-lg leading-relaxed mb-7 italic max-w-xl mx-auto">
              &ldquo;{t.texto}&rdquo;
            </blockquote>

            {/* Info */}
            <p className="font-bold text-white text-base">{t.nombre}</p>
            <p className="text-sm text-blue-400 font-medium mt-1">
              {t.bandera} {t.pais} &middot; {t.programa}
            </p>

            {/* Video link */}
            {t.videoUrl && (
              <a
                href={t.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-5 px-4 py-2 rounded-full text-sm font-semibold text-white transition-all duration-200 hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)', boxShadow: '0 4px 16px rgba(239,68,68,0.35)' }}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                Ver video
              </a>
            )}
          </div>

          {/* Arrow buttons */}
          <button
            onClick={prev}
            aria-label="Testimonio anterior"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 md:-translate-x-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            aria-label="Siguiente testimonio"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 md:translate-x-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: i === current ? '24px' : '6px',
                background: i === current ? 'linear-gradient(90deg,#3b82f6,#6366f1)' : 'rgba(255,255,255,0.2)',
              }}
            />
          ))}
        </div>

        {reducedMotion && (
          <p className="text-center text-xs text-slate-500 mt-4">
            Auto-play desactivado (preferencia de movimiento reducido)
          </p>
        )}
      </div>
    </section>
  );
}
