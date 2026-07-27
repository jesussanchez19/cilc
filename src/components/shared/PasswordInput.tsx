'use client';

import { useState, forwardRef } from 'react';

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  /** Marca el borde en rojo. Pásale el mensaje de error o vacío. */
  invalid?: boolean;
  autoComplete?: 'current-password' | 'new-password';
  autoFocus?: boolean;
  disabled?: boolean;
}

/**
 * Campo de contraseña con botón para mostrarla/ocultarla.
 *
 * Escribir una contraseña a ciegas es la causa habitual de los fallos de login
 * en móvil, donde el teclado autocorrige y no se ve lo tecleado.
 */
const PasswordInput = forwardRef<HTMLInputElement, Props>(function PasswordInput(
  { value, onChange, placeholder = 'Contraseña', invalid = false, autoComplete = 'current-password', autoFocus = false, disabled = false },
  ref,
) {
  const [visible, setVisible] = useState(false);

  const border = invalid
    ? '1px solid rgba(227,30,36,0.6)'
    : '1px solid rgba(255,255,255,0.10)';

  return (
    <div className="relative">
      <input
        ref={ref}
        type={visible ? 'text' : 'password'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        disabled={disabled}
        // pr-12 reserva el hueco del botón para que el texto no quede debajo.
        className="w-full px-4 py-3 pr-12 rounded-xl text-sm text-white placeholder-slate-500 outline-none transition-all duration-200 disabled:opacity-60"
        style={{ background: 'rgba(255,255,255,0.06)', border, caretColor: '#1B67E8' }}
        onFocus={(e) => {
          if (!invalid) e.currentTarget.style.border = '1px solid rgba(27,103,232,0.6)';
        }}
        onBlur={(e) => {
          if (!invalid) e.currentTarget.style.border = border;
        }}
      />

      <button
        type="button" // sin esto enviaría el formulario al pulsarlo
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
        aria-pressed={visible}
        tabIndex={-1} // el tabulador va del campo al botón de enviar, no aquí
        className="absolute right-1 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-lg text-slate-500 hover:text-slate-300 transition-colors duration-150"
      >
        {visible ? (
          // Ojo tachado
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
          </svg>
        ) : (
          // Ojo abierto
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        )}
      </button>
    </div>
  );
});

export default PasswordInput;
