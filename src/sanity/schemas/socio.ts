import { defineField, defineType } from 'sanity';

export const socioSchema = defineType({
  name: 'socio',
  title: 'Socios y Miembros',
  type: 'document',
  fields: [
    defineField({ name: 'nombre', title: 'Nombre *', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'logo', title: 'Fotografía *', type: 'image', options: { hotspot: true }, validation: (r) => r.required() }),
    defineField({ name: 'alt', title: 'Texto alternativo *', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'url', title: 'Sitio web', type: 'url' }),
    defineField({ name: 'orden', title: 'Orden', type: 'number', initialValue: 0 }),
  ],
  preview: {
    select: { title: 'nombre', media: 'logo' },
  },
  orderings: [{ title: 'Orden', name: 'ordenAsc', by: [{ field: 'orden', direction: 'asc' }] }],
});
