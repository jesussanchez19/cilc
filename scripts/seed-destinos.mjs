import { createClient } from '@sanity/client';
import { createReadStream } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const client = createClient({
  projectId: 'epcoien9',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: 'skt3vPBsXZxGoCKXCpQizjLQ8r64dqP2hXj7YK6zSihwEwBGrVVT4PxHSCDCjauuOTEYPqLZXGAz6EHpIoqC62W4okjW9TKk8WXNoxrXQnOZYph7w9kLm6F8kiQ3B2EL4c2iQYlfuB877cE03NffKpjpbHzDexydv4uLGo6MckyANqgPPud0',
});

const destinos = [
  {
    id: 'usa',
    nombre: 'Estados Unidos',
    bandera: '🇺🇸',
    codigoISO: 'US',
    region: 'América del Norte',
    idioma: 'Inglés',
    descripcion: 'Líder mundial en educación superior con universidades de clase mundial.',
    universidades: 4000,
    estudiantes: 1000000,
    clima: 'Variado',
    costoVida: 1500,
    costoVidaNota: 'Renta ~$800, comida ~$300, transporte ~$150, extras ~$250',
    visa: 'Visa F-1 (estudiante)',
    visaNota: 'Mexicanos requieren visa F-1. Proceso en embajada de EE.UU. en México. Tiempo estimado: 4–8 semanas.',
    programas: ['idiomas', 'au-pair', 'formacion-corporativa'],
  },
  {
    id: 'canada',
    nombre: 'Canadá',
    bandera: '🇨🇦',
    codigoISO: 'CA',
    region: 'América del Norte',
    idioma: 'Inglés/Francés',
    descripcion: 'Educación de calidad con costo más accesible que EE.UU. y proceso migratorio favorable.',
    universidades: 200,
    estudiantes: 500000,
    clima: 'Templado/Frío',
    costoVida: 1200,
    costoVidaNota: 'Renta ~$600, comida ~$250, transporte ~$100, extras ~$250',
    visa: 'Student Permit',
    visaNota: 'Mexicanos requieren Student Permit. Trámite en línea ante IRCC. Tiempo estimado: 6–12 semanas.',
    programas: ['idiomas', 'anos-academicos', 'estudia-trabaja', 'formacion-corporativa'],
  },
  {
    id: 'uk',
    nombre: 'Reino Unido',
    bandera: '🇬🇧',
    codigoISO: 'GB',
    region: 'Europa',
    idioma: 'Inglés',
    descripcion: 'Universidades históricas con programas intensivos de 1-2 años.',
    universidades: 160,
    estudiantes: 700000,
    clima: 'Templado/Lluvioso',
    costoVida: 1300,
    costoVidaNota: 'Renta ~$700, comida ~$250, transporte ~$150, extras ~$200',
    visa: 'Student Visa (Tier 4)',
    visaNota: 'Mexicanos requieren Student Visa. Se tramita en el consulado británico. Tiempo estimado: 3–6 semanas.',
    programas: ['idiomas', 'anos-academicos', 'formacion-corporativa'],
  },
  {
    id: 'australia',
    nombre: 'Australia',
    bandera: '🇦🇺',
    codigoISO: 'AU',
    region: 'Oceanía',
    idioma: 'Inglés',
    descripcion: 'Destino popular para estudiantes con visas favorables y alta calidad de vida.',
    universidades: 43,
    estudiantes: 800000,
    clima: 'Cálido/Templado',
    costoVida: 1400,
    costoVidaNota: 'Renta ~$700, comida ~$300, transporte ~$150, extras ~$250',
    visa: 'Student Visa (Subclass 500)',
    visaNota: 'Mexicanos requieren Student Visa. Trámite en línea ante Departamento de Interior. Tiempo estimado: 4–6 semanas.',
    programas: ['idiomas', 'anos-academicos', 'estudia-trabaja', 'formacion-corporativa'],
  },
  {
    id: 'germany',
    nombre: 'Alemania',
    bandera: '🇩🇪',
    codigoISO: 'DE',
    region: 'Europa',
    idioma: 'Alemán/Inglés',
    descripcion: 'Educación de calidad con aranceles bajos o gratuitos en universidades públicas.',
    universidades: 430,
    estudiantes: 300000,
    clima: 'Templado',
    costoVida: 900,
    costoVidaNota: 'Renta ~$450, comida ~$200, transporte ~$100, extras ~$150',
    visa: 'Visa Nacional (Type D)',
    visaNota: 'Mexicanos requieren visa de estudiante tipo D. Se tramita en el consulado alemán. Tiempo estimado: 6–10 semanas.',
    programas: ['idiomas', 'au-pair', 'formacion-corporativa'],
  },
  {
    id: 'netherlands',
    nombre: 'Países Bajos',
    bandera: '🇳🇱',
    codigoISO: 'NL',
    region: 'Europa',
    idioma: 'Holandés/Inglés',
    descripcion: 'Muchos programas en inglés, excelente calidad de vida y hub empresarial europeo.',
    universidades: 35,
    estudiantes: 250000,
    clima: 'Templado',
    costoVida: 1100,
    costoVidaNota: 'Renta ~$550, comida ~$250, transporte ~$100, extras ~$200',
    visa: 'Visa Schengen / MVV',
    visaNota: 'Mexicanos requieren visa Schengen o MVV según duración. Se tramita en el consulado holandés.',
    programas: ['idiomas'],
  },
  {
    id: 'france',
    nombre: 'Francia',
    bandera: '🇫🇷',
    codigoISO: 'FR',
    region: 'Europa',
    idioma: 'Francés/Inglés',
    descripcion: 'Educación superior con historia, aranceles bajos y excelente calidad académica.',
    universidades: 200,
    estudiantes: 350000,
    clima: 'Templado',
    costoVida: 1000,
    costoVidaNota: 'Renta ~$500, comida ~$250, transporte ~$80, extras ~$170',
    visa: 'Visa de larga duración (VLS-TS)',
    visaNota: 'Mexicanos requieren visa de estudiante VLS-TS. Trámite con Campus France México. Tiempo estimado: 4–6 semanas.',
    programas: ['idiomas'],
  },
  {
    id: 'spain',
    nombre: 'España',
    bandera: '🇪🇸',
    codigoISO: 'ES',
    region: 'Europa',
    idioma: 'Español',
    descripcion: 'Opción ideal para latinoamericanos con idioma compartido y sin barreras culturales.',
    universidades: 80,
    estudiantes: 300000,
    clima: 'Mediterráneo',
    costoVida: 800,
    costoVidaNota: 'Renta ~$400, comida ~$200, transporte ~$80, extras ~$120',
    visa: 'Visa de estudiante',
    visaNota: 'Mexicanos requieren visa de estudiante tipo D. Se tramita en el consulado español. Tiempo estimado: 3–5 semanas.',
    programas: ['idiomas'],
  },
  {
    id: 'newzealand',
    nombre: 'Nueva Zelanda',
    bandera: '🇳🇿',
    codigoISO: 'NZ',
    region: 'Oceanía',
    idioma: 'Inglés',
    descripcion: 'Educación de calidad con paisajes naturales excepcionales y alta seguridad.',
    universidades: 8,
    estudiantes: 150000,
    clima: 'Templado',
    costoVida: 1300,
    costoVidaNota: 'Renta ~$650, comida ~$300, transporte ~$130, extras ~$220',
    visa: 'Student Visa',
    visaNota: 'Mexicanos requieren Student Visa. Trámite en línea ante Immigration New Zealand. Tiempo estimado: 4–8 semanas.',
    programas: ['idiomas', 'estudia-trabaja'],
  },
  {
    id: 'singapore',
    nombre: 'Singapur',
    bandera: '🇸🇬',
    codigoISO: 'SG',
    region: 'Asia',
    idioma: 'Inglés/Chino',
    descripcion: 'Centro educativo asiático con universidades de renombre mundial y cero corrupción.',
    universidades: 5,
    estudiantes: 80000,
    clima: 'Tropical',
    costoVida: 1600,
    costoVidaNota: 'Renta ~$800, comida ~$350, transporte ~$150, extras ~$300',
    visa: 'Student Pass',
    visaNota: 'Mexicanos requieren Student Pass. Tramitado por la institución educativa ante ICA. Tiempo estimado: 4–6 semanas.',
    programas: ['idiomas'],
  },
  {
    id: 'japan',
    nombre: 'Japón',
    bandera: '🇯🇵',
    codigoISO: 'JP',
    region: 'Asia',
    idioma: 'Japonés/Inglés',
    descripcion: 'Tecnología de vanguardia y cultura única con programas de becas muy competitivos.',
    universidades: 780,
    estudiantes: 200000,
    clima: 'Variado',
    costoVida: 1100,
    costoVidaNota: 'Renta ~$450, comida ~$300, transporte ~$150, extras ~$200',
    visa: 'Visa de estudiante (留学)',
    visaNota: 'Mexicanos requieren visa de estudiante. Se tramita en la embajada japonesa en México. Tiempo estimado: 4–8 semanas.',
    programas: ['idiomas', 'anos-academicos', 'formacion-corporativa'],
  },
  {
    id: 'italy',
    nombre: 'Italia',
    bandera: '🇮🇹',
    codigoISO: 'IT',
    region: 'Europa',
    idioma: 'Italiano/Inglés',
    descripcion: 'Hogar de algunas de las universidades más antiguas del mundo con bajo costo.',
    universidades: 100,
    estudiantes: 220000,
    clima: 'Mediterráneo',
    costoVida: 900,
    costoVidaNota: 'Renta ~$450, comida ~$220, transporte ~$80, extras ~$150',
    visa: 'Visa de estudiante (Type D)',
    visaNota: 'Mexicanos requieren visa de estudiante italiana. Se tramita en el consulado italiano. Tiempo estimado: 4–8 semanas.',
    programas: ['idiomas'],
  },
  {
    id: 'sweden',
    nombre: 'Suecia',
    bandera: '🇸🇪',
    codigoISO: 'SE',
    region: 'Europa',
    idioma: 'Sueco/Inglés',
    descripcion: 'Innovación y sostenibilidad en un ambiente académico de primer nivel europeo.',
    universidades: 50,
    estudiantes: 100000,
    clima: 'Frío/Templado',
    costoVida: 1200,
    costoVidaNota: 'Renta ~$600, comida ~$300, transporte ~$100, extras ~$200',
    visa: 'Permiso de residencia para estudios',
    visaNota: 'Mexicanos requieren permiso de residencia ante Migrationsverket. Tiempo estimado: 6–10 semanas.',
    programas: ['idiomas'],
  },
  {
    id: 'ireland',
    nombre: 'Irlanda',
    bandera: '🇮🇪',
    codigoISO: 'IE',
    region: 'Europa',
    idioma: 'Inglés',
    descripcion: 'Hub tecnológico europeo con sede de Google, Meta y Apple, e inglés nativo.',
    universidades: 34,
    estudiantes: 180000,
    clima: 'Oceánico',
    costoVida: 1400,
    costoVidaNota: 'Renta ~$700, comida ~$300, transporte ~$150, extras ~$250',
    visa: 'Study Visa',
    visaNota: 'Mexicanos requieren visa de estudiante irlandesa. Se tramita en el consulado irlandés. Tiempo estimado: 4–6 semanas.',
    programas: ['idiomas', 'anos-academicos', 'estudia-trabaja', 'formacion-corporativa'],
  },
  {
    id: 'switzerland',
    nombre: 'Suiza',
    bandera: '🇨🇭',
    codigoISO: 'CH',
    region: 'Europa',
    idioma: 'Alemán/Francés/Inglés',
    descripcion: 'Excelencia académica con universidades entre las mejores del mundo y alta calidad de vida.',
    universidades: 30,
    estudiantes: 90000,
    clima: 'Alpino/Templado',
    costoVida: 2000,
    costoVidaNota: 'Renta ~$1,000, comida ~$450, transporte ~$200, extras ~$350',
    visa: 'Visa de estudiante (Schengen D)',
    visaNota: 'Mexicanos requieren visa de estudiante Schengen tipo D. Se tramita en el consulado suizo. Tiempo estimado: 6–8 semanas.',
    programas: ['idiomas'],
  },
  {
    id: 'southkorea',
    nombre: 'Corea del Sur',
    bandera: '🇰🇷',
    codigoISO: 'KR',
    region: 'Asia',
    idioma: 'Coreano/Inglés',
    descripcion: 'Potencia educativa asiática con alta inversión en I+D, tecnología y cultura K-pop.',
    universidades: 400,
    estudiantes: 180000,
    clima: 'Variado',
    costoVida: 1000,
    costoVidaNota: 'Renta ~$400, comida ~$280, transporte ~$120, extras ~$200',
    visa: 'Visa de estudiante (D-2/D-4)',
    visaNota: 'Mexicanos requieren visa D-2 (universidad) o D-4 (idiomas). Se tramita en la embajada coreana. Tiempo estimado: 3–5 semanas.',
    programas: ['idiomas', 'anos-academicos', 'formacion-corporativa'],
  },
];

async function uploadImage(id) {
  const imgPath = resolve(__dirname, `../public/images/${id}.jpg`);
  try {
    const asset = await client.assets.upload('image', createReadStream(imgPath), {
      filename: `${id}.jpg`,
    });
    return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } };
  } catch {
    console.warn(`  ⚠ No se pudo subir imagen para ${id}`);
    return undefined;
  }
}

async function seed() {
  console.log(`Creando ${destinos.length} destinos en Sanity...`);

  // Eliminar destinos existentes para evitar duplicados
  const existing = await client.fetch(`*[_type == "destino"]._id`);
  if (existing.length > 0) {
    console.log(`Eliminando ${existing.length} documentos existentes...`);
    const tx = client.transaction();
    existing.forEach((id) => tx.delete(id));
    await tx.commit();
  }

  // Subir imágenes y crear documentos
  const tx = client.transaction();
  for (const d of destinos) {
    process.stdout.write(`  Subiendo imagen de ${d.nombre}...`);
    const imagen = await uploadImage(d.id);
    console.log(' ✓');

    tx.create({
      _type: 'destino',
      _id: `destino-${d.id}`,
      countryId: { _type: 'slug', current: d.id },
      nombre: d.nombre,
      bandera: d.bandera,
      codigoISO: d.codigoISO,
      region: d.region,
      idioma: d.idioma,
      descripcion: d.descripcion,
      universidades: d.universidades,
      estudiantes: d.estudiantes,
      clima: d.clima,
      costoVida: d.costoVida,
      costoVidaNota: d.costoVidaNota,
      visa: d.visa,
      visaNota: d.visaNota,
      programas: d.programas,
      ...(imagen && { imagen }),
    });
  }

  await tx.commit();
  console.log('\n✅ Todos los destinos creados correctamente.');
}

seed().catch((err) => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
