export const revalidate = 60;

import ArticleCard from '@/components/blog/ArticleCard';
import AnimateIn from '@/components/shared/AnimateIn';
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
        <span className="badge badge-dark mb-5 inline-flex animate-slide-up"
          style={{ animationDelay: '0ms', animationFillMode: 'both' }}>Blog & Noticias</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 animate-slide-up"
          style={{ letterSpacing: '-0.03em', animationDelay: '100ms', animationFillMode: 'both' }}>
          Noticias y{' '}
          <span className="gradient-text-light">recursos CILC</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-xl mx-auto px-4 animate-slide-up"
          style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
          Artículos propios, noticias del sector y publicaciones relevantes para tu experiencia en el extranjero.
        </p>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <AnimateIn key={post._id} animation="scale" delay={Math.min(i, 5) * 80} threshold={0.1}>
                <ArticleCard post={post} />
              </AnimateIn>
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
