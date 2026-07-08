import { articles } from '@/lib/data/blog';
import ArticleCard from '@/components/blog/ArticleCard';

export const metadata = {
  title: 'Blog | CILC',
  description: 'Consejos, guías y noticias sobre estudiar en el extranjero.',
};

export default function BlogPage() {
  const ordenados = [...articles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Encabezado */}
        <div className="text-center mb-14">
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold uppercase tracking-widest rounded-full mb-4">
            Blog CILC
          </span>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">
            Consejos para tu experiencia en el extranjero
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Guías, historias y consejos prácticos para que tu camino internacional sea un éxito.
          </p>
        </div>

        {/* Grid de artículos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ordenados.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

      </div>
    </div>
  );
}
