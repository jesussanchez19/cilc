'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { searchAll, groupResultsByType, SearchResult } from '@/lib/search';

const TYPE_LABEL: Record<SearchResult['type'], string> = {
  programa: 'Programas',
  destino: 'Destinos',
  articulo: 'Artículos',
};

const TYPE_COLOR: Record<SearchResult['type'], string> = {
  programa: 'bg-blue-100 text-blue-700',
  destino: 'bg-green-100 text-green-700',
  articulo: 'bg-purple-100 text-purple-700',
};

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const results = searchAll(query);
  const grouped = groupResultsByType(results);

  // Cerrar al hacer clic fuera
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Cerrar con Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpen(false); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/buscar?q=${encodeURIComponent(query.trim())}`);
      setOpen(false);
    }
  };

  const renderGroup = (type: SearchResult['type'], items: SearchResult[]) => {
    if (items.length === 0) return null;
    return (
      <div key={type} className="mb-2">
        <p className="px-4 pt-3 pb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">
          {TYPE_LABEL[type]}
        </p>
        {items.slice(0, 4).map((r) => (
          <Link
            key={r.href}
            href={r.href}
            onClick={() => setOpen(false)}
            className="flex items-start gap-3 px-4 py-2.5 hover:bg-gray-50 transition"
          >
            <span className={`shrink-0 mt-0.5 px-2 py-0.5 rounded-full text-[10px] font-semibold ${TYPE_COLOR[r.type]}`}>
              {TYPE_LABEL[r.type].slice(0, 3)}
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-medium text-gray-900 truncate">{r.title}</span>
              <span className="block text-xs text-gray-500 truncate">{r.description}</span>
            </span>
          </Link>
        ))}
      </div>
    );
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-xs">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
            onFocus={() => query && setOpen(true)}
            placeholder="Buscar países, universidades..."
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>
      </form>

      {/* Dropdown de resultados */}
      {open && query.trim() && (
        <div className="absolute top-full mt-2 left-0 right-0 bg-white rounded-xl shadow-2xl border border-gray-100 max-h-[420px] overflow-y-auto z-50">
          {results.length > 0 ? (
            <>
              {renderGroup('programa', grouped.programas)}
              {renderGroup('destino', grouped.destinos)}
              {renderGroup('articulo', grouped.articulos)}
              <Link
                href={`/buscar?q=${encodeURIComponent(query.trim())}`}
                onClick={() => setOpen(false)}
                className="block text-center text-sm font-medium text-blue-600 hover:bg-gray-50 py-3 border-t border-gray-100"
              >
                Ver todos los resultados →
              </Link>
            </>
          ) : (
            <p className="px-4 py-6 text-sm text-gray-400 text-center">
              No se encontraron resultados
            </p>
          )}
        </div>
      )}
    </div>
  );
}
