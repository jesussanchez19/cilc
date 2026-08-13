'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import SearchBar from './SearchBar';
import BotonSubir from './BotonSubir';
import type { SearchDoc } from '@/lib/search';

export default function Header({ searchIndex = [] }: { searchIndex?: SearchDoc[] }) {
  const pathname = usePathname();

  const handleLogoClick = (e: React.MouseEvent) => {
    if (pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        background: '#060d1a',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      {/* Orbe azul — lado izquierdo, detrás del logo */}
      <div
        className="absolute pointer-events-none overflow-hidden inset-0 z-0"
        style={{ pointerEvents: 'none' }}
      >
      <div
        className="absolute pointer-events-none"
        style={{
          width: '320px',
          height: '120px',
          left: '-40px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'radial-gradient(ellipse, rgba(37,99,235,0.22) 0%, transparent 70%)',
          animation: 'orbFloat1 9s ease-in-out infinite',
        }}
      />

      {/* Orbe indigo — lado derecho */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: '280px',
          height: '120px',
          right: '-20px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'radial-gradient(ellipse, rgba(99,102,241,0.16) 0%, transparent 70%)',
          animation: 'orbFloat2 11s ease-in-out infinite',
        }}
      />

      </div>

      {/* Contenido */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 96 px de barra para un logo de 64.
            Con 80 el logo no llegaba a cortarse —quedaban 8 px arriba y abajo—
            pero llenaba tanto la barra que parecía recortado: la punta del
            avión casi tocaba el borde. Con 96 quedan 16 px por lado y el
            dibujo respira. Es lo único que fija esta altura; nada más calcula
            desplazamientos a partir de ella. */}
        <div className="flex items-center h-24 gap-4">

          {/* Logo */}
          <Link href="/" onClick={handleLogoClick} className="flex items-center shrink-0 group">
            {/* Las medidas declaradas eran 120×40, una proporción de 3:1 que no
                es la del archivo: logo.png es 1006×799, o sea 1.26:1. No se
                deformaba porque `object-contain` lo corrige, pero Next generaba
                la versión optimizada a partir de un tamaño equivocado. Ahora
                van en la proporción real y con holgura para pantallas retina. */}
            <Image
              src="/logo.png"
              alt="CILC Logo"
              width={202}
              height={160}
              priority
              className="h-16 w-auto object-contain transition-opacity duration-200 group-hover:opacity-80"
            />
          </Link>

          {/* CTA — centro */}
          <div className="flex-1 flex justify-center">
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2 rounded-full text-[13px] font-bold text-white whitespace-nowrap transition-all duration-200 hover:scale-105 hover:brightness-110"
              style={{
                background: 'linear-gradient(135deg, #2563eb 0%, #6366f1 100%)',
                boxShadow: '0 0 18px rgba(99,102,241,0.35), inset 0 1px 0 rgba(255,255,255,0.15)',
              }}
            >
              Cotizar gratis
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>

          {/* Search — derecha */}
          {/* Móvil: solo ícono lupa */}
          <Link
            href="/buscar"
            className="sm:hidden flex items-center justify-center w-10 h-10 rounded-xl shrink-0 transition-colors"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
            aria-label="Buscar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </Link>
          {/* Tablet/Desktop: barra completa */}
          <div className="hidden sm:block w-64 search-dark shrink-0">
            <SearchBar dark index={searchIndex} />
          </div>

          <BotonSubir />

        </div>
      </div>

      {/* Línea scanner al fondo — overflow-hidden es obligatorio: la animación
          desplaza la línea más allá del borde derecho y sin recorte ensancha
          el documento, lo que descoloca los elementos position:fixed. */}
      <div className="absolute bottom-0 left-0 right-0 h-px overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)' }}>
        <div
          className="absolute top-0 left-0 h-px"
          style={{
            width: '180px',
            background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.9), rgba(59,130,246,0.7), transparent)',
            animation: 'scanLine 5s ease-in-out infinite',
          }}
        />
      </div>
    </header>
  );
}
