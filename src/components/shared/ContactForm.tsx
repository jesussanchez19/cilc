'use client';

import { useState } from 'react';
import { ContactFormData } from '@/lib/validations/contact';

type FieldErrors = Partial<Record<keyof ContactFormData, string[]>>;
type Status = 'idle' | 'loading' | 'success' | 'error';

const INITIAL: ContactFormData = { name: '', email: '', subject: '', message: '' };

function Spinner() {
  return (
    <svg className="animate-spin w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
    </svg>
  );
}

export default function ContactForm() {
  const [formData, setFormData]       = useState<ContactFormData>(INITIAL);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [status, setStatus]           = useState<Status>('idle');
  const [errorMsg, setErrorMsg]       = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setFieldErrors({});
    setErrorMsg('');

    try {
      const res  = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        if (data.fields) {
          setFieldErrors(data.fields);
          setStatus('idle');
        } else {
          setErrorMsg(data.error ?? 'Error al enviar el mensaje.');
          setStatus('error');
        }
        return;
      }

      setStatus('success');
      setFormData(INITIAL);
    } catch {
      setErrorMsg('No se pudo conectar con el servidor. Verifica tu conexión e inténtalo de nuevo.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="max-w-2xl mx-auto text-center py-20 animate-scale-in">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ background: 'linear-gradient(135deg, #d1fae5, #a7f3d0)' }}>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-extrabold text-slate-900 mb-2" style={{ letterSpacing: '-0.02em' }}>
          ¡Mensaje enviado!
        </h3>
        <p className="text-slate-500 mb-8">
          Gracias por contactarnos. Nos pondremos en contacto contigo en menos de 24 horas.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="btn-primary"
          style={{ background: 'var(--blue-600)' }}
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">

      {status === 'error' && (
        <div className="mb-6 p-4 rounded-xl flex items-start gap-3 animate-fade-in"
          style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626' }}>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M12 3a9 9 0 100 18A9 9 0 0012 3z" />
          </svg>
          <p className="text-sm">{errorMsg}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <div>
          <label htmlFor="name" className="block text-slate-700 text-sm font-semibold mb-2">Nombre *</label>
          <input
            type="text" id="name" name="name"
            value={formData.name} onChange={handleChange}
            disabled={status === 'loading'} placeholder="Tu nombre"
            className="input-field"
          />
          {fieldErrors.name && <p className="mt-1.5 text-sm text-red-500">{fieldErrors.name[0]}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-slate-700 text-sm font-semibold mb-2">Email *</label>
          <input
            type="email" id="email" name="email"
            value={formData.email} onChange={handleChange}
            disabled={status === 'loading'} placeholder="tu@email.com"
            className="input-field"
          />
          {fieldErrors.email && <p className="mt-1.5 text-sm text-red-500">{fieldErrors.email[0]}</p>}
        </div>
      </div>

      <div className="mb-5">
        <label htmlFor="subject" className="block text-slate-700 text-sm font-semibold mb-2">Asunto *</label>
        <select
          id="subject" name="subject"
          value={formData.subject} onChange={handleChange}
          disabled={status === 'loading'}
          className="input-field"
        >
          <option value="">Selecciona un asunto</option>
          <option value="Consulta General">Consulta General</option>
          <option value="Información sobre Becas">Información sobre Becas</option>
          <option value="Programas Académicos">Programas Académicos</option>
          <option value="Universidad Específica">Universidad Específica</option>
          <option value="Otro">Otro</option>
        </select>
        {fieldErrors.subject && <p className="mt-1.5 text-sm text-red-500">{fieldErrors.subject[0]}</p>}
      </div>

      <div className="mb-7">
        <label htmlFor="message" className="block text-slate-700 text-sm font-semibold mb-2">Mensaje *</label>
        <textarea
          id="message" name="message"
          value={formData.message} onChange={handleChange}
          disabled={status === 'loading'} rows={6}
          placeholder="Cuéntanos más sobre ti y tu interés en estudiar en el extranjero..."
          className="input-field resize-none"
        />
        {fieldErrors.message && <p className="mt-1.5 text-sm text-red-500">{fieldErrors.message[0]}</p>}
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
        style={{ background: 'var(--blue-600)', justifyContent: 'center' }}
      >
        {status === 'loading' ? (
          <><Spinner /> Enviando...</>
        ) : (
          'Enviar Mensaje'
        )}
      </button>
    </form>
  );
}
