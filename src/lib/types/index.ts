export interface Country {
  id: string;
  name: string;
  code: string;
  flag: string;
  description: string;
  image: string;
  region: string;
  language: string;
  costOfLiving: number;       // costo mensual estimado en USD
  costOfLivingNote: string;   // desglose del costo
  universities: number;
  students: number;
  climate: string;
  visa: string;               // tipo de visa requerida para mexicanos
  visaNote: string;           // detalles del proceso de visa
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
