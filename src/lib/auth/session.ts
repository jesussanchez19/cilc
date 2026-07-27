/**
 * Fuente única de la sesión del Studio.
 *
 * Estos valores los comparten cuatro consumidores. Si no coinciden, la sesión
 * no caduca cuando debería — que es justo lo que pasaba cuando el login creaba
 * la cookie con 30 min y el middleware la renovaba con 10:
 *
 *   - app/api/studio-auth/route.ts        crea la cookie al iniciar sesión
 *   - middleware.ts                       la renueva en cada petición /studio/*
 *   - src/components/admin/IdleRefresh    recarga el cliente al agotarse
 *   - app/studio/login/page.tsx           se lo comunica al usuario
 */

export const SESSION_COOKIE = '__studio_sess';

/** Ventana de inactividad, en segundos (formato de `maxAge` de la cookie). */
export const IDLE_SECONDS = 10 * 60;

/** La misma ventana en milisegundos. */
export const IDLE_MS = IDLE_SECONDS * 1000;

/**
 * Cuándo debe recargar el cliente para forzar la comprobación del middleware.
 *
 * Va 5 s POR DETRÁS de la caducidad de la cookie, a propósito. Si recargara
 * justo a los IDLE_MS sería una carrera: llegando un milisegundo antes, el
 * navegador aún manda la cookie, el middleware la da por válida y la renueva
 * otra ventana entera — y como IdleRefresh se remonta con timer nuevo, la
 * sesión se renueva sola para siempre y nunca caduca.
 */
export const IDLE_CHECK_MS = IDLE_MS + 5_000;

/** Etiqueta para la UI — derivada, para que la copia no se desincronice. */
const IDLE_MINUTES = IDLE_SECONDS / 60;
export const IDLE_LABEL = `${IDLE_MINUTES} ${IDLE_MINUTES === 1 ? 'minuto' : 'minutos'}`;
