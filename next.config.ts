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
