import { Country } from '@/lib/types';
import Card from './Card';

interface CountryGridProps {
  countries: Country[];
  columns?: 2 | 3 | 4;
}

export default function CountryGrid({ countries, columns = 3 }: CountryGridProps) {
  const colClass =
    columns === 2
      ? 'md:grid-cols-2'
      : columns === 4
        ? 'md:grid-cols-2 lg:grid-cols-4'
        : 'md:grid-cols-2 lg:grid-cols-3';

  return (
    <div className={`grid grid-cols-1 ${colClass} gap-6`}>
      {countries.map((country) => (
        <Card
          key={country.id}
          title={`${country.flag} ${country.name}`}
          description={country.description}
          image={country.image}
          href={`/countries/${country.id}`}
          footer={
            <div className="space-y-1 text-xs">
              <div>🎓 {country.universities.toLocaleString()} universidades</div>
              <div>💰 ${country.costOfLiving.toLocaleString()}/mes est. vida</div>
              <div>🌍 {country.region}</div>
            </div>
          }
        />
      ))}
    </div>
  );
}
