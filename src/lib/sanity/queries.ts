import { client } from './client';

// ── Testimonios ───────────────────────────────────────────────────────────────

export interface SanityTestimonial {
  _id: string;
  nombre: string;
  foto: { asset: { _ref: string } };
  programa: string;
  pais: string;
  bandera: string;
  rating: number;
  texto: string;
}

export async function getTestimonials(): Promise<SanityTestimonial[]> {
  return client.fetch(`*[_type == "testimonial"] | order(_createdAt asc)`);
}

export interface TestimonialAprobado {
  _id: string;
  nombre: string;
  pais: string;
  bandera: string;
  programa: string;
  texto: string;
  foto?: { asset: { _ref: string } };
  videoUrl?: string;
}

export async function getTestimoniosAprobados(): Promise<TestimonialAprobado[]> {
  const { createClient } = await import('next-sanity');
  const draftClient = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
    token: process.env.SANITY_API_WRITE_TOKEN,
    perspective: 'previewDrafts',
  });
  return draftClient.fetch(`*[_type == "solicitudTestimonio" && estado == "aprobado"] | order(_createdAt desc)`);
}

// ── Blog posts ────────────────────────────────────────────────────────────────

export interface SanityPost {
  _id: string;
  slug: { current: string };
  title: string;
  excerpt: string;
  content: string;
  image: { asset: { _ref: string } };
  date: string;
  category: string;
  readingTime: number;
}

export async function getPosts(): Promise<SanityPost[]> {
  return client.fetch(`*[_type == "blogPost"] | order(date desc)`);
}

export async function getPostBySlug(slug: string): Promise<SanityPost | null> {
  return client.fetch(
    `*[_type == "blogPost" && slug.current == $slug][0]`,
    { slug }
  );
}

// ── Socios y Miembros ─────────────────────────────────────────────────────────

export interface SanityPartner {
  _id: string;
  nombre: string;
  logo: { asset: { _ref: string } };
  cargo: string;
  url?: string;
}

export async function getSocios(): Promise<SanityPartner[]> {
  return client.fetch(`*[_type == "socio"] | order(orden asc)`);
}

// ── Miembros del equipo ───────────────────────────────────────────────────────

export interface SanityMember {
  _id: string;
  nombre: string;
  cargo: string;
  foto: { asset: { _ref: string } };
  bio: string;
}

export async function getTeamMembers(): Promise<SanityMember[]> {
  return client.fetch(`*[_type == "teamMember"] | order(_createdAt asc)`);
}
