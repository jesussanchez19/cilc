import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'epcoien9',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: 'skt3vPBsXZxGoCKXCpQizjLQ8r64dqP2hXj7YK6zSihwEwBGrVVT4PxHSCDCjauuOTEYPqLZXGAz6EHpIoqC62W4okjW9TKk8WXNoxrXQnOZYph7w9kLm6F8kiQ3B2EL4c2iQYlfuB877cE03NffKpjpbHzDexydv4uLGo6MckyANqgPPud0',
});

const programas = [
  {
    _id: 'programa-idiomas',
    _type: 'programa',
    programaId: 'idiomas',
    descripcion: 'Programas de inglés, francés, alemán, japonés, coreano y mandarín en escuelas internacionalmente acreditadas. Desde 2 semanas, con certificación oficial.',
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
    paraQuien: 'Estudiantes y profesionales que quieren dominar un idioma en su ambiente natural.',
  },
  {
    _id: 'programa-au-pair',
    _type: 'programa',
    programaId: 'au-pair',
    descripcion: 'Experiencia cultural única: vive con una familia, apoya en el cuidado de niños y recibe beneficios económicos y educativos mientras mejoras tu idioma.',
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
    paraQuien: 'Jóvenes de 18–26 años con experiencia en cuidado de niños que desean una inmersión cultural completa.',
  },
  {
    _id: 'programa-anos-academicos',
    _type: 'programa',
    programaId: 'anos-academicos',
    descripcion: 'Estudia Secundaria, Preparatoria o Universidad en el extranjero con integración total al sistema académico oficial. Una experiencia que transforma tu futuro.',
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
    paraQuien: 'Estudiantes de 12 a 25 años que quieren cursar parte de su educación formal en el extranjero.',
  },
  {
    _id: 'programa-estudia-trabaja',
    _type: 'programa',
    programaId: 'estudia-trabaja',
    descripcion: 'Combina clases de idioma con experiencia laboral real en el extranjero. Cubre parte de tus gastos mientras construyes un perfil profesional internacional.',
    duracion: '24–52 semanas',
    rangoEdad: '18–35 años',
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
    paraQuien: 'Jóvenes profesionales que quieren experiencia laboral internacional y mejorar su idioma mientras generan ingresos.',
  },
  {
    _id: 'programa-formacion-corporativa',
    _type: 'programa',
    programaId: 'formacion-corporativa',
    descripcion: 'Programas de idiomas ejecutivos, inmersión empresarial y formación especializada en destinos clave. Diseñados a la medida de cada empresa.',
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
    paraQuien: 'Corporativos con expansión internacional, startups tecnológicas, empresas exportadoras y directivos que requieren actualización global.',
  },
  {
    _id: 'programa-idiomas-en-linea',
    _type: 'programa',
    programaId: 'idiomas-en-linea',
    descripcion: 'Clases en vivo con profesor, grupos reducidos o modalidad individual. Inglés, Francés y Alemán con evaluación de nivel gratuita y horarios flexibles.',
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
    paraQuien: 'Estudiantes y profesionales que quieren aprender o mejorar un idioma sin salir de México.',
  },
];

async function seed() {
  console.log('Cargando programas en Sanity...\n');

  for (const programa of programas) {
    const label = programa.programaId;
    try {
      await client.createOrReplace(programa);
      console.log(`✅ ${label}`);
    } catch (err) {
      console.error(`❌ ${label}: ${err.message}`);
    }
  }

  console.log('\nListo. Edítalos en Studio → Programas.');
}

seed().catch((err) => {
  console.error('Error general:', err.message);
  process.exit(1);
});
