export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];      // párrafos del artículo
  image: string;          // ruta en /public/images/blog/<slug>/cover.png
  date: string;           // ISO format: '2026-06-01'
  readingTime: number;    // minutos
  category: string;
}

// ─────────────────────────────────────────────────────────────────────────────
//  IMÁGENES DE PORTADA
//  Carpeta: public/images/blog/<slug>/cover.png
// ─────────────────────────────────────────────────────────────────────────────
export const articles: Article[] = [
  {
    id: '1',
    slug: 'como-elegir-el-mejor-destino-para-estudiar-ingles',
    title: 'Cómo elegir el mejor destino para estudiar inglés en el extranjero',
    excerpt: 'Canadá, Irlanda, Reino Unido o Estados Unidos. Te ayudamos a comparar costos, clima y oportunidades para tomar la mejor decisión según tu perfil.',
    content: [
      'Elegir el país correcto para estudiar inglés es una de las decisiones más importantes de todo el proceso. No existe un destino "mejor" en términos absolutos: existe el destino correcto para tus objetivos, presupuesto y estilo de vida.',
      'Canadá destaca por su relación calidad-precio y la posibilidad de trabajar legalmente mientras estudias en programas de más de 6 meses. Las ciudades como Toronto y Vancouver ofrecen comunidades hispanohablantes grandes, lo cual facilita la adaptación inicial.',
      'Irlanda es ideal si buscas un acento neutro y un costo de vida más accesible que Reino Unido, además de formar parte de la Unión Europea en términos de movilidad posterior si planeas continuar tu camino académico en Europa.',
      'Reino Unido sigue siendo el referente histórico para la enseñanza del inglés, con escuelas centenarias y certificaciones reconocidas mundialmente, aunque el costo de vida en Londres puede ser un factor decisivo en contra.',
      'Estados Unidos ofrece la mayor variedad de programas y especializaciones, ideal si tu objetivo es combinar el idioma con una introducción al sistema universitario americano.',
      'En CILC, el primer paso siempre es un diagnóstico gratuito donde analizamos tu presupuesto, tiempo disponible y objetivos profesionales para recomendarte el destino que realmente se ajusta a ti, no el que es popular en redes sociales.',
    ],
    image: '/images/blog/como-elegir-el-mejor-destino-para-estudiar-ingles/cover.png',
    date: '2026-06-15',
    readingTime: 4,
    category: 'Idiomas',
  },
  {
    id: '2',
    slug: 'guia-completa-programa-au-pair',
    title: 'Guía completa para tu primera experiencia como Au Pair',
    excerpt: 'Todo lo que necesitas saber antes de vivir con una familia anfitriona en el extranjero: requisitos, beneficios y cómo prepararte emocionalmente.',
    content: [
      'El programa Au Pair es una de las formas más completas de vivir una inmersión cultural total: convives con una familia local, apoyas en el cuidado de los niños y, a cambio, recibes hospedaje, alimentación y un estipendio económico.',
      'Los requisitos varían por país, pero generalmente se solicita tener entre 18 y 30 años, nivel básico-intermedio del idioma local y experiencia previa con niños (formal o informal).',
      'La preparación emocional es tan importante como la logística. Vivir en la casa de una familia que no es la tuya implica adaptarte a nuevas dinámicas, horarios y formas de comunicación. Es normal sentir nervios las primeras semanas.',
      'Uno de los beneficios menos conocidos del programa es el acceso a clases de idioma subsidiadas o gratuitas en muchos países europeos, lo que acelera enormemente tu aprendizaje comparado con un curso de idiomas tradicional.',
      'En CILC seleccionamos cuidadosamente a las familias anfitrionas y mantenemos acompañamiento constante durante toda tu estancia, desde la firma del contrato hasta tu regreso a México.',
    ],
    image: '/images/blog/guia-completa-programa-au-pair/cover.png',
    date: '2026-06-08',
    readingTime: 5,
    category: 'Au Pair',
  },
  {
    id: '3',
    slug: 'estudia-y-trabaja-cuanto-puedes-ahorrar',
    title: 'Estudia y Trabaja: ¿cuánto puedes ahorrar realmente en el extranjero?',
    excerpt: 'Hacemos números reales sobre ingresos, gastos y ahorro neto en los destinos más populares para el programa Work and Study.',
    content: [
      'Una de las preguntas más frecuentes sobre el programa Estudia y Trabaja es si realmente "se paga solo" o si es necesario llevar un colchón financiero adicional. La respuesta honesta es: depende del destino y tus hábitos de gasto.',
      'En Canadá, un estudiante internacional puede trabajar hasta 20 horas semanales durante el periodo escolar y tiempo completo en vacaciones. Con un salario mínimo de referencia, esto cubre cómodamente hospedaje y alimentación en ciudades medianas.',
      'Irlanda ofrece condiciones similares, con la ventaja de un mercado laboral muy activo en sectores de hospitalidad y retail, ideales para estudiantes que recién llegan sin experiencia laboral previa en el país.',
      'Australia es el destino con mejor relación entre salario mínimo y poder adquisitivo para estudiantes internacionales, aunque los costos de vuelo y trámite de visa son más altos que en destinos norteamericanos.',
      'Nuestra recomendación: lleva siempre un fondo inicial de al menos 2 meses de gastos básicos. El ahorro real comienza a partir del tercer mes, una vez que ya tienes trabajo estable y rutina establecida.',
    ],
    image: '/images/blog/estudia-y-trabaja-cuanto-puedes-ahorrar/cover.png',
    date: '2026-05-28',
    readingTime: 6,
    category: 'Estudia y Trabaja',
  },
  {
    id: '4',
    slug: 'documentos-necesarios-para-tu-visa-de-estudiante',
    title: 'Documentos necesarios para tu visa de estudiante: checklist 2026',
    excerpt: 'La lista actualizada de documentos que necesitas reunir antes de iniciar tu proceso de visa, para evitar retrasos de último momento.',
    content: [
      'Cada país tiene requisitos específicos, pero existe un conjunto de documentos base que prácticamente todos los procesos de visa de estudiante solicitan en algún punto del trámite.',
      'Pasaporte vigente con al menos 6 meses de validez posterior a la fecha de regreso planeada. Este es el documento más sencillo de resolver pero el que más retrasa procesos cuando se descuida.',
      'Carta de aceptación de la institución educativa, que detalla el programa, duración y costo total. Sin este documento no es posible iniciar la solicitud de visa en la mayoría de los países.',
      'Comprobante de solvencia económica, ya sea estados de cuenta bancarios de los últimos 3 a 6 meses o una carta de patrocinio si un familiar cubre tus gastos.',
      'Seguro médico internacional válido para todo el periodo de estancia, requisito obligatorio en Canadá, Reino Unido e Irlanda.',
      'Certificado de antecedentes no penales, apostillado y en algunos casos traducido oficialmente al idioma del país destino.',
      'En CILC gestionamos directamente la mayoría de estos trámites contigo, revisando cada documento antes de enviarlo para minimizar el riesgo de rechazo por errores administrativos.',
    ],
    image: '/images/blog/documentos-necesarios-para-tu-visa-de-estudiante/cover.png',
    date: '2026-05-12',
    readingTime: 5,
    category: 'Trámites',
  },
  {
    id: '5',
    slug: 'formacion-corporativa-ingles-de-negocios',
    title: 'Por qué las empresas mexicanas están invirtiendo en inglés de negocios',
    excerpt: 'Cada vez más compañías capacitan a sus equipos en inglés corporativo. Te explicamos el impacto real en productividad y retención de talento.',
    content: [
      'El inglés de negocios ya no es un "nice to have" en las empresas mexicanas con operaciones internacionales: se ha convertido en un requisito de competitividad directo, especialmente en sectores de manufactura, tecnología y servicios.',
      'Los programas de Formación Corporativa permiten diseñar rutas de aprendizaje específicas según el área: inglés para ventas, para atención a cliente, para negociación o para presentaciones ejecutivas, en lugar de cursos genéricos.',
      'Uno de los hallazgos más interesantes en los equipos que capacitamos es la mejora en retención de talento: los colaboradores valoran la inversión en su desarrollo profesional como un beneficio tangible, comparable a un aumento salarial.',
      'El formato híbrido —clases presenciales intensivas combinadas con seguimiento en línea— ha mostrado mejores resultados que los cursos 100% presenciales tradicionales, al adaptarse mejor a la carga laboral de los equipos.',
      'Si tu empresa está considerando invertir en capacitación de idiomas, el primer paso es un diagnóstico de nivel por colaborador, que nos permite diseñar un plan realista de inversión y tiempo de implementación.',
    ],
    image: '/images/blog/formacion-corporativa-ingles-de-negocios/cover.png',
    date: '2026-04-30',
    readingTime: 4,
    category: 'Formación Corporativa',
  },
];

// Devuelve los N artículos más recientes (ordenados por fecha desc)
export function getLatestArticles(count: number = 3): Article[] {
  return [...articles]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
