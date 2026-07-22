export const revalidate = 60;

import Image from 'next/image';
import { getTestimoniosAprobados } from '@/lib/sanity/queries';
import { urlFor } from '@/lib/sanity/image';
import AnimateIn from '@/components/shared/AnimateIn';
import LazySection from '@/components/shared/LazySection';

function StarRating({ value = 5 }: { value?: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} className="w-4 h-4" fill={s <= value ? '#f59e0b' : '#e2e8f0'} viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match?.[1] ?? null;
}

export default async function TestimoniosPage() {
  const testimonios = await getTestimoniosAprobados();
  const conVideo = testimonios.filter((t) => t.videoUrl);
  const sinVideo = testimonios.filter((t) => !t.videoUrl);

  return (
    <main className="min-h-screen bg-white">

      {/* Hero */}
      <section className="py-20 text-center" style={{ background: 'var(--dark)' }}>
        <AnimateIn animation="up" delay={0}>
          <span className="badge badge-dark mb-5 inline-flex">Testimonios</span>
        </AnimateIn>
        <AnimateIn animation="up" delay={80}>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4"
            style={{ letterSpacing: '-0.03em' }}>
            Lo que dicen{' '}
            <span className="gradient-text-light">nuestros estudiantes</span>
          </h1>
        </AnimateIn>
        <AnimateIn animation="up" delay={160}>
          <p className="text-slate-400 text-lg max-w-xl mx-auto px-4">
            Historias reales de quienes estudiaron en el extranjero con CILC.
          </p>
        </AnimateIn>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Videos */}
        {conVideo.length > 0 && (
          <LazySection animation="fade">
            <div className="mb-16">
              <AnimateIn animation="up">
                <h2 className="text-2xl font-bold text-slate-900 mb-8" style={{ letterSpacing: '-0.02em' }}>
                  Videos
                </h2>
              </AnimateIn>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {conVideo.map((t, i) => {
                  const videoId = getYouTubeId(t.videoUrl!);
                  return (
                    <AnimateIn key={t._id} animation="blur" delay={i * 100}>
                      <div className="premium-card overflow-hidden h-full">
                        {videoId && (
                          <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
                            <iframe
                              src={`https://www.youtube.com/embed/${videoId}`}
                              title={`Testimonio de ${t.nombre}`}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="absolute inset-0 w-full h-full"
                            />
                          </div>
                        )}
                        <div className="p-5">
                          <div className="flex items-center gap-3 mb-3">
                            {t.foto && (
                              <Image
                                src={urlFor(t.foto).width(80).height(80).fit('crop').url()}
                                alt={t.nombre}
                                width={40} height={40}
                                className="w-10 h-10 rounded-full object-cover shrink-0"
                              />
                            )}
                            <div>
                              <p className="font-bold text-slate-900 text-sm">{t.nombre}</p>
                              <p className="text-xs text-blue-600 flex items-center gap-1">
                                {t.bandera && (
                                  // eslint-disable-next-line @next/next/no-img-element
                                  <img src={`https://flagcdn.com/w20/${t.bandera}.png`} alt={t.pais} width={14} height={10} className="h-3 w-auto rounded-sm inline-block" />
                                )}
                                {t.pais} · {t.programa}
                              </p>
                              {t.calificacion && <StarRating value={t.calificacion} />}
                            </div>
                          </div>
                          {t.texto && (
                            <p className="text-slate-500 text-sm leading-relaxed italic">&ldquo;{t.texto}&rdquo;</p>
                          )}
                        </div>
                      </div>
                    </AnimateIn>
                  );
                })}
              </div>
            </div>
          </LazySection>
        )}

        {/* Sin video */}
        {sinVideo.length > 0 && (
          <LazySection animation="slide">
            <div>
              <AnimateIn animation="up">
                <h2 className="text-2xl font-bold text-slate-900 mb-8" style={{ letterSpacing: '-0.02em' }}>
                  Experiencias
                </h2>
              </AnimateIn>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sinVideo.map((t, i) => (
                  <AnimateIn key={t._id} animation="blur" delay={i * 80}>
                    <div className="premium-card p-6 h-full">
                      <div className="flex items-center gap-3 mb-4">
                        {t.foto ? (
                          <Image
                            src={urlFor(t.foto).width(80).height(80).fit('crop').url()}
                            alt={t.nombre}
                            width={48} height={48}
                            className="w-12 h-12 rounded-full object-cover shrink-0"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                            {t.bandera ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={`https://flagcdn.com/w40/${t.bandera}.png`} alt={t.pais} width={28} height={20} className="h-5 w-auto rounded-sm" />
                            ) : (
                              <span className="text-xl">🌍</span>
                            )}
                          </div>
                        )}
                        <div>
                          <p className="font-bold text-slate-900 text-sm">{t.nombre}</p>
                          <p className="text-xs text-blue-600 flex items-center gap-1">
                            {t.bandera && (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={`https://flagcdn.com/w20/${t.bandera}.png`} alt={t.pais} width={14} height={10} className="h-3 w-auto rounded-sm inline-block" />
                            )}
                            {t.pais} · {t.programa}
                          </p>
                        </div>
                      </div>
                      {t.calificacion && (
                        <div className="mb-3">
                          <StarRating value={t.calificacion} />
                        </div>
                      )}
                      <p className="text-slate-500 text-sm leading-relaxed italic">&ldquo;{t.texto}&rdquo;</p>
                    </div>
                  </AnimateIn>
                ))}
              </div>
            </div>
          </LazySection>
        )}

        {testimonios.length === 0 && (
          <p className="text-center text-slate-400 py-20">Aún no hay testimonios publicados.</p>
        )}
      </div>
    </main>
  );
}
