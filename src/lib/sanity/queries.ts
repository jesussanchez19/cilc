import { client } from './client';
import { writeClient } from './writeClient';

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
  calificacion?: number;
}

export async function getTestimoniosAprobados(): Promise<TestimonialAprobado[]> {
  return writeClient.fetch(
    `*[_type == "solicitudTestimonio" && estado == "aprobado"] | order(_createdAt desc)`,
    {},
    { perspective: 'previewDrafts' } as Parameters<typeof writeClient.fetch>[2],
  );
}

// ── Blog posts ────────────────────────────────────────────────────────────────

export interface SanityPost {
  _id: string;
  tipo: 'propio' | 'externo';
  title: string;
  slug?: { current: string };
  excerpt: string;
  content?: unknown[];
  image?: { asset: { _ref: string } };
  imagenUrl?: string;
  urlExterna?: string;
  date: string;
  category: string;
  readingTime?: number;
}

const PREVIEW = { perspective: 'previewDrafts' } as Parameters<typeof writeClient.fetch>[2];

export async function getPosts(): Promise<SanityPost[]> {
  return writeClient.fetch(`*[_type == "blogPost"] | order(date desc)`, {}, PREVIEW);
}

export async function getLatestPosts(count: number): Promise<SanityPost[]> {
  return writeClient.fetch(`*[_type == "blogPost"] | order(date desc) [0...$count]`, { count: count - 1 }, PREVIEW);
}

export async function getPostBySlug(slug: string): Promise<SanityPost | null> {
  return writeClient.fetch(
    `*[_type == "blogPost" && slug.current == $slug][0]`,
    { slug },
    PREVIEW,
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
