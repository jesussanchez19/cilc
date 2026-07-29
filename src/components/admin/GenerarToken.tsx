'use client';

import { useState, useRef } from 'react';

export default function GenerarToken({ masterToken }: { masterToken: string }) {
  const [nombre, setNombre]   = useState('');
  const [result, setResult]   = useState<{ url: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied]   = useState(false);
  const lastGenerated = useRef('');

  const generar = async (name: string) => {
    const trimmed = name.trim();
    if (trimmed.length < 2 || trimmed === lastGenerated.current) return;
    lastGenerated.current = trimmed;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch('/api/admin/generar-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${masterToken}`,
        },
        body: JSON.stringify({ label: trimmed }),
      });
      const data = await res.json();
      if (res.ok) setResult(data);
    } finally {
      setLoading(false);
    }
  };

  const copiar = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-1">Generar enlace de testimonio</h2>
      <p className="text-sm text-gray-500 mb-4">
        Escribe el nombre del alumno — el enlace se genera automáticamente.
        Es de un solo uso y se invalida tras el primer envío.
      </p>

      <div>
        <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">
          Nombre del alumno
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="Ej: María García"
            value={nombre}
            onChange={(e) => {
              setNombre(e.target.value);
              setResult(null);
              lastGenerated.current = '';
            }}
            onBlur={() => generar(nombre)}
            onKeyDown={(e) => e.key === 'Enter' && generar(nombre)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {loading && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 pointer-events-none">
              Generando…
            </span>
          )}
        </div>
      </div>

      {result && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-xs font-semibold text-green-700 mb-2 uppercase tracking-wide">
            ✅ Enlace generado — válido para un solo uso
          </p>
          <p className="text-sm text-gray-700 break-all font-mono mb-3">{result.url}</p>
          <div className="flex gap-2 items-center">
            <button
              onClick={copiar}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
            >
              {copied ? '¡Copiado!' : 'Copiar enlace'}
            </button>
            <span className="text-xs text-green-600">
              También visible en Sanity Studio → Tokens de Testimonio
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
