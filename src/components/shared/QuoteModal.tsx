'use client';

import { useEffect, useRef, useState } from 'react';
import { sileo } from 'sileo';
import { quoteSchema } from '@/lib/validations/quote';
import { trackLead } from '@/lib/analytics';
import { PROGRAM_NAMES } from '@/lib/data/programs';

type FieldErrors = Partial<Record<'nombre' | 'email' | 'telefono' | 'programa', string>>;


type Status = 'idle' | 'loading';

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
  const [errors,   setErrors]   = useState<FieldErrors>({});
  const overlayRef = useRef<HTMLDivElement>(null);

  /**
   * El modal se abre desde distintas páginas de programa y conserva su estado
   * entre aperturas, así que hay que resincronizar el programa preseleccionado
   * cuando cambia la prop. Sin esto, abrirlo desde "Au Pair" después de haberlo
   * abierto desde "Idiomas" mostraría Idiomas.
   */
  // eslint-disable-next-line react-hooks/set-state-in-effect
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

    const parsed = quoteSchema.safeParse({ name: nombre, email, phone: telefono, program: programa, message: mensaje });
    if (!parsed.success) {
      const flat = parsed.error.flatten().fieldErrors;
      setErrors({
        nombre:   flat.name?.[0],
        email:    flat.email?.[0],
        telefono: flat.phone?.[0],
        programa: flat.program?.[0],
      });
      return;
    }
    setErrors({});
    setStatus('loading');

    try {
      // Se envía a /api/quote, no a /api/contact.
      //
      // Antes iba al de contacto metiendo teléfono y programa dentro del texto
      // del mensaje. Eso tenía tres consecuencias: el lead se guardaba con
      // tipo "contacto", así que el contador de cotizaciones de /admin/stats
      // siempre marcaba cero; el correo al administrador usaba la plantilla
      // genérica en vez de la de cotización, con los datos enterrados en texto
      // libre; y el cliente recibía la confirmación equivocada.
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: nombre,
          email,
          phone: telefono,
          program: programa,
          message: mensaje,
        }),
      });

      if (!res.ok) throw new Error('Error del servidor');
      setStatus('idle');
      trackLead('cotizacion', { program: programa });
      sileo.success({ title: '¡Solicitud enviada!', description: 'Nos pondremos en contacto contigo muy pronto.', fill: '#1B67E8' });
      setNombre(''); setEmail(''); setTelefono('');
      setPrograma(programaInicial); setMensaje('');
      onClose();
    } catch {
      sileo.error({ title: 'Error al enviar', description: 'No se pudo enviar. Verifica tu conexión e intenta de nuevo.', fill: '#E31E24' });
      setStatus('idle');
    }
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(10,15,30,0.7)', backdropFilter: 'blur(8px)' }}
    >
      {/* role/aria-modal faltaban: sin ellos un lector de pantalla no anuncia
          que se ha abierto un diálogo ni acota la lectura a su contenido. */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="quote-modal-title"
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
            <h2 id="quote-modal-title" className="text-lg font-extrabold text-slate-900" style={{ letterSpacing: '-0.02em' }}>
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
            <form onSubmit={handleSubmit} className="space-y-4">

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Programa *</label>
                <select
                  value={programa}
                  onChange={(e) => {
                    const val = e.target.value;
                    setPrograma(val);
                    if (errors.programa !== undefined) {
                      const r = quoteSchema.shape.program.safeParse(val);
                      setErrors((p) => ({ ...p, programa: r.success ? undefined : r.error.issues[0]?.message }));
                    }
                  }}
                  disabled={status === 'loading'}
                  className={`input-field ${errors.programa ? 'border-red-400 focus:ring-red-300' : ''}`}
                >
                  <option value="">Selecciona un programa</option>
                  {PROGRAM_NAMES.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
                {errors.programa && <p className="mt-1.5 text-xs text-red-500">{errors.programa}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Nombre *</label>
                <input
                  type="text" value={nombre}
                  onChange={(e) => {
                    const val = e.target.value;
                    setNombre(val);
                    if (errors.nombre !== undefined) {
                      const r = quoteSchema.shape.name.safeParse(val);
                      setErrors((p) => ({ ...p, nombre: r.success ? undefined : r.error.issues[0]?.message }));
                    }
                  }}
                  disabled={status === 'loading'}
                  placeholder="Tu nombre completo"
                  maxLength={100} autoComplete="name" required
                  className={`input-field ${errors.nombre ? 'border-red-400 focus:ring-red-300' : ''}`}
                />
                {errors.nombre && <p className="mt-1.5 text-xs text-red-500">{errors.nombre}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email *</label>
                  <input
                    type="email" value={email}
                    onChange={(e) => {
                      const val = e.target.value;
                      setEmail(val);
                      if (errors.email !== undefined) {
                        const r = quoteSchema.shape.email.safeParse(val);
                        setErrors((p) => ({ ...p, email: r.success ? undefined : r.error.issues[0]?.message }));
                      }
                    }}
                    disabled={status === 'loading'}
                    placeholder="tu@email.com"
                    maxLength={200} autoComplete="email" required
                    className={`input-field ${errors.email ? 'border-red-400 focus:ring-red-300' : ''}`}
                  />
                  {errors.email && <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Teléfono <span className="text-slate-400 font-normal">(opcional)</span></label>
                  <input
                    type="tel" value={telefono}
                    onChange={(e) => {
                      const val = e.target.value;
                      setTelefono(val);
                      if (errors.telefono !== undefined) {
                        const r = quoteSchema.shape.phone.safeParse(val);
                        setErrors((p) => ({ ...p, telefono: r.success ? undefined : r.error.issues[0]?.message }));
                      }
                    }}
                    disabled={status === 'loading'}
                    placeholder="55 1234 5678"
                    maxLength={30} autoComplete="tel" inputMode="tel"
                    className={`input-field ${errors.telefono ? 'border-red-400 focus:ring-red-300' : ''}`}
                  />
                  {errors.telefono && <p className="mt-1.5 text-xs text-red-500">{errors.telefono}</p>}
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
                  maxLength={2000}
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
        </div>
      </div>
    </div>
  );
}
