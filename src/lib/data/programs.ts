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
      'Ofrecemos programas de idiomas en los países donde realmente se hablan, con inmersión total y certificación internacional. Inglés, Francés, Alemán, Japonés, Coreano y Mandarín desde 2 semanas.',
    icon: '🗣️',
    color: 'blue',
    countries: ['Canadá', 'Estados Unidos', 'Inglaterra', 'Irlanda', 'Australia', 'Nueva Zelanda', 'Dubái', 'Francia', 'Alemania', 'Japón', 'Corea del Sur', 'China'],
    duration: 'Desde 2 semanas',
    ageRange: '12–60 años',
    highlights: [
      'Escuelas con acreditación internacional',
      'Programas desde 2 semanas en adelante',
      'Opciones para jóvenes y adultos',
      'Certificación oficial al completar',
      'Inmersión cultural completa',
      'Inglés, Francés, Alemán, Japonés, Coreano y Mandarín',
    ],
    includes: [
      'Selección de país y escuela',
      'Inscripción oficial en la escuela',
      'Gestión de visa de estudiante',
      'Seguro médico internacional',
      'Orientación previa al viaje',
      'Acompañamiento durante tu estancia',
    ],
    idealFor: 'Jóvenes y adultos de 12 a 60 años que quieren aprender o perfeccionar un idioma con inmersión real en su país de origen, logrando un avance más rápido y pronunciación natural.',
    whatsappMessage: 'Hola, me interesa el programa de Idiomas en el extranjero. ¿Me pueden orientar sobre destinos, duración y costos?',
  },
  {
    id: 'au-pair',
    slug: 'au-pair',
    title: 'Au Pair',
    subtitle: 'Vive, Aprende y Trabaja Cuidando Niños en el Extranjero',
    description:
      'Programa de intercambio cultural donde resides con una familia anfitriona, apoyas en el cuidado de niños y recibes beneficios económicos, educativos y culturales en USA y Alemania.',
    icon: '👨‍👩‍👧‍👦',
    color: 'pink',
    countries: ['Estados Unidos', 'Alemania'],
    duration: '6–12 meses',
    ageRange: '18–26 años',
    highlights: [
      'Hospedaje y comidas con familia anfitriona',
      'Estipendio semanal garantizado',
      'Seguro médico incluido',
      'Clases de idioma incluidas',
      'Residencia legal en el país',
      'Apoyo para cursos académicos (USA)',
    ],
    includes: [
      'Evaluación de perfil del candidato',
      'Requisitos y documentación actualizados',
      'Preparación para entrevista con familia anfitriona',
      'Gestión de visa J-1 (USA) o Au Pair (Alemania)',
      'Orientación previa al viaje',
      'Seguimiento durante tu estancia',
    ],
    idealFor: 'Jóvenes de 18 a 26 años con experiencia verificable en cuidado de niños, responsables y comprometidos, que desean una inmersión cultural completa mientras desarrollan independencia financiera.',
    whatsappMessage: 'Hola, me interesa el programa Au Pair. Tengo experiencia con niños y quisiera conocer los requisitos y destinos disponibles.',
  },
  {
    id: 'anos-academicos',
    slug: 'anos-academicos',
    title: 'Años Académicos',
    subtitle: 'Semestres y Años Escolares en el Extranjero',
    description:
      'Semestres y años escolares completos de Secundaria, Preparatoria y Universidad en Canadá, Inglaterra, Irlanda y Australia, con instituciones reconocidas y acompañamiento integral.',
    icon: '🎓',
    color: 'purple',
    countries: ['Canadá', 'Inglaterra', 'Irlanda', 'Australia', 'Japón', 'Corea del Sur'],
    duration: 'Semestre o año completo',
    ageRange: '12–25 años',
    highlights: [
      'Secundaria, Preparatoria o Universidad en el extranjero',
      'Integración al sistema académico oficial del país',
      'Estrategia académica personalizada',
      'Alojamiento con familia anfitriona o residencia',
      'Certificado académico reconocido',
      'Experiencia multicultural transformadora',
    ],
    includes: [
      'Inscripción en institución acreditada',
      'Integración al sistema académico local',
      'Alojamiento seguro (familia o residencia)',
      'Asesoría en trámites y visa estudiantil',
      'Orientación previa al viaje',
      'Acompañamiento antes, durante y después',
    ],
    idealFor: 'Estudiantes de 12 a 25 años que desean fortalecer su perfil internacional, dominar el idioma o ampliar su visión global cursando parte de su educación formal en el extranjero.',
    whatsappMessage: 'Hola, me interesa el programa de Años Académicos. ¿Pueden orientarme sobre opciones para estudiar un semestre o año completo en el extranjero?',
  },
  {
    id: 'estudia-trabaja',
    slug: 'estudia-trabaja',
    title: 'Estudia y Trabaja',
    subtitle: 'Convierte tu experiencia internacional en una oportunidad real',
    description:
      'Combina aprendizaje de idiomas con oportunidades de trabajo legal en el extranjero. Cubre parte de tus gastos mientras construyes un perfil profesional internacional.',
    icon: '💼',
    color: 'green',
    countries: ['Irlanda', 'Australia', 'Nueva Zelanda', 'Malta', 'Dubái', 'Canadá'],
    duration: '24–52 semanas',
    ageRange: '18–35 años',
    highlights: [
      'Permiso legal para trabajar incluido',
      'Irlanda: inglés intensivo 33 semanas',
      'Australia y NZ: 24–52 semanas con trabajo parcial',
      'Dubái: diploma de Negocios Internacionales',
      'Canadá: diplomas de College y certificaciones',
      'Experiencia laboral en entornos multiculturales',
    ],
    includes: [
      'Evaluación de perfil y viabilidad',
      'Selección de programa y destino',
      'Diseño de estrategia de visa',
      'Preparación previa al viaje',
      'Seguimiento durante la estancia',
      'Apoyo en búsqueda de empleo inicial',
    ],
    idealFor: 'Adultos de 18 años en adelante que buscan mejorar su idioma y obtener experiencia laboral internacional real, generando ingresos que cubran parte de su estadía.',
    whatsappMessage: 'Hola, me interesa el programa Estudia y Trabaja. ¿Cómo funciona el permiso de trabajo y cuáles son los destinos disponibles?',
  },
  {
    id: 'formacion-corporativa',
    slug: 'formacion-corporativa',
    title: 'Formación Corporativa',
    subtitle: 'Capacita a tu equipo con visión global',
    description:
      'En un entorno empresarial cada vez más competitivo, diseñamos programas de formación corporativa en el extranjero enfocados en resultados, productividad y expansión internacional.',
    icon: '🏢',
    color: 'orange',
    countries: ['Canadá', 'Estados Unidos', 'Inglaterra', 'Irlanda', 'Australia', 'Dubái', 'Alemania', 'Japón', 'Corea del Sur'],
    duration: 'A la medida',
    ageRange: 'Profesionales y directivos',
    highlights: [
      'Idiomas ejecutivos: inglés, francés, alemán, japonés, mandarín',
      'Programas especializados: IA, marketing digital, finanzas internacionales',
      'Comercio internacional y logística global',
      'Inmersión empresarial y visitas corporativas',
      'Networking internacional y conferencias del sector',
      'Diagnóstico personalizado para cada empresa',
    ],
    includes: [
      'Diagnóstico de necesidades corporativas',
      'Selección estratégica de destino',
      'Diseño de programa a la medida',
      'Coordinación de visitas corporativas',
      'Gestión de visas y logística',
      'Acompañamiento ejecutivo',
    ],
    idealFor: 'Empresas con expansión internacional, startups tecnológicas, exportadoras y directivos que requieren equipos bilingües, con mayor eficiencia en negociación internacional y cultura empresarial global.',
    whatsappMessage: 'Hola, me interesa el programa de Formación Corporativa para mi empresa. ¿Pueden enviarme información sobre opciones, destinos y costos?',
  },
  {
    id: 'idiomas-en-linea',
    slug: 'idiomas-en-linea',
    title: 'Idiomas en Línea',
    subtitle: 'Aprende Inglés, Francés o Alemán desde casa con metodología internacional',
    description:
      'Hoy no necesitas viajar para comenzar tu preparación internacional. Nuestros programas en línea te permiten avanzar de forma estructurada, con profesores calificados y enfoque práctico, desde cualquier lugar de México.',
    icon: '💻',
    color: 'teal',
    countries: ['Desde México'],
    duration: 'Flexible',
    ageRange: 'Todas las edades',
    highlights: [
      'Clases en vivo con profesor calificado',
      'Grupos reducidos o modalidad individual',
      'Inglés general, académico y para negocios',
      'Francés y Alemán con preparación para certificación',
      'Evaluación de nivel inicial gratuita',
      'Seguimiento de avance por niveles',
    ],
    includes: [
      'Evaluación de nivel gratuita',
      'Recomendación personalizada de programa',
      'Material digital incluido',
      'Seguimiento de progreso por niveles',
      'Clases de conversación práctica',
      'Preparación para exámenes internacionales (IELTS, DELF, Goethe)',
    ],
    idealFor: 'Estudiantes, profesionistas y cualquier persona que quiera aprender o mejorar inglés, francés o alemán desde México con metodología internacional, horarios flexibles y resultados medibles.',
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
