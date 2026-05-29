'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-4">Sobre Nosotros</h3>
            <p className="text-gray-400 text-sm">
              Portal informativo para estudiantes que desean estudiar en el extranjero.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Enlaces</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/countries" className="text-gray-400 hover:text-white transition">
                  Países
                </Link>
              </li>
              <li>
                <Link href="/universities" className="text-gray-400 hover:text-white transition">
                  Universidades
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-bold mb-4">Recursos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-white transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition">
                  Acerca de
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-lg font-bold mb-4">Síguenos</h3>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                📘
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                🐦
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                📷
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                💼
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 flex justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2026 Estudios en el Extranjero. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="#" className="text-gray-400 hover:text-white transition">
              Privacidad
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition">
              Términos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
