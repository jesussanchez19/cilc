import type { NextConfig } from "next";
import createMDX from '@next/mdx';

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
      { source: '/idiomas',               destination: '/programas/idiomas',               permanent: true },
      { source: '/au-pair',               destination: '/programas/au-pair',               permanent: true },
      { source: '/anos-academicos',       destination: '/programas/anos-academicos',       permanent: true },
      { source: '/estudia-trabaja',       destination: '/programas/estudia-trabaja',       permanent: true },
      { source: '/formacion-corporativa', destination: '/programas/formacion-corporativa', permanent: true },
      { source: '/idiomas-en-linea',      destination: '/programas/idiomas-en-linea',      permanent: true },
    ];
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: ['remark-frontmatter'],
  },
});

export default withMDX(nextConfig);
