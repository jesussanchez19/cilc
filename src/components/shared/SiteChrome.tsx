'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { esRutaDeAdministracion } from '@/lib/rutasAdmin';

/**
 * Oculta la cabecera, la navegación, las migas y el footer en las pantallas de
 * administración: el Studio y `/admin`.
 *
 * El Studio de Sanity es una aplicación completa con su propia interfaz, y el
 * panel de `/admin` es una herramienta interna. Si heredan el chrome del sitio
 * público pierden altura útil y aparecen encima el logo, el menú de programas y
 * el botón "Cotizar gratis", que ahí no llevan a ninguna parte — además del pie
 * de página de marketing, que en una pantalla corta se queda como una franja
 * negra enorme y vacía.
 *
 * Va en un único envoltorio en el layout raíz en vez de repetir la comprobación
 * de ruta dentro de cada componente, que es como estaba a medias.
 */
export default function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (esRutaDeAdministracion(pathname)) return null;
  return <>{children}</>;
}
