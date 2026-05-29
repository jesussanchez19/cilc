'use client';

import Link from 'next/link';

export default function HeroBanner() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-blue-200 text-sm font-semibold uppercase tracking-widest mb-4">
            Canadian & International Language Centers · +23 años de experiencia
          </p>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Estudios en el Extranjero que Transforman tu Futuro
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Asesoría personalizada para estudiar en Canadá, Estados Unidos, Inglaterra e Irlanda.
            Sin costo, sin compromiso.
          </p>
          <div className="flex gap-4">
            <Link
              href="/countries"
              className="px-8 py-4 bg-white text-blue-600 rounded-lg font-bold hover:bg-blue-50 transition inline-block"
            >
              Explorar Países
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 bg-blue-700 text-white rounded-lg font-bold hover:bg-blue-900 transition inline-block border-2 border-white"
            >
              Contacta con Nosotros
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
