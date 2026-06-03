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
}

export const programs: Program[] = [
  {
    id: 'idiomas',
    slug: 'idiomas',
    title: 'Idiomas',
    subtitle: 'Aprende un idioma en su país de origen',
    description:
      'Programas de inglés, francés, alemán, japonés, coreano y mandarín en escuelas internacionalmente acreditadas. Desde 2 semanas, con certificación oficial.',
    icon: '🗣️',
    color: 'blue',
    countries: ['Canadá', 'Estados Unidos', 'Inglaterra', 'Irlanda', 'Australia', 'Nueva Zelanda', 'Dubái', 'Francia', 'Alemania', 'Japón', 'Corea del Sur', 'China'],
    duration: 'Desde 2 semanas',
    ageRange: '12–60 años',
    highlights: [
      'Escuelas internacionalmente acreditadas',
      'Certificación oficial al completar',
      'Grupos reducidos con profesores nativos',
      'Inglés, Francés, Alemán, Japonés, Coreano y Mandarín',
      'Múltiples destinos disponibles',
    ],
    includes: [
      'Selección de país y escuela',
      'Inscripción oficial en la escuela',
      'Gestión de visa de estudiante',
      'Seguro médico internacional',
      'Orientación previa al viaje',
      'Acompañamiento durante tu estancia',
    ],
    idealFor: 'Estudiantes y profesionales que quieren dominar un idioma en su ambiente natural.',
  },
  {
    id: 'au-pair',
    slug: 'au-pair',
    title: 'Au Pair',
    subtitle: 'Vive con una familia anfitriona en el extranjero',
    description:
      'Experiencia cultural única: vive con una familia, apoya en el cuidado de niños y recibe beneficios económicos y educativos mientras mejoras tu idioma.',
    icon: '👨‍👩‍👧‍👦',
    color: 'pink',
    countries: ['Estados Unidos', 'Alemania'],
    duration: '6–12 meses',
    ageRange: '18–26 años',
    highlights: [
      'Estipendio semanal garantizado',
      'Seguro médico incluido',
      'Alojamiento con familia anfitriona',
      'Clases de idioma incluidas',
      'Residencia legal en el país',
    ],
    includes: [
      'Evaluación de perfil',
      'Documentación y solicitudes',
      'Preparación para entrevista con familia',
      'Gestión de visa J-1 (USA) o Au Pair (Alemania)',
      'Orientación previa al viaje',
      'Seguimiento durante tu estancia',
    ],
    idealFor: 'Jóvenes de 18–26 años con experiencia en cuidado de niños que desean una inmersión cultural completa.',
  },
  {
    id: 'anos-academicos',
    slug: 'anos-academicos',
    title: 'Años Académicos',
    subtitle: 'Cursa un semestre o año escolar en el extranjero',
    description:
      'Estudia Secundaria, Preparatoria o Universidad en el extranjero con integración total al sistema académico oficial. Una experiencia que transforma tu futuro.',
    icon: '🎓',
    color: 'purple',
    countries: ['Canadá', 'Inglaterra', 'Irlanda', 'Australia', 'Japón', 'Corea del Sur'],
    duration: 'Semestre o año completo',
    ageRange: '12–25 años',
    highlights: [
      'Integración al sistema académico oficial',
      'Secundaria, Preparatoria o Universidad',
      'Alojamiento con familia anfitriona o residencia',
      'Certificado académico reconocido',
      'Experiencia multicultural transformadora',
    ],
    includes: [
      'Inscripción en institución acreditada',
      'Integración al sistema académico local',
      'Alojamiento seguro (familia o residencia)',
      'Asesoría en trámites y visa',
      'Orientación previa al viaje',
      'Acompañamiento integral',
    ],
    idealFor: 'Estudiantes de 12 a 25 años que quieren cursar parte de su educación formal en el extranjero.',
  },
  {
    id: 'estudia-trabaja',
    slug: 'estudia-trabaja',
    title: 'Estudia y Trabaja',
    subtitle: 'Estudia y gana experiencia laboral internacional',
    description:
      'Combina clases de idioma con experiencia laboral real en el extranjero. Cubre parte de tus gastos mientras construyes un perfil profesional internacional.',
    icon: '💼',
    color: 'green',
    countries: ['Irlanda', 'Australia', 'Nueva Zelanda', 'Malta', 'Dubái', 'Canadá'],
    duration: '24–52 semanas',
    ageRange: '18–35 años',
    highlights: [
      'Permiso legal para trabajar',
      'Clases de idioma incluidas',
      'Experiencia laboral internacional',
      'Cobertura parcial de gastos',
      'Ventaja competitiva en tu CV',
    ],
    includes: [
      'Evaluación de perfil y viabilidad',
      'Selección de programa y destino',
      'Diseño de estrategia de visa',
      'Preparación previa al viaje',
      'Seguimiento durante la estancia',
      'Apoyo en búsqueda de empleo inicial',
    ],
    idealFor: 'Jóvenes profesionales que quieren experiencia laboral internacional y mejorar su idioma mientras generan ingresos.',
  },
  {
    id: 'formacion-corporativa',
    slug: 'formacion-corporativa',
    title: 'Formación Corporativa',
    subtitle: 'Capacitación internacional para empresas y directivos',
    description:
      'Programas de idiomas ejecutivos, inmersión empresarial y formación especializada en destinos clave. Diseñados a la medida de cada empresa.',
    icon: '🏢',
    color: 'orange',
    countries: ['Canadá', 'Estados Unidos', 'Inglaterra', 'Irlanda', 'Australia', 'Dubái', 'Alemania', 'Japón', 'Corea del Sur'],
    duration: 'A la medida',
    ageRange: 'Profesionales y directivos',
    highlights: [
      'Idiomas ejecutivos: inglés, francés, alemán, japonés, mandarín',
      'Visitas corporativas y networking internacional',
      'Formación en comercio internacional y tecnología',
      'Programas intensivos para directivos',
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
    idealFor: 'Corporativos con expansión internacional, startups tecnológicas, empresas exportadoras y directivos que requieren actualización global.',
  },
  {
    id: 'idiomas-en-linea',
    slug: 'idiomas-en-linea',
    title: 'Idiomas en Línea',
    subtitle: 'Aprende desde donde estés con profesores en vivo',
    description:
      'Clases en vivo con profesor, grupos reducidos o modalidad individual. Inglés, Francés y Alemán con evaluación de nivel gratuita y horarios flexibles.',
    icon: '💻',
    color: 'teal',
    countries: ['Desde México'],
    duration: 'Flexible',
    ageRange: 'Todas las edades',
    highlights: [
      'Clases en vivo con profesor calificado',
      'Grupos reducidos o clases individuales',
      'Inglés, Francés y Alemán',
      'Evaluación de nivel inicial gratuita',
      'Horarios flexibles adaptados a ti',
    ],
    includes: [
      'Evaluación de nivel gratuita',
      'Recomendación personalizada de programa',
      'Material digital incluido',
      'Seguimiento de progreso por niveles',
      'Clases de conversación práctica',
      'Preparación para exámenes internacionales',
    ],
    idealFor: 'Estudiantes y profesionales que quieren aprender o mejorar un idioma sin salir de México.',
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
