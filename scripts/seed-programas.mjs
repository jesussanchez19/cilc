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

const item = (texto, tooltip) => ({
  _type: 'puntoClave', _key: texto.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 40),
  texto, ...(tooltip ? { tooltip } : {}),
});

const inc = (texto, tooltip) => ({
  _type: 'queIncluyeItem', _key: texto.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 40),
  texto, ...(tooltip ? { tooltip } : {}),
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
      item('Escuelas internacionalmente acreditadas', 'Trabajamos con instituciones reconocidas por organismos internacionales de acreditación educativa en cada país destino.'),
      item('Certificación oficial al completar', 'Al finalizar recibes un certificado emitido por la escuela que puedes incluir en tu CV o presentar en procesos de selección.'),
      item('Grupos reducidos con profesores nativos', 'Grupos pequeños que permiten mayor atención personalizada, con profesores hablantes nativos del idioma que enseñan.'),
      item('Inglés, Francés, Alemán, Japonés, Coreano y Mandarín', 'Cada idioma se estudia en su país de origen para una inmersión auténtica: inglés en países anglófonos, francés en Francia o Canadá, y así sucesivamente.'),
      item('Múltiples destinos disponibles', 'Contamos con destinos en Europa, América, Oceanía y Asia para que elijas el que mejor se adapte a tu idioma y presupuesto.'),
    ],
    queIncluye: [
      inc('Selección de país y escuela', 'Te asesoramos para elegir el destino y la escuela que mejor se adaptan a tu objetivo, nivel de idioma y presupuesto.'),
      inc('Inscripción oficial en la escuela', 'Gestionamos tu registro directamente con la institución y te enviamos la carta de aceptación oficial.'),
      inc('Gestión de visa de estudiante', 'Coordinamos todos los trámites migratorios y te preparamos para la entrevista consular si aplica.'),
      inc('Seguro médico internacional', 'Cobertura médica completa durante toda tu estancia en el extranjero, requerida por la mayoría de los destinos.'),
      inc('Orientación previa al viaje', 'Sesión donde revisamos contigo: trámites pendientes, llegada al aeropuerto, alojamiento, transporte local y vida cotidiana en el destino.'),
      inc('Acompañamiento durante tu estancia', 'Seguimiento personalizado de principio a fin. Estamos disponibles para apoyarte ante cualquier situación durante tu programa.'),
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
      item('Estipendio semanal garantizado', 'Recibes un pago semanal directamente de la familia anfitriona, establecido por el programa y la regulación migratoria del país.'),
      item('Seguro médico incluido', 'Cobertura médica durante toda tu estancia, como parte de los beneficios del programa Au Pair.'),
      item('Alojamiento con familia anfitriona', 'Habitación privada y comidas incluidas en el hogar de tu familia anfitriona durante toda tu estancia.'),
      item('Clases de idioma incluidas', 'Acceso a clases del idioma local como parte de los beneficios del programa.'),
      item('Residencia legal en el país', 'El programa incluye los trámites para que cuentes con estatus migratorio legal durante toda tu estancia.'),
    ],
    queIncluye: [
      inc('Evaluación de perfil', 'Analizamos tu experiencia con niños, nivel de idioma y expectativas para encontrar el programa y la familia ideal para ti.'),
      inc('Documentación y solicitudes', 'Te acompañamos en la preparación de todos los documentos requeridos: cartas de referencia, antecedentes penales, fotografías y formularios.'),
      inc('Preparación para entrevista con familia', 'Te entrenamos para presentarte de manera exitosa ante las familias candidatas y destacar tu perfil.'),
      inc('Gestión de visa J-1 (USA) o Au Pair (Alemania)', 'Coordinamos tu proceso migratorio completo según el país elegido: visa J-1 para USA o permiso Au Pair para Alemania.'),
      inc('Orientación previa al viaje', 'Sesión donde revisamos contigo: trámites pendientes, llegada al aeropuerto, alojamiento, transporte local y vida cotidiana en el destino.'),
      inc('Seguimiento durante tu estancia', 'Seguimiento personalizado de principio a fin. Estamos disponibles para apoyarte ante cualquier situación durante tu programa.'),
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
      item('Integración al sistema académico oficial', 'Estudias en una escuela o universidad local junto con estudiantes del país, dentro del plan de estudios oficial.'),
      item('Secundaria, Preparatoria o Universidad', 'Opciones para distintos niveles educativos: desde educación media hasta licenciatura en el extranjero.'),
      item('Alojamiento con familia anfitriona o residencia', 'Alojamiento supervisado: familia anfitriona o residencia estudiantil, según el destino y tu preferencia.'),
      item('Certificado académico reconocido', 'El periodo cursado en el extranjero queda registrado en un certificado emitido por la institución.'),
      item('Experiencia multicultural transformadora', 'Convivir con estudiantes de distintos países en un entorno académico real es una experiencia que transforma tu perspectiva.'),
    ],
    queIncluye: [
      inc('Inscripción en institución acreditada', 'Gestionamos tu registro en la escuela o universidad seleccionada y te enviamos la carta de aceptación oficial.'),
      inc('Integración al sistema académico local', 'Te acompañamos en el proceso de adaptación al calendario, materias y metodología de enseñanza del país destino.'),
      inc('Alojamiento seguro (familia o residencia)', 'Alojamiento supervisado: familia anfitriona seleccionada o residencia estudiantil certificada, según tu preferencia y destino.'),
      inc('Asesoría en trámites y visa', 'Te guiamos paso a paso en todos los trámites migratorios y documentación requerida para tu ingreso al país.'),
      inc('Orientación previa al viaje', 'Sesión donde revisamos contigo: trámites pendientes, llegada al aeropuerto, alojamiento, transporte local y vida cotidiana en el destino.'),
      inc('Acompañamiento integral', 'Seguimiento personalizado de principio a fin. Estamos disponibles para apoyarte ante cualquier situación durante tu programa.'),
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
      item('Permiso legal para trabajar', 'El programa incluye la autorización migratoria para trabajar durante tu estancia, conforme a la regulación del país destino.'),
      item('Clases de idioma incluidas', 'Acceso a clases del idioma local como parte del programa.'),
      item('Experiencia laboral internacional', 'Trabajas en empresas reales del país destino, construyendo un perfil profesional con experiencia internacional.'),
      item('Cobertura parcial de gastos', 'Los ingresos del trabajo pueden cubrir parte de tus gastos durante la estancia.'),
      item('Ventaja competitiva en tu CV', 'Combinar estudios con experiencia laboral en el extranjero es un diferenciador valorado por empleadores y programas de posgrado.'),
    ],
    queIncluye: [
      inc('Evaluación de perfil y viabilidad', 'Revisamos tu perfil académico, financiero y migratorio para identificar el programa y destino más viable para ti.'),
      inc('Selección de programa y destino', 'Analizamos contigo las opciones de destino, esquema de visa y tipo de trabajo disponible para elegir la combinación ideal.'),
      inc('Diseño de estrategia de visa', 'Diseñamos la ruta migratoria óptima según tu perfil y el país elegido para maximizar tus posibilidades de aprobación.'),
      inc('Preparación previa al viaje', 'Sesión donde revisamos contigo: trámites pendientes, llegada al aeropuerto, alojamiento, transporte local y vida cotidiana en el destino.'),
      inc('Seguimiento durante la estancia', 'Seguimiento personalizado de principio a fin. Estamos disponibles para apoyarte ante cualquier situación durante tu programa.'),
      inc('Apoyo en búsqueda de empleo inicial', 'Te orientamos con recursos, plataformas y estrategias para encontrar trabajo una vez que llegues a tu destino.'),
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
      item('Idiomas ejecutivos: inglés, francés, alemán, japonés, mandarín', 'Programas de idioma diseñados para entornos de negocios: negociación, presentaciones y comunicación ejecutiva.'),
      item('Visitas corporativas y networking internacional', 'Visitas a empresas y espacios de networking en el país destino para ampliar la red de contactos internacionales.'),
      item('Formación en comercio internacional y tecnología', 'Programas especializados en áreas de alto impacto para la expansión internacional de tu empresa.'),
      item('Programas intensivos para directivos', 'Formatos diseñados para aprovechar al máximo el tiempo de ejecutivos con agenda apretada.'),
      item('Diagnóstico personalizado para cada empresa', 'Antes de diseñar el programa analizamos las necesidades y objetivos específicos de tu organización.'),
    ],
    queIncluye: [
      inc('Diagnóstico de necesidades corporativas', 'Realizamos un análisis detallado de las áreas de mejora del equipo para diseñar un programa alineado con los objetivos de la empresa.'),
      inc('Selección estratégica de destino', 'Identificamos el país y ciudad que ofrecen el entorno más favorable para los objetivos específicos de tu empresa.'),
      inc('Diseño de programa a la medida', 'Estructuramos el contenido, duración y formato del programa según las necesidades reales de tu equipo directivo.'),
      inc('Coordinación de visitas corporativas', 'Organizamos encuentros con empresas locales, cámaras de comercio y eventos de networking en el país destino.'),
      inc('Gestión de visas y logística', 'Nos encargamos de todos los trámites migratorios y la logística operativa del grupo: vuelos, alojamiento y traslados.'),
      inc('Acompañamiento ejecutivo', 'Un consultor dedicado acompaña al grupo durante todo el programa para garantizar el logro de objetivos.'),
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
      item('Clases en vivo con profesor calificado', 'Cada sesión es en tiempo real con un profesor certificado, con interacción y retroalimentación directa.'),
      item('Grupos reducidos o clases individuales', 'Elige entre grupos pequeños para practicar con compañeros, o clases individuales para un aprendizaje más personalizado.'),
      item('Inglés, Francés y Alemán', 'Los tres idiomas disponibles en modalidad en línea, para todos los niveles y con enfoque en comunicación real.'),
      item('Evaluación de nivel inicial gratuita', 'Realizamos una evaluación sin costo para ubicarte en el nivel correcto antes de iniciar.'),
      item('Horarios flexibles adaptados a ti', 'Distintos horarios disponibles para que puedas estudiar sin interrumpir tu vida diaria.'),
    ],
    queIncluye: [
      inc('Evaluación de nivel gratuita', 'Realizamos una evaluación sin costo antes de iniciar para ubicarte en el nivel correcto y recomendarte el programa más adecuado.'),
      inc('Recomendación personalizada de programa', 'Según tu nivel, objetivos y disponibilidad, te recomendamos la modalidad y horario que mejor se adapten a ti.'),
      inc('Material digital incluido', 'Recibes acceso completo al material didáctico digital: libros de texto, ejercicios, audios y recursos de práctica adicionales.'),
      inc('Seguimiento de progreso por niveles', 'Evaluamos tu avance al término de cada nivel para confirmar que estás progresando y ajustar el plan si es necesario.'),
      inc('Clases de conversación práctica', 'Sesiones dedicadas exclusivamente a la práctica oral con temas reales para ganar fluidez y confianza al hablar.'),
      inc('Preparación para exámenes internacionales', 'Preparación específica para IELTS, TOEFL, Cambridge (inglés), DELF/DALF (francés) o Goethe-Zertifikat (alemán).'),
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
