'use client';

import { useSyncExternalStore } from 'react';

const CONSULTA = '(prefers-reduced-motion: reduce)';

function suscribir(alCambiar: () => void): () => void {
  const mq = window.matchMedia(CONSULTA);
  mq.addEventListener('change', alCambiar);
  return () => mq.removeEventListener('change', alCambiar);
}

const leerDelNavegador = () => window.matchMedia(CONSULTA).matches;

/**
 * ¿El usuario pidió al sistema que se reduzcan las animaciones?
 *
 * Antes esto era un `useEffect` que leía `matchMedia` y hacía `setState` en el
 * cuerpo del efecto, que es lo que marcaba `react-hooks/set-state-in-effect`:
 * el componente se pintaba una vez con el valor equivocado y volvía a pintarse
 * de inmediato con el bueno. En quien tiene las animaciones reducidas, eso
 * significaba ver arrancar el carrusel un instante antes de detenerse.
 *
 * `useSyncExternalStore` es la forma prevista para leer algo de fuera de React:
 * entrega el valor correcto ya en el primer render y se resuscribe solo.
 *
 * El tercer argumento es el valor durante el renderizado en servidor, donde no
 * existe `window`. Se devuelve `false` —sin reducir— porque es lo que asume el
 * CSS del sitio; si acertáramos al revés, el HTML llegaría sin animación y
 * saltaría al hidratar.
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(suscribir, leerDelNavegador, () => false);
}
