'use client';

import { useState } from 'react';
import { ContactFormData } from '@/lib/validations/contact';

type FieldErrors = Partial<Record<keyof ContactFormData, string[]>>;
type Status = 'idle' | 'loading' | 'success' | 'error';

const INITIAL: ContactFormData = { name: '', email: '', subject: '', message: '' };

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>(INITIAL);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

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

    const res = await fetch('/api/contact', {
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
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      {status === 'success' && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
          ¡Gracias! Tu mensaje fue enviado. Nos pondremos en contacto pronto.
        </div>
      )}

      {status === 'error' && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {errorMsg}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Nombre *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={status === 'loading'}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            placeholder="Tu nombre"
          />
          {fieldErrors.name && (
            <p className="mt-1 text-sm text-red-600">{fieldErrors.name[0]}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={status === 'loading'}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            placeholder="tu@email.com"
          />
          {fieldErrors.email && (
            <p className="mt-1 text-sm text-red-600">{fieldErrors.email[0]}</p>
          )}
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="subject" className="block text-gray-700 font-bold mb-2">
          Asunto *
        </label>
        <select
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          disabled={status === 'loading'}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        >
          <option value="">Selecciona un asunto</option>
          <option value="Consulta General">Consulta General</option>
          <option value="Información sobre Becas">Información sobre Becas</option>
          <option value="Programas Académicos">Programas Académicos</option>
          <option value="Universidad Específica">Universidad Específica</option>
          <option value="Otro">Otro</option>
        </select>
        {fieldErrors.subject && (
          <p className="mt-1 text-sm text-red-600">{fieldErrors.subject[0]}</p>
        )}
      </div>

      <div className="mb-6">
        <label htmlFor="message" className="block text-gray-700 font-bold mb-2">
          Mensaje *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          disabled={status === 'loading'}
          rows={6}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          placeholder="Cuéntanos más sobre ti y tu interés en estudiar en el extranjero..."
        />
        {fieldErrors.message && (
          <p className="mt-1 text-sm text-red-600">{fieldErrors.message[0]}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Enviando...' : 'Enviar Mensaje'}
      </button>
    </form>
  );
}
