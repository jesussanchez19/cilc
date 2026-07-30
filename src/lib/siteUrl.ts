/**
 * Dirección pública del sitio, en un solo lugar.
 *
 * Antes cada archivo que la necesitaba repetía la misma expresión con su propio
 * valor por defecto, y no coincidían: cinco usaban `https://cilc.mx` y dos
 * `https://cilc.vercel.app`. Eso significaba que, sin la variable de entorno, el
 * sitemap y el canonical anunciaban un dominio distinto del que usaban los
 * enlaces de los correos.
 *
 * Y el valor `https://cilc.mx` era además incorrecto: ese dominio pertenece a
 * otra empresa —un consorcio de logística que comparte las siglas—, así que sin
 * la variable el sitio le estaba atribuyendo su contenido a un tercero en el
 * sitemap, la etiqueta canónica y los datos estructurados.
 *
 * El valor de reserva es la dirección de Vercel porque es la única que de
 * verdad sirve este sitio hoy. Cuando se decida el dominio definitivo hay que
 * cambiarlo aquí y definir `NEXT_PUBLIC_SITE_URL` en el hosting.
 *
 * Sin barra final: en todas partes se concatena como `${SITE_URL}/ruta`.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, '') ?? 'https://cilc.vercel.app';
