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
      'USA: residencia legal, apoyo económico semanal, seguro médico — 12 meses extensible',
      'Alemania: colocación con familia, curso de idioma incluido, apoyo mensual — 6 a 12 meses',
      'Vivir con familias locales y comprender su sistema educativo',
      'Desarrollar responsabilidad, madurez e independencia financiera',
      'Aprendizaje acelerado del idioma en contexto real',
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
      'Estrategia académica personalizada según perfil y objetivos',
      'Alojamiento seguro con familia anfitriona o residencia',
      'Certificado académico reconocido',
      'Orientación para maestrías y especializaciones (Posgrados)',
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
      'Irlanda: inglés intensivo 33 semanas, permiso de trabajo parcial',
      'Australia: programas vocacionales 24, 32, 48 y 52 semanas con trabajo parcial',
      'Nueva Zelanda: cursos acreditados 24, 32, 48 y 52 semanas, entorno tranquilo',
      'Malta: inglés en entorno europeo, 24, 32, 48 y 52 semanas',
      'Dubái: programa de un año con Diplomado de Negocios Internacionales',
      'Canadá: diplomas de College, certificaciones profesionales e inglés + pathway',
    ],
    includes: [
      'Evaluación de perfil académico y financiero',
      'Selección del programa y destino adecuado',
      'Diseño de estrategia de visa',
      'Preparación previa al viaje',
      'Seguimiento durante la estancia',
      'Acompañamiento continuo paso a paso',
    ],
    idealFor: 'Jóvenes mayores de 18 años, profesionistas que buscan experiencia internacional, estudiantes que desean mejorar su idioma y personas que buscan independencia financiera mientras fortalecen su CV internacional.',
    whatsappMessage: 'Hola, me interesa el programa Estudia y Trabaja. ¿Cómo funciona el permiso de trabajo y cuáles son los destinos disponibles?',
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
      'Idiomas ejecutivos: inglés, inglés técnico por industria, francés, alemán, japonés, mandarín',
      'Programas especializados: comercio internacional, logística global, IA, marketing digital, finanzas',
      'Inmersión empresarial: visitas corporativas, networking internacional, conferencias sectoriales',
      'Liderazgo y management para directivos',
      'No vendemos paquetes estándar: diagnóstico + diseño a la medida',
      'La formación internacional no es un gasto. Es una inversión estratégica.',
    ],
    includes: [
      'Diagnóstico de necesidades corporativas',
      'Diseño de programa personalizado',
      'Selección estratégica de destino e institución',
      'Coordinación de visitas corporativas',
      'Logística completa y gestión de visas',
      'Acompañamiento ejecutivo y evaluación de resultados',
    ],
    idealFor: 'Empresas con expansión internacional, corporativos con clientes extranjeros, startups tecnológicas, empresas exportadoras y directivos que buscan equipos bilingües con cultura empresarial global.',
    whatsappMessage: 'Hola, me interesa el programa de Formación Corporativa para mi empresa. ¿Pueden enviarme información sobre opciones, destinos y costos?',
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
      'Clases en vivo con profesor, grupos reducidos o modalidad individual',
      'Inglés: general, académico, para negocios y preparación para exámenes',
      'Francés: general, conversación y preparación DELF/DALF',
      'Alemán: general, conversación y preparación para certificación',
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
  },
];

export const programColorMap: Record<string, { bg: string; text: string; light: string; border: string }> = {
  blue:   { bg: 'bg-blue-600',   text: 'text-blue-600',   light: 'bg-blue-50',   border: 'border-blue-200' },
  pink:   { bg: 'bg-pink-500',   text: 'text-pink-600',   light: 'bg-pink-50',   border: 'border-pink-200' },
  purple: { bg: 'bg-purple-600', text: 'text-purple-600', light: 'bg-purple-50', border: 'border-purple-200' },
  green:  { bg: 'bg-green-600',  text: 'text-green-600',  light: 'bg-green-50',  border: 'border-green-200' },
  orange: { bg: 'bg-orange-500', text: 'text-orange-600', light: 'bg-orange-50', border: 'border-orange-200' },
  teal:   { bg: 'bg-teal-600',   text: 'text-teal-600',   light: 'bg-teal-50',   border: 'border-teal-200' },
};
