import type { Metadata } from 'next';
import Link from 'next/link';
import { getLeads } from '@/lib/leads';
import {
  PaginaAdmin, Kpi, EtiquetaTipo, IconoBandeja, IconoBandejaXL, IconoMensaje,
  IconoDocumento, IconoReloj, IconoAtras,
} from '@/components/admin/AdminUI';

export const metadata: Metadata = {
  title: 'Estadísticas | Admin CILC',
};

export const dynamic = 'force-dynamic';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('es-MX', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

/**
 * Solicitudes por programa, en barras horizontales.
 *
 * Barras y no un donut: la pregunta es "cuál pide más", que es comparar
 * magnitudes, y para eso la longitud se lee mejor que el ángulo. Horizontales
 * porque los nombres de los programas son largos —"Formación Corporativa"— y en
 * vertical habría que girarlos.
 *
 * Un solo color, no uno por programa: todas las barras miden lo mismo (número
 * de solicitudes), así que son una sola serie. Pintar cada una de un color
 * sugeriría que el color significa algo, y no significa nada.
 *
 * El valor va escrito al final de cada barra en vez de en un tooltip: con seis
 * programas como mucho, etiquetar directamente ahorra tener que pasar el ratón
 * por encima, y funciona igual impreso o con lector de pantalla.
 */
function BarrasPorPrograma({ datos }: { datos: [string, number][] }) {
  const max = Math.max(...datos.map(([, n]) => n));

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3">
      {datos.map(([programa, n]) => (
        <li key={programa}>
          <div className="flex items-baseline justify-between gap-3 mb-1.5">
            <span className="text-sm text-slate-700 truncate">{programa}</span>
            <span className="text-sm font-bold text-slate-900 tabular-nums shrink-0">{n}</span>
          </div>
          {/* El carril da la escala: sin él, una barra corta no se distingue de
              una barra larga en una lista con un solo elemento. */}
          <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--surface-3)' }}>
            <div
              className="h-full"
              style={{
                width: `${Math.max((n / max) * 100, 4)}%`,
                background: 'var(--blue-600)',
                borderRadius: '0 4px 4px 0',
              }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

function Tarjeta({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <section
      className="rounded-xl border bg-white overflow-hidden"
      style={{ borderColor: '#e2e8f0', boxShadow: 'var(--shadow-xs)' }}
    >
      <div className="px-4 py-3 border-b" style={{ borderColor: '#f1f5f9' }}>
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">{titulo}</h2>
      </div>
      {children}
    </section>
  );
}

export default async function StatsPage() {
  const leads = await getLeads();

  const total = leads.length;
  const contacts = leads.filter((l) => l.type === 'contact').length;
  const quotes = leads.filter((l) => l.type === 'quote').length;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayLeads = leads.filter((l) => new Date(l.createdAt) >= today).length;

  const programCount: Record<string, number> = {};
  leads.filter((l) => l.program).forEach((l) => {
    programCount[l.program!] = (programCount[l.program!] ?? 0) + 1;
  });
  // De mayor a menor: la pregunta es cuál pide más, y ordenado se responde sola.
  const porPrograma = Object.entries(programCount).sort((a, b) => b[1] - a[1]);

  // getLeads ya devuelve de más reciente a más antiguo.
  const recent = leads.slice(0, 10);

  return (
    <PaginaAdmin>
      <header className="mb-8">
        <Link
          href="/admin/dashboard"
          className="inline-flex items-center gap-1.5 text-sm font-semibold mb-3 cursor-pointer
                     transition-colors duration-200 hover:underline
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
                     focus-visible:ring-(--blue-600) rounded"
          style={{ color: 'var(--blue-600)' }}
        >
          <IconoAtras />
          Volver al panel
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Estadísticas
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Todas las solicitudes recibidas desde el sitio web.
        </p>
      </header>

      <section aria-label="Resumen de solicitudes" className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <Kpi valor={total}      etiqueta="Total"        icono={<IconoBandeja />} />
        <Kpi valor={contacts}   etiqueta="Contactos"    icono={<IconoMensaje />} />
        <Kpi valor={quotes}     etiqueta="Cotizaciones" icono={<IconoDocumento />} />
        <Kpi valor={todayLeads} etiqueta="Hoy"          icono={<IconoReloj />} destacado />
      </section>

      {/* Cada bloque a lo ancho, en su propia fila.
          Con la tabla metida en dos tercios, la columna de fecha se salía del
          borde: entre el correo y el nombre del programa no queda sitio para
          cinco columnas en 725 px. */}
      <div className="space-y-6">

        {/* Solicitudes por programa */}
        <Tarjeta titulo="Por programa">
          <div className="p-4">
            {porPrograma.length === 0 ? (
              <p className="text-sm text-slate-500 py-6 text-center">
                Todavía no hay cotizaciones.<br />
                <span className="text-xs">
                  Solo las solicitudes de cotización indican programa.
                </span>
              </p>
            ) : (
              <BarrasPorPrograma datos={porPrograma} />
            )}
          </div>
        </Tarjeta>

        {/* Tabla de solicitudes */}
        <div>
          <Tarjeta titulo={total === 0 ? 'Solicitudes' : `Últimas ${recent.length} de ${total}`}>
            {total === 0 ? (
              <div className="px-4 py-14 text-center">
                <span
                  className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-3"
                  style={{ background: 'var(--surface-3)', color: 'var(--text-subtle)' }}
                >
                  <IconoBandejaXL />
                </span>
                <p className="text-sm font-medium text-slate-700">Todavía no hay solicitudes</p>
                <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                  Aquí aparecerán los mensajes de contacto y las cotizaciones que
                  lleguen desde el sitio.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs uppercase tracking-wide text-slate-500">
                      <th scope="col" className="px-4 py-2.5 font-semibold">Nombre</th>
                      <th scope="col" className="px-4 py-2.5 font-semibold">Contacto</th>
                      <th scope="col" className="px-4 py-2.5 font-semibold">Tipo</th>
                      <th scope="col" className="px-4 py-2.5 font-semibold">Programa</th>
                      <th scope="col" className="px-4 py-2.5 font-semibold text-right">Fecha</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y" style={{ borderColor: '#f1f5f9' }}>
                    {recent.map((lead) => (
                      <tr key={lead.id}>
                        <td className="px-4 py-3 font-semibold text-slate-900 whitespace-nowrap">{lead.name}</td>
                        {/* Los leads del chat de WhatsApp no dejan correo, solo teléfono. */}
                        <td className="px-4 py-3 text-slate-600">{lead.email ?? lead.phone ?? '—'}</td>
                        <td className="px-4 py-3"><EtiquetaTipo tipo={lead.type} /></td>
                        <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{lead.program ?? '—'}</td>
                        <td className="px-4 py-3 text-slate-500 tabular-nums text-right whitespace-nowrap">
                          {formatDate(lead.createdAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Tarjeta>
        </div>
      </div>
    </PaginaAdmin>
  );
}
