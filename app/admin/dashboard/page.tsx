import type { Metadata } from 'next';
import Link from 'next/link';
import { getLeads, type Lead } from '@/lib/leads';
import GenerarToken from '@/components/admin/GenerarToken';

export const metadata: Metadata = {
  title: 'Panel | Admin CILC',
};

export const dynamic = 'force-dynamic';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/* ── Iconos ───────────────────────────────────────────────────────────────────
   En línea y no emojis. Los emojis dependen de la fuente del sistema, cambian
   de forma entre Windows, Android y iOS, y no heredan el color del texto, así
   que no se pueden alinear con el resto de la interfaz.
   Trazo 1.5 y 24×24 en todos, para que el conjunto se vea de la misma familia. */

function Icono({ children, className = 'w-5 h-5' }: { children: React.ReactNode; className?: string }) {
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

const IconoBandeja  = () => <Icono><path d="M4 14h4l2 3h4l2-3h4M4 14V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v7m-16 0v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" /></Icono>;
const IconoMensaje  = () => <Icono><path d="M8 10.5h8M8 14h5M4 5h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1h-9l-5 3v-3H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" /></Icono>;
const IconoDocumento = () => <Icono><path d="M14 3v4a1 1 0 0 0 1 1h4M15 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7l-4-4Z" /></Icono>;
const IconoReloj    = () => <Icono><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></Icono>;
const IconoGrafica  = () => <Icono><path d="M3 20h18M7 20v-6M12 20V8M17 20v-9" /></Icono>;
const IconoTendencia = () => <Icono><path d="M3 17l6-6 4 4 8-8M21 7v5m0-5h-5" /></Icono>;
const IconoLupa     = () => <Icono><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.6-3.6" /></Icono>;
const IconoSobre    = () => <Icono><path d="M3 7.5l9 6 9-6M4 6h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Z" /></Icono>;
const IconoLapiz    = () => <Icono><path d="M16 4l4 4M4 20h4L20 8l-4-4L4 16v4Z" /></Icono>;
const IconoEnlace   = () => <Icono className="w-4 h-4"><path d="M14 4h6v6M20 4l-8 8M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4" /></Icono>;

/* ── Utilidades ───────────────────────────────────────────────────────────── */

/** "hace 5 min", "hace 3 h", "ayer"… Más legible que una fecha absoluta en una
 *  lista de lo más reciente, donde lo que importa es cuán fresco es el dato. */
function haceCuanto(iso: string): string {
  const minutos = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (minutos < 1)    return 'ahora mismo';
  if (minutos < 60)   return `hace ${minutos} min`;
  const horas = Math.floor(minutos / 60);
  if (horas < 24)     return `hace ${horas} h`;
  const dias = Math.floor(horas / 24);
  if (dias === 1)     return 'ayer';
  if (dias < 30)      return `hace ${dias} días`;
  return new Date(iso).toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' });
}

/* ── Piezas ───────────────────────────────────────────────────────────────── */

function Kpi({
  valor, etiqueta, icono, destacado = false,
}: { valor: number; etiqueta: string; icono: React.ReactNode; destacado?: boolean }) {
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

function Acceso({
  href, titulo, descripcion, icono, externo = false, principal = false,
}: {
  href: string; titulo: string; descripcion: string;
  icono: React.ReactNode; externo?: boolean; principal?: boolean;
}) {
  const clases =
    'group flex items-center gap-3 rounded-xl border px-4 py-3 cursor-pointer ' +
    'transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 ' +
    'focus-visible:ring-offset-2 focus-visible:ring-[color:var(--blue-600)]';

  const contenido = (
    <>
      <span
        className="inline-flex items-center justify-center w-9 h-9 rounded-lg shrink-0 transition-colors duration-200"
        style={
          principal
            ? { background: 'var(--blue-600)', color: '#fff' }
            : { background: 'var(--surface-3)', color: 'var(--blue-600)' }
        }
      >
        {icono}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold text-slate-900">{titulo}</span>
        <span className="block text-xs text-slate-500 truncate">{descripcion}</span>
      </span>
      {externo && <span className="text-slate-300 group-hover:text-slate-500 transition-colors duration-200"><IconoEnlace /></span>}
    </>
  );

  return externo ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${clases} bg-white hover:bg-[color:var(--surface-2)]`}
      style={{ borderColor: '#e2e8f0' }}
    >
      {contenido}
    </a>
  ) : (
    <Link
      href={href}
      className={`${clases} ${principal ? '' : 'bg-white hover:bg-[color:var(--surface-2)]'}`}
      style={
        principal
          ? { borderColor: 'var(--blue-100)', background: 'var(--surface-2)' }
          : { borderColor: '#e2e8f0' }
      }
    >
      {contenido}
    </Link>
  );
}

function FilaLead({ lead }: { lead: Lead }) {
  const esCotizacion = lead.type === 'quote';
  return (
    <li className="flex items-center gap-3 px-4 py-3">
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-slate-900 truncate">{lead.name}</p>
        {/* Los leads del chat de WhatsApp no dejan correo, solo teléfono. */}
        <p className="text-xs text-slate-500 truncate">{lead.email ?? lead.phone ?? '—'}</p>
      </div>
      <span
        className="shrink-0 px-2 py-0.5 rounded-full text-[11px] font-semibold"
        style={
          esCotizacion
            ? { background: '#f3e8ff', color: '#6b21a8' }
            : { background: 'var(--blue-50)', color: 'var(--blue-700)' }
        }
      >
        {esCotizacion ? 'Cotización' : 'Contacto'}
      </span>
      <time
        dateTime={lead.createdAt}
        className="shrink-0 hidden sm:block text-xs text-slate-400 tabular-nums w-24 text-right"
      >
        {haceCuanto(lead.createdAt)}
      </time>
    </li>
  );
}

/* ── Página ───────────────────────────────────────────────────────────────── */

export default async function DashboardPage() {
  const leads = await getLeads();

  const total = leads.length;
  const contacts = leads.filter((l) => l.type === 'contact').length;
  const quotes = leads.filter((l) => l.type === 'quote').length;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayLeads = leads.filter((l) => new Date(l.createdAt) >= today).length;

  // getLeads ya devuelve de más reciente a más antiguo.
  const recent = leads.slice(0, 6);

  const masterToken = process.env.TESTIMONIAL_ACCESS_TOKEN ?? '';

  return (
    <div style={{ background: 'var(--surface-2)' }} className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">

        {/* Encabezado */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Panel de administración
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              CILC — Canadian &amp; International Language Centers
            </p>
          </div>

          {/* Acción principal de la pantalla: es a donde va el equipo a trabajar. */}
          <Link
            href="/studio"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl
                       text-sm font-semibold text-white cursor-pointer shrink-0
                       transition-all duration-200 hover:brightness-110
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
                       focus-visible:ring-[color:var(--blue-600)]"
            style={{ background: 'var(--blue-600)', boxShadow: 'var(--shadow-blue-sm)' }}
          >
            <IconoLapiz />
            Abrir Sanity Studio
          </Link>
        </header>

        {/* Indicadores */}
        <section aria-label="Resumen de solicitudes" className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
          <Kpi valor={total}      etiqueta="Total"       icono={<IconoBandeja />} />
          <Kpi valor={contacts}   etiqueta="Contactos"   icono={<IconoMensaje />} />
          <Kpi valor={quotes}     etiqueta="Cotizaciones" icono={<IconoDocumento />} />
          <Kpi valor={todayLeads} etiqueta="Hoy"         icono={<IconoReloj />} destacado />
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* Últimas solicitudes */}
          <section className="lg:col-span-3">
            <div
              className="rounded-xl border bg-white overflow-hidden"
              style={{ borderColor: '#e2e8f0', boxShadow: 'var(--shadow-xs)' }}
            >
              <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: '#f1f5f9' }}>
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                  Últimas solicitudes
                </h2>
                <Link
                  href="/admin/stats"
                  className="text-xs font-semibold cursor-pointer transition-colors duration-200
                             hover:underline focus-visible:outline-none focus-visible:ring-2
                             focus-visible:ring-offset-2 focus-visible:ring-[color:var(--blue-600)] rounded"
                  style={{ color: 'var(--blue-600)' }}
                >
                  Ver todas →
                </Link>
              </div>

              {recent.length === 0 ? (
                /* Estado vacío con explicación, no un hueco en blanco. */
                <div className="px-4 py-12 text-center">
                  <span
                    className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-3"
                    style={{ background: 'var(--surface-3)', color: 'var(--text-subtle)' }}
                  >
                    <Icono className="w-6 h-6"><path d="M4 14h4l2 3h4l2-3h4M4 14V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v7m-16 0v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" /></Icono>
                  </span>
                  <p className="text-sm font-medium text-slate-700">Todavía no hay solicitudes</p>
                  <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                    Aquí aparecerán los mensajes de contacto y las cotizaciones que lleguen
                    desde el sitio.
                  </p>
                </div>
              ) : (
                <ul className="divide-y" style={{ borderColor: '#f1f5f9' }}>
                  {recent.map((lead) => <FilaLead key={lead.id} lead={lead} />)}
                </ul>
              )}
            </div>
          </section>

          {/* Columna lateral */}
          <div className="lg:col-span-2 space-y-6">
            <GenerarToken masterToken={masterToken} />

            <section>
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3">
                Accesos rápidos
              </h2>
              <div className="space-y-2">
                <Acceso
                  href="/studio"
                  titulo="Sanity Studio"
                  descripcion="Editar contenido del sitio"
                  icono={<IconoLapiz />}
                  principal
                />
                <Acceso
                  href="/admin/stats"
                  titulo="Estadísticas"
                  descripcion="Todas las solicitudes recibidas"
                  icono={<IconoGrafica />}
                />
                {/* El enlace es a la portada de GA4, no a la propiedad concreta.
                    Antes construía `#/p${GA_ID}`, pero ahí GA espera el ID NUMÉRICO
                    de la propiedad y `GA_ID` es el de medición (`G-…`): el enlace
                    llevaba a un `#/pG-1ZXH…` que Google no resuelve. */}
                {GA_ID && (
                  <Acceso
                    href="https://analytics.google.com/analytics/web/"
                    titulo="Google Analytics 4"
                    descripcion="Tráfico, conversiones y eventos"
                    icono={<IconoTendencia />}
                    externo
                  />
                )}
                <Acceso
                  href="https://search.google.com/search-console"
                  titulo="Search Console"
                  descripcion="Indexación y posicionamiento"
                  icono={<IconoLupa />}
                  externo
                />
                <Acceso
                  href="https://resend.com/emails"
                  titulo="Resend"
                  descripcion="Correos enviados y entregabilidad"
                  icono={<IconoSobre />}
                  externo
                />
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
