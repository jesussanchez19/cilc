import type { NextRequest } from 'next/server';

/**
 * Limitador por IP en memoria.
 *
 * Aviso: el estado vive en el proceso. Con varias instancias o en serverless
 * cada una lleva su propia cuenta, así que el límite real se multiplica por el
 * número de instancias. Frena el abuso automatizado, que es el objetivo aquí,
 * pero si el sitio escala a varias instancias esto debería moverse a un store
 * compartido (Redis, Upstash).
 */
const BUCKETS = new Map<string, { count: number; resetAt: number }>();

/** Evita que el Map crezca sin fin con IPs que ya caducaron. */
function prune(now: number) {
  if (BUCKETS.size < 5_000) return;
  for (const [key, entry] of BUCKETS) {
    if (entry.resetAt <= now) BUCKETS.delete(key);
  }
}

export function clientIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip')?.trim() ||
    'unknown'
  );
}

/**
 * Devuelve true si se superó el límite.
 *
 * @param key    Identificador del cubo — usa un prefijo por endpoint para que
 *               un formulario no consuma la cuota de otro.
 * @param max    Intentos permitidos por ventana.
 * @param windowMs Duración de la ventana en milisegundos.
 */
export function isRateLimited(key: string, max: number, windowMs: number): boolean {
  const now = Date.now();
  prune(now);

  const entry = BUCKETS.get(key);
  if (!entry || entry.resetAt <= now) {
    BUCKETS.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }

  entry.count += 1;
  return entry.count > max;
}
