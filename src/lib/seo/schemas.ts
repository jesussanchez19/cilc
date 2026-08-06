import { SITE_URL as BASE_URL } from '@/lib/siteUrl';
const ORG_NAME = 'CILC — Canadian & International Language Centers';

/**
 * Ficha de la organización para los datos estructurados que lee Google.
 *
 * La dirección y el teléfono llegan desde el Studio. Estaban escritos a mano, y
 * eso ya había provocado que esta ficha declarase una dirección distinta de la
 * que mostraba la propia página de contacto: Google leía una y el visitante
 * veía otra.
 *
 * `addressLocality` y `addressRegion` siguen fijos porque el campo del CMS es
 * texto libre y no se puede descomponer con fiabilidad. Solo habría que
 * tocarlos si CILC se mudara fuera de la Ciudad de México.
 */
export function organizationSchema(opts?: { direccion?: string; telefono?: string }) {
  const lineas = (opts?.direccion ?? '').split('\n').map((l) => l.trim()).filter(Boolean);
  const codigoPostal = (opts?.direccion ?? '').match(/C\.?\s?P\.?\s*(\d{5})/i)?.[1];

  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: ORG_NAME,
    url: BASE_URL,
    logo: `${BASE_URL}/images/logo.png`,
    description:
      'Más de 23 años ayudando a estudiantes mexicanos a estudiar en el extranjero. Programas de idiomas, Au Pair, Años Académicos, Estudia y Trabaja, Formación Corporativa e Idiomas en Línea.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: lineas[0] ?? 'Av. Insurgentes Sur 863, Piso 7',
      addressLocality: 'Ciudad de México',
      addressRegion: 'CDMX',
      postalCode: codigoPostal ?? '03810',
      addressCountry: 'MX',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: opts?.telefono ?? '+52-55-1894-4494',
      contactType: 'customer service',
      availableLanguage: 'Spanish',
    },
    sameAs: [],
  };
}

export function programSchema(program: {
  id: string;
  title: string;
  description: string;
  duration: string;
  ageRange: string;
  countries: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: program.title,
    description: program.description,
    url: `${BASE_URL}/programas/${program.id}`,
    provider: {
      '@type': 'EducationalOrganization',
      name: ORG_NAME,
      url: BASE_URL,
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'blended',
      location: program.countries.join(', '),
    },
    typicalAgeRange: program.ageRange,
    timeRequired: program.duration,
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${BASE_URL}${item.url}`,
    })),
  };
}
