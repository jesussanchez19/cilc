/**
 * Remitentes de los correos salientes.
 *
 * IMPORTANTE PARA PRODUCCIÓN: el valor por defecto es `onboarding@resend.dev`,
 * el dominio de pruebas de Resend, que **solo entrega al correo con el que se
 * registró la cuenta**. Con él, ningún cliente recibe su confirmación: Resend
 * responde 403 con el mensaje "You can only send testing emails to your own
 * email address".
 *
 * Antes de desplegar hay que verificar un dominio propio en resend.com/domains
 * y definir EMAIL_FROM_DOMAIN, por ejemplo `cilc.mx`. Va como variable de
 * entorno y no en el código para poder cambiarlo sin tocar el repositorio.
 */
const DOMINIO = process.env.EMAIL_FROM_DOMAIN?.trim();

function remitente(usuario: string, nombre: string): string {
  return DOMINIO
    ? `${nombre} <${usuario}@${DOMINIO}>`
    : `${nombre} <onboarding@resend.dev>`;
}

/** Avisos internos: formularios, cotizaciones, testimonios, suscripciones. */
export const FROM_WEB = remitente('web', 'CILC Web');

/** Correos que ve el cliente final. */
export const FROM_CLIENTE = remitente('hola', 'CILC');

/** Recuperación de contraseña del Studio. */
export const FROM_STUDIO = remitente('studio', 'CILC Studio');
