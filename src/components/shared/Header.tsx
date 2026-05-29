'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="text-2xl font-bold text-blue-600">🌍 CILC</div>
            <span className="text-sm text-gray-600 hidden sm:block">
              Estudios en el Extranjero
            </span>
          </Link>

          {/* Search bar */}
          <div className="hidden md:flex flex-1 max-w-xs mx-8">
            <input
              type="text"
              placeholder="Buscar países, universidades..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Navigation links */}
          <nav className="flex gap-6 items-center">
            <Link
              href="/countries"
              className="text-gray-700 hover:text-blue-600 transition font-medium"
            >
              Países
            </Link>
            <Link
              href="/universities"
              className="text-gray-700 hover:text-blue-600 transition font-medium"
            >
              Universidades
            </Link>
            <Link
              href="/contact"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Contactar
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
