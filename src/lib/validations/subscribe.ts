import { z } from 'zod';

export const subscribeSchema = z.object({
  email: z.string().email('Email inválido'),
});

export type SubscribeFormData = z.infer<typeof subscribeSchema>;
