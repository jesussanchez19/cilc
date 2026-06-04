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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">

        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Obtén tu cotización</h2>
            <p className="text-sm text-gray-500 mt-0.5">Gratis y sin compromiso</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center transition text-gray-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">

          {status === 'success' ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">¡Solicitud enviada!</h3>
              <p className="text-gray-500 mb-6">Nos pondremos en contacto contigo muy pronto.</p>
              <button onClick={reset}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition text-sm">
                Cerrar
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">

              {status === 'error' && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
                  {errorMsg}
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Programa *</label>
                <select
                  value={programa}
                  onChange={(e) => setPrograma(e.target.value)}
                  required
                  disabled={status === 'loading'}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  <option value="">Selecciona un programa</option>
                  {PROGRAMAS.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Nombre *</label>
                <input
                  type="text" required value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  disabled={status === 'loading'}
                  placeholder="Tu nombre completo"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Email *</label>
                  <input
                    type="email" required value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === 'loading'}
                    placeholder="tu@email.com"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Teléfono</label>
                  <input
                    type="tel" value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    disabled={status === 'loading'}
                    placeholder="55 1234 5678"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">¿Alguna pregunta? <span className="text-gray-400 font-normal">(opcional)</span></label>
                <textarea
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                  disabled={status === 'loading'}
                  rows={3}
                  placeholder="Cuéntanos un poco sobre ti y tus objetivos..."
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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

              <p className="text-center text-xs text-gray-400">
                Sin costo · Sin compromiso · Respuesta en menos de 24h
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
