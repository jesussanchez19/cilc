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

const TYPE_DOT: Record<SearchResult['type'], string> = {
  programa: '#3b82f6',
  destino:  '#10b981',
  articulo: '#8b5cf6',
};

interface SearchBarProps {
  dark?: boolean;
}

export default function SearchBar({ dark = false }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const results = searchAll(query);
  const grouped = groupResultsByType(results);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

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
      <div key={type} className="mb-1">
        <p className="px-4 pt-3 pb-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">
          {TYPE_LABEL[type]}
        </p>
        {items.slice(0, 4).map((r) => (
          <Link
            key={r.href}
            href={r.href}
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors duration-100"
          >
            <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-0.5"
              style={{ background: TYPE_DOT[r.type] }} />
            <span className="min-w-0">
              <span className="block text-sm font-medium text-slate-800 truncate">{r.title}</span>
              <span className="block text-xs text-slate-400 truncate">{r.description}</span>
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
          <svg xmlns="http://www.w3.org/2000/svg"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-200"
            style={{ color: dark ? 'rgba(255,255,255,0.38)' : 'var(--text-subtle)' }}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
            onFocus={() => query && setOpen(true)}
            placeholder="Buscar programas, destinos..."
            className="w-full pl-9 pr-4 py-2 rounded-xl text-sm transition-all duration-200 outline-none"
            style={dark ? {
              background: 'rgba(255,255,255,0.07)',
              border: '1.5px solid rgba(255,255,255,0.10)',
              color: 'rgba(255,255,255,0.88)',
            } : {
              background: 'var(--surface-2)',
              border: '1.5px solid rgba(15,23,42,0.10)',
              color: 'var(--text)',
            }}
            onFocusCapture={(e) => {
              if (dark) {
                (e.target as HTMLInputElement).style.background = 'rgba(255,255,255,0.11)';
                (e.target as HTMLInputElement).style.borderColor = 'rgba(99,102,241,0.55)';
                (e.target as HTMLInputElement).style.boxShadow = '0 0 0 3px rgba(99,102,241,0.15)';
              } else {
                (e.target as HTMLInputElement).style.background = '#fff';
                (e.target as HTMLInputElement).style.borderColor = 'var(--blue-500)';
                (e.target as HTMLInputElement).style.boxShadow = '0 0 0 3px rgba(59,130,246,0.12)';
              }
            }}
            onBlurCapture={(e) => {
              if (dark) {
                (e.target as HTMLInputElement).style.background = 'rgba(255,255,255,0.07)';
                (e.target as HTMLInputElement).style.borderColor = 'rgba(255,255,255,0.10)';
                (e.target as HTMLInputElement).style.boxShadow = 'none';
              } else {
                (e.target as HTMLInputElement).style.background = 'var(--surface-2)';
                (e.target as HTMLInputElement).style.borderColor = 'rgba(15,23,42,0.10)';
                (e.target as HTMLInputElement).style.boxShadow = 'none';
              }
            }}
          />
        </div>
      </form>

      {open && query.trim() && (
        <div className="absolute top-full mt-2 left-0 right-0 bg-white rounded-2xl max-h-96 overflow-y-auto z-50"
          style={{ boxShadow: 'var(--shadow-xl)', border: '1px solid rgba(15,23,42,0.08)' }}>
          {results.length > 0 ? (
            <>
              {renderGroup('programa', grouped.programas)}
              {renderGroup('destino', grouped.destinos)}
              {renderGroup('articulo', grouped.articulos)}
              <Link
                href={`/buscar?q=${encodeURIComponent(query.trim())}`}
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 py-3.5 transition-colors duration-150"
                style={{ borderTop: '1px solid rgba(15,23,42,0.06)' }}
              >
                Ver todos los resultados
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </>
          ) : (
            <p className="px-4 py-8 text-sm text-slate-400 text-center">
              No se encontraron resultados
            </p>
          )}
        </div>
      )}
    </div>
  );
}
