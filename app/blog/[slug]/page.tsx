import Link from 'next/link';
import { notFound } from 'next/navigation';
import { articles, getArticleBySlug } from '@/lib/data/blog';
import { articleSchema, breadcrumbSchema } from '@/lib/seo/schemas';

interface ArticlePageProps {
  params: { slug: string };
}

// Genera las rutas estáticas para cada artículo
export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: ArticlePageProps) {
  const article = getArticleBySlug(params.slug);
  if (!article) return {};
  return { title: `${article.title} | Blog CILC`, description: article.excerpt };
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();

  const fecha = new Date(article.date).toLocaleDateString('es-MX', {
    day: 'numeric', month: 'long', year: 'numeric',
  });

  return (
    <div className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema(article)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
          { name: 'Inicio', url: '/' },
          { name: 'Blog', url: '/blog' },
          { name: article.title, url: `/blog/${article.slug}` },
        ])) }}
      />

      {/* ── Hero con imagen destacada ── */}
      <div className="relative h-[360px] md:h-[440px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${article.image}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 h-full flex flex-col justify-end pb-10">
          <span className="inline-block px-3 py-1 bg-blue-600 text-white rounded-full text-xs font-semibold mb-4 w-fit">
            {article.category}
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-4">
            {article.title}
          </h1>
          <div className="flex items-center gap-3 text-white/80 text-sm">
            <span>{fecha}</span>
            <span>·</span>
            <span>{article.readingTime} min de lectura</span>
          </div>
        </div>
      </div>

      {/* ── Contenido ── */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">

        {/* Volver al blog */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium text-sm mb-10 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver al blog
        </Link>

        {/* Cuerpo del artículo — mínimo 16px (text-base) para legibilidad móvil */}
        <div className="space-y-5">
          {article.content.map((parrafo, i) => (
            <p key={i} className="text-gray-700 text-base leading-relaxed">
              {parrafo}
            </p>
          ))}
        </div>

        {/* CTA al final del artículo */}
        <div className="mt-14 bg-blue-50 border border-blue-100 rounded-2xl p-8 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">¿Listo para dar el siguiente paso?</h2>
          <p className="text-gray-600 mb-6">Agenda tu Diagnóstico Internacional Estratégico gratuito.</p>
          <Link
            href="/contact"
            className="inline-block px-7 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition"
          >
            Contactar Ahora
          </Link>
        </div>

        {/* Volver al blog (footer del artículo) */}
        <div className="mt-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium text-sm transition"
          >
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
