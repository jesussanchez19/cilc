import { client, cdnClient } from './client';
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

export async function verificarToken(token: string): Promise<{ _id: string; usado: boolean } | null> {
  const results = await cdnClient.fetch<{ _id: string; usado: boolean }[]>(
    `*[_type == "tokenTestimonio" && token == $token][0...1]{ _id, usado }`,
    { token },
    { next: { revalidate: 0 } },
  );
  return results[0] ?? null;
}

export async function marcarTokenUsado(token: string): Promise<void> {
  const doc = await writeClient.fetch<{ _id: string } | null>(
    `*[_type == "tokenTestimonio" && token == $token][0]{ _id }`,
    { token },
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
  emailAdmin: string;
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
 */
export async function getContactInfo(): Promise<SanityContactInfo> {
  try {
    const result = await client.fetch<SanityContactInfo | null>(
      `*[_type == "configuracion" && _id == "configuracion-singleton"][0]{
        emailAdmin, telefonos, direccion, urlMapa,
        facebook, instagram, linkedin, youtube, tiktok
      }`,
    );
    return result ?? CONTACT_FALLBACK;
  } catch {
    return CONTACT_FALLBACK;
  }
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

// ── Miembros del equipo ───────────────────────────────────────────────────────

export interface SanityMember {
  _id: string;
  nombre: string;
  cargo: string;
  foto: { asset: { _ref: string } };
  bio: string;
}

export async function getTeamMembers(): Promise<SanityMember[]> {
  try {
    return await client.fetch(`*[_type == "teamMember"] | order(_createdAt asc)`);
  } catch {
    return [];
  }
}
