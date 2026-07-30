import { createClient } from 'next-sanity';

const base = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  stega: false,
  // Necesario en cuanto el dataset deje de ser público. Mientras la variable
  // no exista el cliente sigue siendo anónimo y nada cambia, así que se puede
  // añadir antes de cerrar el dataset en Sanity y evitar la caída intermedia.
  // Es un token de SOLO LECTURA y solo de servidor: sin prefijo NEXT_PUBLIC_
  // nunca llega al bundle del navegador.
  token: process.env.SANITY_API_READ_TOKEN,
};

export const client = createClient({ ...base, useCdn: false });

// Cliente CDN para lecturas rápidas (edge cache, ~50 ms)
