import type { Metadata } from 'next';
import { getLeads } from '@/lib/leads';

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

export default async function StatsPage() {
  const leads = await getLeads();

  const total = leads.length;
  const contacts = leads.filter((l) => l.type === 'contact').length;
  const quotes = leads.filter((l) => l.type === 'quote').length;

  const programCount: Record<string, number> = {};
  leads.filter((l) => l.program).forEach((l) => {
    programCount[l.program!] = (programCount[l.program!] ?? 0) + 1;
  });

  const recent = [...leads]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 10);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Panel de Estadísticas</h1>
      <p className="text-gray-500 mb-8">Leads recibidos a través del sitio web de CILC.</p>

      {/* Tarjetas resumen */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 text-center">
          <p className="text-4xl font-bold text-blue-700">{total}</p>
          <p className="text-sm text-blue-600 mt-1">Total de leads</p>
        </div>
        <div className="bg-green-50 border border-green-100 rounded-lg p-6 text-center">
          <p className="text-4xl font-bold text-green-700">{contacts}</p>
          <p className="text-sm text-green-600 mt-1">Mensajes de contacto</p>
        </div>
        <div className="bg-purple-50 border border-purple-100 rounded-lg p-6 text-center">
          <p className="text-4xl font-bold text-purple-700">{quotes}</p>
          <p className="text-sm text-purple-600 mt-1">Solicitudes de cotización</p>
        </div>
      </div>

      {/* Leads por programa */}
      {Object.keys(programCount).length > 0 && (
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Solicitudes por programa</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {Object.entries(programCount)
              .sort((a, b) => b[1] - a[1])
              .map(([program, count]) => (
                <div key={program} className="bg-white border border-gray-200 rounded-lg p-4 flex justify-between items-center">
                  <span className="text-sm text-gray-700">{program}</span>
                  <span className="text-lg font-bold text-gray-900">{count}</span>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Últimos leads */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Últimos {recent.length} leads</h2>
        {total === 0 ? (
          <p className="text-gray-400 text-sm">No hay leads registrados aún.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-50 text-left text-gray-600">
                <tr>
                  <th className="px-4 py-3 font-medium">Nombre</th>
                  <th className="px-4 py-3 font-medium">Email</th>
                  <th className="px-4 py-3 font-medium">Tipo</th>
                  <th className="px-4 py-3 font-medium">Programa</th>
                  <th className="px-4 py-3 font-medium">Fecha</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recent.map((lead) => (
                  <tr key={lead.id} className="bg-white hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">{lead.name}</td>
                    {/* Los leads del chat de WhatsApp no dejan correo, solo teléfono. */}
                    <td className="px-4 py-3 text-gray-600">{lead.email ?? lead.phone ?? '—'}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        lead.type === 'contact'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-purple-100 text-purple-700'
                      }`}>
                        {lead.type === 'contact' ? 'Contacto' : 'Cotización'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{lead.program ?? '—'}</td>
                    <td className="px-4 py-3 text-gray-500">{formatDate(lead.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
