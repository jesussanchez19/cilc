export interface Country {
  id: string;
  name: string;
  code: string;
  flag: string;
  description: string;
  image: string;
  region: string;
  language: string;
  costOfLiving: number;
  universities: number;
  students: number;
  climate: string;
}

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
