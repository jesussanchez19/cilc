import Link from 'next/link';
import { getWhatsAppPrincipal } from '@/lib/sanity/queries';
import AnimateIn from '@/components/shared/AnimateIn';

const YEAR = new Date().getFullYear();

export const metadata = {
  title: 'Sobre Nosotros | CILC',
  description: `Conoce la historia de CILC desde 2001, nuestra misión, visión, valores y por qué ${YEAR} es el año ideal para estudiar en el extranjero.`,
};

const VALORES = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      </svg>
    ),
    title: 'Honestidad',
    desc: 'Asesoría transparente desde el primer contacto. Sin costos ocultos, sin letra pequeña, sin presiones de venta.',
    color: '#1B67E8',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
      </svg>
    ),
    title: 'Personalización',
    desc: 'No vendemos paquetes genéricos. Diseñamos tu experiencia a la medida de tu perfil, objetivos y presupuesto.',
    color: '#E31E24',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
    title: 'Compromiso',
    desc: 'Estamos contigo antes, durante y después de tu experiencia. No desaparecemos al cerrar la venta.',
    color: '#1B67E8',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
      </svg>
    ),
    title: 'Excelencia',
    desc: 'Trabajamos únicamente con instituciones acreditadas internacionalmente. Tu educación merece lo mejor.',
    color: '#E31E24',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
    title: 'Confianza',
    desc: 'Más de 23 años construyendo relaciones duraderas con miles de estudiantes y familias mexicanas.',
    color: '#1B67E8',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      </svg>
    ),
    title: 'Pasión',
    desc: 'Creemos profundamente que estudiar en el extranjero transforma vidas y abre puertas que ningún otro camino puede abrir.',
    color: '#E31E24',
  },
];

const RAZONES_2026 = [
  {
    num: '01',
    title: 'El mercado laboral exige diferenciación real',
    desc: 'Con la llegada de la inteligencia artificial, el dominio de un idioma y la experiencia internacional son los factores que más diferencian a un candidato. Los empleadores mexicanos priorizan perfiles bilingües con vivencia real en el extranjero.',
  },
  {
    num: '02',
    title: 'Cupos limitados en Canadá e Irlanda',
    desc: `Los gobiernos de Canadá e Irlanda han implementado nuevas restricciones en visas estudiantiles. Quienes arrancan en ${YEAR} acceden a cupos antes de que las políticas migratorias se endurezcan aún más.`,
  },
  {
    num: '03',
    title: 'Nuevas visas de trabajo disponibles',
    desc: `Los programas Estudia y Trabaja en Irlanda y Reino Unido tienen nuevas modalidades para ${YEAR} que permiten cubrir parte de los gastos con el sueldo local — una ventana de oportunidad única.`,
  },
  {
    num: '04',
    title: 'Inversión con retorno comprobado',
    desc: 'Los profesionales bilingües en México ganan entre 25% y 40% más que sus pares monolingües. El costo del programa se recupera en los primeros años de carrera.',
  },
  {
    num: '05',
    title: 'Tu competencia ya se está yendo',
    desc: 'Cada año más de 50,000 mexicanos estudian en el extranjero. Los que empiezan antes construyen el perfil más sólido para cuando regresan al mercado laboral.',
  },
];

const HITOS = [
  { año: '2001', texto: 'CILC es fundada en México con la misión de conectar a estudiantes mexicanos con escuelas de idiomas en Canadá e Irlanda.' },
  { año: '2005', texto: 'Se amplía el catálogo incorporando Au Pair y Años Académicos en Reino Unido y Estados Unidos.' },
  { año: '2010', texto: 'CILC se convierte en miembro certificado de ICEF y ALTO, consolidándose como referente en consultoría educativa internacional.' },
  { año: '2015', texto: 'Se lanza el programa Estudia y Trabaja, permitiendo a los estudiantes financiar parte de su experiencia en el extranjero.' },
  { año: '2018', texto: 'CILC suma Australia, Alemania, Francia y España a su red de destinos, superando los 300 estudiantes enviados por año.' },
  { año: '2020', texto: 'Se implementa Idiomas en Línea para continuar la formación durante la pandemia global.' },
  { año: '2023', texto: 'CILC celebra más de 23 años de operación habiendo asesorado a más de 5,000 estudiantes mexicanos exitosamente.' },
  { año: '2026', texto: 'Nuevo sitio web, nuevas herramientas digitales y el mismo compromiso de siempre: transformar futuros.' },
];

export default async function SobreNosotrosPage() {
  // El WhatsApp sale del numero marcado como principal en el Studio.
  const waPrincipal = await getWhatsAppPrincipal();

  return (
    <div>

      {/* ── Hero ── */}
      <section className="relative py-28 overflow-hidden" style={{ background: 'var(--dark)' }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 50% at 20% 50%, rgba(27,103,232,0.18) 0%, transparent 65%)' }} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 50% 50% at 80% 50%, rgba(227,30,36,0.12) 0%, transparent 65%)' }} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimateIn animation="up">
            <span className="badge badge-dark mb-6">Conoce a CILC</span>
            <h1 className="text-5xl sm:text-6xl font-extrabold text-white mb-6"
              style={{ letterSpacing: '-0.04em', lineHeight: '1.04' }}>
              Más de 23 años<br />
              <span className="gradient-text-light">abriendo puertas al mundo</span>
            </h1>
            <p className="text-slate-400 text-xl max-w-2xl mx-auto leading-relaxed">
              Somos una consultoría educativa mexicana especializada en programas de estudio en el extranjero.
              Asesoría personalizada, sin costo y sin compromiso.
            </p>
          </AnimateIn>

          {/* Stats */}
          <AnimateIn animation="up" delay={160} className="flex flex-wrap justify-center gap-10 mt-14">
            {[
              { valor: '+23', label: 'Años de experiencia' },
              { valor: '+5,000', label: 'Estudiantes asesorados' },
              { valor: '16+', label: 'Países destino' },
              { valor: '100+', label: 'Escuelas aliadas' },
            ].map(({ valor, label }) => (
              <div key={label} className="text-center">
                <p className="text-3xl font-extrabold tracking-tight gradient-text-light">{valor}</p>
                <p className="text-[11px] text-slate-500 uppercase tracking-widest mt-1">{label}</p>
              </div>
            ))}
          </AnimateIn>
        </div>

        {/* Brand accent bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(27,103,232,0.5) 30%, rgba(227,30,36,0.5) 70%, transparent)' }} />
      </section>

      {/* ── Misión y Visión ── */}
      <section className="py-24" style={{ background: 'var(--surface-2)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn animation="up" className="text-center mb-14">
            <span className="badge mb-4">Propósito</span>
            <h2 className="text-4xl font-extrabold text-slate-900"
              style={{ letterSpacing: '-0.03em' }}>
              Misión <span className="gradient-text">&amp; Visión</span>
            </h2>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimateIn animation="left" delay={0}>
              <div className="premium-card p-10 h-full">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                  style={{ background: 'rgba(27,103,232,0.10)', border: '1px solid rgba(27,103,232,0.20)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="#1B67E8" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Nuestra Misión</h3>
                <p className="text-slate-600 leading-relaxed">
                  Conectar a estudiantes mexicanos con las mejores escuelas e instituciones educativas del mundo,
                  brindando asesoría personalizada, honesta y sin costo, para que cada persona encuentre la
                  experiencia internacional que mejor se adapte a sus objetivos, perfil y presupuesto.
                </p>
              </div>
            </AnimateIn>

            <AnimateIn animation="right" delay={110}>
              <div className="premium-card p-10 h-full">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                  style={{ background: 'rgba(227,30,36,0.10)', border: '1px solid rgba(227,30,36,0.20)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.6} stroke="#E31E24" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Nuestra Visión</h3>
                <p className="text-slate-600 leading-relaxed">
                  Ser la consultoría educativa de referencia en México para familias y jóvenes que buscan
                  una experiencia internacional transformadora, reconocida por la calidad de su asesoría,
                  la red de instituciones aliadas y el acompañamiento real a cada estudiante.
                </p>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ── Valores ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn animation="up" className="text-center mb-14">
            <span className="badge mb-4">Lo que nos define</span>
            <h2 className="text-4xl font-extrabold text-slate-900"
              style={{ letterSpacing: '-0.03em' }}>
              Nuestros <span className="gradient-text">Valores</span>
            </h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto mt-4">
              Los principios que guían cada asesoría, cada decisión y cada relación con nuestros estudiantes.
            </p>
          </AnimateIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {VALORES.map(({ icon, title, desc, color }, i) => (
              <AnimateIn key={title} animation="scale" delay={i * 70}>
                <div className="premium-card p-7 h-full">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: `${color}15`, border: `1px solid ${color}30`, color }}>
                    {icon}
                  </div>
                  <h3 className="font-bold text-slate-900 text-base mb-2">{title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Por qué 2026 ── */}
      <section className="py-24 relative overflow-hidden" style={{ background: 'var(--dark)' }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(27,103,232,0.15) 0%, transparent 65%)' }} />
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(27,103,232,0.6) 30%, rgba(227,30,36,0.6) 70%, transparent)' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn animation="up" className="text-center mb-16">
            <span className="badge badge-dark mb-4">Ahora más que nunca</span>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4"
              style={{ letterSpacing: '-0.03em', lineHeight: '1.08' }}>
              ¿Por qué estudiar en el extranjero
              <br />
              <span className="gradient-text-light">en {YEAR}?</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              El mundo cambió. Las reglas del mercado laboral cambiaron. Aquí están las razones
              por las que este es el mejor momento para dar el paso.
            </p>
          </AnimateIn>

          <div className="space-y-4 max-w-4xl mx-auto">
            {RAZONES_2026.map(({ num, title, desc }, i) => (
              <AnimateIn key={num} animation="left" delay={i * 120} threshold={0.4}>
                <div className="flex gap-6 items-start p-7 rounded-2xl group transition-all duration-300"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <span className="shrink-0 text-4xl font-black"
                    style={{ background: 'linear-gradient(135deg, #1B67E8, #E31E24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: 1 }}>
                    {num}
                  </span>
                  <div>
                    <h3 className="font-bold text-white text-base mb-2">{title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>

          <AnimateIn animation="up" delay={RAZONES_2026.length * 120 + 80} threshold={0.5} className="text-center mt-12">
            <Link href="/contact" className="btn-primary">
              Quiero aprovechar {YEAR}
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </AnimateIn>
        </div>
      </section>

      {/* ── Historia ── */}
      <section className="py-24" style={{ background: 'var(--surface-2)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateIn animation="up" className="text-center mb-16">
            <span className="badge mb-4">Desde 2001</span>
            <h2 className="text-4xl font-extrabold text-slate-900"
              style={{ letterSpacing: '-0.03em' }}>
              Nuestra <span className="gradient-text">Historia</span>
            </h2>
            <p className="text-slate-500 text-lg mt-3">Más de dos décadas transformando futuros</p>
          </AnimateIn>

          <div className="relative">
            {/* Línea vertical */}
            <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
              style={{ background: 'linear-gradient(to bottom, #1B67E8, #E31E24)' }} />

            <div className="space-y-8">
              {HITOS.map((hito, i) => (
                <AnimateIn key={hito.año} animation={i % 2 === 0 ? 'left' : 'right'} delay={i * 60}>
                  <div className={`relative flex items-start gap-6 md:gap-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    {/* Punto */}
                    <div className="absolute left-5 md:left-1/2 w-3 h-3 rounded-full -translate-x-1/2 mt-2 z-10 ring-4 ring-white"
                      style={{ background: i === HITOS.length - 1 ? '#E31E24' : '#1B67E8' }} />

                    {/* Contenido */}
                    <div className={`ml-12 md:ml-0 md:w-5/12 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:ml-auto'}`}>
                      <span className="inline-block px-3 py-1 text-white text-xs font-bold rounded-full mb-2"
                        style={{ background: i === HITOS.length - 1 ? '#E31E24' : '#1B67E8' }}>
                        {hito.año}
                      </span>
                      <p className="text-slate-600 text-sm leading-relaxed">{hito.texto}</p>
                    </div>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 relative overflow-hidden" style={{ background: 'var(--dark)' }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 55% 55% at 30% 100%, rgba(27,103,232,0.20) 0%, transparent 65%)' }} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 55% 55% at 70% 100%, rgba(227,30,36,0.15) 0%, transparent 65%)' }} />
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(27,103,232,0.6) 30%, rgba(227,30,36,0.6) 70%, transparent)' }} />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimateIn animation="up">
            <span className="badge badge-dark mb-6">Empieza hoy</span>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-5"
              style={{ letterSpacing: '-0.03em', lineHeight: '1.08' }}>
              ¿Listo para dar<br />
              <span className="gradient-text-light">el siguiente paso?</span>
            </h2>
            <p className="text-slate-400 text-lg mb-10 max-w-lg mx-auto">
              Agenda tu Diagnóstico Internacional Estratégico — es gratuito, sin compromiso y sin presiones.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact" className="btn-primary">
                Contactar Ahora
              </Link>
              <a
                href={`https://wa.me/${waPrincipal}?text=Hola%2C%20quiero%20saber%20más%20sobre%20CILC`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
                style={{ color: '#4ade80', borderColor: 'rgba(74,222,128,0.3)', background: 'rgba(74,222,128,0.08)' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-4 h-4" fill="currentColor">
                  <path d="M16.003 2.667C8.638 2.667 2.667 8.638 2.667 16c0 2.354.618 4.663 1.793 6.695L2.667 29.333l6.82-1.778A13.264 13.264 0 0 0 16.003 29.333c7.365 0 13.33-5.97 13.33-13.333 0-7.362-5.965-13.333-13.33-13.333z" />
                </svg>
                WhatsApp
              </a>
            </div>
          </AnimateIn>
        </div>
      </section>

    </div>
  );
}
