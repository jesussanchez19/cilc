export interface Testimonial {
  id: string;
  nombre: string;
  foto: string;
  programa: string;
  pais: string;
  bandera: string;
  rating: number;
  texto: string;
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    nombre: 'Andrea Martínez',
    foto: '/images/testimonials/andrea.jpg',
    programa: 'Idiomas',
    pais: 'Canadá',
    bandera: '🇨🇦',
    rating: 5,
    texto: 'Estudiar inglés en Vancouver fue la mejor decisión de mi vida. En tres meses mejoré más que en cinco años de clases en México. CILC me acompañó en todo momento.',
  },
  {
    id: '2',
    nombre: 'Diego Ramírez',
    foto: '/images/testimonials/diego.jpg',
    programa: 'Au Pair',
    pais: 'Alemania',
    bandera: '🇩🇪',
    rating: 5,
    texto: 'Vivir con una familia alemana me dio una perspectiva única. Aprendí el idioma, conocí la cultura y regresé con experiencia que ninguna universidad me habría dado.',
  },
  {
    id: '3',
    nombre: 'Sofía Herrera',
    foto: '/images/testimonials/sofia.jpg',
    programa: 'Estudia y Trabaja',
    pais: 'Irlanda',
    bandera: '🇮🇪',
    rating: 5,
    texto: 'El programa Estudia y Trabaja en Dublín fue increíble. Pude costear mis gastos trabajando part-time mientras mejoraba mi inglés. CILC resolvió todo el papeleo de visa.',
  },
  {
    id: '4',
    nombre: 'Carlos López',
    foto: '/images/testimonials/carlos.jpg',
    programa: 'Años Académicos',
    pais: 'Australia',
    bandera: '🇦🇺',
    rating: 5,
    texto: 'Hice mi último año de preparatoria en Sydney. Regresé con inglés fluido, amigos de todo el mundo y una mentalidad completamente diferente. Fue transformador.',
  },
  {
    id: '5',
    nombre: 'Valeria Torres',
    foto: '/images/testimonials/valeria.jpg',
    programa: 'Idiomas',
    pais: 'Irlanda',
    bandera: '🇮🇪',
    rating: 4,
    texto: 'Dublín es una ciudad perfecta para aprender inglés. La escuela que CILC eligió para mí tenía grupos muy internacionales y profesores excelentes.',
  },
  {
    id: '6',
    nombre: 'Miguel Ángel Fuentes',
    foto: '/images/testimonials/miguel.jpg',
    programa: 'Formación Corporativa',
    pais: 'Estados Unidos',
    bandera: '🇺🇸',
    rating: 5,
    texto: 'El programa corporativo en Boston elevó el nivel de inglés de negocios en todo nuestro equipo. CILC personalizó el programa exactamente a nuestras necesidades.',
  },
  {
    id: '7',
    nombre: 'Gabriela Sánchez',
    foto: '/images/testimonials/gabriela.jpg',
    programa: 'Au Pair',
    pais: 'Estados Unidos',
    bandera: '🇺🇸',
    rating: 5,
    texto: 'Ser Au Pair en Nueva York fue una aventura inolvidable. Me pagaban por cuidar niños mientras vivía en una de las ciudades más emocionantes del mundo.',
  },
  {
    id: '8',
    nombre: 'Roberto Mendoza',
    foto: '/images/testimonials/roberto.jpg',
    programa: 'Idiomas en Línea',
    pais: 'México',
    bandera: '🇲🇽',
    rating: 4,
    texto: 'Tomé clases de inglés en línea con CILC mientras trabajaba. Los horarios flexibles y los profesores nativos me permitieron avanzar dos niveles en cuatro meses.',
  },
  {
    id: '9',
    nombre: 'Lucía Vega',
    foto: '/images/testimonials/lucia.jpg',
    programa: 'Estudia y Trabaja',
    pais: 'Australia',
    bandera: '🇦🇺',
    rating: 5,
    texto: 'Melbourne es una ciudad espectacular. Trabajé en un café mientras estudiaba inglés y conocí personas de más de 20 países diferentes. Recomiendo CILC al 100%.',
  },
  {
    id: '10',
    nombre: 'Fernando Castro',
    foto: '/images/testimonials/fernando.jpg',
    programa: 'Años Académicos',
    pais: 'Canadá',
    bandera: '🇨🇦',
    rating: 5,
    texto: 'Estudié mi primer año universitario en Toronto. La calidad académica es impresionante y la experiencia multicultural que viví no tiene precio.',
  },
  {
    id: '11',
    nombre: 'Isabella Moreno',
    foto: '/images/testimonials/isabella.jpg',
    programa: 'Idiomas',
    pais: 'Inglaterra',
    bandera: '🇬🇧',
    rating: 5,
    texto: 'Estudiar en Londres fue un sueño hecho realidad. CILC se encargó de absolutamente todo: escuela, visa, alojamiento. Yo solo me enfoqué en aprender.',
  },
  {
    id: '12',
    nombre: 'Alejandro Ruiz',
    foto: '/images/testimonials/alejandro.jpg',
    programa: 'Idiomas',
    pais: 'Japón',
    bandera: '🇯🇵',
    rating: 5,
    texto: 'Aprender japonés directamente en Tokio fue una experiencia única. El nivel de inmersión es imposible de replicar en México. Gracias CILC por hacerlo posible.',
  },
];

export function getAverageRating(): number {
  const sum = testimonials.reduce((acc, t) => acc + t.rating, 0);
  return Math.round((sum / testimonials.length) * 10) / 10;
}

export function getTestimonialsByProgram(programa: string): Testimonial[] {
  return testimonials.filter((t) => t.programa === programa);
}
