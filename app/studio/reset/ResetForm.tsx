'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import PasswordInput from '@/components/shared/PasswordInput';

export default function ResetForm({ token }: { token: string }) {
  const router                 = useRouter();
  const [password, setPassword]   = useState('');
  const [confirm,  setConfirm]    = useState('');
  const [status,   setStatus]     = useState<'idle' | 'success' | 'error'>('idle');
  const [message,  setMessage]    = useState('');
  const [loading,  setLoading]    = useState(false);
  const inputRef                  = useRef<HTMLInputElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const tooShort = password.length < 10;
  const mismatch = password !== confirm;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mismo mínimo que exige el servidor en /api/studio-auth/reset. Se valida
    // aquí para dar respuesta inmediata, no como sustituto: el servidor
    // vuelve a comprobarlo porque el cliente es manipulable.
    if (tooShort) {
      setStatus('error');
      setMessage('La contraseña debe tener al menos 10 caracteres.');
      return;
    }
    if (mismatch) {
      setStatus('error');
      setMessage('Las contraseñas no coinciden.');
      return;
    }

    setLoading(true);
    setStatus('idle');

    const res = await fetch('/api/studio-auth/reset', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, password }),
    });

    if (res.ok) {
      setStatus('success');
      setMessage('Contraseña actualizada. Redirigiendo al Studio…');
      setTimeout(() => router.push('/studio/login'), 2000);
    } else {
      const { error } = await res.json().catch(() => ({ error: 'Error desconocido' }));
      setStatus('error');
      setMessage(error);
    }
    setLoading(false);
  };

  // La validez del token ya la comprobó el server component de page.tsx: si
  // llegamos aquí, el enlace es bueno.
  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--dark)' }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 50% at 30% 40%, rgba(27,103,232,0.15) 0%, transparent 65%)' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
      </div>

      <div className="relative w-full max-w-sm">
        <div className="flex justify-center mb-8">
          <Image src="/logo.png" alt="CILC" width={120} height={40} className="h-10 w-auto object-contain" />
        </div>

        <div className="rounded-2xl p-8"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)' }}>

          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
              style={{ background: 'rgba(27,103,232,0.15)', border: '1px solid rgba(27,103,232,0.3)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="#1B67E8" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>
            <h1 className="text-white font-bold text-lg">Nueva contraseña</h1>
            <p className="text-slate-400 text-sm mt-1">Elige una contraseña para el Studio</p>
          </div>

          {status === 'success' ? (
            <div className="text-center py-4">
              <p className="text-green-400 text-sm font-semibold">{message}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <PasswordInput
                ref={inputRef}
                value={password}
                onChange={(v) => { setPassword(v); if (status === 'error') setStatus('idle'); }}
                placeholder="Nueva contraseña"
                autoComplete="new-password"
                invalid={status === 'error' && tooShort}
                disabled={loading}
              />
              <PasswordInput
                value={confirm}
                onChange={(v) => { setConfirm(v); if (status === 'error') setStatus('idle'); }}
                placeholder="Confirmar contraseña"
                autoComplete="new-password"
                invalid={status === 'error' && !tooShort}
                disabled={loading}
              />

              {/* Requisitos visibles mientras escribe, en vez de descubrirlos
                  al enviar. El servidor exige 10 caracteres. */}
              {password.length > 0 && (
                <ul className="text-[11px] space-y-1 px-1">
                  <li style={{ color: tooShort ? '#94a3b8' : '#4ade80' }}>
                    {tooShort ? '○' : '✓'} Al menos 10 caracteres
                  </li>
                  {confirm.length > 0 && (
                    <li style={{ color: mismatch ? '#94a3b8' : '#4ade80' }}>
                      {mismatch ? '○' : '✓'} Las dos coinciden
                    </li>
                  )}
                </ul>
              )}

              {status === 'error' && (
                <p className="text-xs" style={{ color: '#E31E24' }}>{message}</p>
              )}
              <button
                type="submit"
                disabled={loading || tooShort || mismatch}
                className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 disabled:opacity-50 mt-1"
                style={{ background: '#1B67E8', boxShadow: '0 4px 16px rgba(27,103,232,0.3)' }}
              >
                {loading ? 'Guardando…' : 'Guardar contraseña'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
