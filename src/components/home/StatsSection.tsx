'use client';

import { useEffect, useRef, useState } from 'react';
import { programs } from '@/lib/data/programs';
import { countries } from '@/lib/data/countries';

const STATS = [
  { value: 23,               suffix: '+', label: 'Años de experiencia',   desc: 'Abriendo puertas al mundo desde 2001' },
  { value: programs.length,  suffix: '',  label: 'Programas disponibles', desc: 'Diseñados para cada etapa de tu vida' },
  { value: countries.length, suffix: '',  label: 'Destinos en el mundo',  desc: 'Canadá, USA, Inglaterra, Irlanda y más' },
];

function StarsFill({ value }: { value: number }) {
  return (
    <div className="flex justify-center gap-1 mb-2">
      {[1, 2, 3, 4, 5].map((s) => {
        const fill = Math.min(1, Math.max(0, value - (s - 1)));
        const pct = Math.round(fill * 100);
        const gradId = `sg-${s}`;
        return (
          <svg key={s} className="w-8 h-8" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="0">
                <stop offset={`${pct}%`} stopColor="#f59e0b" />
                <stop offset={`${pct}%`} stopColor="#e2e8f0" />
              </linearGradient>
            </defs>
            <path
              fill={`url(#${gradId})`}
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            />
          </svg>
        );
      })}
    </div>
  );
}

interface StatsSectionProps {
  promedioCalificacion?: number;
}

export default function StatsSection({ promedioCalificacion }: StatsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [counts, setCounts] = useState(STATS.map(() => 0));
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated) {
          setAnimated(true);
          observer.disconnect();

          const targets = STATS.map((s) => s.value);
          const duration = 1600;
          const startTime = performance.now();
          let rafId: number;

          function tick(now: number) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCounts(targets.map((t) => Math.round(eased * t)));
            if (progress < 1) rafId = requestAnimationFrame(tick);
          }

          rafId = requestAnimationFrame(tick);
          return () => cancelAnimationFrame(rafId);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [animated]);

  const cols = promedioCalificacion !== undefined
    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
    : 'grid-cols-1 md:grid-cols-3';

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div
          className={`grid ${cols} gap-px rounded-2xl overflow-hidden`}
          style={{ background: 'rgba(15,23,42,0.07)' }}
        >
          {STATS.map(({ suffix, label, desc }, i) => (
            <div
              key={label}
              className="bg-white px-10 py-12 text-center relative group hover:bg-blue-50/40 transition-colors duration-300"
            >
              <div
                className="text-6xl font-extrabold mb-2 gradient-text"
                style={{ letterSpacing: '-0.04em', lineHeight: '1' }}
              >
                {counts[i]}{suffix}
              </div>
              <p className="text-slate-900 text-base font-bold mb-1">{label}</p>
              <p className="text-slate-400 text-sm">{desc}</p>
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-0 group-hover:w-12 transition-all duration-300 rounded-full"
                style={{ background: 'linear-gradient(90deg, #1B67E8, #E31E24)' }}
              />
            </div>
          ))}

          {promedioCalificacion !== undefined && (
            <div className="bg-white px-10 py-12 text-center relative group hover:bg-blue-50/40 transition-colors duration-300">
              <StarsFill value={promedioCalificacion} />
              <div className="gradient-text font-extrabold text-2xl mb-2" style={{ letterSpacing: '-0.02em' }}>
                {promedioCalificacion.toFixed(1)} / 5
              </div>
              <p className="text-slate-900 text-base font-bold mb-1">Satisfacción de estudiantes</p>
              <p className="text-slate-400 text-sm">Calificación promedio de nuestros egresados</p>
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-0 group-hover:w-12 transition-all duration-300 rounded-full"
                style={{ background: 'linear-gradient(90deg, #f59e0b, #E31E24)' }}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
