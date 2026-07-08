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
  const [formData, setFormData]     = useState<ContactFormData>(INITIAL);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [status, setStatus]         = useState<Status>('idle');
  const [errorMsg, setErrorMsg]     = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {

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

    try {
      const res  = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        if (data.fields) { setFieldErrors(data.fields); setStatus('idle'); }
        else             { setErrorMsg(data.error ?? 'Error al enviar el mensaje.'); setStatus('error'); }
        return;
      }

      setStatus('success');
      setFormData(INITIAL);
    } catch {
      setErrorMsg('No se pudo conectar con el servidor. Verifica tu conexión e inténtalo de nuevo.');
      setStatus('error');
    }

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

  if (status === 'success') {
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">¡Mensaje enviado!</h3>
        <p className="text-gray-500 mb-8">Gracias por contactarnos. Nos pondremos en contacto contigo en menos de 24 horas.</p>
        <button
          onClick={() => setStatus('idle')}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition text-sm"
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">

      {status === 'error' && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-start gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M12 3a9 9 0 100 18A9 9 0 0012 3z" />
          </svg>
          <p className="text-sm">{errorMsg}</p>
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
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Nombre *</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange}
            disabled={status === 'loading'} placeholder="Tu nombre"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 text-sm" />
          {fieldErrors.name && <p className="mt-1 text-sm text-red-600">{fieldErrors.name[0]}</p>}
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
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email *</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange}
            disabled={status === 'loading'} placeholder="tu@email.com"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 text-sm" />
          {fieldErrors.email && <p className="mt-1 text-sm text-red-600">{fieldErrors.email[0]}</p>}
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
        <label htmlFor="subject" className="block text-gray-700 font-bold mb-2">Asunto *</label>
        <select id="subject" name="subject" value={formData.subject} onChange={handleChange}
          disabled={status === 'loading'}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 text-sm">
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
        {fieldErrors.subject && <p className="mt-1 text-sm text-red-600">{fieldErrors.subject[0]}</p>}
      </div>

      <div className="mb-6">
        <label htmlFor="message" className="block text-gray-700 font-bold mb-2">Mensaje *</label>
        <textarea id="message" name="message" value={formData.message} onChange={handleChange}
          disabled={status === 'loading'} rows={6} placeholder="Cuéntanos más sobre ti y tu interés en estudiar en el extranjero..."
          className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 text-sm" />
        {fieldErrors.message && <p className="mt-1 text-sm text-red-600">{fieldErrors.message[0]}</p>}
      </div>

      <button type="submit" disabled={status === 'loading'}
        className="w-full px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
        {status === 'loading' ? (<><Spinner /> Enviando...</>) : 'Enviar Mensaje'}
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
