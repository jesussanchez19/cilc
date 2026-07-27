import { NextRequest, NextResponse } from 'next/server';

function getMeta(html: string, ...names: string[]): string {
  for (const name of names) {
    const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const patterns = [
      new RegExp(`<meta[^>]*(?:property|name)=["']${escaped}["'][^>]*content=["']([^"']+)["']`, 'i'),
      new RegExp(`<meta[^>]*content=["']([^"']+)["'][^>]*(?:property|name)=["']${escaped}["']`, 'i'),
    ];
    for (const p of patterns) {
      const m = html.match(p);
      if (m?.[1]) return decode(m[1].trim());
    }
  }
  return '';
}

function decode(s: string) {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');
}

/**
 * Bloquea destinos que no sean internet público.
 *
 * Sin esto el endpoint es un SSRF: convierte al servidor en un proxy hacia la
 * red interna, incluidos los endpoints de metadatos de los proveedores cloud
 * (169.254.169.254), que devuelven credenciales.
 */
function isPublicHttpUrl(raw: string): URL | null {
  let u: URL;
  try { u = new URL(raw); } catch { return null; }

  if (u.protocol !== 'http:' && u.protocol !== 'https:') return null;

  const host = u.hostname.toLowerCase().replace(/^\[|\]$/g, '');

  if (
    host === 'localhost' ||
    host.endsWith('.localhost') ||
    host.endsWith('.local') ||
    host.endsWith('.internal') ||
    host === '::1' ||
    host === '0.0.0.0'
  ) return null;

  // IPv4 privada, loopback y link-local (metadatos cloud)
  const v4 = host.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (v4) {
    const [a, b] = [Number(v4[1]), Number(v4[2])];
    if (a === 10 || a === 127 || a === 0) return null;
    if (a === 169 && b === 254) return null;
    if (a === 172 && b >= 16 && b <= 31) return null;
    if (a === 192 && b === 168) return null;
    if (a >= 224) return null; // multicast y reservadas
  }

  // IPv6 loopback, link-local (fe80::/10) y únicas locales (fc00::/7)
  if (host.includes(':')) {
    if (/^fe[89ab]/i.test(host) || /^f[cd]/i.test(host)) return null;
  }

  return u;
}

/**
 * Sigue redirecciones a mano revalidando cada salto. Con `redirect: 'follow'`
 * bastaría con que un host público redirigiera a 127.0.0.1 para saltarse el
 * control de arriba.
 */
async function safeFetch(start: URL): Promise<Response> {
  let current = start;
  for (let hop = 0; hop < 4; hop++) {
    const res: Response = await fetch(current, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; CILCBot/1.0; +https://cilc.mx)',
        Accept: 'text/html',
      },
      redirect: 'manual',
      signal: AbortSignal.timeout(10_000),
    });

    if (res.status < 300 || res.status >= 400) return res;

    const location = res.headers.get('location');
    if (!location) return res;

    const next = isPublicHttpUrl(new URL(location, current).toString());
    if (!next) throw new Error('redirect bloqueado');
    current = next;
  }
  throw new Error('demasiadas redirecciones');
}

export async function GET(req: NextRequest) {
  const raw = req.nextUrl.searchParams.get('url');
  if (!raw) return NextResponse.json({ error: 'url required' }, { status: 400 });

  const target = isPublicHttpUrl(raw);
  if (!target) {
    return NextResponse.json({ error: 'URL no permitida' }, { status: 400 });
  }

  try {
    const res = await safeFetch(target);

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    // Solo HTML: evita descargar binarios grandes por accidente.
    const type = res.headers.get('content-type') ?? '';
    if (type && !type.includes('html')) {
      return NextResponse.json({ error: 'El destino no es una página HTML' }, { status: 400 });
    }

    // Tope de 2 MB — sin él, un destino enorme agota la memoria del servidor.
    const buf = await res.arrayBuffer();
    if (buf.byteLength > 2_000_000) {
      return NextResponse.json({ error: 'Respuesta demasiado grande' }, { status: 400 });
    }
    const html = new TextDecoder().decode(buf);

    const title = getMeta(html, 'og:title', 'twitter:title')
      || (html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1] ?? '').trim();

    const excerpt = getMeta(html, 'og:description', 'twitter:description', 'description');
    const imagenUrl = getMeta(html, 'og:image', 'twitter:image');

    const rawDate = getMeta(html, 'article:published_time', 'og:updated_time', 'datePublished', 'date');
    let date = '';
    if (rawDate) {
      try { date = new Date(rawDate).toISOString().split('T')[0]; } catch { /* ignore */ }
    }

    return NextResponse.json({ title: decode(title), excerpt, imagenUrl, date });
  } catch (err) {
    // El detalle va al log del servidor, no al cliente: `String(err)` filtraba
    // hosts internos y mensajes de red que ayudan a mapear la infraestructura.
    console.error('[fetch-og]', err);
    return NextResponse.json({ error: 'No se pudo leer la página' }, { status: 502 });
  }
}
