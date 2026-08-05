import type { ReactNode } from 'react';

/**
 * Piezas compartidas por las pantallas de administración.
 *
 * Viven aquí y no duplicadas en cada página porque el panel y las estadísticas
 * tienen que verse como una sola herramienta: si cada uno se dibuja sus propias
 * tarjetas, en dos cambios ya no coinciden.
 */

/* ── Iconos ───────────────────────────────────────────────────────────────────
   En línea y no emojis. Los emojis dependen de la fuente del sistema, cambian
   de forma entre Windows, Android y iOS, y no heredan el color del texto, así
   que no se pueden alinear con el resto de la interfaz.
   Trazo 1.5 y 24×24 en todos, para que el conjunto se vea de la misma familia. */

export function Icono({ children, className = 'w-5 h-5' }: { children: ReactNode; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const TRAZO_BANDEJA = <path d="M4 14h4l2 3h4l2-3h4M4 14V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v7m-16 0v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" />;

export const IconoBandeja   = () => <Icono>{TRAZO_BANDEJA}</Icono>;
export const IconoBandejaXL = () => <Icono className="w-6 h-6">{TRAZO_BANDEJA}</Icono>;
export const IconoMensaje   = () => <Icono><path d="M8 10.5h8M8 14h5M4 5h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1h-9l-5 3v-3H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" /></Icono>;
export const IconoDocumento = () => <Icono><path d="M14 3v4a1 1 0 0 0 1 1h4M15 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7l-4-4Z" /></Icono>;
export const IconoReloj     = () => <Icono><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></Icono>;
export const IconoGrafica   = () => <Icono><path d="M3 20h18M7 20v-6M12 20V8M17 20v-9" /></Icono>;
export const IconoTendencia = () => <Icono><path d="M3 17l6-6 4 4 8-8M21 7v5m0-5h-5" /></Icono>;
export const IconoLupa      = () => <Icono><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.6-3.6" /></Icono>;
export const IconoSobre     = () => <Icono><path d="M3 7.5l9 6 9-6M4 6h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Z" /></Icono>;
export const IconoLapiz     = () => <Icono><path d="M16 4l4 4M4 20h4L20 8l-4-4L4 16v4Z" /></Icono>;
export const IconoEnlace    = () => <Icono className="w-4 h-4"><path d="M14 4h6v6M20 4l-8 8M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4" /></Icono>;
export const IconoAtras     = () => <Icono className="w-4 h-4"><path d="M15 19l-7-7 7-7" /></Icono>;

/* ── Color por tipo de solicitud ──────────────────────────────────────────────
   Azul y ámbar, no azul y morado como estaban.
   El par azul/morado lo rechaza el validador de paletas: con daltonismo
   deuterano quedan a ΔE 0.9 —indistinguibles— y aun con visión normal a 13.2,
   por debajo del mínimo de 15. Azul/ámbar da 37.8 con visión normal y 31.7 en
   el peor caso de daltonismo.

   Además del color, cada etiqueta lleva su texto: el color nunca es el único
   canal que distingue una cosa de otra. */

const ESTILO_TIPO = {
  contact: { fondo: 'var(--blue-50)', texto: 'var(--blue-700)', rotulo: 'Contacto'   },
  quote:   { fondo: '#fef3c7',        texto: '#92400e',         rotulo: 'Cotización' },
} as const;

export function EtiquetaTipo({ tipo }: { tipo: 'contact' | 'quote' }) {
  const e = ESTILO_TIPO[tipo];
  return (
    <span
      className="inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold whitespace-nowrap"
      style={{ background: e.fondo, color: e.texto }}
    >
      {e.rotulo}
    </span>
  );
}

/* ── Tarjeta de indicador ─────────────────────────────────────────────────── */

export function Kpi({
  valor, etiqueta, icono, destacado = false,
}: { valor: number; etiqueta: string; icono: ReactNode; destacado?: boolean }) {
  return (
    <div
      className="rounded-xl border bg-white p-4 sm:p-5"
      style={{ borderColor: '#e2e8f0', boxShadow: 'var(--shadow-xs)' }}
    >
      <div className="flex items-center gap-2 mb-3">
        <span
          className="inline-flex items-center justify-center w-8 h-8 rounded-lg shrink-0"
          style={
            destacado
              ? { background: 'var(--blue-600)', color: '#fff' }
              : { background: 'var(--surface-3)', color: 'var(--blue-600)' }
          }
        >
          {icono}
        </span>
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500 leading-tight">
          {etiqueta}
        </p>
      </div>
      {/* tabular-nums: sin esto las cifras bailan de ancho al actualizarse */}
      <p className="text-3xl font-bold text-slate-900 tabular-nums leading-none">{valor}</p>
    </div>
  );
}

/* ── Envoltorio de página ─────────────────────────────────────────────────── */

export function PaginaAdmin({ children }: { children: ReactNode }) {
  return (
    <div style={{ background: 'var(--surface-2)' }} className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">{children}</div>
    </div>
  );
}
