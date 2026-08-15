import QRCode from 'qrcode';

/**
 * Dibuja un código QR como SVG, en el servidor.
 *
 * Se genera en vez de subir una imagen ya hecha por dos razones: un SVG se ve
 * nítido a cualquier tamaño —un PNG o un PDF se pixelan al ampliarlos— y, sobre
 * todo, la dirección vive en el CMS. Si el formulario cambia de sitio basta con
 * editarla; una imagen subida se quedaría apuntando para siempre a la vieja.
 *
 * Va en el servidor y devuelve el marcado ya hecho, así que el navegador no
 * descarga la librería: son unos 12 KB de JavaScript que no llegan al usuario.
 */

/** Corrección de errores media: aguanta que se ensucie o se doble un ~15%. */
const NIVEL_CORRECCION = 'M' as const;

export async function generarQrSvg(url?: string): Promise<string | null> {
  if (!url) return null;

  try {
    return await QRCode.toString(url, {
      type: 'svg',
      errorCorrectionLevel: NIVEL_CORRECCION,
      // Sin borde propio: el hueco blanco lo pone la tarjeta que lo envuelve,
      // y con los 4 módulos por defecto el código se veía diminuto dentro.
      margin: 0,
      color: {
        // Azul muy oscuro en vez de negro puro, para que combine con la marca
        // sin perder contraste: sigue siendo casi negro sobre blanco.
        dark: '#0f172aff',
        light: '#ffffffff',
      },
    });
  } catch {
    // Una URL imposible de codificar no debe tumbar la página entera.
    return null;
  }
}
