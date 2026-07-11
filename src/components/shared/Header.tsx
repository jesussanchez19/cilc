'use client';

import Link from 'next/link';
import Image from 'next/image';
import SearchBar from './SearchBar';

export default function Header() {
  return (
    <>
      {/* ── Franja de color superior ── */}
      <div
        className="h-0.75 w-full"
        style={{
          background: 'linear-gradient(90deg, #2563eb 0%, #6366f1 40%, #0ea5e9 70%, #2563eb 100%)',
          backgroundSize: '200% 100%',
          animation: 'gradientX 4s linear infinite',
        }}
      />

      {/* ── Header principal ── */}
      <header
        className="sticky top-0 z-50"
        style={{
          background: 'rgba(255,255,255,0.88)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          borderBottom: '1px solid rgba(37,99,235,0.10)',
          boxShadow: '0 1px 0 rgba(37,99,235,0.06), 0 4px 24px rgba(15,23,42,0.05)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16.5 gap-4">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 shrink-0 group">
              <Image
                src="/logo.png"
                alt="CILC Logo"
                width={120}
                height={40}
                className="h-10 w-auto object-contain transition-opacity duration-200 group-hover:opacity-75"
              />
            </Link>

            {/* Search */}
            <div className="flex-1 max-w-sm">
              <SearchBar />
            </div>

          </div>
        </div>
      </header>
    </>
  );
}
