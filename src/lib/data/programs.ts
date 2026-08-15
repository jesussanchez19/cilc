export interface ProgramSection {
  title: string;
  description?: string;
  items?: string[];
}

export interface Program {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  color: string;
  countries: string[];
  duration: string;
  ageRange: string;
  highlights: string[];
  includes: string[];
  idealFor: string;
  whatsappMessage: string;
  sections?: ProgramSection[];
  heroImageUrl?: string;
  highlightTooltips?: Record<string, string>;
  includeTooltips?: Record<string, string>;
  /**
   * Qué preguntar en el formulario de testimonio en lugar del país.
   *
   * Hay programas que no se definen por dónde se hicieron sino por cuál se
   * eligió: en Cursos, todos son en Canadá y lo que distingue una experiencia
   * de otra es la especialidad. Cuando esto existe, el formulario cambia esa
   * pregunta; cuando no, sigue preguntando el país.
   */
  enLugarDePais?: { etiqueta: string; marcador: string; opciones: string[] };
}

export const programs: Program[] = [
  {
    id: 'idiomas',
    slug: 'idiomas',
    title: 'Idiomas',
    subtitle: 'Aprende el idioma en su país de origen y transforma tu perfil internacional',
    description:
      'Ofrecemos programas de idiomas en los países donde realmente se hablan, con inmersión total y certificación internacional. Porque aprender un idioma en aula no es lo mismo que vivirlo todos los días.',
    icon: '🗣️',
    color: 'blue',
    countries: ['Canadá', 'Inglaterra', 'Dubái', 'Estados Unidos', 'Australia', 'Irlanda', 'Nueva Zelanda', 'Francia', 'Alemania', 'Japón', 'Corea del Sur', 'China'],
    duration: 'Desde 2 semanas',
    ageRange: '12–60 años',
    highlights: [
      'Escuelas acreditadas internacionalmente',
      'Programas desde 2 semanas en adelante',
      'Opciones para jóvenes y adultos',
      'Certificación oficial al finalizar',
      'Posibilidad de combinar estudio y experiencia cultural',
      'Inglés, Francés, Japonés, Coreano, Mandarín y Alemán',
    ],
    includes: [
      'Selección del país y escuela ideal',
      'Inscripción oficial',
      'Trámite de visa',
      'Seguro médico internacional',
      'Orientación previa al viaje',
      'Seguimiento durante tu estancia',
    ],
    idealFor: 'Jóvenes y adultos de 12 a 60 años que quieren aprender un idioma con inmersión real en su país de origen, logrando un avance más rápido, pronunciación natural y mayor impacto profesional.',
    whatsappMessage: 'Hola, me interesa el programa de Idiomas en el extranjero. ¿Me pueden orientar sobre destinos, duración y costos?',
    sections: [
      {
        title: 'Inglés en los Mejores Destinos del Mundo',
        description: 'Canadá · Inglaterra · Dubái · Estados Unidos · Australia · Irlanda · Nueva Zelanda',
        items: [
          'Escuelas acreditadas internacionalmente',
          'Programas desde 2 semanas en adelante',
          'Opciones para jóvenes y adultos',
          'Certificación oficial al finalizar',
          'Posibilidad de combinar estudio y experiencia cultural',
        ],
      },
      {
        title: 'Francés en Países Francófonos',
        description: 'Canadá (Quebec) · Francia',
        items: [
          'Francés general',
          'Francés académico',
          'Preparación para exámenes oficiales',
          'Programas de inmersión cultural',
        ],
      },
      {
        title: 'Idiomas Asiáticos y Europeos',
        items: [
          'Japonés en Japón: programas intensivos, opciones académicas y culturales, inmersión completa',
          'Coreano en Corea: cursos por niveles, experiencia cultural auténtica, ambiente universitario internacional',
          'Mandarín en China: programas académicos certificados, inmersión lingüística real, enriquecimiento cultural',
          'Alemán en Alemania: cursos intensivos, preparación para certificación oficial, ambiente académico de alto nivel',
        ],
      },
    ],
  },
  {
    id: 'au-pair',
    slug: 'au-pair',
    title: 'Au Pair',
    subtitle: 'Vive, Aprende y Trabaja Cuidando Niños en el Extranjero',
    description:
      'El programa Au Pair es una experiencia cultural internacional donde vives con una familia anfitriona, apoyas en el cuidado de niños y recibes beneficios económicos, educativos y culturales. Programas ofrecidos en Estados Unidos y Alemania.',
    icon: '👨‍👩‍👧‍👦',
    color: 'pink',
    countries: ['Estados Unidos', 'Alemania'],
    duration: '6–12 meses',
    ageRange: '18–26 años',
    highlights: [
      'Vivir con familias locales y comprender su sistema educativo',
      'Desarrollar responsabilidad, madurez e independencia financiera',
      'Aprendizaje acelerado del idioma en contexto real',
      'Residencia legal en el país durante el programa',
      'Seguro médico incluido en ambos destinos',
      'Requisitos actualizados 2026',
    ],
    includes: [
      'Evaluación de perfil del candidato',
      'Asistencia con documentación y requisitos',
      'Preparación para entrevista con familia anfitriona',
      'Orientación para trámite de visa J-1 (USA) o Au Pair (Alemania)',
      'Orientación previa al viaje',
      'Acompañamiento durante tu estancia',
    ],
    idealFor: 'Jóvenes de 18 a 26 años con experiencia verificable en cuidado de niños, habilidades básicas o intermedias del idioma, disponibilidad mínima de 6 a 12 meses, responsabilidad y compromiso.',
    whatsappMessage: 'Hola, me interesa el programa Au Pair. Tengo experiencia con niños y quisiera conocer los requisitos y destinos disponibles.',
    sections: [
      {
        title: 'Au Pair en USA',
        description: 'Duración: 12 meses (extensible) · Edad: 18–25 años',
        items: [
          'Residencia legal con familia anfitriona',
          'Apoyo económico semanal (stipend)',
          'Inscripción en cursos académicos durante la estancia',
          'Mejora del idioma inglés en contexto real',
          'Beneficios incluidos: housing, meals, seguro médico, apoyo para cursos, guía de la agencia',
        ],
      },
      {
        title: 'Au Pair en Alemania',
        description: 'Duración: 6–12 meses',
        items: [
          'Colocación con familia anfitriona alemana',
          'Curso de idioma incluido',
          'Apoyo económico mensual (Taschengeld)',
          'Seguro médico incluido',
          'Experiencia cultural europea completa',
        ],
      },
      {
        title: 'Perfil Ideal del Candidato',
        items: [
          '18–26 años',
          'Experiencia verificable en cuidado de niños',
          'Habilidades básicas o intermedias del idioma',
          'Disponibilidad mínima de 6 a 12 meses',
          'Persona responsable y comprometida',
        ],
      },
    ],
  },
  {
    id: 'anos-academicos',
    slug: 'anos-academicos',
    title: 'Años Académicos',
    subtitle: 'Semestres y Años Escolares en el Extranjero',
    description:
      'Vive la experiencia académica internacional que transforma tu futuro. Ofrecemos periodos académicos a nivel Secundaria, Preparatoria y Universidad en Canadá, Inglaterra, Irlanda y Australia, con instituciones reconocidas y acompañamiento integral.',
    icon: '🎓',
    color: 'purple',
    countries: ['Canadá', 'Inglaterra', 'Irlanda', 'Australia', 'Japón', 'Corea del Sur'],
    duration: 'Semestre o año completo',
    ageRange: '12–25 años',
    highlights: [
      'Secundaria, Preparatoria y Universidad en el extranjero',
      'Integración al sistema académico oficial del país',
      'Estrategia académica personalizada según tu perfil y objetivos',
      'Alojamiento seguro con familia anfitriona o residencia',
      'Certificado académico reconocido',
      'Orientación para Posgrados: maestrías y especializaciones',
    ],
    includes: [
      'Inscripción en institución acreditada',
      'Integración al sistema académico local',
      'Alojamiento seguro (familia anfitriona o residencia)',
      'Asesoría en trámites y visa estudiantil',
      'Orientación previa al viaje',
      'Acompañamiento antes, durante y después',
    ],
    idealFor: 'Estudiantes que buscan fortalecer su perfil internacional, dominar el idioma o ampliar su visión global, y familias que quieren una experiencia segura y estratégica para sus hijos.',
    whatsappMessage: 'Hola, me interesa el programa de Años Académicos. ¿Pueden orientarme sobre opciones para estudiar un semestre o año completo en el extranjero?',
    sections: [
      {
        title: 'Niveles Disponibles',
        items: [
          'Secundaria: integración a escuelas reconocidas en destinos de habla inglesa',
          'Preparatoria: semestre o año completo con certificado académico oficial',
          'Universidad: intercambio semestral o anual con validación de créditos',
        ],
      },
      {
        title: 'Posgrados — Eleva tu perfil profesional a nivel internacional',
        description: 'Orientación para maestrías y especializaciones en Canadá, USA, Inglaterra, Irlanda, Australia, Japón y Corea.',
        items: [
          'Negocios / MBA',
          'Tecnología e Inteligencia Artificial',
          'Marketing y Finanzas Internacionales',
          'Ingeniería y Logística',
          'Relaciones Internacionales',
          'Ciencias de la Salud',
        ],
      },
      {
        title: 'Nuestra Estrategia Académica Personalizada',
        description: 'Diseñamos tu ruta según:',
        items: [
          'Edad y nivel académico actual',
          'Objetivos profesionales a futuro',
          'Nivel de idioma',
          'Presupuesto familiar',
        ],
      },
    ],
  },
  {
    id: 'estudia-trabaja',
    slug: 'estudia-trabaja',
    title: 'Estudia y Trabaja',
    subtitle: 'Convierte tu experiencia internacional en una oportunidad real',
    description:
      'Nuestros programas te permiten aprender el idioma y al mismo tiempo tener la posibilidad de trabajar legalmente en el país destino. Una experiencia que combina formación académica + independencia financiera + crecimiento personal.',
    icon: '💼',
    color: 'green',
    countries: ['Irlanda', 'Australia', 'Nueva Zelanda', 'Malta', 'Dubái', 'Canadá'],
    duration: '24–52 semanas',
    ageRange: '18 años en adelante',
    highlights: [
      'El estudiante trabaja legalmente según la regulación migratoria vigente',
      'Cubre parte de sus gastos mientras gana experiencia internacional',
      'Mejora el idioma en contexto profesional real',
      'Vive una experiencia multicultural auténtica',
      'Desarrolla madurez, autonomía y ventaja competitiva global',
      'Proceso estratégico personalizado desde el inicio',
    ],
    includes: [
      'Evaluación de perfil académico y financiero',
      'Definición de viabilidad como candidato',
      'Selección del programa y destino adecuado',
      'Diseño de estrategia de visa',
      'Preparación previa al viaje',
      'Acompañamiento continuo durante la estancia',
    ],
    idealFor: 'Jóvenes mayores de 18 años, profesionistas que buscan experiencia internacional, estudiantes que desean mejorar su idioma y personas que buscan independencia financiera mientras fortalecen su CV.',
    whatsappMessage: 'Hola, me interesa el programa Estudia y Trabaja. ¿Cómo funciona el permiso de trabajo y cuáles son los destinos disponibles?',
    sections: [
      {
        title: 'Estudia y Trabaja en Irlanda — Programas de 33 semanas',
        description: 'Uno de los destinos más buscados por estudiantes mexicanos.',
        items: [
          'Curso de inglés intensivo',
          'Permiso de trabajo parcial',
          'Ambiente multicultural',
          'Posibilidad de renovar programa',
        ],
      },
      {
        title: 'Estudia y Trabaja en Australia',
        description: 'Sistema educativo moderno y flexible. Programas de 24, 32, 48 y 52 semanas.',
        items: [
          'Programas vocacionales y de idiomas',
          'Permiso de trabajo parcial',
          'Alta calidad de vida',
          'Diversidad cultural',
        ],
      },
      {
        title: 'Estudia y Trabaja en Nueva Zelanda',
        description: 'Destino seguro, organizado y con excelente calidad educativa. Programas de 24, 32, 48 y 52 semanas.',
        items: [
          'Cursos acreditados',
          'Opciones de trabajo según programa y visa',
          'Entorno natural y multicultural',
        ],
      },
      {
        title: 'Estudia y Trabaja en Malta',
        description: 'País europeo con clima agradable y ambiente joven. Programas de 24, 32, 48 y 52 semanas.',
        items: [
          'Inglés en entorno europeo',
          'Posibilidad de empleo según normativa vigente',
          'Experiencia multicultural accesible',
        ],
      },
      {
        title: 'Estudia y Trabaja en Dubái',
        description: 'Centro internacional de negocios y modernidad. Programa de un año.',
        items: [
          'Inglés internacional',
          'Diplomado de Negocios Internacionales',
          'Entorno profesional global',
          'Experiencia multicultural',
          'Oportunidades en sectores dinámicos',
        ],
      },
      {
        title: 'Estudia y Trabaja en Canadá',
        description: 'Uno de los destinos más sólidos y seguros para estudiantes internacionales. Sistema educativo de alto nivel, ambiente multicultural y oportunidades laborales reales.',
        items: [
          'Programas vocacionales (College / Diploma): negocios, marketing, logística, tecnología, administración',
          'Certificaciones profesionales en áreas estratégicas',
          'Inglés + Pathway a College para fortalecer el idioma antes del programa académico',
          'Trabajo legal durante estudios según normativa vigente',
          'Experiencia laboral canadiense y red internacional de contactos',
        ],
      },
    ],
  },
  {
    id: 'formacion-corporativa',
    slug: 'formacion-corporativa',
    title: 'Formación Corporativa',
    subtitle: 'Capacita a tu equipo con visión global',
    description:
      'En un entorno empresarial cada vez más competitivo, las organizaciones que invierten en formación internacional desarrollan equipos más estratégicos, bilingües y preparados para mercados globales. Diseñamos programas enfocados en resultados, productividad y expansión internacional.',
    icon: '🏢',
    color: 'orange',
    countries: ['Canadá', 'Estados Unidos', 'Inglaterra', 'Irlanda', 'Australia', 'Dubái', 'Alemania', 'Japón', 'Corea del Sur'],
    duration: 'A la medida',
    ageRange: 'Profesionales y directivos',
    highlights: [
      'Equipos bilingües con mayor eficiencia operativa',
      'Mejora en negociación internacional',
      'Cultura empresarial global',
      'Aumento en competitividad',
      'Retención de talento',
      'La formación internacional no es un gasto. Es una inversión estratégica.',
    ],
    includes: [
      'Diagnóstico de necesidades corporativas',
      'Diseño de programa personalizado',
      'Propuesta académica internacional',
      'Planeación logística completa',
      'Coordinación de visitas corporativas',
      'Acompañamiento ejecutivo y evaluación de resultados',
    ],
    idealFor: 'Empresas con expansión internacional, corporativos con clientes extranjeros, startups tecnológicas, empresas exportadoras y directivos que buscan equipos bilingües con cultura empresarial global.',
    whatsappMessage: 'Hola, me interesa el programa de Formación Corporativa para mi empresa. ¿Pueden enviarme información sobre opciones, destinos y costos?',
    sections: [
      {
        title: 'Cursos de Idiomas Ejecutivos',
        description: 'Ideal para empresas con expansión internacional.',
        items: [
          'Inglés para negocios',
          'Inglés técnico por industria',
          'Francés, Alemán, Japonés o Mandarín',
          'Programas intensivos para directivos',
        ],
      },
      {
        title: 'Programas Especializados',
        description: 'Diseñamos el programa según el perfil del equipo.',
        items: [
          'Comercio internacional',
          'Logística global',
          'Tecnología e innovación',
          'Inteligencia Artificial',
          'Marketing digital internacional',
          'Finanzas internacionales',
          'Liderazgo y management',
        ],
      },
      {
        title: 'Inmersión Empresarial',
        description: 'Perfecto para empresas exportadoras o en expansión.',
        items: [
          'Formación académica en destino',
          'Visitas corporativas',
          'Networking internacional',
          'Conferencias sectoriales',
        ],
      },
      {
        title: 'Nuestro Proceso de Trabajo',
        items: [
          'Diagnóstico de necesidades reales',
          'Diseño de programa personalizado',
          'Propuesta académica internacional',
          'Planeación logística',
          'Implementación',
          'Evaluación de resultados',
        ],
      },
    ],
  },
  {
    id: 'idiomas-en-linea',
    slug: 'idiomas-en-linea',
    title: 'Idiomas en Línea',
    subtitle: 'Aprende Inglés, Francés o Alemán desde casa con metodología internacional',
    description:
      'Hoy no necesitas viajar para comenzar tu preparación internacional. Nuestros programas de idiomas en línea te permiten avanzar de forma estructurada, con profesores calificados y enfoque práctico, desde cualquier lugar de México.',
    icon: '💻',
    color: 'teal',
    countries: ['Desde México'],
    duration: 'Flexible',
    ageRange: 'Todas las edades',
    highlights: [
      'Clases en vivo con profesor',
      'Grupos reducidos o modalidad individual',
      'Enfoque conversacional y práctico',
      'Material digital incluido',
      'Evaluación de nivel inicial sin costo',
      'No son clases improvisadas. Es formación lingüística estratégica.',
    ],
    includes: [
      'Evaluación de nivel gratuita',
      'Recomendación personalizada de programa',
      'Material digital incluido',
      'Seguimiento de avance por niveles',
      'Clases de conversación práctica',
      'Asesoría según tu objetivo: estudiar en el extranjero, universidad, migración o crecimiento profesional',
    ],
    idealFor: 'Estudiantes que buscan educación internacional, profesionistas que necesitan el idioma en el trabajo, jóvenes que mejoran su fluidez y personas que planean aplicar a una visa estudiantil.',
    whatsappMessage: 'Hola, me interesa tomar clases de Idiomas en Línea con CILC. ¿Cómo funciona la evaluación de nivel gratuita y cuáles son los horarios disponibles?',
    sections: [
      {
        title: 'Inglés en Línea — Prepara tu futuro internacional',
        description: 'El inglés es la base de la internacionalización.',
        items: [
          'Inglés general',
          'Inglés académico',
          'Inglés para negocios',
          'Preparación para exámenes (IELTS, TOEFL, Cambridge)',
        ],
      },
      {
        title: 'Francés en Línea — Abre oportunidades en Europa y Canadá',
        description: 'El francés es uno de los idiomas estratégicos más valorados globalmente.',
        items: [
          'Francés general',
          'Conversación',
          'Preparación DELF / DALF',
        ],
      },
      {
        title: 'Alemán en Línea — Fortalece tu perfil profesional en Europa',
        description: 'El alemán es clave en sectores industriales y tecnológicos.',
        items: [
          'Alemán general',
          'Conversación',
          'Preparación para certificaciones (Goethe)',
        ],
      },
      {
        title: 'Te asesoramos según tu objetivo',
        items: [
          'Estudiar en el extranjero',
          'Aplicar a universidad internacional',
          'Migración académica',
          'Crecimiento profesional',
        ],
      },
    ],
  },
  {
    id: 'cursos',
    slug: 'cursos',
    title: 'Cursos',
    subtitle: 'Cursos cortos en Canadá para sumar una habilidad concreta a tu perfil',
    description:
      'Cursos cortos en Canadá para quien no busca un año académico ni un curso de idioma general, sino una habilidad concreta: marketing digital, inteligencia artificial, servicio al cliente o inglés de negocios. Formación aplicada, en semanas y no en años, con certificado al terminar.',
    icon: '📚',
    color: 'fuchsia',
    countries: ['Canadá'],
    duration: 'De 1 a 12 semanas',
    ageRange: '18 años en adelante',
    highlights: [
      'Marketing Digital, Inteligencia Artificial, Servicio al Cliente e Inglés de Negocios',
      'Programas cortos, de una a doce semanas',
      'Instituciones canadienses acreditadas',
      'Certificado oficial al terminar',
      'Compatibles con vacaciones o periodos entre ciclos',
      'Opción de combinarlos con un curso de idioma',
    ],
    includes: [
      'Asesoría para elegir el curso según tu objetivo',
      'Inscripción ante la institución',
      'Gestión de visa cuando el programa la requiere',
      'Opciones de alojamiento',
      'Seguro médico internacional',
      'Acompañamiento antes, durante y después del viaje',
    ],
    idealFor:
      'Profesionistas que quieren sumar una habilidad concreta —marketing digital, IA, atención a clientes o inglés de negocios— con certificado internacional; estudiantes universitarios que aprovechan un periodo vacacional; y quienes quieren probar la experiencia en Canadá antes de comprometerse con un programa largo.',
    whatsappMessage:
      'Hola, me interesan los Cursos cortos en Canadá de CILC (Marketing Digital, IA, Servicio al Cliente o Inglés de Negocios). ¿Qué opciones hay y cuánto duran?',
    enLugarDePais: {
      etiqueta: '¿Cuál curso tomaste?',
      marcador: 'Selecciona un curso',
      opciones: [
        'Marketing Digital',
        'Inteligencia Artificial',
        'Servicio al Cliente',
        'Inglés de Negocios',
      ],
    },
    sections: [
      {
        title: 'Cursos cortos disponibles en Canadá',
        description: 'Cuatro áreas, todas con enfoque práctico y certificado al terminar.',
        items: [
          'Marketing Digital',
          'Inteligencia Artificial',
          'Servicio al Cliente',
          'Inglés de Negocios',
        ],
      },
      {
        title: 'Cómo se combina con otros programas',
        items: [
          'Curso de idioma antes del curso de especialidad',
          'Curso corto como antesala de un año académico',
          'Formato intensivo en periodo vacacional',
        ],
      },
    ],
  },
];

/** `hex` es el mismo color en crudo, para donde no se pueden usar clases de
 *  Tailwind — la página de destino lo pinta en un estilo en línea. */
export const programColorMap: Record<string, { bg: string; text: string; light: string; border: string; hex: string }> = {
  blue:   { bg: 'bg-blue-600',   text: 'text-blue-600',   light: 'bg-blue-50',   border: 'border-blue-200',   hex: '#1B67E8' },
  pink:   { bg: 'bg-pink-500',   text: 'text-pink-600',   light: 'bg-pink-50',   border: 'border-pink-200',   hex: '#ec4899' },
  purple: { bg: 'bg-purple-600', text: 'text-purple-600', light: 'bg-purple-50', border: 'border-purple-200', hex: '#8b5cf6' },
  green:  { bg: 'bg-green-600',  text: 'text-green-600',  light: 'bg-green-50',  border: 'border-green-200',  hex: '#10b981' },
  orange: { bg: 'bg-orange-500', text: 'text-orange-600', light: 'bg-orange-50', border: 'border-orange-200', hex: '#f59e0b' },
  teal:   { bg: 'bg-teal-600',   text: 'text-teal-600',   light: 'bg-teal-50',   border: 'border-teal-200',   hex: '#06b6d4' },
  /* Fucsia se eligió midiendo, no a ojo: de los colores libres es el que más
     se aleja de los seis ya usados (ΔE 9.7 con el morado, su vecino más
     cercano) entre los que además pasan el 4.5:1 de contraste que necesita el
     texto. Amarillo y cielo se separaban más pero se quedaban en 2.94:1 y
     4.10:1, y el gris parece un programa desactivado. */
  fuchsia:{ bg: 'bg-fuchsia-600', text: 'text-fuchsia-600', light: 'bg-fuchsia-50', border: 'border-fuchsia-200', hex: '#d946ef' },
};

/* ── Listas derivadas ─────────────────────────────────────────────────────────
   Antes cada sitio que necesitaba "la lista de programas" escribía la suya:
   los dos formularios, tres esquemas de Sanity, la navegación, el pie, las
   migas y la estructura del Studio. Once copias que había que recordar tocar a
   la vez, y bastaba olvidar una para que un programa existiera en el menú pero
   no en el desplegable de cotización.

   Ahora salen todas de `programs`, que es la única lista de verdad. Añadir un
   programa es añadirlo ahí y ya. */

/** Los nombres, para los desplegables de los formularios y las opciones del CMS. */
export const PROGRAM_NAMES: string[] = programs.map((p) => p.title);

/** Enlace y etiqueta, para la navegación y el pie. */
export const PROGRAM_LINKS: { href: string; label: string }[] = programs.map((p) => ({
  href: `/programas/${p.slug}`,
  label: p.title,
}));

/** `slug → título`, para que las migas muestren un nombre legible. */
export const PROGRAM_LABELS: Record<string, string> = Object.fromEntries(
  programs.map((p) => [p.slug, p.title]),
);

/** Las rutas antiguas, sin `/programas`, que siguen redirigiendo. */
export const PROGRAM_LEGACY_PATHS: string[] = programs.map((p) => `/${p.slug}`);

/** `{ title, value }` con el slug como valor, para los desplegables del Studio
 *  que guardan el identificador y no el nombre. */
export const PROGRAM_OPTIONS: { title: string; value: string }[] = programs.map((p) => ({
  title: p.title,
  value: p.slug,
}));

/** Etiqueta, enlace, icono y color de cada programa, indexado por slug.
 *  Lo usa la página de destino para pintar las tarjetas de "Estudia en X". */
export const PROGRAM_INFO: Record<string, { label: string; href: string; icon: string; color: string }> =
  Object.fromEntries(
    programs.map((p) => [
      p.slug,
      {
        label: p.title,
        href: `/programas/${p.slug}`,
        icon: p.icon,
        color: programColorMap[p.color]?.hex ?? '#1B67E8',
      },
    ]),
  );

/** Los programas que preguntan otra cosa en vez del país, por título. */
export const PROGRAM_EN_LUGAR_DE_PAIS: Record<string, { etiqueta: string; marcador: string; opciones: string[] }> =
  Object.fromEntries(
    programs.filter((p) => p.enLugarDePais).map((p) => [p.title, p.enLugarDePais!]),
  );
