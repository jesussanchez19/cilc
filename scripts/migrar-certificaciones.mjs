/**
 * Sube al CMS el sello de acreditación que estaba escrito a mano en el pie.
 *
 * Hasta ahora el pie mostraba una sola imagen, `/images/logos/icef-badge.png`,
 * con su enlace incrustado en el componente. Al pasar las certificaciones a
 * Sanity ese sello se perdería si no se migra, así que esto lo sube tal cual.
 *
 * Idempotente: id fijo y `createIfNotExists`, así que volver a ejecutarlo no
 * duplica ni pisa lo que se edite después en el Studio.
 *
 *   node scripts/migrar-certificaciones.mjs
 */
import { createClient } from '@sanity/client';
import { config } from 'dotenv';
import { readFile } from 'fs/promises';
import path from 'path';

config({ path: '.env.local' });

const token = process.env.SANITY_API_WRITE_TOKEN;
if (!token) {
  console.error('❌ Falta SANITY_API_WRITE_TOKEN en .env.local');
  process.exit(1);
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token,
});

const CERTIFICACIONES = [
  {
    id: 'certificacion-icef',
    nombre: 'ICEF Accredited Trusted Agency #3797',
    archivo: 'public/images/logos/icef-badge.png',
    url: 'https://www.icef.com/agency/0012000000UPyYyAAL',
    orden: 0,
  },
];

for (const cert of CERTIFICACIONES) {
  const existe = await client.fetch('*[_id == $id][0]._id', { id: cert.id });
  if (existe) {
    console.log(`• ${cert.nombre}\n  ya estaba en el CMS, no se toca\n`);
    continue;
  }

  const binario = await readFile(path.join(process.cwd(), cert.archivo));
  const asset = await client.assets.upload('image', binario, {
    filename: path.basename(cert.archivo),
  });

  await client.createIfNotExists({
    _id: cert.id,
    _type: 'certificacion',
    nombre: cert.nombre,
    url: cert.url,
    orden: cert.orden,
    imagen: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } },
  });

  console.log(`• ${cert.nombre}\n  ✅ subida (${asset._id})\n`);
}

const total = await client.fetch('count(*[_type == "certificacion"])');
console.log(`certificaciones en el CMS: ${total}`);
