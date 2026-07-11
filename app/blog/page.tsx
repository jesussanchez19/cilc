export const dynamic = 'force-dynamic';

import ArticleCard from '@/components/blog/ArticleCard';
import { getPosts } from '@/lib/sanity/queries';

export const metadata = {
  title: 'Blog & Noticias | CILC',
  description: 'Artículos, noticias y publicaciones sobre estudios en el extranjero.',
};

export default async function BlogPage() {
  const posts = await getPosts();

  const categories = ['Todos', ...Array.from(new Set(posts.map((p) => p.category)))];

  return (
    <main className="min-h-screen bg-white">

      {/* Hero */}
      <section className="py-20 text-center" style={{ background: 'var(--dark)' }}>
        <span className="badge badge-dark mb-5 inline-flex">Blog & Noticias</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4"
          style={{ letterSpacing: '-0.03em' }}>
          Noticias y{' '}
          <span className="gradient-text-light">recursos CILC</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-xl mx-auto px-4">
          Artículos propios, noticias del sector y publicaciones relevantes para tu experiencia en el extranjero.
        </p>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <ArticleCard key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-center text-slate-400 py-20">
            Aún no hay artículos publicados.
          </p>
        )}
      </div>
    </main>
  );
}
