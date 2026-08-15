'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PROGRAM_LABELS, PROGRAM_LEGACY_PATHS } from '@/lib/data/programs';

const LABELS: Record<string, string> = {
  // Los programas, desde la lista central.
  ...PROGRAM_LABELS,
  'programas':             'Programas',
  'countries':             'Destinos',
  'destinos':              'Destinos',
  'universities':          'Universidades',
  'contact':               'Contacto',
  'blog':                  'Blog',
  'buscar':                'Resultados',
};

/**
 * Dónde se muestran las migas.
 *
 * Faltaba `/programas`, así que las migas llevaban tiempo sin aparecer en
 * ninguna página de programa: la lista solo tenía las rutas antiguas
 * —`/idiomas`, `/au-pair`…— y `'/programas/idiomas'.startsWith('/idiomas')` es
 * falso. Las rutas viejas se conservan porque siguen redirigiendo.
 */
const VISIBLE_PREFIXES = [
  '/programas',
  ...PROGRAM_LEGACY_PATHS,
  '/countries', '/destinos', '/universities', '/contact', '/blog', '/buscar',
];

/* Estaba escrito a mano y apuntaba a `cilc.com.mx`, un dominio que no es de
   CILC. Iba dentro de los datos estructurados de las migas, así que a Google le
   estábamos declarando rutas de otro sitio. */
import { SITE_URL } from '@/lib/siteUrl';

export default function Breadcrumb() {
  const pathname = usePathname();

  const isVisible = VISIBLE_PREFIXES.some((prefix) => pathname.startsWith(prefix));
  if (!isVisible) return null;

  const segments = pathname.split('/').filter(Boolean);
  const crumbs = [
    { label: 'Inicio', href: '/' },
    ...segments.map((seg, i) => ({
      label: LABELS[seg] ?? seg.replace(/-/g, ' '),
      href: '/' + segments.slice(0, i + 1).join('/'),
    })),
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.label,
      item: `${SITE_URL}${crumb.href}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav
        aria-label="Breadcrumb"
        className="border-b"
        style={{ background: 'var(--surface-2)', borderColor: 'rgba(15,23,42,0.06)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
          <ol className="flex items-center gap-1 flex-wrap text-[13px]" itemScope itemType="https://schema.org/BreadcrumbList">
            {crumbs.map((crumb, i) => {
              const isLast = i === crumbs.length - 1;
              return (
                <li
                  key={crumb.href}
                  className="flex items-center gap-1"
                  itemProp="itemListElement"
                  itemScope
                  itemType="https://schema.org/ListItem"
                >
                  {i > 0 && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-slate-300 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                  {isLast ? (
                    <span className="text-slate-500 font-medium capitalize" itemProp="name" aria-current="page">
                      {crumb.label}
                    </span>
                  ) : (
                    <Link
                      href={crumb.href}
                      className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-150 capitalize"
                      itemProp="item"
                    >
                      <span itemProp="name">{crumb.label}</span>
                    </Link>
                  )}
                  <meta itemProp="position" content={String(i + 1)} />
                </li>
              );
            })}
          </ol>
        </div>
      </nav>
    </>
  );
}
