import { getAverageRating, testimonials } from '@/lib/data/testimonials';

interface RatingProps {
  showCount?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function Rating({ showCount = true, size = 'md' }: RatingProps) {
  const average = getAverageRating();
  const count = testimonials.length;
  const fullStars = Math.floor(average);
  const hasHalf = average - fullStars >= 0.5;

  const starSizes = { sm: 'text-base', md: 'text-xl', lg: 'text-2xl' };
  const textSizes = { sm: 'text-xs', md: 'text-sm', lg: 'text-base' };

  return (
    <div className="flex items-center gap-2">
      <div className={`flex items-center gap-0.5 ${starSizes[size]}`}>
        {Array.from({ length: 5 }).map((_, i) => {
          if (i < fullStars) return <span key={i}>⭐</span>;
          if (i === fullStars && hasHalf) return <span key={i} className="opacity-60">⭐</span>;
          return <span key={i} className="opacity-20">⭐</span>;
        })}
      </div>
      <span className={`font-bold text-gray-900 ${textSizes[size]}`}>{average}</span>
      {showCount && (
        <span className={`text-gray-500 ${textSizes[size]}`}>
          (basado en {count} opiniones)
        </span>
      )}
    </div>
  );
}
