'use client';

import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="bg-blue-50 border-b border-blue-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-8 py-3">
          <Link
            href="/"
            className="text-blue-700 hover:text-blue-900 font-medium transition text-sm"
          >
            Inicio
          </Link>
          <Link
            href="/countries"
            className="text-blue-700 hover:text-blue-900 font-medium transition text-sm"
          >
            Países
          </Link>
          <Link
            href="/universities"
            className="text-blue-700 hover:text-blue-900 font-medium transition text-sm"
          >
            Universidades
          </Link>
          <Link
            href="/programs"
            className="text-blue-700 hover:text-blue-900 font-medium transition text-sm"
          >
            Programas
          </Link>
          <Link
            href="/blog"
            className="text-blue-700 hover:text-blue-900 font-medium transition text-sm"
          >
            Blog
          </Link>
          <Link
            href="/contact"
            className="text-blue-700 hover:text-blue-900 font-medium transition text-sm"
          >
            Contacto
          </Link>
        </div>
      </div>
    </nav>
  );
}
