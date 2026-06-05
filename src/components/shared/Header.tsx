'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <Image src="/logo.png" alt="CILC Logo" width={120} height={40} className="h-10 w-auto object-contain" />
          </Link>

          {/* Search bar */}
          <div className="hidden md:flex flex-1 max-w-xs mx-8">
            <input
              type="text"
              placeholder="Buscar países, universidades..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
