export const revalidate = 60;

import type { Metadata } from 'next';
import ContactForm from '@/components/shared/ContactForm';
import AnimateIn from '@/components/shared/AnimateIn';
import { getContactInfo } from '@/lib/sanity/queries';
import { resolverUbicacion } from '@/lib/ubicacion';

export const metadata: Metadata = {
  title: 'Contacto | CILC',
  description: 'Más de 23 años ayudando a estudiantes mexicanos a estudiar en el extranjero. Cuéntanos tu caso y te asesoramos sin costo.',
};

export default async function ContactPage() {
  const contact = await getContactInfo();
  const phones = contact.telefonos ?? [];
  const mainPhone = (phones.find((p) => p.esPrincipal) ?? phones[0])?.wa ?? '525518944494';
  const email = contact.emailAdmin;
  /**
   * La dirección sale de `resolverUbicacion`, no de la URL del mapa.
   *
   * Antes esta página prefería el texto que venía dentro de la URL de Google
   * Maps y el pie de página usaba el campo escrito, así que el sitio enseñaba
   * dos direcciones distintas a la vez. Ahora las dos leen lo mismo.
   */
  const { direccion: displayAddress, embedSrc: mapEmbedSrc, enlace: mapsLink } =
    resolverUbicacion(contact.direccion, contact.urlMapa);
  const addressLines = displayAddress.split(/,\s*|\n/).filter(Boolean);
  return (
    <div>

      {/* ── Hero ── */}
      <section className="relative pt-24 pb-20 overflow-hidden" style={{ background: 'var(--dark)' }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 120%, rgba(37,99,235,0.18) 0%, transparent 70%)' }} />
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }} />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="badge badge-dark mb-6">Contacto</span>
          <h1
            className="text-5xl sm:text-6xl font-extrabold text-white mb-5"
            style={{ letterSpacing: '-0.04em', lineHeight: '1.04' }}
          >
            Hablemos de tu{' '}
            <span className="gradient-text-light">futuro</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
            Más de 23 años ayudando a estudiantes mexicanos a estudiar en el extranjero.
            Cuéntanos tu caso y te asesoramos sin costo.
          </p>
        </div>
      </section>

      {/* ── Contact cards ── */}
      <section className="py-14" style={{ background: 'var(--dark)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5 items-stretch">

            {/* Email */}
            <AnimateIn animation="blur" delay={0} className="h-full">
              <a
                href={`mailto:${email}`}
                className="group rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 hover:scale-[1.02] h-full"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.25)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1.5">Email</p>
                  <p className="text-white font-semibold text-sm break-all group-hover:text-blue-400 transition-colors duration-200">
                    {email}
                  </p>
                </div>
              </a>
            </AnimateIn>

            {/* WhatsApp */}
            <AnimateIn animation="blur" delay={110} className="h-full">
              <a
                href={`https://wa.me/${mainPhone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 hover:scale-[1.02] h-full"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.25)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-6 h-6 text-green-400" fill="currentColor">
                    <path d="M16.003 2.667C8.638 2.667 2.667 8.638 2.667 16c0 2.354.618 4.663 1.793 6.695L2.667 29.333l6.82-1.778A13.264 13.264 0 0016.003 29.333c7.365 0 13.33-5.97 13.33-13.333 0-7.362-5.965-13.333-13.33-13.333z" />
                  </svg>
                </div>
                <div>
                  <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1.5">WhatsApp</p>
                  {phones.map((p) => (
                    <p key={p.wa} className="text-white font-semibold text-sm group-hover:text-green-400 transition-colors duration-200">
                      +{p.wa.startsWith('52') ? '52 ' : ''}{p.display}
                    </p>
                  ))}
                </div>
              </a>
            </AnimateIn>

            {/* Oficina */}
            <AnimateIn animation="blur" delay={220} className="h-full">
              {mapsLink ? (
                <a
                  href={mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 hover:scale-[1.02] h-full"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.25)' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1.5">Oficina</p>
                    <p className="text-white font-semibold text-sm leading-relaxed group-hover:text-violet-400 transition-colors duration-200 text-left">
                      {addressLines.map((line, i) => (
                        <span key={i}>{line}{i < addressLines.length - 1 && <br />}</span>
                      ))}
                    </p>
                  </div>
                </a>
              ) : (
                <div
                  className="rounded-2xl p-6 flex flex-col gap-4 h-full"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.25)' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1.5">Oficina</p>
                    <p className="text-white font-semibold text-sm leading-relaxed">
                      {addressLines.map((line, i) => (
                        <span key={i}>{line}{i < addressLines.length - 1 && <br />}</span>
                      ))}
                    </p>
                  </div>
                </div>
              )}
            </AnimateIn>
          </div>

          {/* WhatsApp CTA banner */}
          <AnimateIn animation="up" delay={120}>
          <div
            className="rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
            style={{
              background: 'linear-gradient(135deg, rgba(22,163,74,0.12) 0%, rgba(34,197,94,0.06) 100%)',
              border: '1px solid rgba(34,197,94,0.2)',
            }}
          >
            <div>
              <p className="text-white font-bold text-base mb-1">¿Prefieres escribirnos directo?</p>
              <p className="text-slate-400 text-sm">Respondemos en minutos. Sin esperas, sin formularios.</p>
            </div>
            <a
              href={`https://wa.me/${mainPhone}?text=Hola%2C%20me%20interesa%20información%20sobre%20estudios%20en%20el%20extranjero`}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:scale-105"
              style={{ background: 'linear-gradient(135deg,#22c55e,#16a34a)', boxShadow: '0 4px 16px rgba(34,197,94,0.35)' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-4 h-4" fill="currentColor">
                <path d="M16.003 2.667C8.638 2.667 2.667 8.638 2.667 16c0 2.354.618 4.663 1.793 6.695L2.667 29.333l6.82-1.778A13.264 13.264 0 0016.003 29.333c7.365 0 13.33-5.97 13.33-13.333 0-7.362-5.965-13.333-13.33-13.333z" />
              </svg>
              Abrir WhatsApp
            </a>
          </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── Mapa ── */}
      {mapEmbedSrc && (
        <section className="py-0" style={{ background: 'var(--dark)' }}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
            <div
              className="overflow-hidden rounded-2xl aspect-video sm:aspect-16/7"
              style={{ border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <iframe
                src={mapEmbedSrc}
                width="100%"
                height="100%"
                style={{ border: 0, display: 'block' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de la oficina CILC"
              />
            </div>
          </div>
        </section>
      )}

      {/* ── Formulario ── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="badge mb-5">Formulario</span>
            <h2
              className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3"
              style={{ letterSpacing: '-0.03em', lineHeight: '1.08' }}
            >
              Cuéntanos tu caso
            </h2>
            <p className="text-slate-500">Te respondemos en menos de 24 horas hábiles.</p>
          </div>

          <div
            className="rounded-2xl p-4 sm:p-8 md:p-12"
            style={{ border: '1px solid rgba(15,23,42,0.08)', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}
          >
            <ContactForm />
          </div>
        </div>
      </section>

    </div>
  );
}
