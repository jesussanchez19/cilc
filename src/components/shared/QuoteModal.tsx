'use client';

import { useEffect, useRef, useState } from 'react';

const PROGRAMAS = [
  'Idiomas',
  'Au Pair',
  'Años Académicos',
  'Estudia y Trabaja',
  'Formación Corporativa',
  'Idiomas en Línea',
];

type Status = 'idle' | 'loading' | 'success' | 'error';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  programaInicial?: string;
}

export default function QuoteModal({ isOpen, onClose, programaInicial = '' }: QuoteModalProps) {
  const [nombre,   setNombre]   = useState('');
  const [email,    setEmail]    = useState('');
  const [telefono, setTelefono] = useState('');
  const [programa, setPrograma] = useState(programaInicial);
  const [mensaje,  setMensaje]  = useState('');
  const [status,   setStatus]   = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setPrograma(programaInicial); }, [programaInicial]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: nombre,
          email,
          subject: `Cotización: ${programa}`,
          message: `Teléfono: ${telefono}\nPrograma: ${programa}\n\n${mensaje}`,
        }),
      });

      if (!res.ok) throw new Error('Error del servidor');
      setStatus('success');
    } catch {
      setErrorMsg('No se pudo enviar. Verifica tu conexión e intenta de nuevo.');
      setStatus('error');
    }
  };

  const reset = () => {
    setNombre(''); setEmail(''); setTelefono('');
    setPrograma(programaInicial); setMensaje('');
    setStatus('idle'); setErrorMsg('');
    onClose();
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(10,15,30,0.7)', backdropFilter: 'blur(8px)' }}
    >
      <div
        className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl animate-scale-in"
        style={{
          background: '#ffffff',
          boxShadow: 'var(--shadow-xl)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5"
          style={{ borderBottom: '1px solid rgba(15,23,42,0.07)' }}>
          <div>
            <h2 className="text-lg font-extrabold text-slate-900" style={{ letterSpacing: '-0.02em' }}>
              Obtén tu cotización
            </h2>
            <p className="text-sm text-slate-400 mt-0.5">Gratis y sin compromiso · Respuesta en &lt;24h</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors duration-150 text-slate-400 hover:text-slate-600"
            style={{ background: 'var(--surface-2)' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          {status === 'success' ? (
            <div className="text-center py-10 animate-scale-in">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                style={{ background: 'linear-gradient(135deg,#d1fae5,#a7f3d0)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 mb-2">¡Solicitud enviada!</h3>
              <p className="text-slate-400 mb-7">Nos pondremos en contacto contigo muy pronto.</p>
              <button onClick={reset} className="btn-primary" style={{ background: 'var(--blue-600)' }}>
                Cerrar
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">

              {status === 'error' && (
                <div className="p-3.5 rounded-xl text-sm animate-fade-in"
                  style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626' }}>
                  {errorMsg}
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Programa *</label>
                <select
                  value={programa} onChange={(e) => setPrograma(e.target.value)}
                  required disabled={status === 'loading'}
                  className="input-field"
                >
                  <option value="">Selecciona un programa</option>
                  {PROGRAMAS.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Nombre *</label>
                <input
                  type="text" required value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  disabled={status === 'loading'}
                  placeholder="Tu nombre completo"
                  className="input-field"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email *</label>
                  <input
                    type="email" required value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === 'loading'}
                    placeholder="tu@email.com"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Teléfono</label>
                  <input
                    type="tel" value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    disabled={status === 'loading'}
                    placeholder="55 1234 5678"
                    className="input-field"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  ¿Alguna pregunta? <span className="text-slate-400 font-normal">(opcional)</span>
                </label>
                <textarea
                  value={mensaje} onChange={(e) => setMensaje(e.target.value)}
                  disabled={status === 'loading'} rows={3}
                  placeholder="Cuéntanos un poco sobre ti y tus objetivos..."
                  className="input-field resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                style={{ background: 'var(--blue-600)', justifyContent: 'center', marginTop: '0.5rem' }}
              >
                {status === 'loading' ? (
                  <>
                    <svg className="animate-spin w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Enviando...
                  </>
                ) : (
                  'Solicitar cotización gratis'
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
