import { notFound } from 'next/navigation';
import TestimonioForm from '@/components/shared/TestimonioForm';

interface Props {
  searchParams: Promise<{ acceso?: string }>;
}

export const metadata = { robots: 'noindex, nofollow' };

export default async function DarTestimonioPage({ searchParams }: Props) {
  const { acceso } = await searchParams;

  if (!acceso || acceso !== process.env.TESTIMONIAL_ACCESS_TOKEN) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-xl">
        <div className="text-center mb-10">
          <span className="badge mb-4 inline-flex">Tu experiencia</span>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-3" style={{ letterSpacing: '-0.03em' }}>
            Comparte tu testimonio
          </h1>
          <p className="text-slate-500 text-base leading-relaxed">
            Cuéntanos cómo fue tu experiencia estudiando en el extranjero con CILC.
            Tu historia puede inspirar a otros estudiantes.
          </p>
        </div>
        <div className="premium-card p-8">
          <TestimonioForm />
        </div>
      </div>
    </main>
  );
}
