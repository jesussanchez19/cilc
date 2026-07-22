'use client';

import { useState } from 'react';

export default function GenerarToken({ masterToken }: { masterToken: string }) {
  const [label, setLabel]   = useState('');
  const [result, setResult] = useState<{ url: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied]   = useState(false);

  const generar = async () => {
    if (!label.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch('/api/admin/generar-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${masterToken}`,
        },
        body: JSON.stringify({ label: label.trim() }),
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
        Crea un enlace de un solo uso para que un estudiante deje su testimonio.
        El enlace se invalida automáticamente tras el primer envío.
      </p>

      <div className="flex gap-3">
        <input
          type="text"
          placeholder='Ej: "María García — Au Pair Alemania 2024"'
          value={label}
          onChange={(e) => { setLabel(e.target.value); setResult(null); }}
          onKeyDown={(e) => e.key === 'Enter' && generar()}
          className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={generar}
          disabled={loading || !label.trim()}
          className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Generando…' : 'Generar'}
        </button>
      </div>

      {result && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-xs font-semibold text-green-700 mb-2 uppercase tracking-wide">
            ✅ Enlace generado — válido para un solo uso
          </p>
          <p className="text-sm text-gray-700 break-all font-mono mb-3">{result.url}</p>
          <div className="flex gap-2">
            <button
              onClick={copiar}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
            >
              {copied ? '¡Copiado!' : 'Copiar enlace'}
            </button>
            <span className="text-xs text-green-600 self-center">
              También visible en Sanity Studio → Tokens de Testimonio
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
