import type { Metadata } from 'next';
import Link from 'next/link';
import { promises as fs } from 'fs';
import path from 'path';
import type { Lead } from '@/lib/leads';

export const metadata: Metadata = {
  title: 'Dashboard | Admin CILC',
};

export const dynamic = 'force-dynamic';

async function getLeads(): Promise<Lead[]> {
  try {
    const file = path.join(process.cwd(), 'data', 'leads.json');
    const content = await fs.readFile(file, 'utf-8');
    return JSON.parse(content);
  } catch {
    return [];
  }
}

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default async function DashboardPage() {
  const leads = await getLeads();
  const total = leads.length;
  const contacts = leads.filter((l) => l.type === 'contact').length;
  const quotes = leads.filter((l) => l.type === 'quote').length;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayLeads = leads.filter((l) => new Date(l.createdAt) >= today).length;

  const recent = [...leads]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Admin</h1>
        <p className="text-gray-500 mt-1">CILC — Canadian & International Language Centers</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        <div className="bg-blue-600 text-white rounded-lg p-5 text-center">
          <p className="text-3xl font-bold">{total}</p>
          <p className="text-sm text-blue-100 mt-1">Total leads</p>
        </div>
        <div className="bg-green-600 text-white rounded-lg p-5 text-center">
          <p className="text-3xl font-bold">{contacts}</p>
          <p className="text-sm text-green-100 mt-1">Contactos</p>
        </div>
        <div className="bg-purple-600 text-white rounded-lg p-5 text-center">
          <p className="text-3xl font-bold">{quotes}</p>
          <p className="text-sm text-purple-100 mt-1">Cotizaciones</p>
        </div>
        <div className="bg-orange-500 text-white rounded-lg p-5 text-center">
          <p className="text-3xl font-bold">{todayLeads}</p>
          <p className="text-sm text-orange-100 mt-1">Hoy</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Últimos leads */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Últimos leads</h2>
            <Link href="/admin/stats" className="text-sm text-blue-600 hover:underline">Ver todos →</Link>
          </div>
          <div className="space-y-2">
            {recent.length === 0 ? (
              <p className="text-sm text-gray-400">Sin leads registrados.</p>
            ) : recent.map((lead) => (
              <div key={lead.id} className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-gray-900">{lead.name}</p>
                  <p className="text-xs text-gray-500">{lead.email}</p>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  lead.type === 'contact' ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'
                }`}>
                  {lead.type === 'contact' ? 'Contacto' : 'Cotización'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Accesos rápidos */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Accesos rápidos</h2>
          <div className="space-y-3">
            <Link
              href="/admin/stats"
              className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg px-4 py-3 hover:bg-gray-50 transition"
            >
              <span className="text-2xl">📊</span>
              <div>
                <p className="text-sm font-medium text-gray-900">Estadísticas de leads</p>
                <p className="text-xs text-gray-500">Ver todos los contactos recibidos</p>
              </div>
            </Link>

            {GA_ID && (
              <a
                href={`https://analytics.google.com/analytics/web/#/p${GA_ID}/reports/intelligenthome`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg px-4 py-3 hover:bg-gray-50 transition"
              >
                <span className="text-2xl">📈</span>
                <div>
                  <p className="text-sm font-medium text-gray-900">Google Analytics 4</p>
                  <p className="text-xs text-gray-500">Tráfico, conversiones y eventos</p>
                </div>
              </a>
            )}

            <a
              href="https://search.google.com/search-console"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg px-4 py-3 hover:bg-gray-50 transition"
            >
              <span className="text-2xl">🔍</span>
              <div>
                <p className="text-sm font-medium text-gray-900">Google Search Console</p>
                <p className="text-xs text-gray-500">Indexación y posicionamiento</p>
              </div>
            </a>

            <a
              href="https://resend.com/emails"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg px-4 py-3 hover:bg-gray-50 transition"
            >
              <span className="text-2xl">📧</span>
              <div>
                <p className="text-sm font-medium text-gray-900">Resend</p>
                <p className="text-xs text-gray-500">Emails enviados y entregabilidad</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
