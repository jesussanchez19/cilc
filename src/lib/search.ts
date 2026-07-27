export type SearchResultType = 'programa' | 'destino' | 'articulo' | 'pagina';

export interface SearchDoc {
  type: SearchResultType;
  title: string;
  description: string;
  href: string;
  image?: string;
  /** Texto extra sobre el que se busca pero que no se muestra. */
  keywords?: string;
}

export type SearchResult = SearchDoc;

/**
 * Páginas fijas del sitio.
 *
 * No son documentos de Sanity, así que la consulta al CMS no las ve: sin esta
 * lista, buscar "contacto" o "privacidad" no devolvía nada. Los `keywords`
 * recogen las palabras con las que alguien buscaría cada una aunque no
 * aparezcan en el título — "telefono" para contacto, "fotos" para galería.
 *
 * Quedan fuera a propósito: /buscar (buscarse a sí misma no aporta),
 * /countries (redirige a /destinos) y /dar-testimonio (necesita token).
 */
export const SITE_PAGES: SearchDoc[] = [
  {
    type: 'pagina', title: 'Inicio', href: '/',
    description: 'Programas, destinos y asesoría para estudiar en el extranjero.',
    keywords: 'home principal cilc inicio',
  },
  {
    type: 'pagina', title: 'Contacto', href: '/contact',
    description: 'Escríbenos y te respondemos en menos de 24 horas.',
    keywords: 'contacto contactar telefono correo email whatsapp cotizar cotizacion asesoria ubicacion oficina',
  },
  {
    type: 'pagina', title: 'Destinos', href: '/destinos',
    description: 'Todos los países donde puedes estudiar con CILC.',
    keywords: 'destinos paises lugares donde estudiar',
  },
  {
    type: 'pagina', title: 'Blog', href: '/blog',
    description: 'Consejos, guías y noticias sobre estudiar en el extranjero.',
    keywords: 'blog noticias articulos guias consejos',
  },
  {
    type: 'pagina', title: 'Testimonios', href: '/testimonios',
    description: 'Experiencias reales de estudiantes que ya viajaron.',
    keywords: 'testimonios opiniones experiencias resenas alumnos estudiantes',
  },
  {
    type: 'pagina', title: 'Galería', href: '/galeria',
    description: 'Fotos de nuestros estudiantes alrededor del mundo.',
    keywords: 'galeria fotos imagenes fotografias',
  },
  {
    type: 'pagina', title: 'Sobre nosotros', href: '/sobre-nosotros',
    description: 'Más de 23 años acompañando a estudiantes mexicanos.',
    keywords: 'sobre nosotros quienes somos equipo historia empresa acerca',
  },
  {
    type: 'pagina', title: 'Universidades', href: '/universities',
    description: 'Instituciones con las que trabajamos.',
    keywords: 'universidades escuelas instituciones colegios',
  },
  {
    type: 'pagina', title: 'Aviso de privacidad', href: '/aviso-de-privacidad',
    description: 'Cómo tratamos tus datos personales.',
    keywords: 'privacidad datos personales legal aviso proteccion',
  },
  {
    type: 'pagina', title: 'Términos y condiciones', href: '/terminos-y-condiciones',
    description: 'Condiciones de uso del sitio y de nuestros servicios.',
    keywords: 'terminos condiciones legal uso servicio',
  },
];

// Normaliza texto: minúsculas y sin acentos, para que "canada" encuentre "Canadá"
function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');
}

/**
 * Filtra el índice de búsqueda.
 *
 * Antes esta función importaba directamente de `lib/data/programs.ts`,
 * `countries.ts` y `blog.ts`. Esos archivos dejaron de mantenerse cuando el
 * catálogo migró a Sanity, así que lo creado desde el Studio no aparecía al
 * buscar. Ahora recibe el índice ya construido (ver `getSearchIndex`), lo que
 * además la deja como función pura: no toca red y se puede usar igual desde el
 * servidor y desde el cliente.
 *
 * Los resultados se ordenan poniendo delante las coincidencias en el título,
 * que es lo que el usuario está buscando la mayoría de las veces.
 */
export function searchAll(query: string, index: SearchDoc[]): SearchResult[] {
  const q = normalize(query.trim());
  if (!q) return [];

  const scored: { doc: SearchDoc; score: number }[] = [];

  for (const doc of index) {
    const title = normalize(doc.title);
    const rest = normalize(`${doc.description} ${doc.keywords ?? ''}`);

    let score = 0;
    if (title.startsWith(q)) score = 3;      // empieza igual: lo más probable
    else if (title.includes(q)) score = 2;   // aparece en el título
    else if (rest.includes(q)) score = 1;    // solo en descripción o metadatos

    if (score > 0) scored.push({ doc, score });
  }

  return scored
    .sort((a, b) => b.score - a.score || a.doc.title.localeCompare(b.doc.title))
    .map((s) => s.doc);
}

export function groupResultsByType(results: SearchResult[]) {
  return {
    programas: results.filter((r) => r.type === 'programa'),
    destinos:  results.filter((r) => r.type === 'destino'),
    articulos: results.filter((r) => r.type === 'articulo'),
    paginas:   results.filter((r) => r.type === 'pagina'),
  };
}
