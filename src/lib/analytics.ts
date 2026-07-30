/**
 * Identificador de Google Analytics. Vacío si no está configurado, y el layout
 * raíz omite el script en ese caso.
 *
 * Este módulo tenía además `trackEvent`, `trackWhatsAppClick`, `trackFormSubmit`
 * y `buildWhatsAppUrl`, que nunca se llamaron desde ningún sitio: la analítica
 * se limita al script global del layout. Se quitaron en vez de dejarlos ahí,
 * porque `buildWhatsAppUrl` llevaba dentro un número de teléfono escrito a mano
 * y salía en cada búsqueda de números por el proyecto como si fuera un sitio
 * pendiente de arreglar.
 */
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? '';
