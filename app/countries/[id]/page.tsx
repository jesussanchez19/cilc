import { countries } from '@/lib/data/countries';
import { universities } from '@/lib/data/universities';
import CountryDetail from '@/components/shared/CountryDetail';
import { notFound } from 'next/navigation';

export default function CountryDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const country = countries.find((c) => c.id === params.id);
  if (!country) notFound();

  const countryUniversities = universities.filter((u) => u.countryCode === country.code);

  return <CountryDetail country={country} universities={countryUniversities} />;
}
