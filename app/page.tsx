export const dynamic = 'force-dynamic';

import Link from 'next/link';
import Image from 'next/image';
import HeroBanner from '@/components/home/HeroBanner';
import FeaturedPrograms from '@/components/home/FeaturedPrograms';
import FeaturedCountries from '@/components/home/FeaturedCountries';
import StatsSection from '@/components/home/StatsSection';
import ArticleCard from '@/components/blog/ArticleCard';
import TestimonialsCarousel from '@/components/shared/TestimonialsCarousel';
import LazySection from '@/components/shared/LazySection';
import AnimateIn from '@/components/shared/AnimateIn';
import { getSocios, getTestimoniosAprobados, getLatestPosts } from '@/lib/sanity/queries';
import { urlFor } from '@/lib/sanity/image';
import type { Testimonial } from '@/components/shared/TestimonialsCarousel';


const LOGOS = [
  { name: 'ICEF',           src: '/images/logos/icef.png',       href: 'https://www.icef.com',        alt: 'Miembro certificado ICEF — red global de educación internacional' },
  { name: 'ALTO',           src: '/images/logos/alto.png',       href: 'https://www.altonetwork.com', alt: 'Miembro ALTO — Association of Language Travel Organisations' },
  { name: 'Pearson',        src: '/images/logos/pearson.png',    href: 'https://www.pearson.com',     alt: 'Partner Pearson — certificaciones internacionales de inglés' },
  { name: 'Cambridge',      src: '/images/logos/cambridge.png',  href: 'https://www.cambridgeenglish.org', alt: 'Exámenes Cambridge English — evaluaciones oficiales de inglés' },
  { name: 'IALC',           src: '/images/logos/ialc.png',       href: 'https://www.ialc.org',        alt: 'Miembro IALC — International Association of Language Centres' },
  { name: 'Immigration CA', src: '/images/logos/ircc.png',       href: 'https://www.canada.ca/immigration', alt: 'Canadá — Immigration, Refugees and Citizenship Canada' },
];

const VALUE_PROPS = [
  {
    title: 'Asesoría sin costo',
    desc: 'Te acompañamos desde el diagnóstico inicial hasta tu regreso. Sin costos de asesoría, sin letra pequeña.',
    image: '/images/card-asesoria.jpg',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
      </svg>
    ),
    accent: '#1B67E8',
  },
  {
    title: 'Diagnóstico personalizado',
    desc: 'No vendemos paquetes. Diseñamos tu ruta según tu perfil, objetivos y presupuesto.',
    image: '/images/card-diagnostico.jpg',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25Z" />
      </svg>
    ),
    accent: '#8b5cf6',
  },
  {
    title: 'Acompañamiento real',
    desc: 'Estamos contigo antes, durante y después de tu experiencia. No desaparecemos al venderte.',
    image: '/images/card-acompanamiento.jpg',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
    accent: '#10b981',
  },
  {
    title: 'Trámites simplificados',
    desc: 'Gestionamos visa, seguro médico, inscripción y logística. Tú solo preocúpate por vivir la experiencia.',
    image: '/images/card-tramites.jpg',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
      </svg>
    ),
    accent: '#f59e0b',
  },
  {
    title: '+23 años de experiencia',
    desc: 'Hemos ayudado a miles de estudiantes mexicanos a estudiar en el extranjero con éxito comprobado.',
    image: '/images/card-experiencia.jpg',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 3.741-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
      </svg>
    ),
    accent: '#E31E24',
  },
  {
    title: 'Red global de escuelas',
    desc: 'Trabajamos con instituciones acreditadas en Canadá, USA, Inglaterra, Irlanda y más países.',
    image: '/images/card-red-global.jpg',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
    accent: '#06b6d4',
  },
];

export default async function Home() {
  const [ultimosArticulos, socios, testimoniosRaw] = await Promise.all([
    getLatestPosts(3),
    getSocios(),
    getTestimoniosAprobados(),
  ]);

  const conCalificacion = testimoniosRaw.filter((t) => t.calificacion);
  const promedioCalificacion = conCalificacion.length > 0
    ? conCalificacion.reduce((sum, t) => sum + (t.calificacion ?? 0), 0) / conCalificacion.length
    : undefined;

  const testimonios: Testimonial[] = testimoniosRaw.map((t) => ({
    nombre: t.nombre,
    pais: t.pais,
    bandera: t.bandera ?? '',
    programa: t.programa,
    texto: t.texto,
    foto: t.foto ? urlFor(t.foto).width(200).height(200).fit('crop').url() : '',
    videoUrl: t.videoUrl,
    calificacion: t.calificacion,
  }));

  return (
    <div>
      {/* Announcement bar — brand gradient */}
      <div style={{ background: 'linear-gradient(90deg, #0D3494 0%, #1B67E8 45%, #C71D22 100%)', borderBottom: '1px solid rgba(255,255,255,0.15)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center">
          <p className="text-[13px] text-white font-medium leading-snug">
            <span style={{ background: 'rgba(255,255,255,0.22)', padding: '2px 9px', borderRadius: '99px', fontWeight: 700, marginRight: '6px' }}>Nuevo</span>
            Consulta gratuita — Agenda tu Diagnóstico Internacional Estratégico hoy mismo
          </p>
          <a
            href="https://wa.me/525518944494?text=Hola%2C%20quiero%20agendar%20mi%20consulta%20gratuita"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-3.5 py-1.5 rounded-lg text-[12px] font-bold text-white whitespace-nowrap transition-all duration-200 hover:scale-105"
            style={{ background: 'rgba(255,255,255,0.20)', border: '1px solid rgba(255,255,255,0.45)', backdropFilter: 'blur(8px)' }}
          >
            Agendar ahora →
          </a>
        </div>
      </div>

      <HeroBanner />

      {/* ── Proof: logos de socios certificados (social proof justo después del hero) ── */}
      <section className="py-12 bg-white" style={{ borderBottom: '1px solid rgba(15,23,42,0.06)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-8">
            Miembros y socios certificados
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-6 items-center">
            {LOGOS.map(({ name, src, href, alt }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all duration-300"
                aria-label={`Visitar sitio de ${name} (abre en nueva pestaña)`}
              >
                <Image src={src} alt={alt} width={120} height={45} className="h-10 w-auto object-contain" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <FeaturedPrograms />
      <div className="section-divider" />
      <FeaturedCountries />
      <div className="section-divider" />
      <StatsSection promedioCalificacion={promedioCalificacion} />

      {/* ── Por qué elegirnos ── */}
      <LazySection animation="slide">
        <section className="py-24" style={{ background: 'var(--dark)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="text-center mb-16">
              <span className="badge badge-dark mb-5">¿Por qué CILC?</span>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4"
                style={{ letterSpacing: '-0.03em', lineHeight: '1.08' }}>
                Más de 23 años{' '}
                <span className="gradient-text-light">abriendo puertas al mundo</span>
              </h2>
              <p className="text-slate-400 text-lg max-w-lg mx-auto">
                No somos una agencia más. Somos tu equipo de confianza para estudiar en el extranjero.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {VALUE_PROPS.map(({ icon, title, desc, image, accent }, i) => (
                <AnimateIn key={title} animation="blur" delay={i * 80}>
                <div
                  className="relative rounded-2xl overflow-hidden group min-h-52 flex items-end"
                  style={{ border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  {/* Background image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center scale-105 group-hover:scale-100 transition-transform duration-500"
                    style={{ backgroundImage: `url('${image}')`, filter: 'blur(2px)' }}
                  />
                  <div className="absolute inset-0 bg-[#0f172a]/75 group-hover:bg-[#0f172a]/65 transition-colors duration-300" />

                  {/* Content */}
                  <div className="relative z-10 p-6 flex gap-4 items-start w-full">
                    <div
                      className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200"
                      style={{ background: `${accent}20`, border: `1px solid ${accent}40`, color: accent }}
                    >
                      {icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-sm mb-1.5">{title}</h3>
                      <p className="text-slate-400 text-[13px] leading-relaxed">{desc}</p>
                    </div>
                  </div>
                </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>
      </LazySection>

      {/* ── Socios y Miembros — solo si el admin agregó contenido en Sanity ── */}
      {socios.length > 0 && (
        <LazySection animation="fade">
          <section className="py-14 bg-white" style={{ borderTop: '1px solid rgba(15,23,42,0.06)' }}>
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <p className="text-center text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-10">
                Miembros y socios certificados
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 items-start">
                {socios.map((s) => {
                  const inner = (
                    <>
                      <Image
                        src={urlFor(s.logo).width(200).height(200).fit('crop').url()}
                        alt={`${s.nombre} — ${s.cargo}`}
                        width={80} height={80}
                        className="w-20 h-20 rounded-full object-cover mx-auto mb-3 grayscale group-hover:grayscale-0 transition-all duration-300"
                      />
                      <p className="text-sm font-semibold text-slate-800 text-center leading-tight">{s.nombre}</p>
                      <p className="text-xs text-slate-400 text-center mt-0.5">{s.cargo}</p>
                    </>
                  );
                  return s.url ? (
                    <a key={s._id} href={s.url} target="_blank" rel="noopener noreferrer"
                      className="group flex flex-col items-center hover:opacity-90 transition-opacity duration-200">
                      {inner}
                    </a>
                  ) : (
                    <div key={s._id} className="group flex flex-col items-center">
                      {inner}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </LazySection>
      )}

      {/* ── Testimonios — solo si hay aprobados en Sanity ── */}
      {testimonios.length > 0 && (
        <LazySection animation="slide">
          <TestimonialsCarousel testimonials={testimonios} />
        </LazySection>
      )}

      {/* ── Blog ── */}
      {ultimosArticulos.length > 0 && (
        <LazySection animation="slide">
          <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
                <div>
                  <span className="badge mb-4">Blog CILC</span>
                  <h2 className="text-4xl font-extrabold text-slate-900"
                    style={{ letterSpacing: '-0.03em', lineHeight: '1.08' }}>
                    Últimas noticias
                  </h2>
                </div>
                <Link
                  href="/blog"
                  className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-1.5 transition-colors duration-150 whitespace-nowrap"
                >
                  Ver todos los artículos
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {ultimosArticulos.map((post) => (
                  <ArticleCard key={post._id} post={post} />
                ))}
              </div>
            </div>
          </section>
        </LazySection>
      )}

      {/* ── CTA final ── */}
      <LazySection animation="fade">
        <section className="py-24 relative overflow-hidden" style={{ background: 'var(--dark)' }}>
          {/* Background glow — logo colors */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 55% 55% at 30% 100%, rgba(27,103,232,0.22) 0%, transparent 65%)' }} />
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 55% 55% at 70% 100%, rgba(227,30,36,0.16) 0%, transparent 65%)' }} />
          {/* Brand accent top border */}
          <div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(27,103,232,0.7) 30%, rgba(227,30,36,0.7) 70%, transparent)' }} />
          <div className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }} />

          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
            <span className="badge badge-dark mb-6">Empieza hoy</span>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-5"
              style={{ letterSpacing: '-0.03em', lineHeight: '1.08' }}>
              ¿Listo para transformar
              <br />
              <span className="gradient-text-light">tu futuro?</span>
            </h2>
            <p className="text-slate-400 text-lg mb-10 max-w-lg mx-auto">
              Agenda hoy tu Diagnóstico Internacional Estratégico — es gratuito y sin compromiso.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact" className="btn-primary">
                Contactar Ahora
              </Link>
              <a
                href="https://wa.me/525518944494?text=Hola%2C%20me%20interesa%20información%20sobre%20estudios%20en%20el%20extranjero"
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
        </section>
      </LazySection>
    </div>
  );
}
