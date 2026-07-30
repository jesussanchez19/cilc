import { SITE_URL as BASE_URL } from '@/lib/siteUrl';
const ORG_NAME = 'CILC — Canadian & International Language Centers';

export function organizationSchema() {
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
      streetAddress: 'Av. Insurgentes Sur 863, Piso 7',
      addressLocality: 'Ciudad de México',
      addressRegion: 'CDMX',
      postalCode: '03810',
      addressCountry: 'MX',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+52-55-1894-4494',
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
