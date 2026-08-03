'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { sileo } from 'sileo';
import { useFloatingChromeVisible } from '@/hooks/useFloatingChromeVisible';
import { trackLead, trackWhatsAppOpen } from '@/lib/analytics';

const WHATSAPP_ICON = (
  <path d="M16.003 2.667C8.638 2.667 2.667 8.638 2.667 16c0 2.354.618 4.663 1.793 6.695L2.667 29.333l6.82-1.778A13.264 13.264 0 0016.003 29.333c7.365 0 13.33-5.97 13.33-13.333 0-7.362-5.965-13.333-13.33-13.333zm0 24.267a11.022 11.022 0 01-5.614-1.533l-.403-.238-4.047 1.056 1.08-3.94-.264-.416A10.98 10.98 0 015.003 16c0-6.065 4.935-11 11-11s11 4.935 11 11-4.935 11-11 11zm6.03-8.237c-.33-.165-1.953-.963-2.256-1.073-.303-.11-.524-.165-.744.165-.22.33-.854 1.073-1.047 1.293-.193.22-.385.248-.716.083-.33-.165-1.394-.514-2.655-1.638-.981-.875-1.643-1.956-1.836-2.286-.193-.33-.021-.508.145-.672.15-.148.33-.385.496-.578.165-.193.22-.33.33-.55.11-.22.055-.413-.028-.578-.083-.165-.744-1.793-1.02-2.454-.268-.644-.54-.557-.744-.567l-.633-.012c-.22 0-.578.083-.881.413-.303.33-1.155 1.128-1.155 2.75s1.183 3.19 1.348 3.41c.165.22 2.328 3.555 5.642 4.988.789.34 1.404.544 1.884.696.791.252 1.511.216 2.08.131.635-.094 1.953-.798 2.228-1.569.275-.77.275-1.43.193-1.569-.083-.138-.303-.22-.633-.385z" />
);

export default function WhatsAppButton() {
  const pathname = usePathname();
  const chromeVisible = useFloatingChromeVisible();
  const [open, setOpen]         = useState(false);
  const [hovered, setHovered]   = useState(false);
  const [nombre, setNombre]     = useState('');
  const [telefono, setTelefono] = useState('');
  const [loading, setLoading]   = useState(false);
  const [pulsing, setPulsing]   = useState(false);
  const [errors, setErrors]     = useState<{ nombre?: string; telefono?: string }>({});
  const wrapperRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pulseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (!open) {
        setPulsing(true);
        pulseTimeoutRef.current = setTimeout(() => setPulsing(false), 1800);
      }
    }, 10000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (pulseTimeoutRef.current) clearTimeout(pulseTimeoutRef.current);
    };
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: { nombre?: string; telefono?: string } = {};
    if (nombre.trim().length < 2) errs.nombre = 'Mínimo 2 caracteres';
    if (telefono.replace(/\D/g, '').length < 8) errs.telefono = 'Ingresa un teléfono válido';
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // `origen` le dice a la ruta que este lead no trae correo. Antes se
        // enviaba `email: 'lead@wa.cilc.mx'`, un buzón inventado en un dominio
        // ajeno al que iban a parar la confirmación y el reply-to del aviso.
        body: JSON.stringify({ origen: 'whatsapp', name: nombre, phone: telefono }),
      });
      // Solo cuenta como lead si el servidor lo aceptó. El aviso de éxito de
      // abajo se muestra igualmente —comportamiento que ya venía de antes—,
      // así que no sirve como señal de que la petición salió bien.
      if (res.ok) trackLead('whatsapp');
      sileo.success({
        title: '¡Listo! Te contactamos pronto',
        description: 'Un asesor de CILC te escribirá en breve.',
        fill: '#1B67E8',
      });
      setNombre('');
      setTelefono('');
      setOpen(false);
    } catch {
      sileo.error({ title: 'Error al enviar', description: 'Inténtalo de nuevo.', fill: '#E31E24' });
    } finally {
      setLoading(false);
    }
  };

  if (pathname.startsWith('/studio')) return null;

  // Con el chat abierto se mantiene visible aunque toque ocultarse: si no,
  // desaparecería a media escritura y se perdería lo tecleado.
  const show = chromeVisible || open;

  return (
    <div
      ref={wrapperRef}
      className={`fixed bottom-6 left-6 z-50 transition-all duration-300 ${
        show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >

      {/* Chat popup — aparece encima del botón */}
      {open && (
        <div
          className="absolute bottom-20 left-0 w-80 rounded-2xl overflow-hidden animate-scale-in"
          style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.22)', transformOrigin: 'bottom left' }}
        >
          {/* Header */}
          <div
            className="flex items-center gap-3 px-4 py-3"
            style={{ background: 'linear-gradient(135deg,#22c55e,#16a34a)' }}
          >
            <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
              style={{ background: 'rgba(255,255,255,0.2)' }}>
              <svg viewBox="0 0 32 32" className="w-6 h-6" fill="white">{WHATSAPP_ICON}</svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-bold text-sm leading-none">CILC</p>
              <p className="text-green-100 text-xs mt-0.5">● En línea · Responde en minutos</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Cerrar"
              className="text-white/70 hover:text-white transition-colors shrink-0"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Chat body */}
          <div className="px-4 py-4 space-y-3" style={{ background: '#e5ddd5' }}>

            {/* Burbuja del asesor */}
            <div
              className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm max-w-[90%]"
            >
              <p className="text-slate-700 text-sm leading-relaxed">
                👋 ¡Hola! Déjanos tu nombre y número y un asesor te contactará en minutos.
              </p>
              <p className="text-slate-400 text-[10px] text-right mt-1.5">CILC · ahora</p>
            </div>

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="space-y-2">
              <div>
                <input
                  type="text"
                  placeholder="Tu nombre *"
                  value={nombre}
                  onChange={(e) => {
                    const val = e.target.value;
                    setNombre(val);
                    if (errors.nombre !== undefined) {
                      setErrors((p) => ({ ...p, nombre: val.trim().length >= 2 ? undefined : 'Mínimo 2 caracteres' }));
                    }
                  }}
                  autoComplete="name"
                  maxLength={100} // igual que contactSchema, para no rebotar en el servidor
                  className="w-full px-4 py-2.5 rounded-xl text-sm outline-none text-slate-800 placeholder-slate-400"
                  style={{ background: '#fff', boxShadow: errors.nombre ? '0 0 0 1.5px #f87171' : '0 1px 4px rgba(0,0,0,0.10)' }}
                />
                {errors.nombre && <p className="mt-1 text-[11px] text-red-500 px-1">{errors.nombre}</p>}
              </div>
              <div>
                <input
                  type="tel"
                  placeholder="Tu WhatsApp / Teléfono *"
                  value={telefono}
                  onChange={(e) => {
                    const val = e.target.value;
                    setTelefono(val);
                    if (errors.telefono !== undefined) {
                      setErrors((p) => ({ ...p, telefono: val.replace(/\D/g, '').length >= 8 ? undefined : 'Ingresa un teléfono válido' }));
                    }
                  }}
                  autoComplete="tel"
                  inputMode="tel"
                  maxLength={30}
                  className="w-full px-4 py-2.5 rounded-xl text-sm outline-none text-slate-800 placeholder-slate-400"
                  style={{ background: '#fff', boxShadow: errors.telefono ? '0 0 0 1.5px #f87171' : '0 1px 4px rgba(0,0,0,0.10)' }}
                />
                {errors.telefono && <p className="mt-1 text-[11px] text-red-500 px-1">{errors.telefono}</p>}
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-200 active:scale-95 disabled:opacity-60"
                style={{ background: 'linear-gradient(135deg,#22c55e,#16a34a)' }}
              >
                {loading ? 'Enviando...' : 'Quiero que me contacten →'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Botón flotante — mismo diseño original */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => {
            // Fuera del actualizador de estado a propósito: React puede
            // ejecutar ese callback dos veces y el evento saldría duplicado.
            if (!open) trackWhatsAppOpen();
            setOpen((o) => !o);
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          aria-label="Chatear con CILC"
          className="relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
        style={{
          background: 'linear-gradient(135deg,#22c55e 0%,#16a34a 100%)',
          boxShadow: open
            ? '0 8px 28px rgba(22,163,74,0.45)'
            : '0 4px 16px rgba(22,163,74,0.30)',
        }}
      >
        {pulsing && !open && (
          <span className="absolute inset-0 rounded-full bg-green-400 opacity-35 animate-ping pointer-events-none" />
        )}
          <svg viewBox="0 0 32 32" className="w-8 h-8" fill="white" aria-hidden="true">{WHATSAPP_ICON}</svg>
        </button>

        {/* Tooltip — ahora a la DERECHA del botón */}
        <span
          className="text-slate-800 text-sm font-semibold px-3.5 py-2 rounded-xl whitespace-nowrap transition-all duration-200"
          style={{
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(15,23,42,0.08)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
            opacity: hovered && !open ? 1 : 0,
            transform: hovered && !open ? 'translateX(0)' : 'translateX(8px)',
            pointerEvents: 'none',
          }}
        >
          ¿Tienes dudas?
        </span>
      </div>
    </div>
  );
}
