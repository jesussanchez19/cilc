import Link from 'next/link';
import { Article } from '@/lib/data/blog';

interface ArticleCardProps {
  article: Article;
}

const FALLBACK_IMG = '/images/blog/placeholder.png';

export default function ArticleCard({ article }: ArticleCardProps) {
  const fecha = new Date(article.date).toLocaleDateString('es-MX', {
    day: 'numeric', month: 'long', year: 'numeric',
  });

  return (
    <Link href={`/blog/${article.slug}`} className="group block h-full">
      <article className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">

        {/* Imagen con fallback automático */}
        <div className="relative h-48 overflow-hidden shrink-0 bg-gray-100">
          <div
            className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
            style={{ backgroundImage: `url('${article.image}'), url('${FALLBACK_IMG}')` }}
          />
          <span className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-blue-700">
            {article.category}
          </span>
        </div>

        {/* Contenido */}
        <div className="p-5 flex flex-col flex-1">
          {/* Título truncado a 2 líneas — nunca desborda la card */}
          <h3 className="font-bold text-gray-900 text-base mb-2 line-clamp-2 leading-snug">
            {article.title}
          </h3>
          {/* Extracto truncado a 3 líneas */}
          <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 flex-1">
            {article.excerpt}
          </p>

          {/* Meta: fecha + tiempo de lectura */}
          <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100 text-xs text-gray-400">
            <span>{fecha}</span>
            <span>·</span>
            <span>{article.readingTime} min de lectura</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
