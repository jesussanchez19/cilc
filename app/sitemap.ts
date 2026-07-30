import { MetadataRoute } from 'next';
import { getDestinosListado, getPosts } from '@/lib/sanity/queries';
import { programs } from '@/lib/data/programs';

import { SITE_URL as BASE_URL } from '@/lib/siteUrl';

/**
 * Respaldo por si Sanity no responde al generar el sitemap. La lista buena
 * viene del CMS: con esta hardcodeada, un destino creado en el Studio nunca
 * llegaba al sitemap y Google no lo descubría.
 */
const COUNTRY_IDS_RESPALDO = [
  'usa', 'canada', 'uk', 'australia', 'germany', 'netherlands',
  'france', 'spain', 'newzealand', 'singapore', 'japan', 'italy',
  'sweden', 'ireland', 'switzerland', 'southkorea',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, destinos] = await Promise.all([getPosts(), getDestinosListado()]);

  const countryIds = destinos.length > 0
    ? destinos.map((d) => d.countryId)
    : COUNTRY_IDS_RESPALDO;

  const ahora = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL,                                lastModified: ahora, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE_URL}/destinos`,                  lastModified: ahora, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/blog`,                      lastModified: ahora, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE_URL}/testimonios`,               lastModified: ahora, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/sobre-nosotros`,            lastModified: ahora, changeFrequency: 'yearly',  priority: 0.7 },
    { url: `${BASE_URL}/universities`,              lastModified: ahora, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/galeria`,                   lastModified: ahora, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/contact`,                   lastModified: ahora, changeFrequency: 'yearly',  priority: 0.7 },
    { url: `${BASE_URL}/aviso-de-privacidad`,       lastModified: ahora, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE_URL}/terminos-y-condiciones`,     lastModified: ahora, changeFrequency: 'yearly',  priority: 0.3 },
  ];

  /**
   * Los programas se listan por su ruta actual, `/programas/<slug>`.
   *
   * Antes figuraban las seis rutas antiguas —`/idiomas`, `/au-pair`…— que desde
   * la migración a ruta dinámica responden con una redirección 308. Los enlaces
   * viejos siguen funcionando, pero un sitemap debe anunciar la dirección final:
   * si no, el buscador gasta rastreo en saltos y las marca como excluidas.
   *
   * Los slugs salen de `programs`, la misma lista que usa `generateStaticParams`
   * de la página, así que no hay dos sitios donde mantenerlos.
   */
  const programRoutes: MetadataRoute.Sitemap = programs.map((p) => ({
    url: `${BASE_URL}/programas/${p.slug}`,
    lastModified: ahora,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  const countryRoutes: MetadataRoute.Sitemap = countryIds.map((id) => ({
    url: `${BASE_URL}/destinos/${id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  /**
   * Solo las entradas propias y con slug.
   *
   * Las de tipo `externo` son enlaces a artículos alojados en otros sitios: no
   * tienen página aquí, así que anunciarlas seria mandar al buscador a un 404.
   */
  const blogRoutes: MetadataRoute.Sitemap = posts
    .filter((post) => post.tipo !== 'externo' && post.slug?.current)
    .map((post) => ({
      url: `${BASE_URL}/blog/${post.slug!.current}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));

  return [...staticRoutes, ...programRoutes, ...countryRoutes, ...blogRoutes];
}
