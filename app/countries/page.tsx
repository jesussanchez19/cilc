export const dynamic = 'force-dynamic';
import { redirect } from 'next/navigation';

export default function CountriesRedirect() {
  redirect('/destinos');
}
