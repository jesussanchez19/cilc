/**
 * Analítica: identificador de GA4 y los eventos que el sitio reporta.
 *
 * Estas funciones existieron antes y se quitaron porque nadie las llamaba: la
 * medición se limitaba al script global del layout, o sea páginas vistas y nada
 * más. Vuelven ahora *con sus llamadas puestas*, porque sin eventos GA4 no
 * puede distinguir a quien solo pasó por /contact de quien de verdad envió el
 * formulario, que es justo la conversión que interesa medir.
 *
 * `buildWhatsAppUrl`, que también estaba aquí, no vuelve: llevaba dentro un
 * número de teléfono escrito a mano y el teléfono hoy sale de Sanity.
 */
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? '';

declare global {
  interface Window {
    /**
     * La declara el script inline de `app/layout.tsx`. Es opcional a propósito:
     * sin `NEXT_PUBLIC_GA_ID` ese script no se monta y aquí no hay nada que
     * llamar.
     */
    gtag?: (
      command: 'event',
      eventName: string,
      params?: Record<string, unknown>,
    ) => void;
  }
}

/** De dónde salió el contacto. Viaja a GA4 como parámetro `form_name`. */
export type LeadOrigen = 'contacto' | 'cotizacion' | 'whatsapp';

/**
 * Envía un evento a GA4.
 *
 * No hace nada si falta el ID, si corre en el servidor o si el script todavía
 * no cargó —se inyecta con `afterInteractive`, así que durante los primeros
 * instantes de la página `window.gtag` puede no existir—. Un evento perdido no
 * debe romper un envío de formulario, que es lo que de verdad importa.
 */
export function trackEvent(eventName: string, params?: Record<string, unknown>): void {
  if (!GA_ID) return;
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', eventName, params);
}

/**
 * Un formulario de captación se envió con éxito.
 *
 * `generate_lead` es uno de los eventos recomendados de GA4: al usar ese nombre
 * en vez de uno inventado, aparece solo en los informes y se puede marcar como
 * evento clave (conversión) sin configurar nada más.
 *
 * Se llama SOLO cuando el servidor respondió bien. Contarlo al pulsar el botón
 * inflaría la cifra con los envíos que fallaron o que la validación rechazó.
 */
export function trackLead(origen: LeadOrigen, extra?: Record<string, unknown>): void {
  trackEvent('generate_lead', { form_name: origen, ...extra });
}

/** Se abrió el chat flotante de WhatsApp. Mide intención, no conversión. */
export function trackWhatsAppOpen(): void {
  trackEvent('whatsapp_open');
}

/** Un alumno mandó su testimonio. No es un lead: no hay nada que vender ahí. */
export function trackTestimonialSubmit(): void {
  trackEvent('testimonial_submit');
}
