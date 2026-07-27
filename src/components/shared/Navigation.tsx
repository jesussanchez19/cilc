'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

const NAV_LINKS = [
  { href: '/',                               label: 'Inicio' },
  { href: '/programas/idiomas',               label: 'Idiomas' },
  { href: '/programas/au-pair',               label: 'Au Pair' },
  { href: '/programas/anos-academicos',       label: 'Años Académicos' },
  { href: '/programas/estudia-trabaja',       label: 'Estudia y Trabaja' },
  { href: '/programas/formacion-corporativa', label: 'Formación Corporativa' },
  { href: '/programas/idiomas-en-linea',      label: 'Idiomas en Línea' },
  { href: '/contact',                         label: 'Contacto' },
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
      ([entry]) => { setScrolled(!entry.isIntersecting); },
      { threshold: 0, rootMargin: '0px' }
    );
    observer.observe(nav);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const isStudio = pathname.startsWith('/studio');

  return (
    <div style={{ display: isStudio ? 'none' : 'contents' }}>
      {/* NAVBAR */}
      <nav
        ref={navRef}
        className={`bg-[#0f1629] border-b border-white/6 transition-all duration-300 ${
          scrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-0.5 overflow-x-auto scrollbar-hide">
            {NAV_LINKS.map(({ href, label }, idx) => {
              const active = href === '/' ? pathname === '/' : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`
                    animate-slide-right
                    relative whitespace-nowrap px-3.5 py-3.5 text-[13px] font-medium
                    transition-all duration-200 shrink-0
                    ${active
                      ? 'text-white'
                      : 'text-slate-400 hover:text-slate-100'
                    }
                  `}
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  {label}
                  {active && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full"
                      style={{ background: 'linear-gradient(90deg, #1B67E8, #E31E24)' }} />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Floating menu on scroll */}
      <div
        ref={menuRef}
        className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
          scrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <div
          className={`absolute bottom-16 right-0 w-60 rounded-2xl overflow-hidden transition-all duration-200 origin-bottom-right shadow-[0_24px_64px_rgba(0,0,0,0.25)] ${
            menuOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0 pointer-events-none'
          }`}
          style={{ background: '#0f1629', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          {NAV_LINKS.map(({ href, label }) => {
            const active = href === '/' ? pathname === '/' : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`
                  flex items-center gap-2.5 px-4 py-3 text-[13px] font-medium
                  border-l-2 transition-all duration-150
                  ${active
                    ? 'text-white bg-white/6'
                    : 'border-transparent text-slate-400 hover:text-white hover:bg-white/4 hover:border-slate-600'
                  }
                `}
                style={active ? { borderLeftColor: '#1B67E8' } : {}}
              >
                {label}
              </Link>
            );
          })}
        </div>

        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
          style={{ background: 'linear-gradient(135deg, #1B67E8 0%, #E31E24 100%)', boxShadow: '0 8px 28px rgba(27,103,232,0.50)' }}
        >
          <div className="relative w-5 h-5 flex items-center justify-center">
            <span
              className={`absolute block w-4 h-0.5 bg-slate-300 transition-all duration-200 ${
                menuOpen ? 'rotate-45 translate-y-0' : '-translate-y-1.5'
              }`}
            />
            <span
              className={`absolute block w-4 h-0.5 bg-slate-300 transition-all duration-200 ${
                menuOpen ? 'opacity-0 translate-x-2' : 'opacity-100'
              }`}
            />
            <span
              className={`absolute block w-4 h-0.5 bg-slate-300 transition-all duration-200 ${
                menuOpen ? '-rotate-45 translate-y-0' : 'translate-y-1.5'
              }`}
            />
          </div>
        </button>
      </div>
    </div>
  );
}
