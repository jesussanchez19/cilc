'use client';

import { countries } from '@/lib/data/countries';
import { universities } from '@/lib/data/universities';

export default function StatsSection() {
  const totalUniversities = universities.length;
  const totalCountries = countries.length;
  const totalStudents = countries.reduce((sum, c) => sum + c.students, 0);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Countries */}
          <div className="text-center">
            <div className="text-5xl font-bold text-blue-600 mb-2">{totalCountries}+</div>
            <p className="text-gray-600 text-lg">Países disponibles</p>
            <p className="text-gray-500 text-sm mt-2">
              Explora oportunidades educativas en todo el mundo
            </p>
          </div>

          {/* Universities */}
          <div className="text-center">
            <div className="text-5xl font-bold text-green-600 mb-2">{totalUniversities}+</div>
            <p className="text-gray-600 text-lg">Universidades asociadas</p>
            <p className="text-gray-500 text-sm mt-2">
              Instituciones de educación superior de calidad
            </p>
          </div>

          {/* Students */}
          <div className="text-center">
            <div className="text-5xl font-bold text-purple-600 mb-2">
              {(totalStudents / 1000000).toFixed(1)}M+
            </div>
            <p className="text-gray-600 text-lg">Estudiantes internacionales</p>
            <p className="text-gray-500 text-sm mt-2">Que ya estudian en el extranjero</p>
          </div>
        </div>
      </div>
    </section>
  );
}
