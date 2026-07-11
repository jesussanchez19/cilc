import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { PortableText } from '@portabletext/react';
import { getPosts, getPostBySlug } from '@/lib/sanity/queries';
import { urlFor } from '@/lib/sanity/image';

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts
    .filter((p) => p.tipo === 'propio' && p.slug?.current)
    .map((p) => ({ slug: p.slug!.current }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return { title: `${post.title} | Blog CILC`, description: post.excerpt };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();
  if (post.tipo === 'externo' && post.urlExterna) redirect(post.urlExterna);

  const fecha = new Date(post.date).toLocaleDateString('es-MX', {
    day: 'numeric', month: 'long', year: 'numeric',
  });

  const imgSrc = post.image
    ? urlFor(post.image).width(1200).height(600).fit('crop').url()
    : null;

  return (
    <div className="bg-white">

      {/* Hero con imagen */}
      {imgSrc && (
        <div className="relative h-90 md:h-110 overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${imgSrc}')` }} />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />
          <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 h-full flex flex-col justify-end pb-10">
            <span className="inline-block px-3 py-1 bg-blue-600 text-white rounded-full text-xs font-semibold mb-4 w-fit">
              {post.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-4">
              {post.title}
            </h1>
            <div className="flex items-center gap-3 text-white/80 text-sm">
              <span>{fecha}</span>
              {post.readingTime && <><span>·</span><span>{post.readingTime} min de lectura</span></>}
            </div>
          </div>
        </div>
      )}

      {/* Sin imagen: hero simple */}
      {!imgSrc && (
        <div className="py-16 px-4" style={{ background: 'var(--dark)' }}>
          <div className="max-w-3xl mx-auto">
            <span className="inline-block px-3 py-1 bg-blue-600 text-white rounded-full text-xs font-semibold mb-4">
              {post.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-4">
              {post.title}
            </h1>
            <p className="text-white/60 text-sm">{fecha}</p>
          </div>
        </div>
      )}

      {/* Contenido */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <Link href="/blog"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium text-sm mb-10 transition">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver al blog
        </Link>

        {post.content && (
          <div className="prose prose-slate prose-lg max-w-none">
            <PortableText value={post.content as Parameters<typeof PortableText>[0]['value']} />
          </div>
        )}

        {/* CTA */}
        <div className="mt-14 bg-blue-50 border border-blue-100 rounded-2xl p-8 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">¿Listo para dar el siguiente paso?</h2>
          <p className="text-gray-600 mb-6">Agenda tu Diagnóstico Internacional Estratégico gratuito.</p>
          <Link href="/contact"
            className="inline-block px-7 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition">
            Contactar Ahora
          </Link>
        </div>

        <div className="mt-10">
          <Link href="/blog"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium text-sm transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver al blog
          </Link>
        </div>
      </div>
    </div>
  );
}
