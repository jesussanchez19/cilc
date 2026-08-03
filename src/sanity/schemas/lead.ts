import { defineField, defineType } from 'sanity';

/**
 * Solicitudes recibidas por los formularios del sitio (contacto y cotización).
 *
 * Vivían en `data/leads.json`, escrito con `fs.writeFile`. Eso funcionaba en
 * local y fallaba entero en producción: el sistema de archivos de Vercel es de
 * solo lectura, así que la escritura lanzaba excepción, la petición terminaba
 * en 500 y no llegaba a enviarse ningún correo. Cada mensaje enviado desde el
 * sitio publicado se perdía sin dejar rastro.
 *
 * Todos los campos son de solo lectura: los crea el servidor desde
 * `/api/contact` y `/api/quote`. El tipo está en NO_CREABLES para que tampoco
 * aparezca en el botón + del Studio.
 */
export const leadSchema = defineType({
  name: 'lead',
  title: 'Solicitudes recibidas',
  type: 'document',
  fields: [
    defineField({
      name: 'type',
      title: 'Tipo',
      type: 'string',
      readOnly: true,
      options: {
        list: [
          { title: 'Contacto', value: 'contact' },
          { title: 'Cotización', value: 'quote' },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'name',  title: 'Nombre', type: 'string', readOnly: true, validation: (r) => r.required() }),
    // Sin `required`: los leads del chat de WhatsApp solo dejan nombre y
    // teléfono, y no se les inventa una dirección.
    defineField({ name: 'email', title: 'Email',  type: 'string', readOnly: true }),
    defineField({ name: 'phone', title: 'Teléfono', type: 'string', readOnly: true }),
    defineField({ name: 'program', title: 'Programa', type: 'string', readOnly: true }),
    defineField({ name: 'subject', title: 'Asunto',   type: 'string', readOnly: true }),
    defineField({ name: 'message', title: 'Mensaje',  type: 'text',   readOnly: true }),
    defineField({
      name: 'createdAt',
      title: 'Recibido el',
      type: 'datetime',
      readOnly: true,
      validation: (r) => r.required(),
    }),
  ],
  orderings: [
    {
      name: 'recientes',
      title: 'Más recientes primero',
      by: [{ field: 'createdAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'name', type: 'type', program: 'program', createdAt: 'createdAt' },
    prepare({ title, type, program, createdAt }) {
      const etiqueta = type === 'quote' ? '💰 Cotización' : '✉️ Contacto';
      const fecha = createdAt
        ? new Date(createdAt as string).toLocaleDateString('es-MX', {
            day: '2-digit', month: 'short', year: 'numeric',
          })
        : 'sin fecha';
      return {
        title: (title as string) ?? 'Sin nombre',
        subtitle: `${etiqueta}${program ? ` · ${program}` : ''} · ${fecha}`,
      };
    },
  },
});
