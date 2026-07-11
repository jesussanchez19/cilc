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
