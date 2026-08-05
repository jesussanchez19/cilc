/**
 * Rutas de administración: el Studio y el panel.
 *
 * La regla vive aquí y no repetida en cada componente porque ya pasó una vez:
 * Navigation y WhatsAppButton se ocultaban solos en el Studio, y Header,
 * Breadcrumb y Footer no, así que el chrome del sitio público salía a medias.
 *
 * Son pantallas de trabajo interno: no llevan cabecera de marketing, ni menú de
 * programas, ni botón de "Cotizar gratis", ni el flotante de WhatsApp, ni el
 * pie de página. Todo eso resta altura útil y confunde sobre dónde está uno.
 */
export function esRutaDeAdministracion(pathname: string): boolean {
  return pathname.startsWith('/studio') || pathname.startsWith('/admin');
}
