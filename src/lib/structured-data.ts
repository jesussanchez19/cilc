import { Program } from './data/programs';

const BASE_URL = 'https://www.estudiosenelextranjero.com.mx';

export function programJsonLd(program: Program) {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOccupationalProgram',
    name: program.title,
    description: program.description,
    url: `${BASE_URL}/${program.slug}`,
    provider: {
      '@type': 'EducationalOrganization',
      name: 'CILC - Canadian & International Language Centers',
      url: BASE_URL,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Arkansas No. Int. 22 No. Ext. B-203, Colonia Nápoles',
        addressLocality: 'Benito Juárez',
        addressRegion: 'Ciudad de México',
        postalCode: '03810',
        addressCountry: 'MX',
      },
      telephone: '+525518944494',
    },
    timeToComplete: program.duration,
    educationalProgramMode: 'onsite',
  };
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'CILC - Canadian & International Language Centers',
    alternateName: 'CILC',
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    foundingDate: '2001',
    description:
      'Agencia mexicana especializada en asesoría educativa internacional con más de 23 años de experiencia.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Arkansas No. Int. 22 No. Ext. B-203, Colonia Nápoles',
      addressLocality: 'Benito Juárez',
      addressRegion: 'Ciudad de México',
      postalCode: '03810',
      addressCountry: 'MX',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+525518944494',
      contactType: 'customer service',
      availableLanguage: 'Spanish',
    },
    sameAs: [BASE_URL],
  };
}
