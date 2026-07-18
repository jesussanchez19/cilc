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
  threshold = 0.12,
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

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={`${cls} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
