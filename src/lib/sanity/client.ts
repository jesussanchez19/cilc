import { createClient } from 'next-sanity';

const base = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  stega: false,
};

export const client = createClient({ ...base, useCdn: false });

// Cliente CDN para lecturas rápidas (edge cache, ~50 ms)
export const cdnClient = createClient({ ...base, useCdn: true });
