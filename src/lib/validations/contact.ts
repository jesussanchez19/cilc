import { z } from 'zod';

/**
 * Los límites superiores no son cosmética: lo que entra aquí se envía por
 * correo y se guarda en leads.json. Sin `.max()` se podía mandar un mensaje de
 * varios MB. `.trim()` va antes de `.min()` para que una cadena de espacios no
 * cuente como nombre válido.
 */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede superar los 100 caracteres'),
  email: z
    .string()
    .trim()
    .max(200, 'El email no puede superar los 200 caracteres')
    .email('Email inválido'),
  subject: z
    .string()
    .trim()
    .min(1, 'Selecciona un asunto')
    .max(150, 'El asunto no puede superar los 150 caracteres'),
  message: z
    .string()
    .trim()
    .min(10, 'El mensaje debe tener al menos 10 caracteres')
    .max(2000, 'El mensaje no puede superar los 2000 caracteres'),
});

export type ContactFormData = z.infer<typeof contactSchema>;

/**
 * El chat flotante de WhatsApp entra por la misma ruta que el formulario de
 * contacto, pero solo pide nombre y teléfono.
 *
 * Antes rellenaba el hueco del correo con `lead@wa.cilc.mx`, una dirección
 * inventada sobre un dominio que pertenece a otra empresa. La ruta la trataba
 * como buena: le mandaba la confirmación del cliente y la ponía de `reply-to`
 * del aviso al administrador, así que responder a un lead de WhatsApp escribía
 * a un tercero en vez de al interesado, cuyo teléfono estaba enterrado en el
 * texto del mensaje.
 *
 * `origen` es lo que permite a la ruta distinguir los dos formularios sin
 * relajar la validación del de contacto, donde el correo sí es obligatorio.
 */
export const whatsappLeadSchema = z.object({
  origen: z.literal('whatsapp'),
  name: z
    .string()
    .trim()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede superar los 100 caracteres'),
  phone: z
    .string()
    .trim()
    .min(8, 'Ingresa un teléfono válido')
    .max(30, 'El teléfono no puede superar los 30 caracteres'),
});
