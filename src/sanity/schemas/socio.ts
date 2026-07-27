import { defineField, defineType } from 'sanity';

export const socioSchema = defineType({
  name: 'socio',
  title: 'Socios y Miembros',
  type: 'document',
  fields: [
    // Los asteriscos de los títulos son manuales; Sanity ya marca los campos
    // obligatorios por su cuenta, así que se quitan para no duplicar la señal.
    defineField({
      name: 'nombre', title: 'Nombre', type: 'string',
      validation: (r) => r.required().min(2).max(100),
    }),
    defineField({
      name: 'logo', title: 'Fotografía', type: 'image', options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'cargo', title: 'Cargo', type: 'string',
      description: 'Ej: "Director de Ventas"',
      validation: (r) => r.required().max(100),
    }),
    defineField({
      name: 'url', title: 'Sitio web', type: 'url',
      // Se fuerza https: un enlace http en una página servida por https queda
      // marcado como no seguro por el navegador.
      validation: (r) => r.uri({ scheme: ['https'] }),
    }),
    defineField({
      name: 'orden', title: 'Orden', type: 'number', initialValue: 0,
      description: 'Menor número aparece antes.',
      validation: (r) => r.integer().min(0),
    }),
  ],
  preview: {
    select: { title: 'nombre', media: 'logo' },
  },
  orderings: [{ title: 'Orden', name: 'ordenAsc', by: [{ field: 'orden', direction: 'asc' }] }],
});
