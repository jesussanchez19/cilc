import { client } from '@/lib/sanity/client';
import { writeClient } from '@/lib/sanity/writeClient';

/**
 * Almacén de las solicitudes que llegan por los formularios del sitio.
 *
 * Esto guardaba en `data/leads.json` con `fs.writeFile`. En local funcionaba;
 * en producción no podía funcionar nunca, porque el sistema de archivos de
 * Vercel es de solo lectura. La escritura lanzaba excepción, la excepción subía
 * sin capturar por el `Promise.all` de las rutas y la petición terminaba en 500
 * **antes** de enviar ningún correo: cada mensaje del formulario publicado se
 * perdía entero, sin aviso al administrador ni registro en ninguna parte.
 *
 * Ahora son documentos `lead` en Sanity, que es donde ya vive el resto del
 * contenido y persiste entre despliegues.
 */
export interface Lead {
  id: string;
  type: 'contact' | 'quote';
  name: string;
  /** Falta en los leads del chat de WhatsApp, que solo piden nombre y teléfono. */
  email?: string;
  phone?: string;
  program?: string;
  subject?: string;
  message: string;
  createdAt: string;
}

const CAMPOS = `"id": _id, type, name, email, phone, program, subject, message, createdAt`;

/**
 * Guarda la solicitud. **No lanza**: devuelve `null` si Sanity falla.
 *
 * Que el registro se pierda es malo, pero tumbar la petición es peor —es
 * justo lo que hacía la versión anterior—. El aviso por correo al administrador
 * es el canal que de verdad no puede fallar, así que un fallo aquí se registra
 * en el log y la ruta sigue con los envíos.
 */
export async function saveLead(lead: Omit<Lead, 'id' | 'createdAt'>): Promise<Lead | null> {
  const createdAt = new Date().toISOString();
  try {
    const doc = await writeClient.create({ _type: 'lead', ...lead, createdAt });
    return { ...lead, id: doc._id, createdAt };
  } catch (error) {
    console.error('[leads] no se pudo guardar la solicitud en Sanity:', error);
    return null;
  }
}

/** Todas las solicitudes, de la más reciente a la más antigua. */
export async function getLeads(): Promise<Lead[]> {
  try {
    return await client.fetch<Lead[]>(
      `*[_type == "lead"] | order(createdAt desc) { ${CAMPOS} }`,
    );
  } catch (error) {
    console.error('[leads] no se pudieron leer las solicitudes:', error);
    return [];
  }
}
