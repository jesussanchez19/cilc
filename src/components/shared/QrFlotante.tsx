'use client';

import { useEffect, useState } from 'react';

/** A qué distancia del final de la página aparece, en píxeles. */
const MARGEN_FINAL = 900;

export interface QrFlotanteProps {
  /** SVG ya generado en el servidor. */
  svg: string;
  url: string;
  texto: string;
}

/**
 * Tarjeta con el código QR que asoma por la derecha al acercarse al final.
 *
 * Solo desde `sm`. En un móvil no tiene sentido enseñar un código para
 * escanearlo con el mismo teléfono que lo está mostrando; ahí el enlace directo
 * de la página de contacto hace el trabajo.
 *
 * Aparece cerca del final a propósito: es donde ya no hay más contenido que
 * leer, y es justo cuando los botones flotantes de WhatsApp y del menú se
 * ocultan al entrar el pie, así que ocupa un hueco en vez de amontonarse.
 */
export default function QrFlotante({ svg, url, texto }: QrFlotanteProps) {
  const [visible, setVisible] = useState(false);
  const [cerrado, setCerrado] = useState(false);

  useEffect(() => {
    if (cerrado) return;

    let frame = 0;
    const alScrollear = () => {
      if (frame) return; // throttle con rAF: un cálculo por fotograma como mucho
      frame = requestAnimationFrame(() => {
        frame = 0;
        const desdeElFinal =
          document.documentElement.scrollHeight - (window.scrollY + window.innerHeight);
        setVisible(desdeElFinal < MARGEN_FINAL);
      });
    };

    alScrollear();
    window.addEventListener('scroll', alScrollear, { passive: true });
    window.addEventListener('resize', alScrollear, { passive: true });
    return () => {
      window.removeEventListener('scroll', alScrollear);
      window.removeEventListener('resize', alScrollear);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [cerrado]);

  // Una vez cerrado desaparece del todo: no vuelve a asomar en esa visita.
  if (cerrado) return null;

  return (
    <div
      className="hidden sm:block fixed right-0 bottom-28 z-40 transition-transform duration-500 ease-out"
      style={{
        // Se desliza fuera por la derecha en vez de desvanecerse: así no queda
        // un rectángulo invisible tapando lo que hay debajo.
        transform: visible ? 'translateX(0)' : 'translateX(105%)',
      }}
      aria-hidden={!visible}
    >
      <div
        className="relative flex items-center gap-3 p-3 pr-4 rounded-l-2xl"
        style={{
          background: '#ffffff',
          boxShadow: '0 12px 40px rgba(0,0,0,0.18)',
          border: '1px solid rgba(15,23,42,0.08)',
          borderRight: 'none',
        }}
      >
        <button
          type="button"
          onClick={() => setCerrado(true)}
          aria-label="Cerrar el código QR"
          tabIndex={visible ? 0 : -1}
          className="absolute -top-2 -left-2 w-6 h-6 rounded-full flex items-center justify-center
                     cursor-pointer transition-colors duration-150
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--blue-600)"
          style={{ background: 'var(--surface-3)', border: '1px solid rgba(15,23,42,0.1)' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-slate-500" fill="none"
            viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={visible ? 0 : -1}
          className="shrink-0 w-24 h-24 block rounded-lg overflow-hidden
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--blue-600)"
          // El SVG viene de `qrcode`, generado en el servidor a partir de una
          // URL del propio CMS: no es contenido que escriba un visitante.
          dangerouslySetInnerHTML={{ __html: svg }}
        />

        <p className="text-[13px] font-semibold text-slate-800 leading-snug max-w-[8.5rem]">
          {texto}
        </p>
      </div>
    </div>
  );
}
