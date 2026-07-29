'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';

interface LazySectionProps {
  children: ReactNode;
  className?: string;
  // Margen del observer. Por defecto la sección debe entrar 80px en el
  // viewport para que la animación se vea; súbelo si prefieres adelantarla.
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
  rootMargin = '0px 0px -80px 0px',
  animation = 'slide',
}: LazySectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  // Siempre false en el primer render: servidor y cliente coinciden (sin
  // mismatch de hidratación) y la animación corre igual en móvil que en desktop.
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVisible(true);
        observer.disconnect();
      },
      { rootMargin, threshold: 0 }
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
      className={`lazy-section ${className}`}
      style={{ ...baseStyle, ...(visible ? visibleStyle : hiddenStyle) }}
    >
      {children}
    </div>
  );
}
