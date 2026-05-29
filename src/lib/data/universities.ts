export interface University {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  website: string;
  ranking: number;
  specialties: string[];
  costPerYear: number;
  image: string;
}

export const universities: University[] = [
  {
    id: 'harvard',
    name: 'Harvard University',
    country: 'Estados Unidos',
    countryCode: 'US',
    website: 'https://www.harvard.edu',
    ranking: 1,
    specialties: ['Derecho', 'Negocios', 'Medicina', 'Ingeniería'],
    costPerYear: 60000,
    image: '/images/harvard.jpg',
  },
  {
    id: 'stanford',
    name: 'Stanford University',
    country: 'Estados Unidos',
    countryCode: 'US',
    website: 'https://www.stanford.edu',
    ranking: 2,
    specialties: ['Ingeniería', 'Tecnología', 'Negocios'],
    costPerYear: 62000,
    image: '/images/stanford.jpg',
  },
  {
    id: 'mit',
    name: 'Massachusetts Institute of Technology',
    country: 'Estados Unidos',
    countryCode: 'US',
    website: 'https://www.mit.edu',
    ranking: 3,
    specialties: ['Ingeniería', 'Ciencias', 'Tecnología'],
    costPerYear: 61000,
    image: '/images/mit.jpg',
  },
  {
    id: 'oxford',
    name: 'University of Oxford',
    country: 'Reino Unido',
    countryCode: 'GB',
    website: 'https://www.ox.ac.uk',
    ranking: 4,
    specialties: ['Humanidades', 'Ciencias', 'Derecho'],
    costPerYear: 35000,
    image: '/images/oxford.jpg',
  },
  {
    id: 'cambridge',
    name: 'University of Cambridge',
    country: 'Reino Unido',
    countryCode: 'GB',
    website: 'https://www.cam.ac.uk',
    ranking: 5,
    specialties: ['Ciencias', 'Matemáticas', 'Humanidades'],
    costPerYear: 36000,
    image: '/images/cambridge.jpg',
  },
  {
    id: 'caltech',
    name: 'California Institute of Technology',
    country: 'Estados Unidos',
    countryCode: 'US',
    website: 'https://www.caltech.edu',
    ranking: 6,
    specialties: ['Ingeniería', 'Ciencias'],
    costPerYear: 63000,
    image: '/images/caltech.jpg',
  },
  {
    id: 'eth-zurich',
    name: 'ETH Zurich',
    country: 'Suiza',
    countryCode: 'CH',
    website: 'https://www.ethz.ch',
    ranking: 7,
    specialties: ['Ingeniería', 'Tecnología', 'Ciencias'],
    costPerYear: 1500,
    image: '/images/eth-zurich.jpg',
  },
  {
    id: 'ntu-singapore',
    name: 'Nanyang Technological University',
    country: 'Singapur',
    countryCode: 'SG',
    website: 'https://www.ntu.edu.sg',
    ranking: 8,
    specialties: ['Ingeniería', 'Negocios', 'Tecnología'],
    costPerYear: 25000,
    image: '/images/ntu-singapore.jpg',
  },
  {
    id: 'nus-singapore',
    name: 'National University of Singapore',
    country: 'Singapur',
    countryCode: 'SG',
    website: 'https://www.nus.edu.sg',
    ranking: 9,
    specialties: ['Ingeniería', 'Negocios', 'Medicina'],
    costPerYear: 24000,
    image: '/images/nus-singapore.jpg',
  },
  {
    id: 'anu-australia',
    name: 'Australian National University',
    country: 'Australia',
    countryCode: 'AU',
    website: 'https://www.anu.edu.au',
    ranking: 10,
    specialties: ['Ciencias', 'Humanidades', 'Ingeniería'],
    costPerYear: 30000,
    image: '/images/anu-australia.jpg',
  },
];
