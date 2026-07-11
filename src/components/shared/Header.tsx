'use client';

import Link from 'next/link';
import Image from 'next/image';
import SearchBar from './SearchBar';

export default function Header() {
  return (
    <header className="glass sticky top-0 z-50 border-b border-white/40 shadow-[0_1px_32px_rgba(15,23,42,0.06)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-[68px] gap-4">
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <Image
              src="/logo.png"
              alt="CILC Logo"
              width={120}
              height={40}
              className="h-10 w-auto object-contain transition-opacity duration-200 group-hover:opacity-80"
            />
          </Link>

          <div className="flex-1 max-w-sm">
            <SearchBar />
          </div>
        </div>
      </div>
    </header>
  );
}
