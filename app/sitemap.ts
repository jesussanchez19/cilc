import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://cilc.mx';

const COUNTRY_IDS = [
  'usa', 'canada', 'uk', 'australia', 'germany', 'netherlands',
  'france', 'spain', 'newzealand', 'singapore', 'japan', 'italy',
  'sweden', 'ireland', 'switzerland', 'southkorea',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL,                            lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE_URL}/idiomas`,               lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/au-pair`,               lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/anos-academicos`,        lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/estudia-trabaja`,        lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/formacion-corporativa`,  lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/idiomas-en-linea`,       lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/destinos`,               lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/blog`,                   lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE_URL}/contact`,                lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.7 },
  ];

  const countryRoutes: MetadataRoute.Sitemap = COUNTRY_IDS.map((id) => ({
    url: `${BASE_URL}/destinos/${id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...countryRoutes, ...blogRoutes];
}
