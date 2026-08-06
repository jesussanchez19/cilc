/**
 * La ubicación de la oficina, resuelta en un solo sitio.
 *
 * Había dos campos en el CMS —"Dirección de la oficina" y "Ubicación en Google
 * Maps"— y cada página elegía uno por su cuenta: la de contacto sacaba el texto
 * de la URL del mapa y el pie de página usaba el campo escrito. Con los dos
 * apuntando a sitios distintos, el sitio mostraba **dos direcciones diferentes
 * a la vez**: el pie decía "Insurgentes Sur 863, Piso 7" y la tarjeta de
 * contacto "Insurgentes Sur 700-Piso 9".
 *
 * Ahora manda el campo de texto, que es el que se edita a mano, y la URL sirve
 * solo para situar el mapa. Para que no haya que teclear la dirección dos
 * veces, el Studio ofrece un botón que la copia de la URL al campo.
 */

/**
 * El único lugar del código donde la dirección está escrita a mano.
 *
 * Estaba copiada en seis sitios —pie de página, aviso de privacidad, términos,
 * dos plantillas de correo y el respaldo de las consultas—, así que una mudanza
 * obligaba a encontrarlos todos. Solo se usa como respaldo: en cuanto Sanity
 * responde, manda el campo "Dirección de la oficina".
 */
export const DIRECCION_POR_DEFECTO =
  'Av. Insurgentes Sur 863, Piso 7\nCol. Nápoles, C.P. 03810\nCDMX, México';

/**
 * La dirección en una sola línea, para meterla dentro de una frase.
 *
 * En el pie va en varias líneas, pero en el aviso de privacidad y en los
 * términos aparece en mitad de un párrafo, donde un salto de línea corta la
 * frase por la mitad.
 */
export function direccionEnLinea(direccion?: string): string {
  return (direccion ?? '').split('\n').map((l) => l.trim()).filter(Boolean).join(', ');
}

export interface Ubicacion {
  /** El texto que se muestra. Siempre el mismo en todo el sitio. */
  direccion: string;
  /** `src` del iframe del mapa, o null si no hay nada con que dibujarlo. */
  embedSrc: string | null;
  /** Enlace para abrir Google Maps en otra pestaña, o null. */
  enlace: string | null;
}

/**
 * Saca la dirección legible de una URL de Google Maps.
 *
 * Reconoce las dos formas que deja el navegador al copiar de Maps:
 * `/maps/place/<direccion>/...` y las que llevan la consulta en `?q=` o
 * `?query=`. Devuelve null si no encuentra nada reconocible.
 */
export function direccionDesdeUrl(url?: string): string | null {
  if (!url) return null;
  try {
    const place = url.match(/\/maps\/place\/([^/@?]+)/);
    if (place?.[1]) return decodeURIComponent(place[1].replace(/\+/g, ' '));

    const consulta = new URL(url).searchParams.get('q') ?? new URL(url).searchParams.get('query');
    if (consulta) return consulta;

    return null;
  } catch {
    return null;
  }
}

/**
 * Mapa incrustado a partir de un texto libre.
 *
 * `output=embed` no necesita clave de API, que es lo que permite dibujar el
 * mapa sin más que la dirección escrita — la otra mitad de lo que se pedía:
 * que al cambiar la dirección se mueva el mapa, y no solo al revés.
 */
function embedDesdeTexto(texto: string): string {
  return `https://maps.google.com/maps?q=${encodeURIComponent(texto)}&output=embed`;
}

/**
 * Qué dirección mostrar y qué mapa dibujar, a partir de los dos campos.
 *
 * El texto manda. Si no hay URL de Maps, el mapa se construye con ese mismo
 * texto, así que basta con escribir la dirección para que el mapa la siga.
 */
export function resolverUbicacion(direccion?: string, urlMapa?: string): Ubicacion {
  const texto = (direccion ?? '').trim();

  if (urlMapa) {
    // Una URL de `/maps/place/` no vale como `src` de iframe: hay que pasarla
    // por el formato de consulta, que sí admite incrustarse.
    const deLaUrl = direccionDesdeUrl(urlMapa);
    return {
      direccion: texto || (deLaUrl ?? ''),
      embedSrc: deLaUrl ? embedDesdeTexto(deLaUrl) : urlMapa,
      enlace: urlMapa,
    };
  }

  return {
    direccion: texto,
    embedSrc: texto ? embedDesdeTexto(texto) : null,
    enlace: texto ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(texto)}` : null,
  };
}
