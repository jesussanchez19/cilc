import type { NextConfig } from "next";
import createMDX from '@next/mdx';
import { programs } from './src/lib/data/programs';

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
];

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  /**
   * Sin el indicador flotante de Next.
   *
   * Se dibuja en la esquina inferior izquierda, que es justo donde está el
   * botón de WhatsApp: se le pone encima y se come el clic. Con eso el test de
   * analítica que abre el chat fallaba de forma intermitente, y en local nadie
   * podía pulsar ese botón a mano.
   *
   * Solo afecta al desarrollo: comprobado que en el sitio publicado el
   * indicador no se sirve, así que ningún visitante lo ve. Los errores de
   * compilación y de ejecución se siguen mostrando igual.
   */
  devIndicators: false,
  // Permite abrir el dev server desde el celular por IP de red local.
  // Sin esto Next devuelve 403 en /_next/* y la página nunca hidrata.
  allowedDevOrigins: ['192.168.68.*', '192.168.1.*', '192.168.0.*', '10.0.0.*'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: 'flagcdn.com' },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      { source: '/countries',    destination: '/destinos',    permanent: true },
      { source: '/countries/:id',destination: '/destinos/:id',permanent: true },
      /* Las rutas antiguas de cada programa, sin `/programas`. Se derivan de la
         misma lista que todo lo demás para que un programa nuevo traiga su
         redirección sin que haya que acordarse de añadirla. */
      ...programs.map((p) => ({
        source: `/${p.slug}`,
        destination: `/programas/${p.slug}`,
        permanent: true,
      })),
      /* Rutas del sitio anterior, el que vive hoy en
         estudiosenelextranjero.com.mx sobre Apache. Cuando el dominio apunte
         aqui, los enlaces que Google ya tiene indexados y los que la gente
         haya guardado seguirian existiendo pero darian 404.

         Los identificadores `secNNNN` no significan nada por si mismos: se
         comprobo uno por uno abriendo cada pagina del sitio viejo y leyendo su
         contenido, no adivinando por el orden del menu. */
      { source: '/index.php',    destination: '/',                                 permanent: true },
      { source: '/contacto.php', destination: '/contact',                          permanent: true },
      { source: '/sec1473',      destination: '/programas/idiomas',                permanent: true },
      { source: '/sec1474',      destination: '/programas/au-pair',                permanent: true },
      { source: '/sec1475',      destination: '/programas/anos-academicos',        permanent: true },
      { source: '/sec1476',      destination: '/programas/estudia-trabaja',        permanent: true },
      { source: '/sec1477',      destination: '/programas/formacion-corporativa',  permanent: true },
      { source: '/sec1478',      destination: '/programas/idiomas-en-linea',       permanent: true },
      { source: '/sec1479',      destination: '/testimonios',                      permanent: true },
    ];
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: ['remark-frontmatter'],
  },
});

export default withMDX(nextConfig);
