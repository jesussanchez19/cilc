'use client';

import Link from 'next/link';
import Image from 'next/image';
import SearchBar from './SearchBar';

export default function Header() {
  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <Image src="/logo.png" alt="CILC Logo" width={120} height={40} className="h-10 w-auto object-contain" />
          </Link>

          {/* Barra de búsqueda global — visible en todas las páginas */}
          <div className="flex-1 max-w-xs">
            <SearchBar />
          </div>
        </div>
      </div>
    </header>
  );
}
