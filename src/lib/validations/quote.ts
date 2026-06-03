import { z } from 'zod';

export const quoteSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(8, 'Teléfono inválido'),
  program: z.string().min(1, 'Selecciona un programa'),
  message: z.string().optional(),
});

export type QuoteFormData = z.infer<typeof quoteSchema>;
