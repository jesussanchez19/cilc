'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function StudioLoginPage() {
  const [password, setPassword]       = useState('');
  const [error, setError]             = useState('');
  const [loading, setLoading]         = useState(false);
  const [sending, setSending]         = useState(false);
  const [sentEmail, setSentEmail]     = useState(false);
  const inputRef                  = useRef<HTMLInputElement>(null);
  const router                    = useRouter();
  const searchParams              = useSearchParams();
  const from                      = searchParams.get('from') ?? '/studio';

  useEffect(() => { inputRef.current?.focus(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/studio-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push(from);
      } else {
        setError('Contraseña incorrecta. Inténtalo de nuevo.');
        setPassword('');
        inputRef.current?.focus();
      }
    } catch {
      setError('Error de conexión. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgot = async () => {
    setSending(true);
    try {
      await fetch('/api/studio-auth/forgot', { method: 'POST' });
      setSentEmail(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'var(--dark)' }}>

      {/* Fondo decorativo */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 50% at 30% 40%, rgba(27,103,232,0.15) 0%, transparent 65%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 50% 50% at 75% 65%, rgba(227,30,36,0.10) 0%, transparent 65%)' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
      </div>

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image src="/logo.png" alt="CILC" width={120} height={40} className="h-10 w-auto object-contain" />
        </div>

        {/* Card */}
        <div className="rounded-2xl p-8"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)' }}>

          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
              style={{ background: 'rgba(27,103,232,0.15)', border: '1px solid rgba(27,103,232,0.3)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="#1B67E8" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-white font-bold text-lg">Acceso al Studio</h1>
            <p className="text-slate-400 text-sm mt-1">Ingresa tu contraseña para continuar</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                ref={inputRef}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                required
                className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-slate-500 outline-none transition-all duration-200"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: error ? '1px solid rgba(227,30,36,0.6)' : '1px solid rgba(255,255,255,0.10)',
                  caretColor: '#1B67E8',
                }}
                onFocus={(e) => {
                  if (!error) e.currentTarget.style.border = '1px solid rgba(27,103,232,0.6)';
                }}
                onBlur={(e) => {
                  if (!error) e.currentTarget.style.border = '1px solid rgba(255,255,255,0.10)';
                }}
              />
              {error && (
                <p className="text-xs mt-2" style={{ color: '#E31E24' }}>{error}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 disabled:opacity-50"
              style={{ background: loading ? 'rgba(27,103,232,0.6)' : '#1B67E8', boxShadow: '0 4px 16px rgba(27,103,232,0.3)' }}
            >
              {loading ? 'Verificando…' : 'Entrar al Studio'}
            </button>
          </form>

          <div className="mt-5 text-center">
            {sentEmail ? (
              <p className="text-green-400 text-xs">✓ Enlace enviado al correo del administrador</p>
            ) : (
              <button
                onClick={handleForgot}
                disabled={sending}
                className="text-slate-500 hover:text-slate-300 text-xs transition-colors duration-150 disabled:opacity-50"
              >
                {sending ? 'Enviando…' : '¿Olvidaste tu contraseña?'}
              </button>
            )}
          </div>
        </div>

        <p className="text-center text-slate-600 text-xs mt-6">
          La sesión expira tras 30 minutos de inactividad
        </p>
      </div>
    </div>
  );
}
