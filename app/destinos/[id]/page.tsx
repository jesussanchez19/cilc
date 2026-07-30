import { notFound } from 'next/navigation';
import Link from 'next/link';
import { countries } from '@/lib/data/countries';
import { getDestinoData, getWhatsAppPrincipal } from '@/lib/sanity/queries';
import { urlFor } from '@/lib/sanity/image';
function isoToFlag(code: string) {
  return code.toUpperCase().split('').map((c) => String.fromCodePoint(c.charCodeAt(0) + 127397)).join('');
}
import AnimateIn from '@/components/shared/AnimateIn';
import LazySection from '@/components/shared/LazySection';

export const dynamic = 'force-dynamic';

const PROGRAMA_INFO: Record<string, { label: string; href: string; icon: string; color: string }> = {
  'idiomas':               { label: 'Idiomas',               href: '/programas/idiomas',               icon: '🗣️', color: '#1B67E8' },
  'au-pair':               { label: 'Au Pair',               href: '/programas/au-pair',               icon: '👧', color: '#ec4899' },
  'anos-academicos':       { label: 'Años Académicos',       href: '/programas/anos-academicos',       icon: '🎓', color: '#8b5cf6' },
  'estudia-trabaja':       { label: 'Estudia y Trabaja',     href: '/programas/estudia-trabaja',       icon: '💼', color: '#10b981' },
  'formacion-corporativa': { label: 'Formación Corporativa', href: '/programas/formacion-corporativa', icon: '🏢', color: '#f59e0b' },
  'idiomas-en-linea':      { label: 'Idiomas en Línea',      href: '/programas/idiomas-en-linea',      icon: '💻', color: '#06b6d4' },
};

const RAZONES = [
  { icon: '🎓', texto: 'Universidades reconocidas a nivel mundial' },
  { icon: '🏠', texto: 'Excelente calidad de vida y seguridad' },
  { icon: '💼', texto: 'Amplias oportunidades profesionales' },
  { icon: '🌍', texto: 'Comunidad internacional diversa' },
  { icon: '🤝', texto: 'Asesoría CILC sin costo en todo el proceso' },
  { icon: '📋', texto: 'Trámites de visa y logística gestionados por CILC' },
];

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const hardcoded = countries.find((c) => c.id === id);
  const sanity = await getDestinoData(id);
  const nombre = sanity?.nombre ?? hardcoded?.name;
  const desc = sanity?.descripcion ?? hardcoded?.description;
  if (!nombre) return {};
  return {
    title: `Estudiar en ${nombre} | CILC`,
    description: desc,
  };
}

export default async function CountryPage({ params }: PageProps) {
  const { id } = await params;

  const [hardcoded, sanity, waPrincipal] = await Promise.all([
    Promise.resolve(countries.find((c) => c.id === id) ?? null),
    getDestinoData(id),
    getWhatsAppPrincipal(),
  ]);

  if (!hardcoded && !sanity) notFound();

  /**
   * Cuando el destino existe en Sanity, Sanity manda en TODOS sus campos.
   *
   * Antes cada campo caía por separado al dato estático de countries.ts
   * (`sanity?.clima ?? hardcoded?.climate`). Como los 16 destinos están en las
   * dos fuentes, vaciar un campo en el Studio no tenía ningún efecto visible:
   * la página seguía pintando el valor viejo del archivo. El respaldo estático
   * se conserva solo para un destino que aún no esté migrado al CMS.
   */
  const usarSanity = Boolean(sanity);

  const nombre        = (usarSanity ? sanity?.nombre        : hardcoded?.name)             ?? '';
  const codigoISO     = (usarSanity ? sanity?.codigoISO     : hardcoded?.code)             ?? '';
  const descripcion   = (usarSanity ? sanity?.descripcion   : hardcoded?.description)      ?? '';
  const region        = (usarSanity ? sanity?.region        : hardcoded?.region)            ?? '';
  const idioma        = (usarSanity ? sanity?.idioma        : hardcoded?.language)          ?? '';
  const clima         = (usarSanity ? sanity?.clima         : hardcoded?.climate)           ?? '';
  const visa          = (usarSanity ? sanity?.visa          : hardcoded?.visa)              ?? '';
  const visaNota      = (usarSanity ? sanity?.visaNota      : hardcoded?.visaNote)          ?? '';
  const costoVida     = (usarSanity ? sanity?.costoVida     : hardcoded?.costOfLiving)      ?? 0;
  const costoVidaNota = (usarSanity ? sanity?.costoVidaNota : hardcoded?.costOfLivingNote)  ?? '';
  const universidades = (usarSanity ? sanity?.universidades : hardcoded?.universities)      ?? 0;
  const estudiantes   = (usarSanity ? sanity?.estudiantes   : hardcoded?.students)          ?? 0;
  const programasDisponibles = sanity?.programas ?? [];

  const bandera = isoToFlag(codigoISO) || (usarSanity ? sanity?.bandera : hardcoded?.flag) || '';

  const imagenUrl = usarSanity
    ? (sanity?.imagen ? urlFor(sanity.imagen).width(1600).height(640).fit('crop').url() : null)
    : hardcoded?.image ?? null;

  // Solo entran las que tienen dato: una tarjeta con "—" no informa de nada y
  // hace parecer incompleta la ficha del destino.
  const stats = [
    universidades ? { label: 'Universidades',    value: universidades.toLocaleString('es-MX'),            icon: '🎓', accent: '#1B67E8' } : null,
    costoVida     ? { label: 'Costo / mes',      value: `$${costoVida.toLocaleString('es-MX')} USD`,      icon: '💰', accent: '#10b981' } : null,
    estudiantes   ? { label: 'Est. internac.',   value: `${(estudiantes / 1000).toFixed(0)}K+`,    icon: '🌍', accent: '#8b5cf6' } : null,
    idioma        ? { label: 'Idioma principal', value: idioma,                                    icon: '💬', accent: '#f59e0b' } : null,
  ].filter((s): s is NonNullable<typeof s> => s !== null);

  // Filas de "Información General". Se calculan aquí para poder ocultar la
  // tarjeta completa cuando no queda ninguna, en vez de dejar el encabezado
  // solo sobre un recuadro vacío.
  const infoGeneral = [
    { label: 'Región', value: region,    icon: '📍' },
    { label: 'Clima',  value: clima,     icon: '🌤️' },
    { label: 'Idioma', value: idioma,    icon: '💬' },
    { label: 'Código', value: codigoISO, icon: '🏳️' },
  ].filter((r) => r.value);

  return (
    <div style={{ background: 'var(--surface-2)' }}>

      {/* ── HERO ── */}
      <div className="relative flex items-end overflow-hidden" style={{ minHeight: '520px' }}>
        {imagenUrl ? (
          <div
            className="absolute inset-0 bg-cover bg-center scale-105 transition-transform duration-700"
            style={{ backgroundImage: `url('${imagenUrl}')` }}
          />
        ) : (
          <div className="absolute inset-0" style={{ background: 'var(--dark)' }} />
        )}
        {/* Multi-layer overlay */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,15,30,0.96) 0%, rgba(10,15,30,0.55) 45%, rgba(10,15,30,0.15) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 70% 60% at 20% 100%, rgba(27,103,232,0.18) 0%, transparent 70%)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-40 w-full">
          <AnimateIn animation="up" delay={0}>
            <Link
              href="/destinos"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm font-medium transition-colors duration-200 mb-6"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Todos los destinos
            </Link>
          </AnimateIn>
          {region && (
            <AnimateIn animation="up" delay={0}>
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                  style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.7)' }}
                >
                  {region}
                </span>
              </div>
            </AnimateIn>
          )}
          <AnimateIn animation="up" delay={80}>
            <div className="flex items-center gap-5 mb-5">
              {codigoISO && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={`https://flagcdn.com/w80/${codigoISO.toLowerCase()}.png`}
                  alt={nombre}
                  width={80}
                  className="h-14 w-auto drop-shadow-lg rounded-sm object-cover"
                />
              )}
              <h1
                className="text-5xl sm:text-6xl font-extrabold text-white leading-none"
                style={{ letterSpacing: '-0.04em' }}
              >
                {nombre}
              </h1>
            </div>
          </AnimateIn>
          {descripcion && (
            <AnimateIn animation="up" delay={160}>
              <p className="text-lg text-white/75 max-w-2xl mb-10 leading-relaxed">{descripcion}</p>
            </AnimateIn>
          )}
          <AnimateIn animation="up" delay={220}>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact"
                className="btn-primary"
              >
                Solicitar Información
              </Link>
              <a
                href={`https://wa.me/${waPrincipal}?text=Hola%2C%20me%20interesa%20estudiar%20en%20${encodeURIComponent(nombre)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
                style={{ color: '#4ade80', borderColor: 'rgba(74,222,128,0.3)', background: 'rgba(74,222,128,0.08)' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-4 h-4" fill="currentColor">
                  <path d="M16.003 2.667C8.638 2.667 2.667 8.638 2.667 16c0 2.354.618 4.663 1.793 6.695L2.667 29.333l6.82-1.778A13.264 13.264 0 0016.003 29.333c7.365 0 13.33-5.97 13.33-13.333 0-7.362-5.965-13.333-13.33-13.333z" />
                </svg>
                WhatsApp
              </a>
            </div>
          </AnimateIn>
        </div>
      </div>

      {/* ── Stats ── Sin ninguna estadística no se pinta la franja: dejaría
           una banda de márgenes vacía flotando sobre el hero. */}
      {stats.length > 0 && (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {stats.map(({ label, value, icon, accent }, i) => (
            <AnimateIn key={label} animation="scale" delay={i * 80}>
              <div
                className="premium-card p-6 text-center"
                style={{ borderTop: `3px solid ${accent}` }}
              >
                <div className="text-3xl mb-2">{icon}</div>
                <div className="text-xl font-extrabold text-slate-900 mb-1 leading-tight">{value}</div>
                <p className="text-slate-400 text-xs uppercase tracking-widest font-semibold">{label}</p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">

        {/* ── Programas disponibles ── */}
        {programasDisponibles.length > 0 && (
          <LazySection animation="slide">
            <div className="mb-16">
              <div className="mb-8">
                <span className="badge mb-4 inline-flex">Programas</span>
                <h2 className="text-3xl font-extrabold text-slate-900" style={{ letterSpacing: '-0.03em' }}>
                  Estudia en {nombre} con CILC
                </h2>
                <p className="text-slate-500 mt-2">Selecciona el programa que más se adapte a tus objetivos.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {programasDisponibles.map((pid, i) => {
                  const info = PROGRAMA_INFO[pid];
                  if (!info) return null;
                  return (
                    <AnimateIn key={pid} animation="blur" delay={i * 80}>
                      <Link
                        href={info.href}
                        className="group premium-card p-6 flex items-center gap-4 hover:shadow-lg transition-all duration-300 h-full"
                        style={{ borderLeft: `4px solid ${info.color}` }}
                      >
                        <span className="text-4xl shrink-0 group-hover:scale-110 transition-transform duration-200">{info.icon}</span>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-slate-900 text-base group-hover:text-blue-700 transition-colors leading-tight">
                            {info.label}
                          </p>
                          <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                            Ver programa
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                          </p>
                        </div>
                      </Link>
                    </AnimateIn>
                  );
                })}
              </div>
            </div>
          </LazySection>
        )}

        {/* ── Info general + Visa ── */}
        <LazySection animation="fade">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">

            {/* Info general */}
            {infoGeneral.length > 0 && (
            <AnimateIn animation="left">
              <div className="premium-card p-8 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: 'rgba(27,103,232,0.08)' }}>🗺️</div>
                  <h2 className="text-xl font-extrabold text-slate-900" style={{ letterSpacing: '-0.02em' }}>Información General</h2>
                </div>
                <div className="space-y-3">
                  {infoGeneral.map(({ label, value, icon }) => (
                    <div key={label} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
                      <span className="flex items-center gap-2 text-slate-500 text-sm font-semibold">
                        <span>{icon}</span>{label}
                      </span>
                      <span className="text-slate-900 font-semibold text-sm">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateIn>
            )}

            {/* Visa */}
            {visa && (
              <AnimateIn animation="right">
                <div className="premium-card p-8 h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: 'rgba(27,103,232,0.08)' }}>🛂</div>
                    <h2 className="text-xl font-extrabold text-slate-900" style={{ letterSpacing: '-0.02em' }}>Información de Visa</h2>
                  </div>
                  <div
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold mb-5"
                    style={{ background: 'rgba(27,103,232,0.08)', color: '#1B67E8', border: '1px solid rgba(27,103,232,0.2)' }}
                  >
                    <span>📄</span> {visa}
                  </div>
                  {visaNota && (
                    <p className="text-slate-500 text-sm leading-relaxed">{visaNota}</p>
                  )}
                </div>
              </AnimateIn>
            )}
          </div>
        </LazySection>

        {/* ── Costo de vida ── */}
        {costoVidaNota && (
          <LazySection animation="slide">
            <AnimateIn animation="up">
              <div className="mb-16 rounded-2xl p-8 overflow-hidden relative" style={{ background: 'linear-gradient(135deg, #0D3494 0%, #1B67E8 100%)' }}>
                <div className="absolute top-0 right-0 w-64 h-64 opacity-10 pointer-events-none"
                  style={{ background: 'radial-gradient(circle, white 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center text-xl">💰</div>
                    <h2 className="text-xl font-extrabold text-white" style={{ letterSpacing: '-0.02em' }}>Costo de vida estimado</h2>
                  </div>
                  <p className="text-blue-100 text-sm leading-relaxed mb-4">{costoVidaNota}</p>
                  {costoVida > 0 && (
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/15 border border-white/25">
                      <span className="text-white font-extrabold text-lg">${costoVida.toLocaleString('es-MX')} USD</span>
                      <span className="text-blue-200 text-sm">/ mes estimado</span>
                    </div>
                  )}
                </div>
              </div>
            </AnimateIn>
          </LazySection>
        )}

        {/* ── Por qué estudiar aquí ── */}
        <LazySection animation="slide">
          <div className="mb-16">
            <div className="mb-8">
              <span className="badge mb-4 inline-flex">¿Por qué {nombre}?</span>
              <h2 className="text-3xl font-extrabold text-slate-900" style={{ letterSpacing: '-0.03em' }}>
                Razones para elegir este destino
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {RAZONES.map(({ icon, texto }, i) => (
                <AnimateIn key={texto} animation="blur" delay={i * 70}>
                  <div className="premium-card p-5 flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                      style={{ background: 'rgba(27,103,232,0.07)' }}
                    >
                      {icon}
                    </div>
                    <p className="text-slate-700 text-sm leading-relaxed font-medium pt-1">{texto}</p>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </LazySection>

        {/* ── CTA ── */}
        <LazySection animation="fade">
          <AnimateIn animation="up">
            <div
              className="rounded-2xl p-12 text-center relative overflow-hidden"
              style={{ background: 'var(--dark)' }}
            >
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 110%, rgba(27,103,232,0.25) 0%, transparent 70%)' }} />
              <div className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(27,103,232,0.6) 30%, rgba(227,30,36,0.6) 70%, transparent)' }} />
              <div className="relative">
                <span className="badge badge-dark mb-5 inline-flex">Empieza hoy</span>
                <h2
                  className="text-4xl font-extrabold text-white mb-4"
                  style={{ letterSpacing: '-0.03em', lineHeight: '1.08' }}
                >
                  ¿Listo para estudiar<br />
                  <span className="gradient-text-light">en {nombre}?</span>
                </h2>
                <p className="text-slate-400 text-lg mb-10 max-w-lg mx-auto">
                  Agenda tu Diagnóstico Internacional Estratégico — es gratuito y sin compromiso.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link href="/contact" className="btn-primary">
                    Contactar Ahora
                  </Link>
                  <a
                    href={`https://wa.me/${waPrincipal}?text=Hola%2C%20me%20interesa%20estudiar%20en%20${encodeURIComponent(nombre)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost"
                    style={{ color: '#4ade80', borderColor: 'rgba(74,222,128,0.3)', background: 'rgba(74,222,128,0.08)' }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-4 h-4" fill="currentColor">
                      <path d="M16.003 2.667C8.638 2.667 2.667 8.638 2.667 16c0 2.354.618 4.663 1.793 6.695L2.667 29.333l6.82-1.778A13.264 13.264 0 0016.003 29.333c7.365 0 13.33-5.97 13.33-13.333 0-7.362-5.965-13.333-13.33-13.333z" />
                    </svg>
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </AnimateIn>
        </LazySection>

      </div>
    </div>
  );
}
