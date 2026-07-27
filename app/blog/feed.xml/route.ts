import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/blog';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://cilc.mx';

export async function GET() {
  const posts = await getAllPosts();

  const items = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${SITE_URL}/blog/${post.slug}</link>
      <guid>${SITE_URL}/blog/${post.slug}</guid>
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
