'use client';

import { usePathname } from 'next/navigation';

/**
 * Botón para relanzar el tutorial del Studio.
 *
 * Se comunica con StudioTour mediante un evento del navegador en lugar de
 * estado compartido: los dos son componentes sueltos del layout raíz, sin
 * relación de padre e hijo, y un contexto solo para esto sería más maquinaria
 * de la necesaria.
 */
export default function StudioTourButton() {
  const pathname = usePathname();

  const enStudio =
    pathname.startsWith('/studio') &&
    pathname !== '/studio/login' &&
    pathname !== '/studio/reset';

  if (!enStudio) return null;

  return (
    <button
      onClick={() => window.dispatchEvent(new Event('cilc:abrir-tutorial'))}
      title="Ver de nuevo el tutorial del panel"
      style={{
        position: 'fixed',
        // Justo encima del botón de salir, que está en bottom: 24.
        bottom: 76,
        left: 24,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '10px 16px',
        borderRadius: 12,
        border: '1px solid rgba(255,255,255,0.12)',
        background: 'rgba(15,23,42,0.85)',
        backdropFilter: 'blur(12px)',
        color: '#e2e8f0',
        fontSize: 13,
        fontWeight: 600,
        cursor: 'pointer',
        boxShadow: '0 4px 20px rgba(0,0,0,0.35)',
      }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
      </svg>
      Ver tutorial
    </button>
  );
}
