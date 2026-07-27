import Link from 'next/link';
import SearchBar from '@/components/shared/SearchBar';
import { searchAll, groupResultsByType, SearchResult } from '@/lib/search';
import { getSearchIndex } from '@/lib/sanity/queries';

interface BuscarPageProps {
  searchParams: Promise<{ q?: string }>;
}

export const metadata = { title: 'Buscar | CILC' };

const TYPE_LABEL: Record<SearchResult['type'], string> = {
  programa: 'Programas',
  destino: 'Destinos',
  articulo: 'Artículos',
  pagina: 'Páginas del sitio',
};

const TYPE_ICON: Record<SearchResult['type'], string> = {
  programa: '🎓',
  destino: '🌍',
  articulo: '📰',
  pagina: '📄',
};

function ResultCard({ r }: { r: SearchResult }) {
  return (
    <Link
      href={r.href}
      className="flex gap-4 bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition group"
    >
      <div
        className="w-20 h-20 rounded-lg bg-cover bg-center shrink-0 bg-gray-100"
        style={{ backgroundImage: r.image ? `url('${r.image}')` : undefined }}
      />
      <div className="min-w-0">
        <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition line-clamp-1">{r.title}</h3>
        <p className="text-sm text-gray-500 line-clamp-2 mt-1">{r.description}</p>
      </div>
    </Link>
  );
}

export default async function BuscarPage({ searchParams }: BuscarPageProps) {
  const { q: rawQ } = await searchParams;
  const q = rawQ?.trim() ?? '';
  const index = q ? await getSearchIndex() : [];
  const results = q ? searchAll(q, index) : [];
  const grouped = groupResultsByType(results);

  // ── Búsqueda vacía ──
  if (!q) {
    return (
      <div className="py-24 bg-gray-50 min-h-screen">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center">
            <div className="text-5xl mb-6">🔍</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">¿Qué quieres encontrar?</h1>
            <p className="text-gray-500 mb-8">
              Busca entre nuestros programas, destinos y artículos del blog.
            </p>
          </div>
          <SearchBar fullWidth autoFocus index={await getSearchIndex()} />
        </div>
      </div>
    );
  }

  const totalResults = results.length;

  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Encabezado */}
        <div className="mb-10">
          <p className="text-sm text-gray-400 mb-1">Resultados de búsqueda</p>
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            &ldquo;{q}&rdquo; <span className="text-gray-400 font-normal text-xl">({totalResults} resultado{totalResults !== 1 ? 's' : ''})</span>
          </h1>
          {/* Permite afinar la búsqueda sin volver atrás — en móvil el header
              no tiene barra, así que este es el único punto de entrada. */}
          <div className="max-w-xl">
            <SearchBar fullWidth initialQuery={q} index={index} />
          </div>
        </div>

        {totalResults === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
            <p className="text-lg text-gray-500 font-medium mb-1">No encontramos resultados para "{q}"</p>
            <p className="text-gray-400 text-sm">Intenta con otra palabra clave o revisa la ortografía.</p>
          </div>
        ) : (
          <div className="space-y-10">
            {(['programa', 'destino', 'articulo', 'pagina'] as const).map((type) => {
              const items = grouped[type === 'programa' ? 'programas' : type === 'destino' ? 'destinos' : type === 'articulo' ? 'articulos' : 'paginas'];
              if (items.length === 0) return null;
              return (
                <div key={type}>
                  <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900 mb-4">
                    <span>{TYPE_ICON[type]}</span>
                    {TYPE_LABEL[type]}
                    <span className="text-sm font-normal text-gray-400">({items.length})</span>
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {items.map((r) => <ResultCard key={r.href} r={r} />)}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
