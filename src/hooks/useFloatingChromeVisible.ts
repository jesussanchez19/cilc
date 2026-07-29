'use client';

import { useEffect, useState } from 'react';

// Histéresis: aparecen al pasar SHOW_AT y no vuelven a ocultarse hasta bajar de
// HIDE_AT. Sin esa banda muerta, quedarse justo en el umbral hace parpadear los
// botones — en móvil lo provoca la propia barra de URL al entrar y salir.
const SHOW_AT = 160;
const HIDE_AT = 100;

/**
 * Visibilidad compartida de los botones flotantes (WhatsApp y menú hamburguesa).
 *
 * Aparecen tras scrollear un poco y se ocultan al llegar al footer, para no
 * taparlo. Ambos usan este hook para no quedar desincronizados entre sí.
 */
export function useFloatingChromeVisible(): boolean {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let pastThreshold = window.scrollY > SHOW_AT;
    let atFooter = false;
    let frame = 0;

    const apply = () => setVisible(pastThreshold && !atFooter);

    const onScroll = () => {
      if (frame) return; // throttle con rAF: como mucho un cálculo por frame
      frame = requestAnimationFrame(() => {
        frame = 0;
        const y = window.scrollY;
        if (y > SHOW_AT) pastThreshold = true;
        else if (y < HIDE_AT) pastThreshold = false;
        apply();
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    // El footer vive en el layout raíz, así que existe desde la hidratación y
    // sobrevive a los cambios de ruta.
    const footer = document.querySelector('footer');
    const observer = footer
      ? new IntersectionObserver(
          ([entry]) => {
            atFooter = entry.isIntersecting;
            apply();
          },
          { threshold: 0 }
        )
      : undefined;
    if (footer && observer) observer.observe(footer);

    apply();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, []);

  return visible;
}
