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

const programas = [
  {
    _id: 'programa-idiomas',
    _type: 'programa',
    programaId: { _type: 'slug', current: 'idiomas' },
    titulo: 'Idiomas',
    subtitulo: 'Aprende un idioma en su país de origen',
    icono: '🗣️',
    color: 'blue',
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
    whatsappMessage: 'Hola, me interesa el programa de Idiomas en el extranjero. ¿Me pueden orientar sobre destinos, duración y costos?',
  },
  {
    _id: 'programa-au-pair',
    _type: 'programa',
    programaId: { _type: 'slug', current: 'au-pair' },
    titulo: 'Au Pair',
    subtitulo: 'Vive con una familia anfitriona en el extranjero',
    icono: '👨‍👩‍👧‍👦',
    color: 'pink',
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
    whatsappMessage: 'Hola, me interesa el programa Au Pair. Tengo experiencia con niños y quisiera conocer los requisitos y destinos disponibles.',
  },
  {
    _id: 'programa-anos-academicos',
    _type: 'programa',
    programaId: { _type: 'slug', current: 'anos-academicos' },
    titulo: 'Años Académicos',
    subtitulo: 'Cursa un semestre o año escolar en el extranjero',
    icono: '🎓',
    color: 'purple',
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
    whatsappMessage: 'Hola, me interesa el programa de Años Académicos. ¿Pueden orientarme sobre opciones para estudiar un semestre o año completo en el extranjero?',
  },
  {
    _id: 'programa-estudia-trabaja',
    _type: 'programa',
    programaId: { _type: 'slug', current: 'estudia-trabaja' },
    titulo: 'Estudia y Trabaja',
    subtitulo: 'Estudia y gana experiencia laboral internacional',
    icono: '💼',
    color: 'green',
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
    whatsappMessage: 'Hola, me interesa el programa Estudia y Trabaja. ¿Cómo funciona el permiso de trabajo y cuáles son los destinos disponibles?',
  },
  {
    _id: 'programa-formacion-corporativa',
    _type: 'programa',
    programaId: { _type: 'slug', current: 'formacion-corporativa' },
    titulo: 'Formación Corporativa',
    subtitulo: 'Capacitación internacional para empresas y directivos',
    icono: '🏢',
    color: 'orange',
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
    whatsappMessage: 'Hola, me interesa el programa de Formación Corporativa para mi empresa. ¿Pueden enviarme información sobre opciones, destinos y costos?',
  },
  {
    _id: 'programa-idiomas-en-linea',
    _type: 'programa',
    programaId: { _type: 'slug', current: 'idiomas-en-linea' },
    titulo: 'Idiomas en Línea',
    subtitulo: 'Aprende desde donde estés con profesores en vivo',
    icono: '💻',
    color: 'teal',
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
    whatsappMessage: 'Hola, me interesa tomar clases de Idiomas en Línea con CILC. ¿Cómo funciona la evaluación de nivel gratuita y cuáles son los horarios disponibles?',
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
