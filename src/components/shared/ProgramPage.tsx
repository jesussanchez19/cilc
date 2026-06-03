'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Program, programColorMap } from '@/lib/data/programs';

interface ProgramPageProps {
  program: Program;
}

// ─────────────────────────────────────────────────────────────────────────────
//  IMÁGENES POR PROGRAMA
//  Carpeta base: public/images/programs/<slug>/
//
//  Estructura esperada por cada programa:
//    hero.png          → imagen del banner principal
//    gallery-1.png     → primera foto del carrusel
//    gallery-2.png     → segunda foto del carrusel
//    gallery-3.png     → tercera foto del carrusel
//
//  Ejemplo: public/images/programs/idiomas/hero.png
// ─────────────────────────────────────────────────────────────────────────────
function getProgramImages(slug: string) {
  const base = `/images/programs/${slug}`;
  return {
    hero:    `${base}/hero.png`,
    gallery: [
      `${base}/gallery-1.png`,
      `${base}/gallery-2.png`,
      `${base}/gallery-3.png`,
    ],
  };
}

// ─────────────────────────────────────────────────────────────────────────────
//  TESTIMONIOS POR PROGRAMA
//  Foto:  public/images/programs/<slug>/testimonio-<n>.png
//  Edita el texto, nombre y país de cada testimonio aquí abajo.
// ─────────────────────────────────────────────────────────────────────────────
const testimoniosPorPrograma: Record<string, { foto: string; nombre: string; pais: string; texto: string }[]> = {
  'idiomas': [
    { foto: '/images/programs/idiomas/testimonio-1.png', nombre: 'Sofía Ramírez', pais: 'Canadá 🇨🇦', texto: 'Aprender inglés en Vancouver cambió mi vida. CILC me guió en cada paso y la experiencia superó mis expectativas.' },
    { foto: '/images/programs/idiomas/testimonio-2.png', nombre: 'Carlos Mendoza', pais: 'Irlanda 🇮🇪', texto: 'Dublín fue increíble. En 3 meses mejoré mi inglés al nivel que necesitaba para mi trabajo.' },
    { foto: '/images/programs/idiomas/testimonio-3.png', nombre: 'Ana Torres',    pais: 'Reino Unido 🇬🇧', texto: 'El equipo de CILC siempre estuvo disponible. La escuela que eligieron para mí fue perfecta.' },
  ],
  'au-pair': [
    { foto: '/images/programs/au-pair/testimonio-1.png', nombre: 'Valeria Cruz',  pais: 'Francia 🇫🇷',  texto: 'Vivir con una familia francesa fue una experiencia única. Aprendí el idioma y gané amigos para toda la vida.' },
    { foto: '/images/programs/au-pair/testimonio-2.png', nombre: 'Paola Soto',    pais: 'Alemania 🇩🇪', texto: 'CILC me orientó en todo el proceso. La familia me trató como a un miembro más.' },
    { foto: '/images/programs/au-pair/testimonio-3.png', nombre: 'Mariana López', pais: 'Italia 🇮🇹',   texto: 'Fue la mejor decisión de mi vida. Regresé con otro idioma, cultura y muchísima confianza.' },
  ],
  'anos-academicos': [
    { foto: '/images/programs/anos-academicos/testimonio-1.png', nombre: 'Diego Herrera',  pais: 'Canadá 🇨🇦',     texto: 'Un año en Toronto me abrió las puertas a una universidad internacional. Fue transformador.' },
    { foto: '/images/programs/anos-academicos/testimonio-2.png', nombre: 'Fernanda Ruiz',  pais: 'Australia 🇦🇺',   texto: 'El sistema educativo australiano es increíble. Volví con inglés fluido y una perspectiva global.' },
    { foto: '/images/programs/anos-academicos/testimonio-3.png', nombre: 'Luis Castillo',  pais: 'Reino Unido 🇬🇧', texto: 'CILC gestionó todo: visas, escuela, familia anfitriona. Solo me preocupé por aprender.' },
  ],
  'estudia-trabaja': [
    { foto: '/images/programs/estudia-trabaja/testimonio-1.png', nombre: 'Andrea Flores',  pais: 'Canadá 🇨🇦',  texto: 'Estudié y trabajé al mismo tiempo. Cubrí mis gastos y acumulé experiencia laboral internacional.' },
    { foto: '/images/programs/estudia-trabaja/testimonio-2.png', nombre: 'Miguel Ángel',   pais: 'Irlanda 🇮🇪', texto: 'Increíble programa. En 6 meses pagué mis estudios con el trabajo y me quedé con experiencia real.' },
    { foto: '/images/programs/estudia-trabaja/testimonio-3.png', nombre: 'Karla Vázquez',  pais: 'Australia 🇦🇺', texto: 'CILC me asesoró perfectamente. El balance entre estudio y trabajo fue ideal para mí.' },
  ],
  'formacion-corporativa': [
    { foto: '/images/programs/formacion-corporativa/testimonio-1.png', nombre: 'Roberto Sánchez', pais: 'EUA 🇺🇸',        texto: 'El programa corporativo elevó el nivel de inglés de mi equipo en pocas semanas. Muy recomendado.' },
    { foto: '/images/programs/formacion-corporativa/testimonio-2.png', nombre: 'Laura Moreno',    pais: 'Canadá 🇨🇦',     texto: 'CILC diseñó un plan a medida para nuestra empresa. Los resultados fueron inmediatos.' },
    { foto: '/images/programs/formacion-corporativa/testimonio-3.png', nombre: 'Jorge Peña',      pais: 'Reino Unido 🇬🇧', texto: 'Excelente calidad educativa y atención personalizada. Volveré a contratar con CILC.' },
  ],
  'idiomas-en-linea': [
    { foto: '/images/programs/idiomas-en-linea/testimonio-1.png', nombre: 'Claudia Ríos',    pais: 'México 🇲🇽', texto: 'Desde casa pude aprender inglés con maestros nativos. La plataforma y el ritmo fueron perfectos.' },
    { foto: '/images/programs/idiomas-en-linea/testimonio-2.png', nombre: 'Tomás Guerrero',  pais: 'México 🇲🇽', texto: 'Sin salir de la oficina mejoré mi inglés de negocios. 100% recomendable.' },
    { foto: '/images/programs/idiomas-en-linea/testimonio-3.png', nombre: 'Gabriela Nieto',  pais: 'México 🇲🇽', texto: 'Horarios flexibles y clases en vivo. CILC en línea es tan bueno como presencial.' },
  ],
};

// ── Carrusel ─────────────────────────────────────────────────────────────────
function Carrusel({ images, accentBg }: { images: string[]; accentBg: string }) {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  return (
    <div className="relative w-full overflow-hidden rounded-2xl shadow-lg aspect-video bg-gray-100">
      {/* Imágenes */}
      {images.map((src, i) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-500 ${i === current ? 'opacity-100' : 'opacity-0'}`}
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url('${src}')` }}
          />
        </div>
      ))}

      {/* Flechas */}
      <button
        onClick={prev}
        aria-label="Anterior"
        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition backdrop-blur-sm"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={next}
        aria-label="Siguiente"
        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition backdrop-blur-sm"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${i === current ? `${accentBg} scale-125` : 'bg-white/60'}`}
          />
        ))}
      </div>
    </div>
  );
}

// ── Componente principal ──────────────────────────────────────────────────────
export default function ProgramPage({ program }: ProgramPageProps) {
  const colors = programColorMap[program.color];
  const imgs = getProgramImages(program.slug);
  const testimonios = testimoniosPorPrograma[program.slug] ?? [];

  return (
    <div>

      {/* ── HERO con imagen real ── */}
      <div className="relative min-h-[480px] flex items-end overflow-hidden">
        {/* Imagen de fondo */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${imgs.hero}')` }}
        />
        {/* Degradado para legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Contenido */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-32 w-full">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold text-white mb-4">{program.title}</h1>
            <p className="text-xl text-white/90 mb-3">{program.subtitle}</p>
            <p className="text-base text-white/75 mb-8 leading-relaxed">{program.description}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-block px-8 py-4 bg-white text-gray-900 rounded-xl font-bold hover:bg-gray-100 transition text-center"
              >
                Solicitar Información
              </Link>
              <a
                href="https://wa.me/525518944494"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-4 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition text-center"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* ── Quick stats ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className={`${colors.light} p-6 rounded-xl text-center`}>
            <div className={`text-2xl font-bold ${colors.text} mb-1`}>{program.duration}</div>
            <p className="text-gray-600 text-sm">Duración</p>
          </div>
          <div className={`${colors.light} p-6 rounded-xl text-center`}>
            <div className={`text-2xl font-bold ${colors.text} mb-1`}>{program.ageRange}</div>
            <p className="text-gray-600 text-sm">Rango de edad</p>
          </div>
          <div className={`${colors.light} p-6 rounded-xl text-center`}>
            <div className={`text-2xl font-bold ${colors.text} mb-1`}>{program.countries.length}</div>
            <p className="text-gray-600 text-sm">Destinos disponibles</p>
          </div>
        </div>

        {/* ── Highlights + Includes ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6">Puntos clave</h2>
            <ul className="space-y-4">
              {program.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3">
                  <span className={`${colors.text} font-bold text-lg mt-0.5`}>✓</span>
                  <span className="text-gray-700">{h}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6">¿Qué incluye?</h2>
            <ul className="space-y-4">
              {program.includes.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-gray-400 mt-1">→</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── CARRUSEL DE FOTOS ── */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Galería del programa</h2>
          <Carrusel images={imgs.gallery} accentBg={colors.bg} />
        </div>

        {/* ── Countries ── */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Destinos disponibles</h2>
          <div className="flex flex-wrap gap-3">
            {program.countries.map((country) => (
              <span
                key={country}
                className={`px-4 py-2 ${colors.light} ${colors.text} rounded-full font-medium text-sm border ${colors.border}`}
              >
                {country}
              </span>
            ))}
          </div>
        </div>

        {/* ── Ideal for ── */}
        <div className={`${colors.light} border ${colors.border} rounded-xl p-8 mb-16`}>
          <h2 className="text-2xl font-bold mb-3">¿Para quién es este programa?</h2>
          <p className="text-gray-700 text-lg">{program.idealFor}</p>
        </div>

        {/* ── TESTIMONIOS ── */}
        {testimonios.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Lo que dicen nuestros estudiantes</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonios.map((t) => (
                <div key={t.nombre} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-4">
                  {/* Foto + nombre */}
                  <div className="flex items-center gap-4">
                    <div
                      className="w-14 h-14 rounded-full bg-cover bg-center shrink-0 ring-2 ring-offset-2 ring-gray-200"
                      style={{ backgroundImage: `url('${t.foto}')` }}
                    />
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{t.nombre}</p>
                      <p className={`text-xs font-medium ${colors.text}`}>{t.pais}</p>
                    </div>
                  </div>
                  {/* Estrellas */}
                  <div className="flex gap-0.5 text-yellow-400 text-sm">
                    {'★★★★★'}
                  </div>
                  {/* Texto */}
                  <p className="text-gray-600 text-sm leading-relaxed">"{t.texto}"</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── CTA ── */}
        <div className="bg-gray-900 text-white rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Te interesa este programa?</h2>
          <p className="text-gray-300 mb-8 text-lg max-w-xl mx-auto">
            Agenda tu Diagnóstico Internacional Estratégico — es gratuito y sin compromiso.
            Te ayudamos a diseñar tu ruta ideal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className={`inline-block px-8 py-4 ${colors.bg} text-white rounded-xl font-bold hover:opacity-90 transition`}
            >
              Solicitar Información
            </Link>
            <a
              href={`https://wa.me/525518944494?text=Hola%2C%20me%20interesa%20el%20programa%20de%20${encodeURIComponent(program.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition"
            >
              WhatsApp
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
