'use client';

import Link from 'next/link';

export default function HeroBanner() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Descubre el Mundo a Través de la Educación
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Explora miles de universidades y programas académicos en los mejores países del mundo.
            Tu futuro comienza aquí.
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
