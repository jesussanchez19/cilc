'use client';

'use client';

import Link from 'next/link';
import Image from 'next/image';

const PHONES = [
  { display: '55 1894 4494', wa: '525518944494' },
  { display: '55 7278 5966', wa: '525572785966' },
  { display: '55 1218 2442', wa: '525512182442' },
];

const NAV_COLS = [
  {
    title: 'Programas',
    links: [
      { href: '/idiomas',               label: 'Idiomas en el Extranjero' },
      { href: '/au-pair',               label: 'Au Pair' },
      { href: '/anos-academicos',       label: 'Años Académicos' },
      { href: '/estudia-trabaja',       label: 'Estudia y Trabaja' },
      { href: '/formacion-corporativa', label: 'Formación Corporativa' },
      { href: '/idiomas-en-linea',      label: 'Idiomas en Línea' },
    ],
  },
  {
    title: 'Explorar',
    links: [
      { href: '/destinos',      label: 'Destinos' },
      { href: '/countries',     label: 'Países' },
      { href: '/universities',  label: 'Universidades' },
      { href: '/blog',          label: 'Blog' },
      { href: '/galeria',       label: 'Galería' },
      { href: '/sobre-nosotros',label: 'Sobre Nosotros' },
    ],
  },
];

export default function Footer() {
  return (
    <footer style={{ background: 'var(--dark)', color: 'white', position: 'relative', overflow: 'hidden' }}>

      {/* Top glow */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.4), transparent)' }} />

      {/* Background accent */}
      <div className="absolute top-0 right-0 w-96 h-96 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top right, rgba(37,99,235,0.07) 0%, transparent 65%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-14">

          {/* Brand col */}
          <div className="md:col-span-4">
            {/* Logo */}
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/logo.png"
                alt="CILC Logo"
                width={110}
                height={38}
                className="h-10 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs mb-6">
              Más de 23 años ayudando a estudiantes mexicanos a estudiar en
              Canadá, Estados Unidos, Inglaterra e Irlanda.
            </p>

            {/* Social icons */}
            <div className="flex gap-3">
              {/* Facebook */}
              <a href="#" aria-label="Facebook"
                className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200 hover:scale-110"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              {/* Instagram */}
              <a href="#" aria-label="Instagram"
                className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200 hover:scale-110"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
                </svg>
              </a>
              {/* LinkedIn */}
              <a href="#" aria-label="LinkedIn"
                className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200 hover:scale-110"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              {/* YouTube */}
              <a href="#" aria-label="YouTube"
                className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200 hover:scale-110"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
                  <polygon fill="#0f172a" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Nav cols */}
          {NAV_COLS.map(({ title, links }) => (
            <div key={title} className="md:col-span-2">
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-5">
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-slate-400 hover:text-white text-sm transition-colors duration-150"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact col */}
          <div className="md:col-span-4">
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-5">
              Contacto
            </h3>
            <ul className="space-y-3 text-sm text-slate-400 mb-6">
              <li>
                <a href="mailto:info@estudiosenelextranjero.com.mx"
                  className="hover:text-white transition-colors duration-150 break-all">
                  info@estudiosenelextranjero.com.mx
                </a>
              </li>
              {PHONES.map((p) => (
                <li key={p.wa}>
                  <a
                    href={`https://wa.me/${p.wa}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-green-400 transition-colors duration-150"
                  >
                    +52 {p.display}
                  </a>
                </li>
              ))}
              <li className="pt-1 text-slate-500 leading-relaxed text-[13px]">
                Av. Insurgentes Sur 863 Piso 7,<br />
                Col. Nápoles, C.P. 03810<br />
                CDMX, México
              </li>
            </ul>

            <a
              href="https://wa.me/525518944494"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:scale-105"
              style={{ background: '#16a34a', boxShadow: '0 4px 16px rgba(22,163,74,0.3)' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-4 h-4" fill="white">
                <path d="M16.003 2.667C8.638 2.667 2.667 8.638 2.667 16c0 2.354.618 4.663 1.793 6.695L2.667 29.333l6.82-1.778A13.264 13.264 0 0016.003 29.333c7.365 0 13.33-5.97 13.33-13.333 0-7.362-5.965-13.333-13.33-13.333z" />
              </svg>
              WhatsApp
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-slate-600 text-xs">
              © 2026 Canadian &amp; International Language Centers. Todos los derechos reservados.
            </p>
            <div className="flex gap-6 text-xs">
              <Link href="/aviso-de-privacidad" className="text-slate-600 hover:text-slate-300 transition-colors duration-150">Aviso de Privacidad</Link>
              <Link href="/terminos-y-condiciones" className="text-slate-600 hover:text-slate-300 transition-colors duration-150">Términos y Condiciones</Link>
              <Link href="/contact" className="text-slate-600 hover:text-slate-300 transition-colors duration-150">Contacto</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
