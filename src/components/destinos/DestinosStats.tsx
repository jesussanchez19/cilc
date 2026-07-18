'use client';

import { useEffect, useRef, useState } from 'react';
import { countries } from '@/lib/data/countries';

const STATS = [
  { target: countries.length, suffix: '',  label: 'países' },
  { target: 500,              suffix: '+', label: 'estudiantes/año' },
  { target: 23,               suffix: '+', label: 'años de exp.' },
];

export default function DestinosStats() {
  const ref = useRef<HTMLDivElement>(null);
  const [counts, setCounts] = useState(STATS.map(() => 0));
  const [visible, setVisible] = useState(false);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let observer: IntersectionObserver;
    const timer = setTimeout(() => {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();

            if (!animated.current) {
              animated.current = true;
              const targets = STATS.map((s) => s.target);
              const duration = 1400;
              const start = performance.now();

              function tick(now: number) {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                setCounts(targets.map((t) => Math.round(eased * t)));
                if (progress < 1) requestAnimationFrame(tick);
              }
              requestAnimationFrame(tick);
            }
          }
        },
        { threshold: 0.4 }
      );
      observer.observe(el);
    }, 80);

    return () => { clearTimeout(timer); observer?.disconnect(); };
  }, []);

  return (
    <div ref={ref} className="flex items-center justify-center gap-8 mt-10">
      {STATS.map(({ suffix, label }, i) => (
        <div key={label} className="flex items-center gap-8">
          {i > 0 && <div className="w-px h-8 bg-white/10" />}
          <div
            className={`text-center reveal ${visible ? 'is-visible' : ''}`}
            style={{ transitionDelay: `${i * 140}ms` }}
          >
            <p className="text-2xl font-extrabold text-white tracking-tight tabular-nums">
              {counts[i]}{suffix}
            </p>
            <p className="text-[11px] text-slate-500 uppercase tracking-wider mt-0.5">{label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
