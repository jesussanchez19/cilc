import Link from 'next/link';

export const metadata = {
  title: 'Sobre Nosotros | CILC',
  description: 'Conoce la historia de CILC desde 2001, nuestra misión, visión, equipo y socios internacionales.',
};

const HITOS = [
  { año: '2001', texto: 'CILC es fundada en México con la misión de conectar a estudiantes mexicanos con escuelas de idiomas en Canadá e Irlanda.' },
  { año: '2005', texto: 'Se amplía el catálogo de programas incorporando Au Pair y Años Académicos en Reino Unido y Estados Unidos.' },
  { año: '2010', texto: 'CILC se convierte en miembro certificado de ICEF y ALTO, consolidándose como referente en consultoría educativa internacional.' },
  { año: '2015', texto: 'Se lanza el programa Estudia y Trabaja, ofreciendo opciones para que los estudiantes financien parte de su experiencia en el extranjero.' },
  { año: '2018', texto: 'CILC suma Australia, Alemania, Francia y España a su red de destinos, superando los 300 estudiantes enviados por año.' },
  { año: '2020', texto: 'Se implementa el programa de Idiomas en Línea para continuar la formación durante la pandemia global.' },
  { año: '2023', texto: 'CILC celebra más de 23 años de operación habiendo asesorado a más de 5,000 estudiantes mexicanos exitosamente.' },
  { año: '2024', texto: 'Relanzamiento del sitio web institucional con nueva plataforma de búsqueda, blog educativo y herramientas de cotización en línea.' },
];

const EQUIPO = [
  { nombre: 'Dirección General',      puesto: 'Fundador y Director',              foto: '/images/equipo/director.png',   descripcion: 'Más de 23 años conectando estudiantes mexicanos con oportunidades educativas internacionales.' },
  { nombre: 'Asesoría Académica',     puesto: 'Coordinadora de Programas',         foto: '/images/equipo/coordinadora.png', descripcion: 'Especialista en programas de idiomas, Au Pair y Años Académicos en Europa y Norteamérica.' },
  { nombre: 'Operaciones',            puesto: 'Gestión de Visas y Trámites',       foto: '/images/equipo/operaciones.png', descripcion: 'Experta en procesos migratorios y gestión documental para más de 15 países destino.' },
  { nombre: 'Atención al Cliente',    puesto: 'Seguimiento y Acompañamiento',      foto: '/images/equipo/atencion.png',   descripcion: 'Dedicada a mantener contacto con los estudiantes antes, durante y después de su experiencia.' },
];

const SOCIOS = [
  { nombre: 'ICEF',      descripcion: 'International Consultants for Education and Fairs — red global de consultoría educativa.',  logo: '/images/logos/icef.png'     },
  { nombre: 'ALTO',      descripcion: 'Association of Language Travel Organisations — garantía de calidad en escuelas de idiomas.', logo: '/images/logos/alto.png'     },
  { nombre: 'Pearson',   descripcion: 'Partner oficial de certificaciones internacionales de inglés.',                              logo: '/images/logos/pearson.png'  },
  { nombre: 'Cambridge', descripcion: 'Centro autorizado para preparación de exámenes Cambridge English.',                         logo: '/images/logos/cambridge.png' },
  { nombre: 'IALC',      descripcion: 'International Association of Language Centres — más de 100 escuelas acreditadas.',          logo: '/images/logos/ialc.png'     },
  { nombre: 'IRCC',      descripcion: 'Immigration, Refugees and Citizenship Canada — autorizado para gestión de Student Permits.', logo: '/images/logos/ircc.png'     },
];

export default function SobreNosotrosPage() {
  return (
    <div>

      {/* ── Hero ── */}
      <div className="bg-gradient-to-br from-blue-700 to-blue-900 text-white py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-3 py-1 bg-white/20 text-white text-xs font-semibold uppercase tracking-widest rounded-full mb-6">
            Conoce a CILC
          </span>
          <h1 className="text-5xl font-extrabold mb-4">Más de 23 años<br />abriendo puertas al mundo</h1>
          <p className="text-blue-100 text-xl max-w-2xl mx-auto">
            Somos una consultoría educativa mexicana especializada en programas de estudio en el extranjero. Asesoría personalizada, sin costo y sin compromiso.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

        {/* ── Misión y Visión ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-10">
            <div className="text-4xl mb-4">🎯</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Nuestra Misión</h2>
            <p className="text-gray-700 leading-relaxed">
              Conectar a estudiantes mexicanos con las mejores escuelas e instituciones educativas del mundo, brindando asesoría personalizada, honesta y sin costo, para que cada persona encuentre la experiencia internacional que mejor se adapte a sus objetivos, perfil y presupuesto.
            </p>
          </div>
          <div className="bg-purple-50 border border-purple-100 rounded-2xl p-10">
            <div className="text-4xl mb-4">🌍</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Nuestra Visión</h2>
            <p className="text-gray-700 leading-relaxed">
              Ser la consultoría educativa de referencia en México para familias y jóvenes que buscan una experiencia internacional transformadora, reconocida por la calidad de su asesoría, la red de instituciones aliadas y el acompañamiento real a cada estudiante.
            </p>
          </div>
        </div>

        {/* ── Historia — línea de tiempo ── */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-3">Nuestra Historia</h2>
            <p className="text-gray-500 text-lg">De 2001 a hoy — más de dos décadas transformando futuros</p>
          </div>

          <div className="relative">
            {/* Línea vertical */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-blue-200 -translate-x-1/2" />

            <div className="space-y-10">
              {HITOS.map((hito, i) => (
                <div
                  key={hito.año}
                  className={`relative flex items-start gap-6 md:gap-0 ${
                    i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Punto en la línea */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-blue-600 border-4 border-white shadow -translate-x-1/2 mt-1.5 z-10" />

                  {/* Contenido */}
                  <div className={`ml-10 md:ml-0 md:w-5/12 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:ml-auto'}`}>
                    <span className="inline-block px-3 py-1 bg-blue-600 text-white text-sm font-bold rounded-full mb-2">
                      {hito.año}
                    </span>
                    <p className="text-gray-700 leading-relaxed">{hito.texto}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Equipo ── */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-3">Nuestro Equipo</h2>
            <p className="text-gray-500 text-lg">Personas comprometidas con tu experiencia internacional</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {EQUIPO.map((miembro) => (
              <div key={miembro.nombre} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
                <div
                  className="w-20 h-20 rounded-full bg-cover bg-center mx-auto mb-4 bg-gray-200 ring-4 ring-blue-50"
                  style={{ backgroundImage: `url('${miembro.foto}')` }}
                  role="img"
                  aria-label={`Foto de ${miembro.nombre}`}
                />
                <h3 className="font-bold text-gray-900 text-base">{miembro.nombre}</h3>
                <p className="text-blue-600 text-sm font-medium mb-3">{miembro.puesto}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{miembro.descripcion}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Números ── */}
        <div className="bg-blue-700 text-white rounded-2xl p-12 mb-20">
          <h2 className="text-3xl font-bold text-center mb-10">CILC en números</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { valor: '+23', label: 'Años de experiencia' },
              { valor: '+5,000', label: 'Estudiantes asesorados' },
              { valor: '16+', label: 'Países destino' },
              { valor: '100+', label: 'Escuelas aliadas' },
            ].map(({ valor, label }) => (
              <div key={label}>
                <p className="text-4xl font-extrabold text-white mb-2">{valor}</p>
                <p className="text-blue-200 text-sm uppercase tracking-wide">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Socios y Certificaciones ── */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-3">Socios y Certificaciones</h2>
            <p className="text-gray-500 text-lg">Avalados por las organizaciones más reconocidas del sector</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SOCIOS.map((socio) => (
              <div key={socio.nombre} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex gap-4 items-start">
                <div
                  className="w-16 h-12 bg-cover bg-contain bg-center bg-no-repeat shrink-0 bg-gray-50 rounded-lg"
                  style={{ backgroundImage: `url('${socio.logo}')` }}
                  role="img"
                  aria-label={`Logo de ${socio.nombre}`}
                />
                <div>
                  <h3 className="font-bold text-gray-900 text-sm mb-1">{socio.nombre}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{socio.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">¿Listo para conocernos?</h2>
          <p className="text-gray-500 mb-8 text-lg">Agenda tu diagnóstico gratuito y cuéntanos tu proyecto de vida.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact"
              className="inline-block px-8 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition">
              Contáctanos
            </Link>
            <a href="https://wa.me/525518944494" target="_blank" rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition">
              WhatsApp
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
