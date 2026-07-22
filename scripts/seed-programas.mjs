import { createClient } from '@sanity/client';
import { config } from 'dotenv';
config({ path: '.env.local' });

const token = process.env.SANITY_API_WRITE_TOKEN;
if (!token) { console.error('❌ Falta SANITY_API_WRITE_TOKEN en .env.local'); process.exit(1); }

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'epcoien9',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token,
});

const sec = (titulo, descripcion, items) => ({
  _type: 'seccion',
  _key: titulo.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 40),
  titulo,
  ...(descripcion ? { descripcion } : {}),
  ...(items ? { items } : {}),
});

const programas = [
  {
    _id: 'programa-idiomas',
    _type: 'programa',
    programaId: { _type: 'slug', current: 'idiomas' },
    titulo: 'Idiomas',
    subtitulo: 'Aprende el idioma en su país de origen y transforma tu perfil internacional',
    icono: '🗣️',
    color: 'blue',
    descripcion: 'Ofrecemos programas de idiomas en los países donde realmente se hablan, con inmersión total y certificación internacional. Porque aprender un idioma en aula no es lo mismo que vivirlo todos los días.',
    duracion: 'Desde 2 semanas',
    rangoEdad: '12–60 años',
    puntosClave: [
      'Escuelas internacionalmente acreditadas',
      'Certificación oficial al completar',
      'Grupos reducidos con profesores nativos',
      'Inglés, Francés, Alemán, Japonés, Coreano y Mandarín',
      'Múltiples destinos disponibles',
    ],
    queIncluye: [
      'Selección de país y escuela',
      'Inscripción oficial en la escuela',
      'Gestión de visa de estudiante',
      'Seguro médico internacional',
      'Orientación previa al viaje',
      'Acompañamiento durante tu estancia',
    ],
    paraQuien: 'Jóvenes y adultos de 12 a 60 años que quieren aprender un idioma con inmersión real en su país de origen, logrando un avance más rápido, pronunciación natural y mayor impacto profesional.',
    whatsappMessage: 'Hola, me interesa el programa de Idiomas en el extranjero. ¿Me pueden orientar sobre destinos, duración y costos?',
    secciones: [
      sec('Inglés en los Mejores Destinos del Mundo', 'Canadá · Inglaterra · Dubái · Estados Unidos · Australia · Irlanda · Nueva Zelanda', [
        'Escuelas acreditadas internacionalmente',
        'Programas desde 2 semanas en adelante',
        'Opciones para jóvenes y adultos',
        'Certificación oficial al finalizar',
        'Posibilidad de combinar estudio y experiencia cultural',
      ]),
      sec('Francés en Países Francófonos', 'Canadá (Quebec) · Francia', [
        'Francés general',
        'Francés académico',
        'Preparación para exámenes oficiales',
        'Programas de inmersión cultural',
      ]),
      sec('Idiomas Asiáticos y Europeos', null, [
        'Japonés en Japón: programas intensivos, opciones académicas y culturales, inmersión completa',
        'Coreano en Corea: cursos por niveles, experiencia cultural auténtica, ambiente universitario internacional',
        'Mandarín en China: programas académicos certificados, inmersión lingüística real, enriquecimiento cultural',
        'Alemán en Alemania: cursos intensivos, preparación para certificación oficial, ambiente académico de alto nivel',
      ]),
    ],
  },
  {
    _id: 'programa-au-pair',
    _type: 'programa',
    programaId: { _type: 'slug', current: 'au-pair' },
    titulo: 'Au Pair',
    subtitulo: 'Vive, Aprende y Trabaja Cuidando Niños en el Extranjero',
    icono: '👨‍👩‍👧‍👦',
    color: 'pink',
    descripcion: 'El programa Au Pair es una experiencia cultural internacional donde vives con una familia anfitriona, apoyas en el cuidado de niños y recibes beneficios económicos, educativos y culturales. Programas ofrecidos en Estados Unidos y Alemania.',
    duracion: '6–12 meses',
    rangoEdad: '18–26 años',
    puntosClave: [
      'Estipendio semanal garantizado',
      'Seguro médico incluido',
      'Alojamiento con familia anfitriona',
      'Clases de idioma incluidas',
      'Residencia legal en el país',
    ],
    queIncluye: [
      'Evaluación de perfil',
      'Documentación y solicitudes',
      'Preparación para entrevista con familia',
      'Gestión de visa J-1 (USA) o Au Pair (Alemania)',
      'Orientación previa al viaje',
      'Seguimiento durante tu estancia',
    ],
    paraQuien: 'Jóvenes de 18 a 26 años con experiencia verificable en cuidado de niños, habilidades básicas o intermedias del idioma, disponibilidad mínima de 6 a 12 meses, responsabilidad y compromiso.',
    whatsappMessage: 'Hola, me interesa el programa Au Pair. Tengo experiencia con niños y quisiera conocer los requisitos y destinos disponibles.',
    secciones: [
      sec('Au Pair en USA', 'Duración: 12 meses (extensible) · Edad: 18–25 años', [
        'Residencia legal con familia anfitriona',
        'Apoyo económico semanal (stipend)',
        'Inscripción en cursos académicos durante la estancia',
        'Mejora del idioma inglés en contexto real',
        'Beneficios incluidos: housing, meals, seguro médico, apoyo para cursos, guía de la agencia',
      ]),
      sec('Au Pair en Alemania', 'Duración: 6–12 meses', [
        'Colocación con familia anfitriona alemana',
        'Curso de idioma incluido',
        'Apoyo económico mensual (Taschengeld)',
        'Seguro médico incluido',
        'Experiencia cultural europea completa',
      ]),
      sec('Perfil Ideal del Candidato', null, [
        '18–26 años',
        'Experiencia verificable en cuidado de niños',
        'Habilidades básicas o intermedias del idioma',
        'Disponibilidad mínima de 6 a 12 meses',
        'Persona responsable y comprometida',
      ]),
    ],
  },
  {
    _id: 'programa-anos-academicos',
    _type: 'programa',
    programaId: { _type: 'slug', current: 'anos-academicos' },
    titulo: 'Años Académicos',
    subtitulo: 'Semestres y Años Escolares en el Extranjero',
    icono: '🎓',
    color: 'purple',
    descripcion: 'Vive la experiencia académica internacional que transforma tu futuro. Ofrecemos periodos académicos a nivel Secundaria, Preparatoria y Universidad en Canadá, Inglaterra, Irlanda y Australia, con instituciones reconocidas y acompañamiento integral.',
    duracion: 'Semestre o año completo',
    rangoEdad: '12–25 años',
    puntosClave: [
      'Integración al sistema académico oficial',
      'Secundaria, Preparatoria o Universidad',
      'Alojamiento con familia anfitriona o residencia',
      'Certificado académico reconocido',
      'Experiencia multicultural transformadora',
    ],
    queIncluye: [
      'Inscripción en institución acreditada',
      'Integración al sistema académico local',
      'Alojamiento seguro (familia o residencia)',
      'Asesoría en trámites y visa',
      'Orientación previa al viaje',
      'Acompañamiento integral',
    ],
    paraQuien: 'Estudiantes que buscan fortalecer su perfil internacional, dominar el idioma o ampliar su visión global, y familias que quieren una experiencia segura y estratégica para sus hijos.',
    whatsappMessage: 'Hola, me interesa el programa de Años Académicos. ¿Pueden orientarme sobre opciones para estudiar un semestre o año completo en el extranjero?',
    secciones: [
      sec('Niveles Disponibles', null, [
        'Secundaria: integración a escuelas reconocidas en destinos de habla inglesa',
        'Preparatoria: semestre o año completo con certificado académico oficial',
        'Universidad: intercambio semestral o anual con validación de créditos',
      ]),
      sec('Posgrados — Eleva tu perfil profesional a nivel internacional', 'Orientación para maestrías y especializaciones en Canadá, USA, Inglaterra, Irlanda, Australia, Japón y Corea.', [
        'Negocios / MBA',
        'Tecnología e Inteligencia Artificial',
        'Marketing y Finanzas Internacionales',
        'Ingeniería y Logística',
        'Relaciones Internacionales',
        'Ciencias de la Salud',
      ]),
      sec('Nuestra Estrategia Académica Personalizada', 'Diseñamos tu ruta según:', [
        'Edad y nivel académico actual',
        'Objetivos profesionales a futuro',
        'Nivel de idioma',
        'Presupuesto familiar',
      ]),
    ],
  },
  {
    _id: 'programa-estudia-trabaja',
    _type: 'programa',
    programaId: { _type: 'slug', current: 'estudia-trabaja' },
    titulo: 'Estudia y Trabaja',
    subtitulo: 'Convierte tu experiencia internacional en una oportunidad real',
    icono: '💼',
    color: 'green',
    descripcion: 'Nuestros programas te permiten aprender el idioma y al mismo tiempo tener la posibilidad de trabajar legalmente en el país destino. Una experiencia que combina formación académica + independencia financiera + crecimiento personal.',
    duracion: '24–52 semanas',
    rangoEdad: '18 años en adelante',
    puntosClave: [
      'Permiso legal para trabajar',
      'Clases de idioma incluidas',
      'Experiencia laboral internacional',
      'Cobertura parcial de gastos',
      'Ventaja competitiva en tu CV',
    ],
    queIncluye: [
      'Evaluación de perfil y viabilidad',
      'Selección de programa y destino',
      'Diseño de estrategia de visa',
      'Preparación previa al viaje',
      'Seguimiento durante la estancia',
      'Apoyo en búsqueda de empleo inicial',
    ],
    paraQuien: 'Jóvenes mayores de 18 años, profesionistas que buscan experiencia internacional, estudiantes que desean mejorar su idioma y personas que buscan independencia financiera mientras fortalecen su CV.',
    whatsappMessage: 'Hola, me interesa el programa Estudia y Trabaja. ¿Cómo funciona el permiso de trabajo y cuáles son los destinos disponibles?',
    secciones: [
      sec('Estudia y Trabaja en Irlanda — Programas de 33 semanas', 'Uno de los destinos más buscados por estudiantes mexicanos.', [
        'Curso de inglés intensivo',
        'Permiso de trabajo parcial',
        'Ambiente multicultural',
        'Posibilidad de renovar programa',
      ]),
      sec('Estudia y Trabaja en Australia', 'Sistema educativo moderno y flexible. Programas de 24, 32, 48 y 52 semanas.', [
        'Programas vocacionales y de idiomas',
        'Permiso de trabajo parcial',
        'Alta calidad de vida',
        'Diversidad cultural',
      ]),
      sec('Estudia y Trabaja en Nueva Zelanda', 'Destino seguro, organizado y con excelente calidad educativa. Programas de 24, 32, 48 y 52 semanas.', [
        'Cursos acreditados',
        'Opciones de trabajo según programa y visa',
        'Entorno natural y multicultural',
      ]),
      sec('Estudia y Trabaja en Malta', 'País europeo con clima agradable y ambiente joven. Programas de 24, 32, 48 y 52 semanas.', [
        'Inglés en entorno europeo',
        'Posibilidad de empleo según normativa vigente',
        'Experiencia multicultural accesible',
      ]),
      sec('Estudia y Trabaja en Dubái', 'Centro internacional de negocios y modernidad. Programa de un año.', [
        'Inglés internacional',
        'Diplomado de Negocios Internacionales',
        'Entorno profesional global',
        'Experiencia multicultural',
        'Oportunidades en sectores dinámicos',
      ]),
      sec('Estudia y Trabaja en Canadá', 'Uno de los destinos más sólidos y seguros para estudiantes internacionales. Sistema educativo de alto nivel, ambiente multicultural y oportunidades laborales reales.', [
        'Programas vocacionales (College / Diploma): negocios, marketing, logística, tecnología, administración',
        'Certificaciones profesionales en áreas estratégicas',
        'Inglés + Pathway a College para fortalecer el idioma antes del programa académico',
        'Trabajo legal durante estudios según normativa vigente',
        'Experiencia laboral canadiense y red internacional de contactos',
      ]),
    ],
  },
  {
    _id: 'programa-formacion-corporativa',
    _type: 'programa',
    programaId: { _type: 'slug', current: 'formacion-corporativa' },
    titulo: 'Formación Corporativa',
    subtitulo: 'Capacita a tu equipo con visión global',
    icono: '🏢',
    color: 'orange',
    descripcion: 'En un entorno empresarial cada vez más competitivo, las organizaciones que invierten en formación internacional desarrollan equipos más estratégicos, bilingües y preparados para mercados globales. Diseñamos programas enfocados en resultados, productividad y expansión internacional.',
    duracion: 'A la medida',
    rangoEdad: 'Profesionales y directivos',
    puntosClave: [
      'Idiomas ejecutivos: inglés, francés, alemán, japonés, mandarín',
      'Visitas corporativas y networking internacional',
      'Formación en comercio internacional y tecnología',
      'Programas intensivos para directivos',
      'Diagnóstico personalizado para cada empresa',
    ],
    queIncluye: [
      'Diagnóstico de necesidades corporativas',
      'Selección estratégica de destino',
      'Diseño de programa a la medida',
      'Coordinación de visitas corporativas',
      'Gestión de visas y logística',
      'Acompañamiento ejecutivo',
    ],
    paraQuien: 'Empresas con expansión internacional, corporativos con clientes extranjeros, startups tecnológicas, empresas exportadoras y directivos que buscan equipos bilingües con cultura empresarial global.',
    whatsappMessage: 'Hola, me interesa el programa de Formación Corporativa para mi empresa. ¿Pueden enviarme información sobre opciones, destinos y costos?',
    secciones: [
      sec('Cursos de Idiomas Ejecutivos', 'Ideal para empresas con expansión internacional.', [
        'Inglés para negocios',
        'Inglés técnico por industria',
        'Francés, Alemán, Japonés o Mandarín',
        'Programas intensivos para directivos',
      ]),
      sec('Programas Especializados', 'Diseñamos el programa según el perfil del equipo.', [
        'Comercio internacional',
        'Logística global',
        'Tecnología e innovación',
        'Inteligencia Artificial',
        'Marketing digital internacional',
        'Finanzas internacionales',
        'Liderazgo y management',
      ]),
      sec('Inmersión Empresarial', 'Perfecto para empresas exportadoras o en expansión.', [
        'Formación académica en destino',
        'Visitas corporativas',
        'Networking internacional',
        'Conferencias sectoriales',
      ]),
      sec('Nuestro Proceso de Trabajo', null, [
        'Diagnóstico de necesidades reales',
        'Diseño de programa personalizado',
        'Propuesta académica internacional',
        'Planeación logística',
        'Implementación',
        'Evaluación de resultados',
      ]),
    ],
  },
  {
    _id: 'programa-idiomas-en-linea',
    _type: 'programa',
    programaId: { _type: 'slug', current: 'idiomas-en-linea' },
    titulo: 'Idiomas en Línea',
    subtitulo: 'Aprende Inglés, Francés o Alemán desde casa con metodología internacional',
    icono: '💻',
    color: 'teal',
    descripcion: 'Hoy no necesitas viajar para comenzar tu preparación internacional. Nuestros programas de idiomas en línea te permiten avanzar de forma estructurada, con profesores calificados y enfoque práctico, desde cualquier lugar de México.',
    duracion: 'Flexible',
    rangoEdad: 'Todas las edades',
    puntosClave: [
      'Clases en vivo con profesor calificado',
      'Grupos reducidos o clases individuales',
      'Inglés, Francés y Alemán',
      'Evaluación de nivel inicial gratuita',
      'Horarios flexibles adaptados a ti',
    ],
    queIncluye: [
      'Evaluación de nivel gratuita',
      'Recomendación personalizada de programa',
      'Material digital incluido',
      'Seguimiento de progreso por niveles',
      'Clases de conversación práctica',
      'Preparación para exámenes internacionales',
    ],
    paraQuien: 'Estudiantes que buscan educación internacional, profesionistas que necesitan el idioma en el trabajo, jóvenes que mejoran su fluidez y personas que planean aplicar a una visa estudiantil.',
    whatsappMessage: 'Hola, me interesa tomar clases de Idiomas en Línea con CILC. ¿Cómo funciona la evaluación de nivel gratuita y cuáles son los horarios disponibles?',
    secciones: [
      sec('Inglés en Línea — Prepara tu futuro internacional', 'El inglés es la base de la internacionalización.', [
        'Inglés general',
        'Inglés académico',
        'Inglés para negocios',
        'Preparación para exámenes (IELTS, TOEFL, Cambridge)',
      ]),
      sec('Francés en Línea — Abre oportunidades en Europa y Canadá', 'El francés es uno de los idiomas estratégicos más valorados globalmente.', [
        'Francés general',
        'Conversación',
        'Preparación DELF / DALF',
      ]),
      sec('Alemán en Línea — Fortalece tu perfil profesional en Europa', 'El alemán es clave en sectores industriales y tecnológicos.', [
        'Alemán general',
        'Conversación',
        'Preparación para certificaciones (Goethe)',
      ]),
      sec('Te asesoramos según tu objetivo', null, [
        'Estudiar en el extranjero',
        'Aplicar a universidad internacional',
        'Migración académica',
        'Crecimiento profesional',
      ]),
    ],
  },
];

async function seed() {
  console.log('Cargando programas en Sanity...\n');

  for (const programa of programas) {
    const label = programa.titulo;
    try {
      await client.createOrReplace(programa);
      console.log(`✅ ${programa.icono} ${label}`);
    } catch (err) {
      console.error(`❌ ${label}: ${err.message}`);
    }
  }

  console.log('\nListo. Recarga el Studio para ver los cambios.');
}

seed().catch((err) => {
  console.error('Error general:', err.message);
  process.exit(1);
});
