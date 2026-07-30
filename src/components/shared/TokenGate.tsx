'use client';

import { useEffect, useState } from 'react';
import TestimonioForm from './TestimonioForm';

type Status = 'checking' | 'valid' | 'used' | 'invalid' | 'error';

export default function TokenGate({
  token,
  paisesPorPrograma,
  waPrincipal,
}: {
  token: string;
  paisesPorPrograma: Record<string, string[]>;
  /** Numero wa.me, que se reenvia al formulario. */
  waPrincipal: string;
}) {
  const [status, setStatus] = useState<Status>('checking');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch(`/api/verificar-token?t=${encodeURIComponent(token)}`)
      .then((r) => r.json())
      .then((data) => setStatus(data.status as Status))
      .catch(() => setStatus('error'));
  }, [token]);

  if (status === 'checking') {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-slate-400">Verificando enlace…</p>
      </div>
    );
  }

  if (status === 'used') {
    return (
      <div className="flex flex-col items-center text-center py-8 gap-5">
        <div className="w-20 h-20 rounded-full bg-amber-50 flex items-center justify-center">
          <svg className="w-10 h-10 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 mb-2" style={{ letterSpacing: '-0.02em' }}>
            Este enlace ya fue utilizado
          </h2>
          <p className="text-slate-500 text-sm leading-relaxed max-w-xs mx-auto">
            El enlace de testimonio es de un solo uso y ya fue empleado. Si crees que es un error, contáctanos.
          </p>
        </div>
        <a
          href={`https://wa.me/${waPrincipal}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white"
          style={{ background: '#25D366' }}
        >
          <svg viewBox="0 0 32 32" className="w-4 h-4" fill="currentColor">
            <path d="M16.003 2.667C8.638 2.667 2.667 8.638 2.667 16c0 2.354.618 4.663 1.793 6.695L2.667 29.333l6.82-1.778A13.264 13.264 0 0016.003 29.333c7.365 0 13.33-5.97 13.33-13.333 0-7.362-5.965-13.333-13.33-13.333z" />
          </svg>
          Contactar a CILC
        </a>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="flex flex-col items-center text-center py-8 gap-4">
        <p className="text-4xl">⚠️</p>
        <p className="text-slate-500 text-sm">No pudimos verificar tu enlace. Por favor intenta de nuevo.</p>
        <button
          onClick={() => { setStatus('checking'); fetch(`/api/verificar-token?t=${encodeURIComponent(token)}`).then(r => r.json()).then(d => setStatus(d.status)).catch(() => setStatus('error')); }}
          className="btn-primary"
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (status === 'invalid') {
    return (
      <div className="flex flex-col items-center text-center py-8 gap-4">
        <p className="text-4xl">🔒</p>
        <h2 className="text-xl font-bold text-slate-900">Enlace no válido</h2>
        <p className="text-slate-500 text-sm">Este enlace de testimonio no existe o expiró.</p>
      </div>
    );
  }

  return (
    <>
      {!submitted && (
        <div className="text-center mb-10">
          <span className="badge mb-4 inline-flex">Tu experiencia</span>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-3" style={{ letterSpacing: '-0.03em' }}>
            Comparte tu testimonio
          </h1>
          <p className="text-slate-500 text-base leading-relaxed">
            Cuéntanos cómo fue tu experiencia estudiando en el extranjero con CILC.
            Tu historia puede inspirar a otros estudiantes.
          </p>
        </div>
      )}
      <div className="premium-card p-8">
        <TestimonioForm
          paisesPorPrograma={paisesPorPrograma}
          waPrincipal={waPrincipal}
          tokenUsoUnico={token}
          onSuccess={() => setSubmitted(true)}
        />
      </div>
    </>
  );
}
