'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/** A partir de cuántos píxeles de scroll aparece. */
const APARECE_DESDE = 400;

/**
 * Botón para volver al principio de la página, en la barra superior.
 *
 * Solo se muestra cuando de verdad sirve para algo: arriba del todo no aparece,
 * porque un botón que no hace nada visible es ruido. Aun así se mantiene
 * montado y solo cambia su opacidad, para que aparecer y desaparecer no
 * reacomode la barra ni desplace la búsqueda que tiene al lado.
 *
 * Respeta `prefers-reduced-motion`: quien pidió menos movimiento salta arriba
 * de golpe en vez de ver el recorrido.
 */
export default function BotonSubir() {
  const [visible, setVisible] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    let frame = 0;
    const alScrollear = () => {
      // Throttle con rAF: como mucho un cálculo por fotograma, igual que hace
      // el hook de los botones flotantes.
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        setVisible(window.scrollY > APARECE_DESDE);
      });
    };

    alScrollear();
    window.addEventListener('scroll', alScrollear, { passive: true });
    return () => {
      window.removeEventListener('scroll', alScrollear);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' })}
      aria-label="Volver arriba"
      title="Volver arriba"
      // Fuera del orden de tabulación mientras no se ve: si no, el teclado
      // llegaría a un botón invisible.
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      /* También en móvil. Al principio se ocultó por debajo de `sm` suponiendo
         que la esquina ya estaba llena con la lupa, pero ahí caben los dos: a
         375 px el botón de "Cotizar gratis" no se muestra, así que sobra
         espacio entre el logo y la búsqueda. */
      className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0
                 transition-all duration-200 hover:brightness-125
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
                 focus-visible:ring-(--blue-600)"
      style={{
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.1)',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        cursor: visible ? 'pointer' : 'default',
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 text-slate-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5m0 0l-6 6m6-6l6 6" />
      </svg>
    </button>
  );
}
