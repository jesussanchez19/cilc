'use client';

import Link from 'next/link';

const PHONES = [
  { display: '55 1894 4494', wa: '525518944494' },
  { display: '55 7278 5966', wa: '525572785966' },
  { display: '55 1218 2442', wa: '525512182442' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div className="md:col-span-1">
            <div className="text-xl font-bold text-white mb-1">CILC</div>
            <div className="text-gray-400 text-xs mb-3">Canadian & International Language Centers</div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Más de 23 años ayudando a estudiantes mexicanos a estudiar en Canadá, Estados Unidos,
              Inglaterra e Irlanda.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">
              Navegación
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: '/', label: 'Inicio' },
                { href: '/countries', label: 'Países' },
                { href: '/universities', label: 'Universidades' },
                { href: '/contact', label: 'Contacto' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-gray-400 hover:text-white transition">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">
              Contacto
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a
                  href="mailto:info@estudiosenelextranjero.com.mx"
                  className="hover:text-white transition"
                >
                  info@estudiosenelextranjero.com.mx
                </a>
              </li>
              {PHONES.map((p) => (
                <li key={p.wa}>
                  <a
                    href={`https://wa.me/${p.wa}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-green-400 transition"
                  >
                    +52 {p.display}
                  </a>
                </li>
              ))}
              <li className="pt-1 leading-snug">
                Av. Insurgentes Sur 863 Piso 7,
                <br />
                Col. Nápoles, C.P. 03810
                <br />
                CDMX, México
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">
              Síguenos
            </h3>
            <div className="flex gap-4 mb-6">
              <a href="#" className="text-gray-400 hover:text-white transition" aria-label="Facebook">📘</a>
              <a href="#" className="text-gray-400 hover:text-white transition" aria-label="Instagram">📷</a>
              <a href="#" className="text-gray-400 hover:text-white transition" aria-label="LinkedIn">💼</a>
              <a href="#" className="text-gray-400 hover:text-white transition" aria-label="YouTube">▶️</a>
            </div>
            <a
              href="https://wa.me/525518944494"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition"
            >
              WhatsApp
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2026 Canadian & International Language Centers. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="#" className="text-gray-500 hover:text-white transition">Privacidad</Link>
            <Link href="#" className="text-gray-500 hover:text-white transition">Términos</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
