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
  /**
   * Solo documentos publicados.
   *
   * Sin esto, el sitio enseñaba los borradores. Un token de lectura ve también
   * los `drafts.*`, así que cada documento con cambios sin publicar aparecía
   * DOS veces: la versión publicada y la que se estaba editando. En el blog se
   * vio como un artículo repetido —uno con la imagen recién subida y otro
   * sin ella— y afectaba igual a testimonios, destinos, programas y todo lo
   * demás que se consulte con este cliente.
   *
   * Peor que el duplicado: lo que alguien tecleara en el Studio salía publicado
   * antes de darle a publicar, que es justamente lo que ese botón debe evitar.
   */
  perspective: 'published' as const,
};

export const client = createClient({ ...base, useCdn: false });

// Cliente CDN para lecturas rápidas (edge cache, ~50 ms)
