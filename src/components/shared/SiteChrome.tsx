'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

/**
 * Oculta la cabecera, la navegación, las migas y el footer dentro del Studio.
 *
 * El Studio de Sanity es una aplicación completa con su propia interfaz: si
 * hereda el chrome del sitio público, pierde altura útil y se ve el logo y el
 * botón "Cotizar gratis" encima del panel de administración.
 *
 * Va en un único envoltorio en el layout raíz en vez de repetir la
 * comprobación de ruta dentro de cada componente, que es como estaba a medias:
 * Navigation y WhatsAppButton se ocultaban solos, y Header, Breadcrumb y
 * Footer no.
 */
export default function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith('/studio')) return null;
  return <>{children}</>;
}
