'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export interface CertificacionVisible {
  _id: string;
  nombre: string;
  /** Ya resuelta a URL en el servidor: este componente no habla con Sanity. */
  imagenUrl: string;
  url?: string;
}

/** Cuánto se ve cada sello antes de pasar al siguiente. */
const DURACION_MS = 4000;
/** Lo que tarda el cruce entre uno y otro. */
const TRANSICION_MS = 600;

/**
 * Los sellos de acreditación del pie, uno a uno y con desvanecido.
 *
 * Van apilados en la misma caja con posición absoluta en vez de montarse y
 * desmontarse: así el hueco no cambia de tamaño al rotar —lo que empujaría el
 * resto del pie en cada cambio— y el navegador solo anima opacidad, que no
 * provoca recálculo de la maquetación.
 *
 * Todos están siempre en el DOM, así que un lector de pantalla los enumera
 * todos aunque a la vista solo haya uno. Los que no tocan se marcan
 * `aria-hidden` y se sacan del orden de tabulación para que quien navega con
 * teclado no caiga en un enlace invisible.
 */
export default function Certificaciones({ certificaciones }: { certificaciones: CertificacionVisible[] }) {
  const [activa, setActiva] = useState(0);
  const reducedMotion = useReducedMotion();
  const total = certificaciones.length;

  // Con una sola no hay nada que rotar, y con movimiento reducido se muestran
  // todas de una vez, así que en ninguno de los dos casos hace falta el reloj.
  const rota = total > 1 && !reducedMotion;

  useEffect(() => {
    if (!rota) return;
    const t = setInterval(() => setActiva((i) => (i + 1) % total), DURACION_MS);
    return () => clearInterval(t);
  }, [rota, total]);

  if (total === 0) return null;

  const sello = (c: CertificacionVisible, visible: boolean, apilado: boolean) => {
    const img = (
      <Image
        src={c.imagenUrl}
        alt={c.nombre}
        width={192}
        height={192}
        className="w-24 h-24 object-contain"
      />
    );

    return (
      <div
        key={c._id}
        aria-hidden={!visible}
        className={
          (apilado ? 'absolute inset-0 flex items-center justify-center ' : '') +
          'transition-opacity ease-in-out'
        }
        style={{
          opacity: visible ? 1 : 0,
          transitionDuration: `${TRANSICION_MS}ms`,
          // Sin esto, el enlace del sello oculto sigue siendo pulsable encima
          // del visible: se ve uno y se abre la página de otro.
          pointerEvents: visible ? 'auto' : 'none',
        }}
      >
        {c.url ? (
          <a
            href={c.url}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={visible ? 0 : -1}
            aria-label={`${c.nombre} — verificar acreditación`}
            className="block opacity-80 hover:opacity-100 transition-opacity duration-200"
          >
            {img}
          </a>
        ) : (
          <span className="block opacity-80">{img}</span>
        )}
      </div>
    );
  };

  // Con movimiento reducido no se rota nada: se enseñan todas en fila.
  if (!rota) {
    return (
      <div className="shrink-0 flex items-center justify-center gap-4 flex-wrap">
        {certificaciones.map((c) => sello(c, true, false))}
      </div>
    );
  }

  return (
    <div className="shrink-0 relative w-24 h-24">
      {certificaciones.map((c, i) => sello(c, i === activa, true))}
    </div>
  );
}
