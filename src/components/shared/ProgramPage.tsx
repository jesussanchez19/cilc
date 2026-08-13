'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { Program, ProgramSection, programColorMap } from '@/lib/data/programs';
import { countries } from '@/lib/data/countries';
import { SanityTestimonial } from '@/lib/sanity/queries';
import { urlFor } from '@/lib/sanity/image';
import QuoteModal from './QuoteModal';

const TOOLTIPS: Record<string, string> = {
  // includes
  'Selección de país y escuela': 'Te asesoramos para elegir el destino y la escuela que mejor se adaptan a tu objetivo, nivel de idioma y presupuesto.',
  'Selección del país y escuela ideal': 'Te asesoramos para elegir el destino y la escuela que mejor se adaptan a tu objetivo, nivel de idioma y presupuesto.',
  'Inscripción oficial en la escuela': 'Gestionamos tu registro directamente con la institución y te enviamos la carta de aceptación oficial.',
  'Inscripción oficial': 'Gestionamos tu registro directamente con la institución y te enviamos la carta de aceptación oficial.',
  'Gestión de visa de estudiante': 'Coordinamos todos los trámites migratorios y te preparamos para la entrevista consular si aplica.',
  'Trámite de visa': 'Coordinamos todos los trámites migratorios y te preparamos para la entrevista consular si aplica.',
  'Seguro médico internacional': 'Cobertura médica completa durante toda tu estancia en el extranjero, requerida por la mayoría de los destinos.',
  'Orientación previa al viaje': 'Sesión donde revisamos contigo: trámites pendientes, llegada al aeropuerto, alojamiento, transporte local y vida cotidiana en el destino.',
  'Acompañamiento durante tu estancia': 'Seguimiento personalizado de principio a fin. Estamos disponibles para apoyarte ante cualquier situación durante tu programa.',
  'Seguimiento durante tu estancia': 'Seguimiento personalizado de principio a fin. Estamos disponibles para apoyarte ante cualquier situación durante tu programa.',
  'Acompañamiento integral': 'Seguimiento personalizado de principio a fin. Estamos disponibles para apoyarte ante cualquier situación durante tu programa.',
  // highlights — Idiomas
  'Escuelas internacionalmente acreditadas': 'Trabajamos con instituciones reconocidas por organismos internacionales de acreditación educativa en cada país destino.',
  'Escuelas acreditadas internacionalmente': 'Trabajamos con instituciones reconocidas por organismos internacionales de acreditación educativa en cada país destino.',
  'Certificación oficial al completar': 'Al finalizar recibes un certificado emitido por la escuela que puedes incluir en tu CV o presentar en procesos de selección.',
  'Certificación oficial al finalizar': 'Al finalizar recibes un certificado emitido por la escuela que puedes incluir en tu CV o presentar en procesos de selección.',
  'Grupos reducidos con profesores nativos': 'Grupos pequeños que permiten mayor atención personalizada, con profesores hablantes nativos del idioma que enseñan.',
  'Inglés, Francés, Alemán, Japonés, Coreano y Mandarín': 'Cada idioma se estudia en su país de origen para una inmersión auténtica: inglés en países anglófonos, francés en Francia o Canadá, y así sucesivamente.',
  'Múltiples destinos disponibles': 'Contamos con destinos en Europa, América, Oceanía y Asia para que elijas el que mejor se adapte a tu idioma y presupuesto.',
  // highlights — Au Pair
  'Estipendio semanal garantizado': 'Recibes un pago semanal directamente de la familia anfitriona, establecido por el programa y la regulación migratoria del país.',
  'Seguro médico incluido': 'Cobertura médica durante toda tu estancia, como parte de los beneficios del programa Au Pair.',
  'Alojamiento con familia anfitriona': 'Habitación privada y comidas incluidas en el hogar de tu familia anfitriona durante toda tu estancia.',
  'Clases de idioma incluidas': 'Acceso a clases del idioma local como parte de los beneficios del programa.',
  'Residencia legal en el país': 'El programa incluye los trámites para que cuentes con estatus migratorio legal durante toda tu estancia.',
  // highlights — Años Académicos
  'Integración al sistema académico oficial': 'Estudias en una escuela o universidad local junto con estudiantes del país, dentro del plan de estudios oficial.',
  'Secundaria, Preparatoria o Universidad': 'Opciones para distintos niveles educativos: desde educación media hasta licenciatura en el extranjero.',
  'Alojamiento con familia anfitriona o residencia': 'Alojamiento supervisado: familia anfitriona o residencia estudiantil, según el destino y tu preferencia.',
  'Certificado académico reconocido': 'El periodo cursado en el extranjero queda registrado en un certificado emitido por la institución.',
  'Experiencia multicultural transformadora': 'Convivir con estudiantes de distintos países en un entorno académico real es una experiencia que transforma tu perspectiva.',
  // highlights — Estudia y Trabaja
  'Permiso legal para trabajar': 'El programa incluye la autorización migratoria para trabajar durante tu estancia, conforme a la regulación del país destino.',
  'Experiencia laboral internacional': 'Trabajas en empresas reales del país destino, construyendo un perfil profesional con experiencia internacional.',
  'Cobertura parcial de gastos': 'Los ingresos del trabajo pueden cubrir parte de tus gastos durante la estancia.',
  'Ventaja competitiva en tu CV': 'Combinar estudios con experiencia laboral en el extranjero es un diferenciador valorado por empleadores y programas de posgrado.',
  // highlights — Formación Corporativa
  'Idiomas ejecutivos: inglés, francés, alemán, japonés, mandarín': 'Programas de idioma diseñados para entornos de negocios: negociación, presentaciones y comunicación ejecutiva.',
  'Visitas corporativas y networking internacional': 'Visitas a empresas y espacios de networking en el país destino para ampliar la red de contactos internacionales.',
  'Formación en comercio internacional y tecnología': 'Programas especializados en áreas de alto impacto para la expansión internacional de tu empresa.',
  'Programas intensivos para directivos': 'Formatos diseñados para aprovechar al máximo el tiempo de ejecutivos con agenda apretada.',
  'Diagnóstico personalizado para cada empresa': 'Antes de diseñar el programa analizamos las necesidades y objetivos específicos de tu organización.',
  // highlights — Idiomas en Línea
  'Clases en vivo con profesor calificado': 'Cada sesión es en tiempo real con un profesor certificado, con interacción y retroalimentación directa.',
  'Grupos reducidos o clases individuales': 'Elige entre grupos pequeños para practicar con compañeros, o clases individuales para un aprendizaje más personalizado.',
  'Inglés, Francés y Alemán': 'Los tres idiomas disponibles en modalidad en línea, para todos los niveles y con enfoque en comunicación real.',
  'Evaluación de nivel inicial gratuita': 'Realizamos una evaluación sin costo para ubicarte en el nivel correcto antes de iniciar.',
  'Horarios flexibles adaptados a ti': 'Distintos horarios disponibles para que puedas estudiar sin interrumpir tu vida diaria.',
  // includes
  'Evaluación de perfil': 'Analizamos tu experiencia, nivel de idioma y expectativas para encontrar el programa y destino ideal para ti.',
  'Documentación y solicitudes': 'Te acompañamos en la preparación de todos los documentos requeridos: cartas de referencia, antecedentes penales, fotografías y formularios.',
  'Preparación para entrevista con familia': 'Te entrenamos para presentarte de manera exitosa ante las familias candidatas y destacar tu perfil.',
  'Gestión de visa J-1 (USA) o Au Pair (Alemania)': 'Coordinamos tu proceso migratorio completo según el país elegido: visa J-1 para USA o permiso Au Pair para Alemania.',
  'Evaluación de perfil y viabilidad': 'Revisamos tu perfil académico, financiero y migratorio para identificar el programa y destino más viable para ti.',
  'Selección de programa y destino': 'Analizamos contigo las opciones de destino, esquema de visa y tipo de trabajo disponible para elegir la combinación ideal.',
  'Diseño de estrategia de visa': 'Diseñamos la ruta migratoria óptima según tu perfil y el país elegido para maximizar tus posibilidades de aprobación.',
  'Preparación previa al viaje': 'Sesión donde revisamos contigo: trámites pendientes, llegada al aeropuerto, alojamiento, transporte local y vida cotidiana en el destino.',
  'Apoyo en búsqueda de empleo inicial': 'Te orientamos con recursos, plataformas y estrategias para encontrar trabajo una vez que llegues a tu destino.',
  'Diagnóstico de necesidades corporativas': 'Realizamos un análisis detallado de las áreas de mejora del equipo para diseñar un programa alineado con los objetivos de la empresa.',
  'Selección estratégica de destino': 'Identificamos el país y ciudad que ofrecen el entorno más favorable para los objetivos específicos de tu empresa.',
  'Diseño de programa a la medida': 'Estructuramos el contenido, duración y formato del programa según las necesidades reales de tu equipo directivo.',
  'Coordinación de visitas corporativas': 'Organizamos encuentros con empresas locales, cámaras de comercio y eventos de networking en el país destino.',
  'Gestión de visas y logística': 'Nos encargamos de todos los trámites migratorios y la logística operativa del grupo: vuelos, alojamiento y traslados.',
  'Acompañamiento ejecutivo': 'Un consultor dedicado acompaña al grupo durante todo el programa para garantizar el logro de objetivos.',
  'Evaluación de nivel gratuita': 'Realizamos una evaluación sin costo antes de iniciar para ubicarte en el nivel correcto y recomendarte el programa más adecuado.',
  'Recomendación personalizada de programa': 'Según tu nivel, objetivos y disponibilidad, te recomendamos la modalidad y horario que mejor se adapten a ti.',
  'Material digital incluido': 'Recibes acceso completo al material didáctico digital: libros de texto, ejercicios, audios y recursos de práctica adicionales.',
  'Seguimiento de progreso por niveles': 'Evaluamos tu avance al término de cada nivel para confirmar que estás progresando y ajustar el plan si es necesario.',
  'Clases de conversación práctica': 'Sesiones dedicadas exclusivamente a la práctica oral con temas reales para ganar fluidez y confianza al hablar.',
  'Preparación para exámenes internacionales': 'Preparación específica para IELTS, TOEFL, Cambridge (inglés), DELF/DALF (francés) o Goethe-Zertifikat (alemán).',
  'Inscripción en institución acreditada': 'Gestionamos tu registro en la escuela o universidad seleccionada y te enviamos la carta de aceptación oficial.',
  'Integración al sistema académico local': 'Te acompañamos en el proceso de adaptación al calendario, materias y metodología de enseñanza del país destino.',
  'Alojamiento seguro (familia o residencia)': 'Alojamiento supervisado: familia anfitriona seleccionada o residencia estudiantil certificada, según tu preferencia y destino.',
  'Asesoría en trámites y visa': 'Te guiamos paso a paso en todos los trámites migratorios y documentación requerida para tu ingreso al país.',
};

function Tip({ children, text }: { children: React.ReactNode; text?: string }) {
  const [show, setShow] = useState(false);
  if (!text) return <>{children}</>;
  return (
    <span
      className="relative"
      style={{ display: 'inline', cursor: 'help' }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {/* trigger — dotted underline + subtle info dot */}
      <span style={{ textDecoration: 'underline', textDecorationStyle: 'dotted', textDecorationColor: '#cbd5e1' }}>
        {children}
      </span>
      <span style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: '13px', height: '13px', borderRadius: '50%',
        background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.25)',
        fontSize: '8px', fontWeight: 700, color: '#3b82f6',
        marginLeft: '4px', verticalAlign: 'middle', lineHeight: 1,
      }}>i</span>

      {show && (
        <span
          style={{
            position: 'absolute',
            bottom: 'calc(100% + 12px)',
            left: '-8px',
            width: '272px',
            background: 'linear-gradient(145deg, #1e293b 0%, #0f172a 100%)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderTop: '2px solid rgba(59,130,246,0.5)',
            borderRadius: '14px',
            padding: '12px 16px',
            fontSize: '13px',
            lineHeight: '1.55',
            color: '#cbd5e1',
            boxShadow: '0 20px 48px rgba(0,0,0,0.45), 0 0 0 1px rgba(0,0,0,0.2)',
            pointerEvents: 'none',
            zIndex: 50,
            animation: 'tooltipIn 0.18s cubic-bezier(0.16,1,0.3,1) both',
          }}
        >
          {/* top accent shimmer */}
          <span style={{
            position: 'absolute', top: '-2px', left: '20px', right: '20px', height: '2px',
            background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.8), rgba(227,30,36,0.6), transparent)',
            borderRadius: '2px',
          }} />
          {text}
          {/* arrow */}
          <span style={{
            position: 'absolute', top: '100%', left: '22px',
            width: 0, height: 0,
            borderLeft: '7px solid transparent',
            borderRight: '7px solid transparent',
            borderTop: '7px solid #1e293b',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
          }} />
        </span>
      )}
    </span>
  );
}

interface ProgramPageProps {
  program: Program;
  testimoniosSanity?: SanityTestimonial[];
  destinosSanity?: string[];
  /**
   * Numero de WhatsApp en formato wa.me. Llega como prop porque este es un
   * componente de cliente y no puede consultar Sanity: lo resuelve la pagina
   * que lo renderiza.
   */
  waPrincipal: string;
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

export default function ProgramPage({ program, testimoniosSanity = [], destinosSanity, waPrincipal }: ProgramPageProps) {
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

  /**
   * Se desestructura en vez de guardar el objeto y leer `statsRef` dentro del
   * JSX. Acceder a un ref por propiedad durante el render es lo que marcaba
   * `react-hooks/refs`: el compilador de React no puede saber que ese `.ref` es
   * el objeto y no una lectura de `.current`, que sí seria un error de verdad.
   * El comportamiento es identico; solo cambia dónde se desempaqueta.
   */
  const { ref: statsRef,  visible: statsVisible  } = useSection(0.25);
  const { ref: hlRef,     visible: hlVisible     } = useSection(0.25);
  const { ref: inclRef,   visible: inclVisible   } = useSection(0.25);
  const { ref: badgesRef, visible: badgesVisible } = useSection(0.2);
  const { ref: sectRef,   visible: sectVisible   } = useSection(0.15);
  const { ref: testRef,   visible: testVisible   } = useSection(0.2);

  const programaNombre: Record<string, string> = {
    'idiomas': 'Idiomas', 'au-pair': 'Au Pair', 'anos-academicos': 'Años Académicos',
    'estudia-trabaja': 'Estudia y Trabaja', 'formacion-corporativa': 'Formación Corporativa', 'idiomas-en-linea': 'Idiomas en Línea',
  };
  const programaParaModal = programaNombre[program.slug] ?? program.title;

  return (
    <div>
      {/* HERO */}
      <div className="relative min-h-160 flex items-end overflow-hidden">
        <div className={`absolute inset-0 bg-cover ${program.slug === 'anos-academicos' ? 'bg-top' : 'bg-center'}`} style={{ backgroundImage: `url('${program.heroImageUrl ?? imgs.hero}')` }} />
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
              <a href={`https://wa.me/${waPrincipal}`} target="_blank" rel="noopener noreferrer"
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
        <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          {[
            { value: program.duration,                  label: 'Duración' },
            { value: program.ageRange,                  label: 'Rango de edad' },
            { value: `${destinosResolved ? destinosResolved.length : program.countries.length} destinos`, label: 'Disponibles' },
          ].map(({ value, label }, i) => (
            <div
              key={label}
              className={`premium-card p-6 text-center reveal-scale ${statsVisible ? 'is-visible' : ''}`}
              style={{ transitionDelay: `${i * 110}ms` }}
            >
              <div className={`text-2xl font-extrabold ${colors.text} mb-1`}>{value}</div>
              <p className="text-slate-500 text-sm">{label}</p>
            </div>
          ))}
        </div>

        {/* Extra sections — per-program rich content */}
        {program.sections && program.sections.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-extrabold text-slate-900 mb-6" style={{ letterSpacing: '-0.02em' }}>
              Modalidades disponibles
            </h2>
            <div ref={sectRef} className="flex flex-wrap justify-center gap-5">
              {program.sections.map((s: ProgramSection, i: number) => (
                <div
                  key={s.title}
                  className={`rounded-2xl p-6 reveal-scale ${sectVisible ? 'is-visible' : ''} w-full sm:w-[calc(50%-10px)] xl:w-[calc(33.333%-14px)]`}
                  style={{
                    transitionDelay: `${i * 70}ms`,
                    background: 'var(--surface-2)',
                    border: '1px solid rgba(15,23,42,0.07)',
                  }}
                >
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-xs font-bold mb-3 ${colors.light} ${colors.text}`}>
                    {i + 1 < 10 ? `0${i + 1}` : i + 1}
                  </div>
                  <h3 className="text-[15px] font-extrabold text-slate-900 mb-1 leading-snug">
                    {s.title}
                  </h3>
                  {s.description && (
                    <p className="text-slate-500 text-xs mb-3 leading-relaxed">{s.description}</p>
                  )}
                  {s.items && s.items.length > 0 && (
                    <ul className="space-y-1.5 mt-2">
                      {s.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-slate-600 text-sm leading-snug">
                          <span className={`shrink-0 mt-1.5 w-1 h-1 rounded-full ${colors.bg}`} />
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

        {/* Highlights + Includes — slide from left / right */}
        {(program.highlights.length > 0 || program.includes.length > 0) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {program.highlights.length > 0 && (
          <div ref={hlRef}>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-6" style={{ letterSpacing: '-0.02em' }}>
              Puntos clave
            </h2>
            <ul className="space-y-3">
              {program.highlights.map((h, i) => (
                <li
                  key={h}
                  className={`flex items-start gap-3 reveal-left ${hlVisible ? 'is-visible' : ''}`}
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <span className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                    style={{ background: `${colors.text.includes('blue') ? '#dbeafe' : '#f3e8ff'}` }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`w-3 h-3 ${colors.text}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-slate-600 text-[15px]"><Tip text={program.highlightTooltips ? (program.highlightTooltips[h] || undefined) : TOOLTIPS[h]}>{h}</Tip></span>
                </li>
              ))}
            </ul>
          </div>
          )}
          {program.includes.length > 0 && (
          <div ref={inclRef}>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-6" style={{ letterSpacing: '-0.02em' }}>
              ¿Qué incluye?
            </h2>
            <ul className="space-y-3">
              {program.includes.map((item, i) => (
                <li
                  key={item}
                  className={`flex items-start gap-3 reveal-right ${inclVisible ? 'is-visible' : ''}`}
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-slate-300 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                  <span className="text-slate-600 text-[15px]"><Tip text={program.includeTooltips ? (program.includeTooltips[item] || undefined) : TOOLTIPS[item]}>{item}</Tip></span>
                </li>
              ))}
            </ul>
          </div>
          )}
        </div>
        )}

        {/* Destinations — pop in with stagger */}
        <div className="mb-16">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-5" style={{ letterSpacing: '-0.02em' }}>
            Destinos disponibles
          </h2>
          <div ref={badgesRef} className="flex flex-wrap gap-2">
            {(destinosResolved
              ? destinosResolved.map((c, i) => (
                  <Link
                    key={c!.id}
                    href={`/destinos/${c!.id}`}
                    className={`px-4 py-2 ${colors.light} ${colors.text} rounded-full font-semibold text-sm border ${colors.border} reveal-scale ${badgesVisible ? 'is-visible' : ''} hover:opacity-80 transition-opacity`}
                    style={{ transitionDelay: `${i * 45}ms` }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`https://flagcdn.com/w40/${c!.code.toLowerCase()}.png`} alt="" width={20} className="inline h-4 w-auto rounded-sm mr-1.5 align-middle" />
                    {c!.name}
                  </Link>
                ))
              : program.countries.map((c, i) => (
                <span
                  key={c}
                  className={`px-4 py-2 ${colors.light} ${colors.text} rounded-full font-semibold text-sm border ${colors.border} reveal-scale ${badgesVisible ? 'is-visible' : ''}`}
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

        {/* Gallery — solo si hay fotos de testimonios */}
        {galleryImages.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-extrabold text-slate-900 mb-6" style={{ letterSpacing: '-0.02em' }}>
              Galería del programa
            </h2>
            <Carrusel images={galleryImages} accentColor={colors.text.includes('blue') ? '#3b82f6' : '#8b5cf6'} />
          </div>
        )}

        {/* Testimonials — blur in with stagger */}
        {testimoniosSanity.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-extrabold text-slate-900 mb-8 text-center" style={{ letterSpacing: '-0.02em' }}>
              Lo que dicen nuestros estudiantes
            </h2>
            <div ref={testRef} className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {testimoniosSanity.map((t, i) => (
                <div
                  key={t._id}
                  className={`premium-card p-6 flex flex-col gap-3 reveal-blur ${testVisible ? 'is-visible' : ''}`}
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
              <a href={`https://wa.me/${waPrincipal}?text=Hola%2C%20me%20interesa%20el%20programa%20de%20${encodeURIComponent(program.title)}`}
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

    </div>
  );
}
