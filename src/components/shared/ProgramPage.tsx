'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { Program, ProgramSection, programColorMap } from '@/lib/data/programs';
import { countries } from '@/lib/data/countries';
import { SanityTestimonial } from '@/lib/sanity/queries';
import { urlFor } from '@/lib/sanity/image';
import QuoteModal from './QuoteModal';

interface ProgramPageProps {
  program: Program;
  testimoniosSanity?: SanityTestimonial[];
  destinosSanity?: string[];
}

function getProgramImages(slug: string) {
  const base = `/images/programs/${slug}`;
  return {
    hero:    `${base}/hero.png`,
    gallery: [`${base}/gallery-1.png`, `${base}/gallery-2.png`, `${base}/gallery-3.png`],
  };
}


function Carrusel({ images, accentColor }: { images: string[]; accentColor: string }) {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAuto = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % images.length);
    }, 3500);
  };

  useEffect(() => {
    startAuto();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images.length]);

  const prev = () => { setCurrent((c) => (c - 1 + images.length) % images.length); startAuto(); };
  const next = () => { setCurrent((c) => (c + 1) % images.length); startAuto(); };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="relative w-full overflow-hidden rounded-2xl bg-slate-100" style={{ aspectRatio: '16/9' }}>
        {images.map((src, i) => (
          <div key={src} className={`absolute inset-0 transition-opacity duration-700 ${i === current ? 'opacity-100' : 'opacity-0'}`}>
            <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('${src}')` }} />
          </div>
        ))}
        <button onClick={prev} aria-label="Anterior"
          className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
          style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.15)' }}>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <button onClick={next} aria-label="Siguiente"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
          style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.15)' }}>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        </button>
        <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex gap-1.5">
          {images.map((_, i) => (
            <button key={i} onClick={() => { setCurrent(i); startAuto(); }}
              className="h-1 rounded-full transition-all duration-300"
              style={{ width: i === current ? '18px' : '5px', background: i === current ? accentColor : 'rgba(255,255,255,0.5)' }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function useSection(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let obs: IntersectionObserver;
    const timer = setTimeout(() => {
      obs = new IntersectionObserver(
        ([e]) => { setVisible(e.isIntersecting); },
        { threshold }
      );
      obs.observe(el);
    }, 80);
    return () => { clearTimeout(timer); obs?.disconnect(); };
  }, [threshold]);

  return { ref, visible };
}

export default function ProgramPage({ program, testimoniosSanity = [], destinosSanity }: ProgramPageProps) {
  const destinosResolved = destinosSanity
    ? destinosSanity.map((id) => countries.find((c) => c.id === id)).filter(Boolean)
    : null;
  const colors = programColorMap[program.color];
  const imgs = getProgramImages(program.slug);
  const [modalOpen, setModalOpen] = useState(false);

  // Solo muestra galería cuando hay fotos de testimonios del programa
  const galleryImages = testimoniosSanity
    .filter((t) => t.foto?.asset?._ref)
    .map((t) => urlFor(t.foto!).width(760).height(427).fit('crop').url());

  const stats  = useSection(0.25);
  const hl     = useSection(0.25);
  const incl   = useSection(0.25);
  const badges = useSection(0.2);
  const sect   = useSection(0.15);
  const test   = useSection(0.2);

  const programaNombre: Record<string, string> = {
    'idiomas': 'Idiomas', 'au-pair': 'Au Pair', 'anos-academicos': 'Años Académicos',
    'estudia-trabaja': 'Estudia y Trabaja', 'formacion-corporativa': 'Formación Corporativa', 'idiomas-en-linea': 'Idiomas en Línea',
  };
  const programaParaModal = programaNombre[program.slug] ?? program.title;

  return (
    <div>
      {/* HERO */}
      <div className="relative min-h-160 flex items-end overflow-hidden">
        <div className={`absolute inset-0 bg-cover ${program.slug === 'anos-academicos' ? 'bg-top' : 'bg-center'}`} style={{ backgroundImage: `url('${imgs.hero}')` }} />
        <div className="absolute inset-0 bg-linear-to-t from-[#0f172a]/95 via-[#0f172a]/55 to-[#0f172a]/20" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-48 w-full">
          <div className="max-w-3xl">
            <span className="badge badge-dark mb-5 inline-flex animate-slide-up" style={{ animationDelay: '0ms', animationFillMode: 'both' }}>
              {program.icon} {program.subtitle}
            </span>
            <h1 className="text-5xl font-extrabold text-white mb-4 animate-slide-up"
              style={{ animationDelay: '100ms', animationFillMode: 'both', letterSpacing: '-0.03em', lineHeight: '1.06' }}>
              {program.title}
            </h1>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed max-w-xl animate-slide-up"
              style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
              {program.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 animate-slide-up"
              style={{ animationDelay: '300ms', animationFillMode: 'both' }}>
              <button onClick={() => setModalOpen(true)} className="btn-primary">
                Obtén tu cotización gratis
              </button>
              <Link href="/contact" className="btn-ghost">
                Solicitar Información
              </Link>
              <a href="https://wa.me/525518944494" target="_blank" rel="noopener noreferrer"
                className="btn-ghost"
                style={{ color: '#4ade80', borderColor: 'rgba(74,222,128,0.3)', background: 'rgba(74,222,128,0.08)' }}>
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Stats — scale in with stagger */}
        <div ref={stats.ref} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          {[
            { value: program.duration,                  label: 'Duración' },
            { value: program.ageRange,                  label: 'Rango de edad' },
            { value: `${destinosResolved ? destinosResolved.length : program.countries.length} destinos`, label: 'Disponibles' },
          ].map(({ value, label }, i) => (
            <div
              key={label}
              className={`premium-card p-6 text-center reveal-scale ${stats.visible ? 'is-visible' : ''}`}
              style={{ transitionDelay: `${i * 110}ms` }}
            >
              <div className={`text-2xl font-extrabold ${colors.text} mb-1`}>{value}</div>
              <p className="text-slate-500 text-sm">{label}</p>
            </div>
          ))}
        </div>

        {/* Highlights + Includes — slide from left / right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div ref={hl.ref}>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-6" style={{ letterSpacing: '-0.02em' }}>
              Puntos clave
            </h2>
            <ul className="space-y-3">
              {program.highlights.map((h, i) => (
                <li
                  key={h}
                  className={`flex items-start gap-3 reveal-left ${hl.visible ? 'is-visible' : ''}`}
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <span className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                    style={{ background: `${colors.text.includes('blue') ? '#dbeafe' : '#f3e8ff'}` }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`w-3 h-3 ${colors.text}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-slate-600 text-[15px]">{h}</span>
                </li>
              ))}
            </ul>
          </div>
          <div ref={incl.ref}>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-6" style={{ letterSpacing: '-0.02em' }}>
              ¿Qué incluye?
            </h2>
            <ul className="space-y-3">
              {program.includes.map((item, i) => (
                <li
                  key={item}
                  className={`flex items-start gap-3 reveal-right ${incl.visible ? 'is-visible' : ''}`}
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-slate-300 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                  <span className="text-slate-600 text-[15px]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Gallery — solo si hay fotos de testimonios */}
        {galleryImages.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-extrabold text-slate-900 mb-6" style={{ letterSpacing: '-0.02em' }}>
              Galería del programa
            </h2>
            <Carrusel images={galleryImages} accentColor={colors.text.includes('blue') ? '#3b82f6' : '#8b5cf6'} />
          </div>
        )}

        {/* Destinations — pop in with stagger */}
        <div className="mb-16">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-5" style={{ letterSpacing: '-0.02em' }}>
            Destinos disponibles
          </h2>
          <div ref={badges.ref} className="flex flex-wrap gap-2">
            {(destinosResolved
              ? destinosResolved.map((c, i) => (
                  <Link
                    key={c!.id}
                    href={`/destinos/${c!.id}`}
                    className={`px-4 py-2 ${colors.light} ${colors.text} rounded-full font-semibold text-sm border ${colors.border} reveal-scale ${badges.visible ? 'is-visible' : ''} hover:opacity-80 transition-opacity`}
                    style={{ transitionDelay: `${i * 45}ms` }}
                  >
                    {c!.flag} {c!.name}
                  </Link>
                ))
              : program.countries.map((c, i) => (
                <span
                  key={c}
                  className={`px-4 py-2 ${colors.light} ${colors.text} rounded-full font-semibold text-sm border ${colors.border} reveal-scale ${badges.visible ? 'is-visible' : ''}`}
                  style={{ transitionDelay: `${i * 45}ms` }}
                >
                  {c}
                </span>
              ))
            )}
          </div>
        </div>

        {/* Ideal for */}
        <div className="rounded-2xl p-8 mb-16" style={{ background: 'var(--surface-2)', border: '1px solid rgba(15,23,42,0.07)' }}>
          <h2 className="text-xl font-extrabold text-slate-900 mb-3" style={{ letterSpacing: '-0.02em' }}>
            ¿Para quién es este programa?
          </h2>
          <p className="text-slate-600 text-[15px] leading-relaxed">{program.idealFor}</p>
        </div>

        {/* Extra sections — per-program rich content */}
        {program.sections && program.sections.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-extrabold text-slate-900 mb-8" style={{ letterSpacing: '-0.02em' }}>
              Modalidades y Destinos
            </h2>
            <div ref={sect.ref} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {program.sections.map((s: ProgramSection, i: number) => (
                <div
                  key={s.title}
                  className={`premium-card p-6 reveal-scale ${sect.visible ? 'is-visible' : ''}`}
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <h3 className={`text-base font-extrabold ${colors.text} mb-1`} style={{ letterSpacing: '-0.01em' }}>
                    {s.title}
                  </h3>
                  {s.description && (
                    <p className="text-slate-500 text-sm mb-3">{s.description}</p>
                  )}
                  {s.items && s.items.length > 0 && (
                    <ul className="space-y-1.5">
                      {s.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-slate-600 text-sm">
                          <span className={`shrink-0 mt-1 w-1.5 h-1.5 rounded-full ${colors.bg}`} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Testimonials — blur in with stagger */}
        {testimoniosSanity.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-extrabold text-slate-900 mb-8 text-center" style={{ letterSpacing: '-0.02em' }}>
              Lo que dicen nuestros estudiantes
            </h2>
            <div ref={test.ref} className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {testimoniosSanity.map((t, i) => (
                <div
                  key={t._id}
                  className={`premium-card p-6 flex flex-col gap-3 reveal-blur ${test.visible ? 'is-visible' : ''}`}
                  style={{ transitionDelay: `${i * 130}ms` }}
                >
                  <p className="font-bold text-slate-900 text-sm">{t.nombre}</p>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, j) => (
                      <svg key={j} className={`w-4 h-4 ${j < (t.calificacion ?? 5) ? 'text-amber-400' : 'text-slate-200'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed">&ldquo;{t.texto}&rdquo;</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA Final — border beam */}
        <div className="rounded-2xl p-12 text-center relative overflow-hidden" style={{ background: 'var(--dark)' }}>
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 100%, rgba(37,99,235,0.2) 0%, transparent 70%)' }} />

          {/* Beam azul → rojo (logo CILC) — borde superior */}
          <span
            className="absolute top-0 left-0 h-px w-36 rounded-full pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(27,103,232,0.9), rgba(227,30,36,0.9), transparent)',
              animation: 'scanLine 3.5s ease-in-out infinite',
            }}
          />
          {/* Beam rojo → azul — borde inferior (offset) */}
          <span
            className="absolute bottom-0 left-0 h-px w-36 rounded-full pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(227,30,36,0.9), rgba(27,103,232,0.9), transparent)',
              animation: 'scanLine 3.5s ease-in-out infinite 1.75s',
            }}
          />

          <div className="relative">
            <h2 className="text-3xl font-extrabold text-white mb-4" style={{ letterSpacing: '-0.03em' }}>
              ¿Te interesa este programa?
            </h2>
            <p className="text-slate-400 mb-8 text-[15px] max-w-md mx-auto">
              Agenda tu Diagnóstico Internacional Estratégico — gratuito y sin compromiso.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button onClick={() => setModalOpen(true)} className="btn-primary">
                Obtén tu cotización gratis
              </button>
              <Link href="/contact" className="btn-ghost">
                Solicitar Información
              </Link>
              <a href={`https://wa.me/525518944494?text=Hola%2C%20me%20interesa%20el%20programa%20de%20${encodeURIComponent(program.title)}`}
                target="_blank" rel="noopener noreferrer"
                className="btn-ghost"
                style={{ color: '#4ade80', borderColor: 'rgba(74,222,128,0.3)', background: 'rgba(74,222,128,0.08)' }}>
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      <QuoteModal isOpen={modalOpen} onClose={() => setModalOpen(false)} programaInicial={programaParaModal} />

      {/* Sticky CTA bar — mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 px-4 py-3 flex gap-3"
        style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)', borderTop: '1px solid rgba(15,23,42,0.08)', boxShadow: '0 -4px 24px rgba(0,0,0,0.08)' }}>
        <a
          href="https://wa.me/525518944494"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm text-white transition-all duration-200 active:scale-95"
          style={{ background: 'linear-gradient(135deg,#22c55e,#16a34a)' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-4 h-4" fill="currentColor">
            <path d="M16.003 2.667C8.638 2.667 2.667 8.638 2.667 16c0 2.354.618 4.663 1.793 6.695L2.667 29.333l6.82-1.778A13.264 13.264 0 0016.003 29.333c7.365 0 13.33-5.97 13.33-13.333 0-7.362-5.965-13.333-13.33-13.333z" />
          </svg>
          WhatsApp
        </a>
        <button
          onClick={() => setModalOpen(true)}
          className="flex-1 py-3 rounded-xl font-bold text-sm text-white transition-all duration-200 active:scale-95"
          style={{ background: 'linear-gradient(135deg,#3b82f6,#2563eb)' }}
        >
          Cotizar gratis
        </button>
      </div>

      <div className="md:hidden h-20" />
    </div>
  );
}
