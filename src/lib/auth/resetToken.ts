import crypto from 'crypto';
import { getStudioPasswordHash } from '@/lib/sanity/queries';

const TTL_MS = 15 * 60 * 1000;

/** Minutos de validez, para que el correo no pueda contradecir al código. */
export const RESET_TTL_MINUTES = TTL_MS / 60_000;

/**
 * El secreto de firma incluye el hash de la contraseña **actual**.
 *
 * De ahí sale el "un solo uso" que promete el correo: en cuanto alguien
 * completa el cambio, el hash guardado es otro, el secreto cambia y todos los
 * enlaces emitidos antes dejan de verificar. Sin necesidad de llevar registro
 * de qué tokens se han gastado.
 */
async function signingSecret(): Promise<string> {
  const base = process.env.STUDIO_SESSION_TOKEN;
  if (!base) throw new Error('Falta STUDIO_SESSION_TOKEN');
  const currentHash = await getStudioPasswordHash();
  return `${base}:${currentHash}`;
}

export async function createResetToken(): Promise<string> {
  const payload = Buffer.from(
    JSON.stringify({ exp: Date.now() + TTL_MS }),
  ).toString('base64url');

  const sig = crypto
    .createHmac('sha256', await signingSecret())
    .update(payload)
    .digest('base64url');

  return `${payload}.${sig}`;
}

/** Valida firma y caducidad. Cualquier anomalía devuelve false. */
export async function verifyResetToken(token: string): Promise<boolean> {
  const parts = token.split('.');
  if (parts.length !== 2) return false;

  const [payload, sig] = parts;
  if (!payload || !sig) return false;

  try {
    const expected = crypto
      .createHmac('sha256', await signingSecret())
      .update(payload)
      .digest('base64url');

    const a = Buffer.from(sig, 'base64url');
    const b = Buffer.from(expected, 'base64url');
    // timingSafeEqual lanza si difieren las longitudes; se comprueba antes
    // para no depender del catch en un caso que no es excepcional.
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false;

    const { exp } = JSON.parse(Buffer.from(payload, 'base64url').toString());
    return typeof exp === 'number' && Date.now() < exp;
  } catch {
    return false;
  }
}
