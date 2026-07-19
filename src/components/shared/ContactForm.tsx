'use client';

import { useState } from 'react';
import { ContactFormData } from '@/lib/validations/contact';
import { sileo } from 'sileo';

type FieldErrors = Partial<Record<keyof ContactFormData, string[]>>;
type Status = 'idle' | 'loading';

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
          sileo.error({ title: 'Error al enviar', description: data.error ?? 'Error al enviar el mensaje.', fill: '#E31E24' });
          setStatus('idle');
        }
        return;
      }

      sileo.success({ title: '¡Mensaje enviado!', description: 'Te contactaremos en menos de 24 horas.', fill: '#1B67E8' });
      setFormData(INITIAL);
      setStatus('idle');
    } catch {
      sileo.error({ title: 'Error al enviar', description: 'No se pudo conectar con el servidor. Verifica tu conexión.', fill: '#E31E24' });
      setStatus('idle');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">

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
