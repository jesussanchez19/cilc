'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="text-2xl font-bold text-blue-700">CILC</div>
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="text-xs font-semibold text-gray-700">Canadian & International</span>
              <span className="text-xs text-gray-500">Language Centers</span>
            </div>
          </Link>

          {/* Search bar */}
          <div className="hidden md:flex flex-1 max-w-xs mx-8">
            <input
              type="text"
              placeholder="Buscar países, universidades..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          {/* Navigation */}
          <nav className="flex gap-6 items-center">
            <Link href="/countries" className="text-gray-700 hover:text-blue-600 transition font-medium hidden md:block">
              Países
            </Link>
            <Link href="/universities" className="text-gray-700 hover:text-blue-600 transition font-medium hidden md:block">
              Universidades
            </Link>
            <a
              href="https://wa.me/525518944494"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1 text-gray-700 hover:text-green-600 transition font-medium"
            >
              <span>WhatsApp</span>
            </a>
            <Link
              href="/contact"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium text-sm"
            >
              Contactar
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
