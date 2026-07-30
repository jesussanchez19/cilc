import { cache } from 'react';
import { client } from './client';
import { SITE_PAGES, type SearchDoc } from '@/lib/search';
import { writeClient } from './writeClient';

// ── Testimonios ───────────────────────────────────────────────────────────────

export interface SanityTestimonial {
  _id: string;
  nombre: string;
  foto?: { asset: { _ref: string } };
  programa: string;
  pais: string;
  bandera: string;
  calificacion?: number;
  texto: string;
}

export async function getTestimoniosPorPrograma(programa: string): Promise<SanityTestimonial[]> {
  try {
    return await client.fetch(
      `*[_type == "solicitudTestimonio" && estado == "aprobado" && programa == $programa] | order(_createdAt desc)`,
      { programa },
    );
  } catch {
    return [];
  }
}

export interface TestimonialAprobado {
  _id: string;
  nombre: string;
  pais: string;
  bandera: string;
  programa: string;
  texto: string;
  foto?: { asset: { _ref: string } };
  videoUrl?: string;
  calificacion?: number;
}

export async function getTestimoniosAprobados(): Promise<TestimonialAprobado[]> {
  try {
    return await client.fetch(
      `*[_type == "solicitudTestimonio" && estado == "aprobado"] | order(_createdAt desc)`,
    );
  } catch {
    return [];
  }
}

// ── Destinos ──────────────────────────────────────────────────────────────────

export interface SanityDestino {
  _id: string;
  countryId: string;
  nombre?: string;
  bandera?: string;
  codigoISO?: string;
  region?: string;
  idioma?: string;
  descripcion?: string;
  imagen?: { asset: { _ref: string } };
  universidades?: number;
  estudiantes?: number;
  clima?: string;
  costoVida?: number;
  costoVidaNota?: string;
  visa?: string;
  visaNota?: string;
  programas: string[];
}

export async function getDestinoData(countryId: string): Promise<SanityDestino | null> {
  const results = await client.fetch<SanityDestino[]>(
    `*[_type == "destino" && countryId.current == $countryId][0...1]`,
    { countryId },
  );
  return results[0] ?? null;
}

export async function getDestinosPorPrograma(programaId: string): Promise<string[]> {
  const results = await client.fetch<{ countryId: { current: string } }[]>(
    `*[_type == "destino" && $programaId in programas]{ countryId }`,
    { programaId },
  );
  return results.map((d) => d.countryId.current);
}

export async function getAllDestinos(): Promise<SanityDestino[]> {
  return client.fetch<SanityDestino[]>(
    `*[_type == "destino"] | order(nombre asc)`,
  );
}

// ── Tokens de uso único ───────────────────────────────────────────────────────

export async function marcarTokenUsado(token: string): Promise<void> {
  const doc: { _id: string } | null = await writeClient.fetch(
    `*[_type == "tokenTestimonio" && token == $t][0]{ _id }`,
    { t: token },
  );
  if (doc) {
    await writeClient
      .patch(doc._id)
      .set({ usado: true, usadoEn: new Date().toISOString() })
      .commit();
  }
}

// ── Configuración del sitio ───────────────────────────────────────────────────

export interface SanityContactInfo {
  /** Buzón comercial: contacto, cotizaciones, testimonios, suscripciones. */
  emailAdmin: string;
  /** Buzón de seguridad: recuperación de contraseña del Studio. */
  emailSeguridad?: string;
  telefonos?: { display: string; wa: string; esPrincipal?: boolean }[];
  direccion?: string;
  urlMapa?: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
  tiktok?: string;
}

const CONTACT_FALLBACK: SanityContactInfo = {
  emailAdmin: 'info@estudiosenelextranjero.com.mx',
  telefonos: [
    { display: '55 1894 4494', wa: '525518944494', esPrincipal: true },
    { display: '55 7278 5966', wa: '525572785966' },
    { display: '55 1218 2442', wa: '525512182442' },
  ],
  direccion: 'Av. Insurgentes Sur 863, Piso 7\nCol. Nápoles, C.P. 03810\nCDMX, México',
};

/**
 * Datos de contacto para la web.
 *
 * La proyección es explícita a propósito. Antes traía el documento entero, así
 * que el hash de la contraseña del Studio viajaba a los 6 llamadores de esta
 * función — incluido el layout raíz, que se ejecuta en cada página. No llegaba
 * al HTML, pero era superficie que no hacía falta exponer.
 *
 * Envuelto en `cache` para que las varias páginas y helpers que lo piden dentro
 * de un mismo render compartan una sola consulta, en vez de repetirla una vez
 * por cada uno.
 */
export const getContactInfo = cache(async (): Promise<SanityContactInfo> => {
  try {
    const result = await client.fetch<SanityContactInfo | null>(
      `*[_type == "configuracion" && _id == "configuracion-singleton"][0]{
        emailAdmin, emailSeguridad, telefonos, direccion, urlMapa,
        facebook, instagram, linkedin, youtube, tiktok
      }`,
    );
    return result ?? CONTACT_FALLBACK;
  } catch {
    return CONTACT_FALLBACK;
  }
});

/**
 * Número de WhatsApp marcado como principal en el Studio, en formato wa.me.
 *
 * Existe porque ese `find` estaba repetido en el layout y en la página de
 * contacto, y el resto del sitio llevaba el número escrito a mano: marcar otro
 * como principal en el Studio no cambiaba nada en la portada, los destinos, las
 * páginas de programa ni "sobre nosotros".
 */
export async function getWhatsAppPrincipal(): Promise<string> {
  const { telefonos } = await getContactInfo();
  const principal = telefonos?.find((t) => t.esPrincipal) ?? telefonos?.[0];
  return principal?.wa ?? CONTACT_FALLBACK.telefonos![0].wa;
}

/**
 * Hash de la contraseña del Studio. Solo lo usa `/api/studio-auth`.
 *
 * Va aparte de `getContactInfo` para que el secreto se pida únicamente donde
 * se necesita. Devuelve cadena vacía ante cualquier fallo: el login la trata
 * como "sin contraseña" y deniega, de modo que falla cerrado.
 */
export async function getStudioPasswordHash(): Promise<string> {
  try {
    const result = await client.fetch<string | null>(
      `*[_type == "configuracion" && _id == "configuracion-singleton"][0].studioPassword`,
    );
    return result?.trim() ?? '';
  } catch {
    return '';
  }
}

// ── Blog posts ────────────────────────────────────────────────────────────────

export interface SanityPost {
  _id: string;
  tipo: 'propio' | 'externo';
  title: string;
  slug?: { current: string };
  excerpt: string;
  content?: unknown[];
  image?: { asset: { _ref: string } };
  imagenUrl?: string;
  urlExterna?: string;
  date: string;
  category: string;
  readingTime?: number;
}

export async function getPosts(): Promise<SanityPost[]> {
  try {
    return await client.fetch(`*[_type == "blogPost" && visible != false] | order(date desc)`);
  } catch {
    return [];
  }
}

export async function getLatestPosts(count: number): Promise<SanityPost[]> {
  try {
    return await client.fetch(
      `*[_type == "blogPost" && visible != false] | order(date desc) [0...$count]`,
      { count: count - 1 },
    );
  } catch {
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<SanityPost | null> {
  try {
    return await client.fetch(
      `*[_type == "blogPost" && slug.current == $slug && visible != false][0]`,
      { slug },
    );
  } catch {
    return null;
  }
}

// ── Socios y Miembros ─────────────────────────────────────────────────────────

export interface SanityPartner {
  _id: string;
  nombre: string;
  logo: { asset: { _ref: string } };
  cargo: string;
  url?: string;
}

export async function getSocios(): Promise<SanityPartner[]> {
  try {
    return await client.fetch(`*[_type == "socio"] | order(orden asc)`);
  } catch {
    return [];
  }
}

// ── Programas ─────────────────────────────────────────────────────────────────

export interface SanitySeccion {
  titulo: string;
  descripcion?: string;
  items?: string[];
}

export interface SanityPuntoClave {
  texto: string;
  tooltip?: string;
}

export interface SanityPrograma {
  titulo?: string;
  subtitulo?: string;
  icono?: string;
  color?: string;
  descripcion?: string;
  duracion?: string;
  rangoEdad?: string;
  puntosClave?: SanityPuntoClave[];
  queIncluye?: SanityPuntoClave[];
  paraQuien?: string;
  whatsappMessage?: string;
  imagenHero?: { asset: { _ref: string } };
  secciones?: SanitySeccion[];
}

export async function getProgramaData(slug: string): Promise<SanityPrograma | null> {
  try {
    return await client.fetch(
      `*[_type == "programa" && programaId.current == $slug][0]{
        titulo, subtitulo, icono, color,
        descripcion, duracion, rangoEdad, paraQuien, whatsappMessage,
        puntosClave[] { texto, tooltip },
        queIncluye[]  { texto, tooltip },
        imagenHero { asset { _ref } },
        secciones[] { titulo, descripcion, items }
      }`,
      { slug },
    );
  } catch {
    return null;
  }
}

// ── Índice de búsqueda ────────────────────────────────────────────────────────

/**
 * Índice plano de todo lo buscable, leído de Sanity.
 *
 * Antes el buscador leía de `lib/data/*.ts`, datos estáticos que dejaron de
 * actualizarse cuando el catálogo migró al CMS: un programa creado desde el
 * Studio no aparecía al buscar. Se construye en una sola consulta para no
 * encadenar tres viajes a Sanity.
 */
export async function getSearchIndex(): Promise<SearchDoc[]> {
  try {
    const data = await client.fetch<{
      programas: { slug?: string; titulo?: string; subtitulo?: string; descripcion?: string; img?: string }[];
      destinos: { countryId?: string; nombre?: string; descripcion?: string; region?: string; idioma?: string; img?: string }[];
      posts: { slug?: string; title?: string; excerpt?: string; category?: string; tipo?: string; urlExterna?: string; imagenUrl?: string; img?: string }[];
    }>(`{
      "programas": *[_type == "programa" && defined(programaId.current)]{
        "slug": programaId.current, titulo, subtitulo, descripcion,
        "img": imagenHero.asset->url
      },
      "destinos": *[_type == "destino" && defined(countryId.current)]{
        "countryId": countryId.current, nombre, descripcion, region, idioma,
        "img": imagen.asset->url
      },
      "posts": *[_type == "blogPost" && visible != false]{
        "slug": slug.current, title, excerpt, category, tipo, urlExterna, imagenUrl,
        "img": image.asset->url
      }
    }`);

    // Las páginas fijas van primero: no dependen de la consulta y así
    // siguen apareciendo aunque Sanity falle.
    const docs: SearchDoc[] = [...SITE_PAGES];

    for (const p of data.programas ?? []) {
      if (!p.slug || !p.titulo) continue;
      docs.push({
        type: 'programa',
        title: p.titulo,
        description: p.subtitulo ?? p.descripcion ?? '',
        // La ruta real es /programas/[slug]. Antes se generaba `/${slug}`, que
        // solo funcionaba por las redirecciones de next.config.ts para los seis
        // slugs antiguos: un programa nuevo daba 404.
        href: `/programas/${p.slug}`,
        image: p.img,
        keywords: p.descripcion,
      });
    }

    for (const d of data.destinos ?? []) {
      if (!d.countryId || !d.nombre) continue;
      docs.push({
        type: 'destino',
        title: d.nombre,
        description: d.descripcion ?? '',
        href: `/destinos/${d.countryId}`,
        image: d.img,
        keywords: [d.region, d.idioma].filter(Boolean).join(' '),
      });
    }

    for (const a of data.posts ?? []) {
      if (!a.title) continue;
      // Los posts externos apuntan fuera del sitio; los propios a /blog/[slug].
      const href = a.tipo === 'externo' ? a.urlExterna : a.slug ? `/blog/${a.slug}` : undefined;
      if (!href) continue;
      docs.push({
        type: 'articulo',
        title: a.title,
        description: a.excerpt ?? '',
        href,
        image: a.img ?? a.imagenUrl,
        keywords: a.category,
      });
    }

    return docs;
  } catch {
    // Si Sanity no responde, al menos las páginas del sitio se pueden buscar.
    return [...SITE_PAGES];
  }
}

// ── Listado de destinos ───────────────────────────────────────────────────────

export interface DestinoListado {
  countryId: string;
  nombre?: string;
  codigoISO?: string;
  region?: string;
  idioma?: string;
  descripcion?: string;
  universidades?: number;
  costoVida?: number;
  estudiantes?: number;
  imagenUrl?: string;
}

/**
 * Destinos con los campos que necesita la rejilla de /destinos.
 *
 * Existe aparte de `getAllDestinos` porque aquella devuelve el documento
 * entero con `countryId` como objeto slug, y la rejilla necesita el string.
 */
export async function getDestinosListado(): Promise<DestinoListado[]> {
  try {
    return await client.fetch<DestinoListado[]>(
      `*[_type == "destino" && defined(countryId.current)]{
        "countryId": countryId.current, nombre, codigoISO, region, idioma,
        descripcion, universidades, costoVida, estudiantes,
        "imagenUrl": imagen.asset->url
      } | order(nombre asc)`,
    );
  } catch {
    return [];
  }
}
