'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LABELS: Record<string, string> = {
  'idiomas':               'Idiomas',
  'au-pair':               'Au Pair',
  'anos-academicos':       'Años Académicos',
  'estudia-trabaja':       'Estudia y Trabaja',
  'formacion-corporativa': 'Formación Corporativa',
  'idiomas-en-linea':      'Idiomas en Línea',
  'countries':             'Destinos',
  'universities':          'Universidades',
  'contact':               'Contacto',
};

// Rutas donde el breadcrumb es visible
const VISIBLE_PREFIXES = [
  '/idiomas',
  '/au-pair',
  '/anos-academicos',
  '/estudia-trabaja',
  '/formacion-corporativa',
  '/idiomas-en-linea',
  '/countries',
  '/universities',
  '/contact',
];

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

  return (
    <nav
      aria-label="Breadcrumb"
      className="bg-gray-50 border-b border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        <ol className="flex items-center gap-1 flex-wrap text-sm">
          {crumbs.map((crumb, i) => {
            const isLast = i === crumbs.length - 1;
            return (
              <li key={crumb.href} className="flex items-center gap-1">
                {i > 0 && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3.5 h-3.5 text-gray-400 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                )}
                {isLast ? (
                  <span className="text-gray-500 font-medium capitalize">
                    {crumb.label}
                  </span>
                ) : (
                  <Link
                    href={crumb.href}
                    className="text-blue-600 hover:text-blue-800 hover:underline transition-colors capitalize"
                  >
                    {crumb.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
