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
      <article className="premium-card h-full flex flex-col overflow-hidden">

        {/* Image */}
        <div className="relative h-52 overflow-hidden shrink-0 bg-slate-100">
          <div
            className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500 ease-out"
            style={{ backgroundImage: `url('${article.image}'), url('${FALLBACK_IMG}')` }}
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Category */}
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[11px] font-bold text-blue-700"
            style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)' }}>
            {article.category}
          </span>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          <h3 className="font-bold text-slate-900 text-base mb-2.5 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors duration-200">
            {article.title}
          </h3>
          <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 flex-1">
            {article.excerpt}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-3 mt-5 pt-4 border-t border-slate-100 text-xs text-slate-400">
            <span>{fecha}</span>
            <span className="w-1 h-1 rounded-full bg-slate-200" />
            <span>{article.readingTime} min de lectura</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
