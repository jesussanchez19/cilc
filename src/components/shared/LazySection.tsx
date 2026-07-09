'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';

interface LazySectionProps {
  children: ReactNode;
  className?: string;
  // Qué tan antes del viewport se activa (default: 100px antes de entrar)
  rootMargin?: string;
  // Animación de entrada: fade (solo opacidad) o slide (sube + opacidad)
  animation?: 'fade' | 'slide';
}

/**
 * LazySection — envuelve cualquier sección below the fold.
 * El contenido es invisible y no ocupa recursos de render hasta
 * que el usuario hace scroll y el elemento entra al viewport.
 *
 * Uso:
 *   <LazySection animation="slide">
 *     <MiSeccion />
 *   </LazySection>
 */
export default function LazySection({
  children,
  className = '',
  rootMargin = '100px',
  animation = 'slide',
}: LazySectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Si ya está en viewport al montar (above the fold) lo mostramos de inmediato
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect(); // Solo se activa una vez
        }
      },
      { rootMargin, threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  const baseStyle: React.CSSProperties = {
    transition: 'opacity 0.6s ease, transform 0.6s ease',
  };

  const hiddenStyle: React.CSSProperties =
    animation === 'slide'
      ? { opacity: 0, transform: 'translateY(32px)' }
      : { opacity: 0 };

  const visibleStyle: React.CSSProperties = {
    opacity: 1,
    transform: 'translateY(0)',
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{ ...baseStyle, ...(visible ? visibleStyle : hiddenStyle) }}
    >
      {children}
    </div>
  );
}
