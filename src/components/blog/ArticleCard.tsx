'use client';

import Link from 'next/link';
import type { SanityPost } from '@/lib/sanity/queries';
import { urlFor } from '@/lib/sanity/image';

/**
 * La URL de la portada, o null si el artículo no tiene ninguna.
 *
 * Antes esto devolvía siempre algo: a falta de imagen, la ruta
 * `/images/blog/placeholder.png`. Pero ese archivo no existe —la carpeta
 * `public/images/blog/` tampoco—, así que la petición daba 404, el `onError`
 * reintentaba la MISMA ruta rota y la tarjeta acababa enseñando el icono de
 * imagen partida con el título encima. Con el blog vacío nunca se vio.
 *
 * Ahora, sin imagen se devuelve null y la tarjeta dibuja un marcador propio:
 * ni peticiones fallidas ni archivo que mantener.
 */
function getImageSrc(post: SanityPost): string | null {
  if (post.tipo === 'externo') return post.imagenUrl || null;
  if (post.image) return urlFor(post.image).width(800).height(400).fit('crop').url();
  return null;
}

export default function ArticleCard({ post }: { post: SanityPost }) {
  const fecha = new Date(post.date).toLocaleDateString('es-MX', {
    day: 'numeric', month: 'long', year: 'numeric',
  });

  const href = post.tipo === 'externo'
    ? post.urlExterna!
    : `/blog/${post.slug!.current}`;

  const isExternal = post.tipo === 'externo';
  const imgSrc = getImageSrc(post);

  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className="group block h-full"
    >
      <article className="premium-card h-full flex flex-col overflow-hidden">

        {/* Image */}
        <div className="relative h-52 overflow-hidden shrink-0 bg-slate-100">
          {imgSrc ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={imgSrc}
              alt={post.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            />
          ) : (
            /* Marcador para artículos sin portada. Decorativo, así que va
               `aria-hidden`: el título ya está en el texto de la tarjeta y
               repetirlo aquí solo haría que un lector de pantalla lo dijera
               dos veces. */
            <div
              aria-hidden="true"
              className="absolute inset-0 flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, var(--blue-900) 0%, var(--blue-600) 100%)' }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth={1.25}
                strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12">
                <path d="M4 5h16v14H4zM4 15l4.5-4.5 3.5 3.5 3-3L20 16" />
                <circle cx="9" cy="9" r="1.5" />
              </svg>
            </div>
          )}
          <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="absolute top-3 left-3 flex gap-1.5">
            <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold text-blue-700"
              style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)' }}>
              {post.category}
            </span>
            {isExternal && (
              <span className="px-2 py-1 rounded-lg text-[11px] font-bold text-slate-600"
                style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)' }}>
                🔗 Externo
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          <h3 className="font-bold text-slate-900 text-base mb-2.5 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors duration-200">
            {post.title}
          </h3>
          <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 flex-1">
            {post.excerpt}
          </p>

          <div className="flex items-center gap-3 mt-5 pt-4 border-t border-slate-100 text-xs text-slate-400">
            <span>{fecha}</span>
            {post.readingTime && (
              <>
                <span className="w-1 h-1 rounded-full bg-slate-200" />
                <span>{post.readingTime} min de lectura</span>
              </>
            )}
            {isExternal && (
              <>
                <span className="w-1 h-1 rounded-full bg-slate-200" />
                <span className="flex items-center gap-1">
                  Ver fuente
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </span>
              </>
            )}
          </div>
        </div>
      </article>
    </a>
  );
}
