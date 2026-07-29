'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { PASOS, type PasoTutorial } from './tourSteps';

/** Marca en el navegador de que este usuario ya vio el tutorial. */
const CLAVE_VISTO = 'cilc-studio-tour-visto';

interface Recuadro { top: number; left: number; width: number; height: number }

/**
 * Resuelve un ancla a un elemento real.
 *
 * Soporta selector CSS, búsqueda por texto y por aria-label, porque el DOM del
 * Studio está minificado y no expone identificadores estables.
 */
function buscarElemento(ancla: string): HTMLElement | null {
  const [tipo, ...resto] = ancla.split(':');
  const valor = resto.join(':');

  try {
    if (tipo === 'css') return document.querySelector<HTMLElement>(valor);

    if (tipo === 'texto') {
      const candidatos = [...document.querySelectorAll<HTMLElement>('button, a, [role="button"]')];
      return candidatos.find((e) => (e.textContent ?? '').trim().includes(valor)) ?? null;
    }

    if (tipo === 'aria') {
      const candidatos = [...document.querySelectorAll<HTMLElement>('[aria-label]')];
      return candidatos.find((e) => (e.getAttribute('aria-label') ?? '').includes(valor)) ?? null;
    }
  } catch {
    // Un selector inválido no debe tumbar el tutorial.
  }
  return null;
}

/** Primer ancla que exista y sea visible. `null` si ninguna coincide. */
function localizar(paso: PasoTutorial): Recuadro | null {
  for (const ancla of paso.anclas ?? []) {
    const el = buscarElemento(ancla);
    if (!el) continue;
    const r = el.getBoundingClientRect();
    // Descarta elementos ocultos o de tamaño ridículo: resaltarlos se vería peor
    // que no resaltar nada.
    if (r.width < 8 || r.height < 8) continue;
    return { top: r.top, left: r.left, width: r.width, height: r.height };
  }
  return null;
}

export default function StudioTour() {
  const pathname = usePathname();
  const [abierto, setAbierto] = useState(false);
  const [indice, setIndice] = useState(0);
  const [foco, setFoco] = useState<Recuadro | null>(null);
  const tarjetaRef = useRef<HTMLDivElement>(null);

  const enStudio =
    pathname.startsWith('/studio') &&
    pathname !== '/studio/login' &&
    pathname !== '/studio/reset';

  /**
   * Arranca solo la primera vez, y solo cuando el Studio ya está montado.
   *
   * No basta con mirar la ruta: si el usuario aún no ha iniciado sesión en
   * Sanity, /studio muestra la pantalla "Choose login provider" y el tutorial
   * se abriría encima de ella, explicando una interfaz que no está a la vista.
   *
   * `PaneLayout` es el contenedor de los paneles del Studio y no existe en esa
   * pantalla de acceso, así que sirve de señal de que la interfaz real cargó.
   */
  useEffect(() => {
    if (!enStudio) return;
    if (localStorage.getItem(CLAVE_VISTO)) return;

    let intentos = 0;
    const id = setInterval(() => {
      intentos += 1;
      if (document.querySelector('[data-ui="PaneLayout"]')) {
        clearInterval(id);
        setAbierto(true);
      } else if (intentos > 40) {
        // ~20 s sin cargar: probablemente sigue en la pantalla de acceso de
        // Sanity. Se deja estar; el botón "Ver tutorial" sigue disponible.
        clearInterval(id);
      }
    }, 500);

    return () => clearInterval(id);
  }, [enStudio]);

  // Permite lanzarlo desde el botón "Ver tutorial", que vive en otro componente.
  useEffect(() => {
    const abrir = () => { setIndice(0); setAbierto(true); };
    window.addEventListener('cilc:abrir-tutorial', abrir);
    return () => window.removeEventListener('cilc:abrir-tutorial', abrir);
  }, []);

  const paso = PASOS[indice];

  // Recalcula el foco al cambiar de paso y cuando la ventana se mueve. El
  // recuadro se mide en cada frame relevante porque el Studio reacomoda sus
  // paneles al redimensionar.
  useEffect(() => {
    if (!abierto || !paso) return;
    // Se compara antes de guardar: `localizar` devuelve un objeto nuevo cada
    // vez, así que asignarlo sin más provocaría un render en cada evento de
    // scroll y la tarjeta nunca llegaría a quedarse quieta.
    const medir = () =>
      setFoco((previo) => {
        const nuevo = localizar(paso);
        if (previo === nuevo) return previo;
        if (previo && nuevo &&
            previo.top === nuevo.top && previo.left === nuevo.left &&
            previo.width === nuevo.width && previo.height === nuevo.height) {
          return previo;
        }
        return nuevo;
      });
    medir();
    const t = setTimeout(medir, 300); // por si el panel aún estaba animando
    window.addEventListener('resize', medir);
    window.addEventListener('scroll', medir, true);
    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', medir);
      window.removeEventListener('scroll', medir, true);
    };
  }, [abierto, paso]);

  const cerrar = useCallback(() => {
    setAbierto(false);
    localStorage.setItem(CLAVE_VISTO, '1');
  }, []);

  const siguiente = useCallback(() => {
    setIndice((i) => {
      if (i >= PASOS.length - 1) { cerrar(); return i; }
      return i + 1;
    });
  }, [cerrar]);

  const anterior = useCallback(() => setIndice((i) => Math.max(0, i - 1)), []);

  // Navegación con teclado: Escape sale, flechas y Enter avanzan.
  useEffect(() => {
    if (!abierto) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); cerrar(); }
      else if (e.key === 'ArrowRight' || e.key === 'Enter') { e.preventDefault(); siguiente(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); anterior(); }
    };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [abierto, cerrar, siguiente, anterior]);

  useEffect(() => { tarjetaRef.current?.focus(); }, [indice, abierto]);

  if (!enStudio || !abierto || !paso) return null;

  const MARGEN = 8;
  const hayFoco = foco !== null;

  // La tarjeta se coloca debajo del foco, o encima si no cabe. Sin foco, va
  // centrada en la pantalla.
  const alturaEstimada = 260;
  const cabeDebajo = hayFoco && foco.top + foco.height + alturaEstimada < window.innerHeight;
  const anchoTarjeta = 380;

  const estiloTarjeta: React.CSSProperties = hayFoco
    ? {
        position: 'fixed',
        top: cabeDebajo ? foco.top + foco.height + 20 : undefined,
        bottom: cabeDebajo ? undefined : window.innerHeight - foco.top + 20,
        left: Math.min(
          Math.max(12, foco.left + foco.width / 2 - anchoTarjeta / 2),
          Math.max(12, window.innerWidth - anchoTarjeta - 12),
        ),
        width: anchoTarjeta,
      }
    : {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: anchoTarjeta,
      };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100000 }} role="dialog" aria-modal="true" aria-label="Tutorial del panel">

      {hayFoco ? (
        /* El oscurecido se consigue con una sombra enorme alrededor del recuadro
           en vez de recortar el fondo: así el "agujero" funciona en cualquier
           navegador y deja ver el elemento real por debajo. */
        <div
          style={{
            position: 'fixed',
            top: foco.top - MARGEN,
            left: foco.left - MARGEN,
            width: foco.width + MARGEN * 2,
            height: foco.height + MARGEN * 2,
            borderRadius: 12,
            boxShadow: '0 0 0 9999px rgba(6,13,26,0.82)',
            border: '2px solid #1B67E8',
            pointerEvents: 'none',
            transition: 'all 0.25s cubic-bezier(0.16,1,0.3,1)',
          }}
        />
      ) : (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(6,13,26,0.82)' }} />
      )}

      {/* Capta los clics fuera de la tarjeta para que no lleguen al Studio */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 1 }} onClick={cerrar} />

      <div
        ref={tarjetaRef}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        style={{
          ...estiloTarjeta,
          zIndex: 2,
          background: '#0f1629',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 16,
          padding: '22px 24px',
          boxShadow: '0 24px 64px rgba(0,0,0,0.45)',
          color: '#e2e8f0',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          outline: 'none',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#64748b' }}>
            Paso {indice + 1} de {PASOS.length}
          </span>
          <button
            onClick={cerrar}
            aria-label="Cerrar tutorial"
            style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: 20, lineHeight: 1, padding: 4 }}
          >
            ×
          </button>
        </div>

        <h2 style={{ margin: '0 0 10px', fontSize: 18, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>
          {paso.titulo}
        </h2>

        <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.65, color: '#cbd5e1', whiteSpace: 'pre-line' }}>
          {paso.cuerpo}
        </p>

        {paso.tip && (
          <p style={{
            margin: '14px 0 0', padding: '10px 12px', fontSize: 12.5, lineHeight: 1.55,
            color: '#bfdbfe', background: 'rgba(27,103,232,0.12)',
            borderLeft: '3px solid #1B67E8', borderRadius: '0 8px 8px 0',
          }}>
            {paso.tip}
          </p>
        )}

        {/* Puntos de progreso */}
        <div style={{ display: 'flex', gap: 5, margin: '18px 0 14px' }}>
          {PASOS.map((_, i) => (
            <span key={i} style={{
              height: 3, flex: 1, borderRadius: 2,
              background: i <= indice ? '#1B67E8' : 'rgba(255,255,255,0.12)',
              transition: 'background 0.25s',
            }} />
          ))}
        </div>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button
            onClick={cerrar}
            style={{ background: 'none', border: 'none', color: '#64748b', fontSize: 12.5, cursor: 'pointer', padding: '8px 0' }}
          >
            Saltar
          </button>
          <div style={{ flex: 1 }} />
          {indice > 0 && (
            <button
              onClick={anterior}
              style={{
                padding: '9px 16px', borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: 'pointer',
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)', color: '#cbd5e1',
              }}
            >
              Atrás
            </button>
          )}
          <button
            onClick={siguiente}
            style={{
              padding: '9px 18px', borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: 'pointer',
              background: '#1B67E8', border: 'none', color: '#fff',
              boxShadow: '0 4px 16px rgba(27,103,232,0.35)',
            }}
          >
            {indice === PASOS.length - 1 ? 'Entendido' : 'Siguiente'}
          </button>
        </div>
      </div>
    </div>
  );
}
