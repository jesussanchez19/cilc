import { notFound } from 'next/navigation';
import Link from 'next/link';
import { countries } from '@/lib/data/countries';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return countries.map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const country = countries.find((c) => c.id === id);
  if (!country) return {};
  return {
    title: `Estudiar en ${country.name} | CILC`,
    description: country.description,
  };
}

export default async function CountryPage({ params }: PageProps) {
  const { id } = await params;
  const country = countries.find((c) => c.id === id);
  if (!country) notFound();

  const stats = [
    { label: 'Universidades',               value: country.universities.toLocaleString(), icon: '🎓', bg: 'bg-blue-50',   text: 'text-blue-700'   },
    { label: 'Costo de vida / mes',         value: `$${country.costOfLiving.toLocaleString()} USD`, icon: '💰', bg: 'bg-green-50',  text: 'text-green-700'  },
    { label: 'Estudiantes internacionales', value: `${(country.students / 1000).toFixed(0)}K`, icon: '🌍', bg: 'bg-purple-50', text: 'text-purple-700' },
    { label: 'Idioma principal',            value: country.language, icon: '💬', bg: 'bg-orange-50', text: 'text-orange-700' },
  ];

  return (
    <div>

      {/* ── HERO ── */}
      <div className="relative min-h-[420px] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${country.image}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 pt-32 w-full">
          <div className="flex items-center gap-4 mb-3">
            <span className="text-6xl">{country.flag}</span>
            <h1 className="text-4xl md:text-5xl font-bold text-white">{country.name}</h1>
          </div>
          <p className="text-xl text-white/85 max-w-2xl mb-8">{country.description}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/contact"
              className="inline-block px-8 py-4 bg-white text-gray-900 rounded-xl font-bold hover:bg-gray-100 transition text-center">
              Solicitar Información
            </Link>
            <a href="https://wa.me/525518944494" target="_blank" rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition text-center">
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* ── 4 Stats ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {stats.map(({ label, value, icon, bg, text }) => (
            <div key={label} className={`${bg} rounded-2xl p-6 text-center`}>
              <div className="text-3xl mb-2">{icon}</div>
              <div className={`text-xl font-extrabold ${text} mb-1 leading-tight`}>{value}</div>
              <p className="text-gray-500 text-xs uppercase tracking-wide">{label}</p>
            </div>
          ))}
        </div>

        {/* ── Info general + Visa ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Información General</h2>
            <div className="space-y-4">
              {[
                { label: 'Región', value: country.region   },
                { label: 'Clima',  value: country.climate  },
                { label: 'Idioma', value: country.language },
                { label: 'Código', value: country.code     },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                  <span className="text-gray-400 text-sm font-semibold uppercase tracking-wide">{label}</span>
                  <span className="text-gray-900 font-medium text-sm">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Información de Visa</h2>
            <div className="space-y-4">
              <div>
                <p className="text-gray-400 text-xs font-semibold uppercase tracking-wide mb-1">Tipo de visa</p>
                <p className="text-gray-900 font-semibold">{country.visa}</p>
              </div>
              {country.visaNote && (
                <div className="bg-blue-50 rounded-xl p-4">
                  <p className="text-blue-800 text-sm leading-relaxed">{country.visaNote}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Costo de vida ── */}
        {country.costOfLivingNote && (
          <div className="bg-green-50 border border-green-100 rounded-2xl p-8 mb-14">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Costo de vida estimado</h2>
            <p className="text-gray-700 text-lg">{country.costOfLivingNote}</p>
            <p className="text-green-700 font-bold text-xl mt-4">
              Total estimado: ${country.costOfLiving.toLocaleString()} USD / mes
            </p>
          </div>
        )}

        {/* ── Por qué estudiar aquí ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">¿Por qué estudiar en {country.name}?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              'Universidades reconocidas a nivel mundial',
              'Excelente calidad de vida y seguridad',
              'Amplias oportunidades profesionales',
              'Comunidad internacional diversa',
              'Asesoría CILC sin costo en todo el proceso',
              'Trámites de visa y logística gestionados por CILC',
            ].map((reason) => (
              <div key={reason} className="flex items-start gap-3">
                <span className="text-green-500 font-bold text-lg mt-0.5 shrink-0">✓</span>
                <span className="text-gray-700 text-sm">{reason}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="bg-blue-700 text-white rounded-2xl p-10 text-center">
          <h2 className="text-3xl font-bold mb-3">¿Te interesa estudiar en {country.name}?</h2>
          <p className="text-blue-100 mb-8 text-lg max-w-xl mx-auto">
            Agenda tu Diagnóstico Internacional Estratégico — es gratuito y sin compromiso.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact"
              className="inline-block px-8 py-4 bg-white text-blue-700 rounded-xl font-bold hover:bg-blue-50 transition">
              Contactar Ahora
            </Link>
            <a
              href={`https://wa.me/525518944494?text=Hola%2C%20me%20interesa%20estudiar%20en%20${encodeURIComponent(country.name)}`}
              target="_blank" rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition">
              WhatsApp
            </a>
          </div>
        </div>

        {/* ── Volver ── */}
        <div className="mt-10">
          <Link href="/destinos"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium text-sm transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Ver todos los destinos
          </Link>
        </div>

      </div>
    </div>
  );
}
