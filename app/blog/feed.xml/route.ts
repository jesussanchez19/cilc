import { NextResponse } from 'next/server';
import { getPosts } from '@/lib/sanity/queries';

import { SITE_URL } from '@/lib/siteUrl';

export async function GET() {
  /**
   * Las entradas salen de Sanity, la misma fuente que las páginas del blog.
   *
   * Antes venían de los MDX de `content/blog/`, que quedaron atrás cuando el
   * blog se movió al CMS: el feed anunciaba tres artículos cuyas páginas
   * responden 404.
   *
   * Se descartan las de tipo `externo` —enlaces a artículos de otros sitios, sin
   * página propia aquí— y las que no tengan slug.
   */
  const posts = (await getPosts()).filter(
    (post) => post.tipo !== 'externo' && post.slug?.current,
  );

  const items = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${SITE_URL}/blog/${post.slug!.current}</link>
      <guid>${SITE_URL}/blog/${post.slug!.current}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description><![CDATA[${post.excerpt}]]></description>
      <category><![CDATA[${post.category}]]></category>
    </item>`
    )
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Blog CILC — Estudios en el Extranjero</title>
    <link>${SITE_URL}/blog</link>
    <description>Consejos, experiencias y noticias sobre estudiar en el extranjero con CILC.</description>
    <language>es-mx</language>
    <atom:link href="${SITE_URL}/blog/feed.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
