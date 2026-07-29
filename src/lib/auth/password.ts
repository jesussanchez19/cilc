import crypto from 'crypto';

/**
 * Hasheado de la contraseña del Studio.
 *
 * Se guardaba en texto plano en el documento `configuracion` de Sanity. Con el
 * dataset en público eso significaba que cualquiera podía leerla con una sola
 * consulta anónima, porque el projectId viaja en el bundle del navegador.
 *
 * El hash NO sustituye a cerrar el dataset: contra un hash público se puede
 * probar por fuerza bruta sin límite y offline. Es una capa más, no la
 * solución — el dataset tiene que dejar de ser legible de forma anónima.
 */

const PREFIX = 'scrypt';
const KEYLEN = 64;

export function hashPassword(plain: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const key = crypto.scryptSync(plain, salt, KEYLEN).toString('hex');
  return `${PREFIX}$${salt}$${key}`;
}

/** Distingue un valor ya hasheado de uno heredado en texto plano. */
export function isHashed(stored: string): boolean {
  return stored.startsWith(`${PREFIX}$`) && stored.split('$').length === 3;
}

/**
 * Verifica en tiempo constante. Acepta los valores antiguos en texto plano
 * para no dejar fuera a quien aún no haya cambiado la contraseña; el llamador
 * debe reescribirlos hasheados en cuanto acierten (ver `needsUpgrade`).
 */
export function verifyPassword(plain: string, stored: string): boolean {
  if (!plain || !stored) return false;

  if (!isHashed(stored)) {
    // Compatibilidad con el formato antiguo, comparada en tiempo constante.
    const a = crypto.createHash('sha256').update(plain, 'utf8').digest();
    const b = crypto.createHash('sha256').update(stored, 'utf8').digest();
    return crypto.timingSafeEqual(a, b);
  }

  const [, salt, key] = stored.split('$');
  try {
    const expected = Buffer.from(key, 'hex');
    const actual = crypto.scryptSync(plain, salt, expected.length);
    return crypto.timingSafeEqual(actual, expected);
  } catch {
    return false;
  }
}

/** True si el valor guardado sigue en texto plano y conviene reescribirlo. */
export function needsUpgrade(stored: string): boolean {
  return Boolean(stored) && !isHashed(stored);
}
