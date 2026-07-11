'use client';

import { useState } from 'react';
import Image from 'next/image';
import { countries } from '@/lib/data/countries';

const PROGRAMAS = ['Idiomas', 'Au Pair', 'Años Académicos', 'Estudia y Trabaja', 'Formación Corporativa', 'Idiomas en Línea'];

export default function TestimonioForm() {
  const [form, setForm] = useState({ nombre: '', email: '', programa: '', pais: '', ciudad: '', texto: '' });
  const [foto, setFoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleFoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setFoto(file);
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const fd = new FormData();
      fd.append('nombre', form.nombre);
      fd.append('email', form.email);
      fd.append('programa', form.programa);
      fd.append('pais', [form.ciudad, form.pais].filter(Boolean).join(', '));
      fd.append('texto', form.texto);
      if (foto) fd.append('foto', foto);

      const res = await fetch('/api/testimonio', { method: 'POST', body: fd });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center py-12 animate-scale-in">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">¡Gracias por compartir tu experiencia!</h3>
        <p className="text-slate-500 text-sm">Revisaremos tu testimonio y lo publicaremos pronto.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Nombre *</label>
          <input className="input-field" placeholder="Tu nombre completo" value={form.nombre}
            onChange={(e) => set('nombre', e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Email *</label>
          <input className="input-field" type="email" placeholder="tu@email.com" value={form.email}
            onChange={(e) => set('email', e.target.value)} required />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Programa</label>
          <select className="input-field" value={form.programa} onChange={(e) => set('programa', e.target.value)}>
            <option value="">Selecciona un programa</option>
            {PROGRAMAS.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Ciudad</label>
          <input className="input-field" placeholder="Ej: Vancouver" value={form.ciudad}
            onChange={(e) => set('ciudad', e.target.value)} />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">País</label>
        <select className="input-field" value={form.pais} onChange={(e) => set('pais', e.target.value)}>
          <option value="">Selecciona un país</option>
          {countries.map((c) => (
            <option key={c.id} value={c.name}>{c.flag} {c.name}</option>
          ))}
        </select>
      </div>

      {/* Foto */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">Fotografía <span className="text-slate-400 font-normal">(opcional)</span></label>
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
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">Tu experiencia *</label>
        <textarea className="input-field resize-none" rows={4}
          placeholder="Cuéntanos cómo fue tu experiencia con CILC..."
          value={form.texto} onChange={(e) => set('texto', e.target.value)} required />
      </div>
      {status === 'error' && (
        <p className="text-sm text-red-600">Ocurrió un error. Intenta de nuevo.</p>
      )}
      <button type="submit" disabled={status === 'loading'} className="btn-primary w-full justify-center">
        {status === 'loading' ? 'Enviando...' : 'Enviar testimonio'}
      </button>
    </form>
  );
}
