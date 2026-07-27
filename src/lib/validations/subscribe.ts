import { z } from 'zod';

/** Ver la nota sobre límites y `.trim()` en `contact.ts`: mismo criterio. */
export const subscribeSchema = z.object({
  email: z
    .string()
    .trim()
    .max(200, 'El email no puede superar los 200 caracteres')
    .email('Email inválido'),
});

export type SubscribeFormData = z.infer<typeof subscribeSchema>;
