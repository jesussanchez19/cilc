'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { sileo } from 'sileo';
import { trackTestimonialSubmit } from '@/lib/analytics';
import { PROGRAM_NAMES } from '@/lib/data/programs';


export default function TestimonioForm({ paisesPorPrograma, tokenUsoUnico, onSuccess, waPrincipal }: { paisesPorPrograma: Record<string, string[]>; tokenUsoUnico?: string; onSuccess?: () => void; /** Numero wa.me: llega como prop porque este componente es de cliente. */ waPrincipal: string }) {
  const [form, setForm] = useState({ nombre: '', email: '', programa: '', pais: '', texto: '' });
  const [foto, setFoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [calificacion, setCalificacion] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [aceptaPrivacidad, setAceptaPrivacidad] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [nombreEnviado, setNombreEnviado] = useState('');

  const set = (k: string, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (Object.keys(errors).length > 0) {
      setErrors(validate({ ...form, [k]: v }, calificacion));
    }
  };

  const handleFoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file) {
      if (!file.type.startsWith('image/')) {
        setErrors((prev) => ({ ...prev, foto: 'Solo se permiten imágenes (JPG, PNG, etc.)' }));
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, foto: 'La foto no debe superar 5 MB' }));
        return;
      }
      setErrors((prev) => { const next = { ...prev }; delete next.foto; return next; });
    }
    setFoto(file);
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  const validate = (f = form, cal = calificacion) => {
    const e: Record<string, string> = {};
    if (f.nombre.trim().length < 2) e.nombre = 'El nombre debe tener al menos 2 caracteres';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = 'Ingresa un email válido';
    if (f.texto.trim().length < 10) e.texto = 'Cuéntanos un poco más (mínimo 10 caracteres)';
    if (cal === 0) e.calificacion = 'Selecciona una calificación';
    if (!aceptaPrivacidad) e.privacidad = 'Debes aceptar el aviso de privacidad para continuar';
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form, calificacion);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus('loading');
    try {
      const fd = new FormData();
      fd.append('nombre', form.nombre);
      fd.append('email', form.email);
      fd.append('programa', form.programa);
      fd.append('pais', form.pais);
      fd.append('texto', form.texto);
      if (calificacion > 0) fd.append('calificacion', String(calificacion));
      if (foto) fd.append('foto', foto);
      if (tokenUsoUnico) fd.append('tokenUsoUnico', tokenUsoUnico);

      const res = await fetch('/api/testimonio', { method: 'POST', body: fd });
      if (res.ok) {
        trackTestimonialSubmit();
        setNombreEnviado(form.nombre);
        setStatus('success');
        onSuccess?.();
      } else {
        sileo.error({ title: 'Error al enviar', description: 'Ocurrió un error. Intenta de nuevo.', fill: '#E31E24' });
        setStatus('idle');
      }
    } catch {
      sileo.error({ title: 'Error al enviar', description: 'No se pudo conectar con el servidor.', fill: '#E31E24' });
      setStatus('idle');
    }

  };

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center text-center py-6 space-y-5">
        {/* Ícono animado */}
        <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
          <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>

        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 mb-2" style={{ letterSpacing: '-0.02em' }}>
            ¡Gracias, {nombreEnviado.split(' ')[0]}!
          </h2>
          <p className="text-slate-500 text-sm leading-relaxed max-w-xs mx-auto">
            Tu testimonio fue enviado correctamente. Lo revisaremos y lo publicaremos pronto en el sitio de CILC.
          </p>
        </div>

        <div className="w-full pt-2 border-t border-slate-100">
          <p className="text-xs text-slate-400 mb-3">¿Conoces a alguien más que quiera compartir su experiencia?</p>
          <a
            href={`https://wa.me/${waPrincipal}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white"
            style={{ background: '#25D366' }}
          >
            <svg viewBox="0 0 32 32" className="w-4 h-4" fill="currentColor">
              <path d="M16.003 2.667C8.638 2.667 2.667 8.638 2.667 16c0 2.354.618 4.663 1.793 6.695L2.667 29.333l6.82-1.778A13.264 13.264 0 0016.003 29.333c7.365 0 13.33-5.97 13.33-13.333 0-7.362-5.965-13.333-13.33-13.333z" />
            </svg>
            Contactar a CILC
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Honeypot — invisible para humanos, los bots lo rellenan */}
      {/* tabIndex iba dentro de `style`, donde no es una propiedad CSS y no
          hacía nada. El input de abajo ya lo lleva como atributo, que es
          donde surte efecto. */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }}>
        <label htmlFor="website">Sitio web</label>
        <input type="text" id="website" name="website" autoComplete="off" tabIndex={-1} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Nombre *</label>
          <input
            className={`input-field ${errors.nombre ? 'border-red-400 focus:ring-red-300' : ''}`}
            placeholder="Tu nombre completo" value={form.nombre}
            onChange={(e) => set('nombre', e.target.value)} />
          {errors.nombre && <p className="mt-1.5 text-xs text-red-500">{errors.nombre}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Email *</label>
          <input
            className={`input-field ${errors.email ? 'border-red-400 focus:ring-red-300' : ''}`}
            type="email" placeholder="tu@email.com" value={form.email}
            onChange={(e) => set('email', e.target.value)} />
          {errors.email && <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>}
        </div>
      </div>
      {form.programa === 'Idiomas en Línea' ? (
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Programa</label>
          <select className="input-field" value={form.programa} onChange={(e) => { set('programa', e.target.value); set('pais', ''); }}>
            <option value="">Selecciona un programa</option>
            {PROGRAM_NAMES.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Programa</label>
            <select className="input-field" value={form.programa} onChange={(e) => { set('programa', e.target.value); set('pais', ''); }}>
              <option value="">Selecciona un programa</option>
              {PROGRAM_NAMES.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          {form.programa && (
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">País</label>
            <select className="input-field" value={form.pais} onChange={(e) => set('pais', e.target.value)}>
              <option value="">Selecciona un país</option>
              {(paisesPorPrograma[form.programa] ?? []).map((nombre) => (
                <option key={nombre} value={nombre}>{nombre}</option>
              ))}
            </select>
          </div>
          )}
        </div>
      )}

      {/* Foto */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">Foto tuya en el destino <span className="text-slate-400 font-normal">(opcional)</span></label>
        <div className="flex items-center gap-4">
          {preview ? (
            <Image src={preview} alt="Vista previa" width={64} height={64}
              className="w-16 h-16 rounded-full object-cover shrink-0 border-2 border-blue-200" />
          ) : (
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center shrink-0 border-2 border-dashed border-slate-300">
              <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            </div>
          )}
          <label className="cursor-pointer">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-blue-600 border border-blue-200 hover:bg-blue-50 transition-colors duration-150">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
              </svg>
              {foto ? 'Cambiar foto' : 'Subir foto'}
            </span>
            <input type="file" accept="image/*" className="hidden" onChange={handleFoto} />
          </label>
          {foto && (
            <button type="button" onClick={() => { setFoto(null); setPreview(null); }}
              className="text-xs text-slate-400 hover:text-red-500 transition-colors">
              Quitar
            </button>
          )}
        </div>
        {errors.foto && <p className="mt-1.5 text-xs text-red-500">{errors.foto}</p>}
      </div>

      {/* Calificación */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">¿Cómo calificarías tu experiencia? *</label>
        <div className={`flex gap-1 ${errors.calificacion ? 'rounded-lg ring-1 ring-red-300 p-1' : ''}`}>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(0)}
              onClick={() => {
                setCalificacion(star);
                if (Object.keys(errors).length > 0) setErrors(validate(form, star));
              }}
              className="transition-transform duration-100 hover:scale-110 focus:outline-none"
              aria-label={`${star} estrellas`}
            >
              <svg
                className="w-8 h-8"
                fill={(hovered || calificacion) >= star ? '#f59e0b' : 'none'}
                stroke={(hovered || calificacion) >= star ? '#f59e0b' : '#d1d5db'}
                viewBox="0 0 20 20"
                strokeWidth={0.8}
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </button>
          ))}
          {calificacion > 0 && (
            <span className="ml-2 self-center text-sm text-slate-500">
              {['', 'Malo', 'Regular', 'Bueno', 'Muy bueno', 'Excelente'][calificacion]}
            </span>
          )}
        </div>
        {errors.calificacion && <p className="mt-1.5 text-xs text-red-500">{errors.calificacion}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">Tu experiencia *</label>
        <textarea
          className={`input-field resize-none ${errors.texto ? 'border-red-400 focus:ring-red-300' : ''}`}
          rows={4}
          placeholder="Cuéntanos cómo fue tu experiencia con CILC..."
          value={form.texto} onChange={(e) => set('texto', e.target.value)} />
        {errors.texto && <p className="mt-1.5 text-xs text-red-500">{errors.texto}</p>}
      </div>
      {/* Consentimiento */}
      <div>
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={aceptaPrivacidad}
            onChange={(e) => {
              const checked = e.target.checked;
              setAceptaPrivacidad(checked);
              if (Object.keys(errors).length > 0) {
                setErrors((prev) => {
                  const next = { ...prev };
                  if (checked) delete next.privacidad;
                  else next.privacidad = 'Debes aceptar el aviso de privacidad para continuar';
                  return next;
                });
              }
            }}
            className={`mt-0.5 w-4 h-4 rounded text-blue-600 focus:ring-blue-500 shrink-0 ${errors.privacidad ? 'border-red-400' : 'border-slate-300'}`}
          />
          <span className="text-sm text-slate-600 leading-snug">
            He leído y acepto el{' '}
            <a href="/aviso-de-privacidad" target="_blank" rel="noopener noreferrer"
              className="text-blue-600 hover:underline font-medium">
              Aviso de Privacidad
            </a>
            {' '}y autorizo el uso de mis datos para publicar mi testimonio en el sitio de CILC.
          </span>
        </label>
        {errors.privacidad && <p className="mt-1.5 text-xs text-red-500 pl-7">{errors.privacidad}</p>}
      </div>

      <button type="submit" disabled={status === 'loading'} className="btn-primary w-full justify-center">
        Enviar testimonio
      </button>

      {/* Overlay de carga — montado en document.body para evitar conflictos con transform/filter */}
      {status === 'loading' && typeof window !== 'undefined' && createPortal(
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24,
            background: 'rgba(15, 23, 42, 0.72)',
          }}
        >
          <div
            style={{
              width: 64, height: 64, borderRadius: '50%',
              border: '5px solid rgba(255,255,255,0.2)',
              borderTopColor: '#fff',
              animation: 'spin 0.8s linear infinite',
            }}
          />
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: '#fff', fontWeight: 600, fontSize: 18, margin: 0 }}>Enviando tu testimonio…</p>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14, marginTop: 6 }}>Solo tomará un momento</p>
          </div>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>,
        document.body,
      )}
    </form>
  );
}
