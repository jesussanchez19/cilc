import Link from 'next/link';
import Image from 'next/image';
import ResetForm from './ResetForm';
import { verifyResetToken, RESET_TTL_MINUTES } from '@/lib/auth/resetToken';

export const metadata = { title: 'Restablecer contraseña | CILC Studio' };

// El token se valida en cada visita, así que la página no puede cachearse.
export const dynamic = 'force-dynamic';

interface Props {
  searchParams: Promise<{ token?: string }>;
}

/**
 * Comprueba el enlace ANTES de pintar el formulario.
 *
 * Antes la página solo miraba que el parámetro existiera, de modo que un
 * enlace caducado mostraba el formulario igualmente y el usuario no se
 * enteraba hasta pulsar Guardar, después de escribir la contraseña dos veces.
 * Parecía que la caducidad no funcionaba, cuando el servidor sí la aplicaba.
 */
export default async function StudioResetPage({ searchParams }: Props) {
  const { token } = await searchParams;
  const valid = Boolean(token) && (await verifyResetToken(token!));

  if (!valid) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--dark)' }}>
        <div className="relative w-full max-w-sm text-center">
          <div className="flex justify-center mb-8">
            <Image src="/logo.png" alt="CILC" width={120} height={40} className="h-10 w-auto object-contain" />
          </div>

          <div
            className="rounded-2xl px-6 py-8"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <div
              className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center"
              style={{ background: 'rgba(227,30,36,0.12)' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="#E31E24" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
            </div>

            <h1 className="text-white font-bold text-lg mb-2">Enlace caducado o inválido</h1>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Los enlaces de recuperación duran {RESET_TTL_MINUTES} minutos y solo se pueden usar una vez.
              Pide uno nuevo desde la pantalla de acceso.
            </p>

            <Link
              href="/studio/login"
              className="inline-block w-full py-3 rounded-xl text-sm font-semibold text-white transition-opacity duration-200 hover:opacity-90"
              style={{ background: '#1B67E8', boxShadow: '0 4px 16px rgba(27,103,232,0.3)' }}
            >
              Volver al acceso
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <ResetForm token={token!} />;
}
