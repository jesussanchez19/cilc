'use client';

import { useEffect, useRef, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  animation?: 'up' | 'blur' | 'scale' | 'left' | 'right';
  delay?: number;
  threshold?: number;
}

export default function AnimateIn({
  children,
  className = '',
  animation = 'up',
  delay = 0,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const cls = {
    up: 'reveal',
    blur: 'reveal-blur',
    scale: 'reveal-scale',
    left: 'reveal-left',
    right: 'reveal-right',
  }[animation];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Dos observers con márgenes distintos, a propósito:
    //
    // 1) Revelar — el elemento debe entrar 60px en el viewport. Con un margen
    //    positivo la animación arrancaba fuera de pantalla y ya había
    //    terminado cuando la tarjeta llegaba a la vista.
    const reveal = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.style.transitionDelay = `${delay}ms`;
        el.classList.add('is-visible');
      },
      { threshold: 0, rootMargin: '0px 0px -60px 0px' }
    );

    // 2) Re-ocultar — solo cuando está a 200px fuera del viewport, para que al
    //    volver a subir la animación se repita. El margen amplio evita que el
    //    elemento se desvanezca a la vista al rozar el borde de la pantalla.
    const rehide = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) return;
        el.style.transitionDelay = '0ms';
        el.classList.remove('is-visible');
      },
      { threshold: 0, rootMargin: '200px' }
    );

    reveal.observe(el);
    rehide.observe(el);

    return () => {
      reveal.disconnect();
      rehide.disconnect();
    };
  }, [delay]);

  return (
    <div ref={ref} className={`${cls} ${className}`}>
      {children}
    </div>
  );
}
