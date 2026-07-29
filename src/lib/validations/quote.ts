import { z } from 'zod';

/** Ver la nota sobre límites y `.trim()` en `contact.ts`: mismo criterio. */
export const quoteSchema = z.object({
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
  phone: z
    .string()
    .trim()
    .max(30, 'El teléfono no puede superar los 30 caracteres')
    .optional()
    .refine(
      (v) => !v || v.replace(/\D/g, '').length >= 8,
      'Ingresa un teléfono válido (mínimo 8 dígitos)',
    ),
  program: z
    .string()
    .trim()
    .min(1, 'Selecciona un programa')
    .max(100, 'Programa no válido'),
  message: z
    .string()
    .trim()
    .max(2000, 'El mensaje no puede superar los 2000 caracteres')
    .optional(),
});

export type QuoteFormData = z.infer<typeof quoteSchema>;
