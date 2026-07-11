import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'CILC | Canadian & International Language Centers',
    short_name: 'CILC',
    description: 'Asesoría personalizada para estudiar en el extranjero. Más de 23 años de experiencia.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#1D4ED8',       // Azul CILC — aparece en la barra del navegador en Android Chrome
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
    categories: ['education', 'travel'],
    lang: 'es',
    dir: 'ltr',
  };
}
