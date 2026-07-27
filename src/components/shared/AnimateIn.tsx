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

    let observer: IntersectionObserver;

    const timer = setTimeout(() => {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.style.transitionDelay = `${delay}ms`;
            el.classList.add('is-visible');
          } else {
            el.style.transitionDelay = '0ms';
            el.classList.remove('is-visible');
          }
        },
        { threshold }
      );
      observer.observe(el);
    }, 80);

    return () => {
      clearTimeout(timer);
      observer?.disconnect();
    };
  }, [threshold]);

  return (
    <div ref={ref} className={`${cls} ${className}`}>
      {children}
    </div>
  );
}
