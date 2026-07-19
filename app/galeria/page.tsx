export const revalidate = 60;

import type { Metadata } from 'next';
import { getTestimoniosAprobados } from '@/lib/sanity/queries';
import { urlFor } from '@/lib/sanity/image';
import GaleriaGrid from './GaleriaGrid';

export const metadata: Metadata = {
  title: 'Galería de Experiencias',
  description:
    'Fotos reales de estudiantes mexicanos que vivieron su experiencia en el extranjero con CILC. Idiomas, Au Pair, Años Académicos y más.',
};

export default async function GaleriaPage() {
  const testimonios = await getTestimoniosAprobados();

  const fotos = testimonios
    .filter((t) => t.foto?.asset?._ref)
    .map((t) => ({
      id: t._id,
      src:     urlFor(t.foto!).width(600).height(600).fit('crop').url(),
      srcFull: urlFor(t.foto!).width(1200).height(900).fit('max').url(),
      nombre:  t.nombre  ?? '',
      programa: t.programa ?? '',
      pais:    t.pais    ?? '',
    }));

  return (
    <div style={{ background: 'var(--surface-2)', minHeight: '100vh' }}>

      {/* Hero */}
      <section className="relative py-24 overflow-hidden" style={{ background: 'var(--dark)' }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 55% 60% at 30% 50%, rgba(27,103,232,0.18) 0%, transparent 65%)' }} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 50% 60% at 75% 50%, rgba(227,30,36,0.13) 0%, transparent 65%)' }} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="badge badge-dark mb-5 animate-slide-up inline-flex"
            style={{ animationDelay: '0ms', animationFillMode: 'both' }}>
            Nuestros Estudiantes
          </span>
          <h1 className="text-5xl sm:text-6xl font-extrabold text-white mb-5 animate-slide-up"
            style={{ letterSpacing: '-0.04em', lineHeight: '1.04', animationDelay: '100ms', animationFillMode: 'both' }}>
            Galería de<br />
            <span className="gradient-text-light">Experiencias</span>
          </h1>
          <p className="text-slate-400 text-xl max-w-xl mx-auto leading-relaxed animate-slide-up"
            style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
            {fotos.length > 0
              ? `${fotos.length} foto${fotos.length !== 1 ? 's' : ''} compartidas por estudiantes que transformaron su futuro con CILC.`
              : 'Historias reales de estudiantes mexicanos que transformaron su futuro con CILC.'}
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(27,103,232,0.5) 30%, rgba(227,30,36,0.5) 70%, transparent)' }} />
      </section>

      {/* Grid con filtros, lightbox y animaciones */}
      <GaleriaGrid fotos={fotos} />

    </div>
  );
}
