import { createClient } from '@sanity/client';
import { config } from 'dotenv';
config({ path: '.env.local' });

const token = process.env.SANITY_API_WRITE_TOKEN;
if (!token) { console.error('❌ Falta SANITY_API_WRITE_TOKEN en .env.local'); process.exit(1); }

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'epcoien9',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token,
});

async function seed() {
  console.log('Inicializando configuración del sitio...');

  await client.createOrReplace({
    _type: 'configuracion',
    _id: 'configuracion-singleton',
    emailAdmin: 'info@estudiosenelextranjero.com.mx',
    telefonos: [
      { _key: 'tel1', display: '55 1894 4494', wa: '525518944494', esPrincipal: true },
      { _key: 'tel2', display: '55 7278 5966', wa: '525572785966', esPrincipal: false },
      { _key: 'tel3', display: '55 1218 2442', wa: '525512182442', esPrincipal: false },
    ],
    direccion: 'Av. Insurgentes Sur 863, Piso 7\nCol. Nápoles, C.P. 03810\nCDMX, México',
  });

  console.log('✅ Configuración creada. Ahora puedes editarla desde el Studio en ⚙️ Configuración del sitio.');
}

seed().catch((err) => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
