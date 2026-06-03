'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

const NAV_LINKS = [
  { href: '/',                      label: 'Inicio' },
  { href: '/idiomas',               label: 'Idiomas' },
  { href: '/au-pair',               label: 'Au Pair' },
  { href: '/anos-academicos',       label: 'Años Académicos' },
  { href: '/estudia-trabaja',       label: 'Estudia y Trabaja' },
  { href: '/formacion-corporativa', label: 'Formación Corporativa' },
  { href: '/idiomas-en-linea',      label: 'Idiomas en Línea' },
  { href: '/contact',               label: 'Contacto' },
];

export default function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setScrolled(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: '0px' }
    );

    observer.observe(nav);
    return () => observer.disconnect();
  }, []);

  // Cerrar menú al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Cerrar menú al navegar
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      {/* NAVBAR NORMAL */}
      <nav
        ref={navRef}
        className={`bg-blue-700 text-white transition-all duration-300 ${
          scrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
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

      {/* Hamburguesa aparece al hacer scroll */}
      <div
        ref={menuRef}
        className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
          scrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        {/* Menú se abre hacia arriba */}
        <div
          className={`absolute bottom-14 right-0 w-56 bg-blue-700 rounded-xl shadow-2xl overflow-hidden transition-all duration-200 origin-bottom-right ${
            menuOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0 pointer-events-none'
          }`}
        >
          {NAV_LINKS.map(({ href, label }) => {
            const active = href === '/' ? pathname === '/' : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`block px-4 py-3 text-sm font-medium transition border-l-4 ${
                  active
                    ? 'border-white text-white bg-blue-600'
                    : 'border-transparent text-blue-100 hover:text-white hover:bg-blue-600 hover:border-blue-300'
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>

        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          className="w-12 h-12 rounded-full bg-blue-700 text-white shadow-lg flex items-center justify-center hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-700"
        >
          {menuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>
    </>
  );
}
