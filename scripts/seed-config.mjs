import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'epcoien9',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: 'skt3vPBsXZxGoCKXCpQizjLQ8r64dqP2hXj7YK6zSihwEwBGrVVT4PxHSCDCjauuOTEYPqLZXGAz6EHpIoqC62W4okjW9TKk8WXNoxrXQnOZYph7w9kLm6F8kiQ3B2EL4c2iQYlfuB877cE03NffKpjpbHzDexydv4uLGo6MckyANqgPPud0',
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
