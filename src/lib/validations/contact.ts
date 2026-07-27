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
