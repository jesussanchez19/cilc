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

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url');
  if (!url) return NextResponse.json({ error: 'url required' }, { status: 400 });

  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; CILCBot/1.0; +https://cilc.mx)',
        Accept: 'text/html',
      },
      signal: AbortSignal.timeout(10_000),
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();

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
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
