'use client';

// ─────────────────────────────────────────────────────────────────────────────
//  Skeleton.tsx — loading states con la misma forma que el contenido final
//  Uso: importa el skeleton que necesites y muéstralo mientras carga el dato.
//  Todos usan animate-pulse de Tailwind: sin parpadeo, sin CLS.
// ─────────────────────────────────────────────────────────────────────────────

const BG = 'bg-gray-200';

// Bloque base animado
function Shimmer({ className = '' }: { className?: string }) {
  return <div className={`${BG} rounded animate-pulse ${className}`} />;
}

// ── Skeleton de tarjeta de programa (FeaturedPrograms) ────────────────────
export function ProgramCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border-2 border-gray-100 overflow-hidden">
      {/* Imagen cabecera */}
      <Shimmer className="h-44 w-full rounded-none" />
      <div className="p-6 space-y-3">
        <Shimmer className="h-5 w-3/4" />
        <Shimmer className="h-4 w-1/2" />
        <Shimmer className="h-3 w-full" />
        <Shimmer className="h-3 w-5/6" />
        <div className="flex justify-between pt-3 border-t border-gray-100">
          <Shimmer className="h-3 w-20" />
          <Shimmer className="h-3 w-16" />
        </div>
      </div>
    </div>
  );
}

export function ProgramGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProgramCardSkeleton key={i} />
      ))}
    </div>
  );
}

// ── Skeleton de tarjeta de artículo (blog / homepage) ────────────────────
export function ArticleCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
      <Shimmer className="h-48 w-full rounded-none" />
      <div className="p-5 space-y-3">
        <Shimmer className="h-4 w-16 rounded-full" />
        <Shimmer className="h-5 w-full" />
        <Shimmer className="h-4 w-5/6" />
        <Shimmer className="h-3 w-4/6" />
        <div className="flex gap-3 pt-3 border-t border-gray-100">
          <Shimmer className="h-3 w-20" />
          <Shimmer className="h-3 w-16" />
        </div>
      </div>
    </div>
  );
}

export function ArticleGridSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ArticleCardSkeleton key={i} />
      ))}
    </div>
  );
}

// ── Skeleton de tarjeta de país (CountryGrid) ────────────────────────────
export function CountryCardSkeleton() {
  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm">
      <Shimmer className="h-52 w-full rounded-none" />
      <div className="p-5 space-y-2">
        <Shimmer className="h-5 w-2/3" />
        <Shimmer className="h-3 w-full" />
        <Shimmer className="h-3 w-5/6" />
        <div className="space-y-1 pt-2">
          <Shimmer className="h-3 w-32" />
          <Shimmer className="h-3 w-28" />
          <Shimmer className="h-3 w-20" />
        </div>
      </div>
    </div>
  );
}

export function CountryGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <CountryCardSkeleton key={i} />
      ))}
    </div>
  );
}

// ── Skeleton de hero de página ───────────────────────────────────────────
export function HeroSkeleton() {
  return (
    <div className="relative min-h-[420px] flex items-end overflow-hidden bg-gray-200 animate-pulse">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 pt-32 w-full space-y-4">
        <Shimmer className="h-8 w-48 bg-gray-300" />
        <Shimmer className="h-12 w-3/4 bg-gray-300" />
        <Shimmer className="h-6 w-1/2 bg-gray-300" />
        <div className="flex gap-4 pt-2">
          <Shimmer className="h-12 w-40 bg-gray-300 rounded-xl" />
          <Shimmer className="h-12 w-40 bg-gray-300 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

// ── Skeleton de stats row (páginas de programa/país) ─────────────────────
export function StatsSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-${count} gap-4`}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-gray-100 rounded-2xl p-6 text-center space-y-2 animate-pulse">
          <Shimmer className="h-8 w-8 rounded-full mx-auto bg-gray-200" />
          <Shimmer className="h-6 w-16 mx-auto bg-gray-200" />
          <Shimmer className="h-3 w-20 mx-auto bg-gray-200" />
        </div>
      ))}
    </div>
  );
}

// ── Skeleton de testimonio ───────────────────────────────────────────────
export function TestimonialSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-md p-8 md:p-12 text-center space-y-4 animate-pulse">
      <Shimmer className="w-20 h-20 rounded-full mx-auto" />
      <Shimmer className="h-4 w-24 mx-auto rounded-full" />
      <div className="space-y-2 max-w-2xl mx-auto">
        <Shimmer className="h-4 w-full" />
        <Shimmer className="h-4 w-5/6 mx-auto" />
        <Shimmer className="h-4 w-4/6 mx-auto" />
      </div>
      <Shimmer className="h-5 w-32 mx-auto" />
      <Shimmer className="h-3 w-24 mx-auto" />
    </div>
  );
}

// ── Skeleton inline genérico (texto) ─────────────────────────────────────
export function TextSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2 animate-pulse">
      {Array.from({ length: lines }).map((_, i) => (
        <Shimmer key={i} className={`h-4 ${i === lines - 1 ? 'w-3/4' : 'w-full'}`} />
      ))}
    </div>
  );
}
