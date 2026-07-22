import { programs } from '@/lib/data/programs';
import { countries } from '@/lib/data/countries';
import { articles } from '@/lib/data/blog';

export type SearchResultType = 'programa' | 'destino' | 'articulo';

export interface SearchResult {
  type: SearchResultType;
  title: string;
  description: string;
  href: string;
  image?: string;
}

// Normaliza texto: minúsculas y sin acentos, para que "canada" encuentre "Canadá"
function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

/**
 * Busca en Programas + Destinos + Blog.
 * Toda la búsqueda ocurre en el cliente (client-side), sin llamadas a servidor.
 */
export function searchAll(query: string): SearchResult[] {
  const q = normalize(query.trim());
  if (!q) return [];

  const results: SearchResult[] = [];

  // ── Programas ──
  programs.forEach((p) => {
    const haystack = normalize(`${p.title} ${p.subtitle} ${p.description}`);
    if (haystack.includes(q)) {
      results.push({
        type: 'programa',
        title: p.title,
        description: p.subtitle,
        href: `/${p.slug}`,
        image: `/images/programs/${p.slug}/hero.png`,
      });
    }
  });

  // ── Destinos ──
  countries.forEach((c) => {
    const haystack = normalize(`${c.name} ${c.description} ${c.region} ${c.language}`);
    if (haystack.includes(q)) {
      results.push({
        type: 'destino',
        title: c.name,
        description: c.description,
        href: `/destinos/${c.id}`,
        image: c.image,
      });
    }
  });

  // ── Blog ──
  articles.forEach((a) => {
    const haystack = normalize(`${a.title} ${a.excerpt} ${a.category}`);
    if (haystack.includes(q)) {
      results.push({
        type: 'articulo',
        title: a.title,
        description: a.excerpt,
        href: `/blog/${a.slug}`,
        image: a.image,
      });
    }
  });

  return results;
}

export function groupResultsByType(results: SearchResult[]) {
  return {
    programas: results.filter((r) => r.type === 'programa'),
    destinos:  results.filter((r) => r.type === 'destino'),
    articulos: results.filter((r) => r.type === 'articulo'),
  };
}
