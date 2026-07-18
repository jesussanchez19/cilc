'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { Program, programColorMap } from '@/lib/data/programs';
import QuoteModal from './QuoteModal';

interface ProgramPageProps {
  program: Program;
}

function getProgramImages(slug: string) {
  const base = `/images/programs/${slug}`;
  return {
    hero:    `${base}/hero.png`,
    gallery: [`${base}/gallery-1.png`, `${base}/gallery-2.png`, `${base}/gallery-3.png`],
  };
}

const testimoniosPorPrograma: Record<string, { foto: string; nombre: string; pais: string; texto: string }[]> = {
  'idiomas': [
    { foto: '/images/programs/idiomas/testimonio-1.png', nombre: 'Sofía Ramírez', pais: 'Canadá 🇨🇦', texto: 'Aprender inglés en Vancouver cambió mi vida. CILC me guió en cada paso y la experiencia superó mis expectativas.' },
    { foto: '/images/programs/idiomas/testimonio-2.png', nombre: 'Carlos Mendoza', pais: 'Irlanda 🇮🇪', texto: 'Dublín fue increíble. En 3 meses mejoré mi inglés al nivel que necesitaba para mi trabajo.' },
    { foto: '/images/programs/idiomas/testimonio-3.png', nombre: 'Ana Torres', pais: 'Reino Unido 🇬🇧', texto: 'El equipo de CILC siempre estuvo disponible. La escuela que eligieron para mí fue perfecta.' },
  ],
  'au-pair': [
    { foto: '/images/programs/au-pair/testimonio-1.png', nombre: 'Valeria Cruz', pais: 'Francia 🇫🇷', texto: 'Vivir con una familia francesa fue una experiencia única. Aprendí el idioma y gané amigos para toda la vida.' },
    { foto: '/images/programs/au-pair/testimonio-2.png', nombre: 'Paola Soto', pais: 'Alemania 🇩🇪', texto: 'CILC me orientó en todo el proceso. La familia me trató como a un miembro más.' },
    { foto: '/images/programs/au-pair/testimonio-3.png', nombre: 'Mariana López', pais: 'Italia 🇮🇹', texto: 'Fue la mejor decisión de mi vida. Regresé con otro idioma, cultura y muchísima confianza.' },
  ],
  'anos-academicos': [
    { foto: '/images/programs/anos-academicos/testimonio-1.png', nombre: 'Diego Herrera', pais: 'Canadá 🇨🇦', texto: 'Un año en Toronto me abrió las puertas a una universidad internacional. Fue transformador.' },
    { foto: '/images/programs/anos-academicos/testimonio-2.png', nombre: 'Fernanda Ruiz', pais: 'Australia 🇦🇺', texto: 'El sistema educativo australiano es increíble. Volví con inglés fluido y una perspectiva global.' },
    { foto: '/images/programs/anos-academicos/testimonio-3.png', nombre: 'Luis Castillo', pais: 'Reino Unido 🇬🇧', texto: 'CILC gestionó todo: visas, escuela, familia anfitriona. Solo me preocupé por aprender.' },
  ],
  'estudia-trabaja': [
    { foto: '/images/programs/estudia-trabaja/testimonio-1.png', nombre: 'Andrea Flores', pais: 'Canadá 🇨🇦', texto: 'Estudié y trabajé al mismo tiempo. Cubrí mis gastos y acumulé experiencia laboral internacional.' },
    { foto: '/images/programs/estudia-trabaja/testimonio-2.png', nombre: 'Miguel Ángel', pais: 'Irlanda 🇮🇪', texto: 'Increíble programa. En 6 meses pagué mis estudios con el trabajo y me quedé con experiencia real.' },
    { foto: '/images/programs/estudia-trabaja/testimonio-3.png', nombre: 'Karla Vázquez', pais: 'Australia 🇦🇺', texto: 'CILC me asesoró perfectamente. El balance entre estudio y trabajo fue ideal para mí.' },
  ],
  'formacion-corporativa': [
    { foto: '/images/programs/formacion-corporativa/testimonio-1.png', nombre: 'Roberto Sánchez', pais: 'EUA 🇺🇸', texto: 'El programa corporativo elevó el nivel de inglés de mi equipo en pocas semanas. Muy recomendado.' },
    { foto: '/images/programs/formacion-corporativa/testimonio-2.png', nombre: 'Laura Moreno', pais: 'Canadá 🇨🇦', texto: 'CILC diseñó un plan a medida para nuestra empresa. Los resultados fueron inmediatos.' },
    { foto: '/images/programs/formacion-corporativa/testimonio-3.png', nombre: 'Jorge Peña', pais: 'Reino Unido 🇬🇧', texto: 'Excelente calidad educativa y atención personalizada. Volveré a contratar con CILC.' },
  ],
  'idiomas-en-linea': [
    { foto: '/images/programs/idiomas-en-linea/testimonio-1.png', nombre: 'Claudia Ríos', pais: 'México 🇲🇽', texto: 'Desde casa pude aprender inglés con maestros nativos. La plataforma y el ritmo fueron perfectos.' },
    { foto: '/images/programs/idiomas-en-linea/testimonio-2.png', nombre: 'Tomás Guerrero', pais: 'México 🇲🇽', texto: 'Sin salir de la oficina mejoré mi inglés de negocios. 100% recomendable.' },
    { foto: '/images/programs/idiomas-en-linea/testimonio-3.png', nombre: 'Gabriela Nieto', pais: 'México 🇲🇽', texto: 'Horarios flexibles y clases en vivo. CILC en línea es tan bueno como presencial.' },
  ],
};

function Carrusel({ images, accentColor }: { images: string[]; accentColor: string }) {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);
  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-slate-100" style={{ aspectRatio: '16/9' }}>
      {images.map((src, i) => (
        <div key={src} className={`absolute inset-0 transition-opacity duration-500 ${i === current ? 'opacity-100' : 'opacity-0'}`}>
          <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('${src}')` }} />
        </div>
      ))}
      <button onClick={prev} aria-label="Anterior"
        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
        style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.15)' }}>
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
      </button>
      <button onClick={next} aria-label="Siguiente"
        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
        style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.15)' }}>
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
      </button>
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)}
            className="h-1.5 rounded-full transition-all duration-300"
            style={{ width: i === current ? '20px' : '6px', background: i === current ? accentColor : 'rgba(255,255,255,0.5)' }} />
        ))}
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
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

export default function ProgramPage({ program }: ProgramPageProps) {
  const colors = programColorMap[program.color];
  const imgs = getProgramImages(program.slug);
  const testimonios = testimoniosPorPrograma[program.slug] ?? [];
  const [modalOpen, setModalOpen] = useState(false);

  const stats  = useSection(0.25);
  const hl     = useSection(0.25);
  const incl   = useSection(0.25);
  const badges = useSection(0.2);
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
            { value: `${program.countries.length} destinos`, label: 'Disponibles' },
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

        {/* Gallery */}
        <div className="mb-16">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-6" style={{ letterSpacing: '-0.02em' }}>
            Galería del programa
          </h2>
          <Carrusel images={imgs.gallery} accentColor="#3b82f6" />
        </div>

        {/* Destinations — pop in with stagger */}
        <div className="mb-16">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-5" style={{ letterSpacing: '-0.02em' }}>
            Destinos disponibles
          </h2>
          <div ref={badges.ref} className="flex flex-wrap gap-2">
            {program.countries.map((c, i) => (
              <span
                key={c}
                className={`px-4 py-2 ${colors.light} ${colors.text} rounded-full font-semibold text-sm border ${colors.border} reveal-scale ${badges.visible ? 'is-visible' : ''}`}
                style={{ transitionDelay: `${i * 45}ms` }}
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* Ideal for */}
        <div className="rounded-2xl p-8 mb-16" style={{ background: 'var(--surface-2)', border: '1px solid rgba(15,23,42,0.07)' }}>
          <h2 className="text-xl font-extrabold text-slate-900 mb-3" style={{ letterSpacing: '-0.02em' }}>
            ¿Para quién es este programa?
          </h2>
          <p className="text-slate-600 text-[15px] leading-relaxed">{program.idealFor}</p>
        </div>

        {/* Testimonials — blur in with stagger */}
        {testimonios.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-extrabold text-slate-900 mb-8 text-center" style={{ letterSpacing: '-0.02em' }}>
              Lo que dicen nuestros estudiantes
            </h2>
            <div ref={test.ref} className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {testimonios.map((t, i) => (
                <div
                  key={t.nombre}
                  className={`premium-card p-6 flex flex-col gap-4 reveal-blur ${test.visible ? 'is-visible' : ''}`}
                  style={{ transitionDelay: `${i * 130}ms` }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-cover bg-center shrink-0"
                      style={{ backgroundImage: `url('${t.foto}')`, boxShadow: '0 0 0 2px rgba(59,130,246,0.3), 0 0 0 4px rgba(59,130,246,0.1)' }} />
                    <div>
                      <p className="font-bold text-slate-900 text-sm">{t.nombre}</p>
                      <p className={`text-xs font-semibold ${colors.text}`}>{t.pais}</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
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
