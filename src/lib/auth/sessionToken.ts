/**
 * Cookie de sesión del Studio, firmada con HMAC-SHA256.
 *
 * Sustituye al esquema anterior, que guardaba un valor FIJO
 * (`STUDIO_SESSION_TOKEN`) idéntico en todas las sesiones y sin fecha. Aquello
 * implicaba que:
 *   - cerrar sesión no invalidaba nada: el valor seguía sirviendo para siempre
 *   - quien copiara la cookie entraba indefinidamente
 *   - la caducidad dependía solo de que el navegador borrase la cookie, cosa
 *     que un atacante que reenvía la cookie a mano simplemente no hace
 *
 * Ahora el valor lleva dentro su fecha de emisión y va firmado, así que el
 * servidor puede comprobar antigüedad de verdad en cada petición.
 *
 * Se usa Web Crypto (no el `crypto` de Node) porque el middleware corre en el
 * runtime Edge, donde los módulos de Node no están disponibles. Web Crypto
 * existe en ambos entornos.
 */

const encoder = new TextEncoder();

function bytesToB64url(bytes: Uint8Array): string {
  let bin = '';
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function b64urlToBytes(s: string): ArrayBuffer {
  const b64 = s.replace(/-/g, '+').replace(/_/g, '/');
  const pad = b64.length % 4 ? '='.repeat(4 - (b64.length % 4)) : '';
  const bin = atob(b64 + pad);
  const buf = new ArrayBuffer(bin.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i < bin.length; i++) view[i] = bin.charCodeAt(i);
  return buf;
}

async function hmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify'],
  );
}

/** Emite una cookie firmada con la hora actual como fecha de emisión. */
export async function createSessionCookie(secret: string): Promise<string> {
  const payload = bytesToB64url(encoder.encode(JSON.stringify({ iat: Date.now() })));
  const sig = await crypto.subtle.sign('HMAC', await hmacKey(secret), encoder.encode(payload));
  return `${payload}.${bytesToB64url(new Uint8Array(sig))}`;
}

/**
 * Valida firma y antigüedad. Devuelve false ante cualquier anomalía —
 * formato, firma que no cuadra, fecha ausente o sesión caducada.
 *
 * `crypto.subtle.verify` ya compara en tiempo constante, así que no hace falta
 * un timingSafeEqual aparte.
 */
export async function verifySessionCookie(
  value: string,
  secret: string,
  maxAgeMs: number,
): Promise<boolean> {
  const parts = value.split('.');
  if (parts.length !== 2) return false;

  const [payload, sig] = parts;
  if (!payload || !sig) return false;

  try {
    const valid = await crypto.subtle.verify(
      'HMAC',
      await hmacKey(secret),
      b64urlToBytes(sig),
      encoder.encode(payload),
    );
    if (!valid) return false;

    const { iat } = JSON.parse(new TextDecoder().decode(b64urlToBytes(payload)));
    if (typeof iat !== 'number') return false;

    const age = Date.now() - iat;
    // `age < 0` descarta cookies con fecha futura, que solo aparecen si alguien
    // manipula el reloj o el payload.
    return age >= 0 && age < maxAgeMs;
  } catch {
    return false;
  }
}
