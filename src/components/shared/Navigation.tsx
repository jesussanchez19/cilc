'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { href: '/',                    label: 'Inicio' },
  { href: '/idiomas',             label: 'Idiomas' },
  { href: '/au-pair',             label: 'Au Pair' },
  { href: '/anos-academicos',     label: 'Años Académicos' },
  { href: '/estudia-trabaja',     label: 'Estudia y Trabaja' },
  { href: '/formacion-corporativa', label: 'Formación Corporativa' },
  { href: '/idiomas-en-linea',    label: 'Idiomas en Línea' },
  { href: '/contact',             label: 'Contacto' },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="bg-blue-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-1 overflow-x-auto scrollbar-hide">
          {NAV_LINKS.map(({ href, label }) => {
            const active = href === '/' ? pathname === '/' : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`whitespace-nowrap px-3 py-3 text-sm font-medium transition border-b-2 ${
                  active
                    ? 'border-white text-white'
                    : 'border-transparent text-blue-100 hover:text-white hover:border-blue-300'
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
