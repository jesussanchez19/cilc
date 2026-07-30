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

export function articleSchema(article: {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: article.image.startsWith('http')
      ? article.image
      : `${BASE_URL}${article.image}`,
    datePublished: article.date,
    dateModified: article.date,
    url: `${BASE_URL}/blog/${article.slug}`,
    author: {
      '@type': 'Organization',
      name: ORG_NAME,
      url: BASE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: ORG_NAME,
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/images/logo.png`,
      },
    },
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
