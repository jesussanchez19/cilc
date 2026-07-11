import { defineField, defineType } from 'sanity';

export const blogPostSchema = defineType({
  name: 'blogPost',
  title: 'Blog',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Título', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug', title: 'URL (slug)', type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'excerpt', title: 'Resumen', type: 'text', rows: 3, validation: (r) => r.required() }),
    defineField({ name: 'content', title: 'Contenido', type: 'array', of: [{ type: 'block' }], validation: (r) => r.required() }),
    defineField({ name: 'image', title: 'Imagen de portada', type: 'image', options: { hotspot: true }, validation: (r) => r.required() }),
    defineField({ name: 'date', title: 'Fecha de publicación', type: 'date', validation: (r) => r.required() }),
    defineField({
      name: 'category', title: 'Categoría', type: 'string',
      options: { list: ['Vida en el extranjero', 'Tips de viaje', 'Noticias CILC'] },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'readingTime', title: 'Tiempo de lectura (min)', type: 'number', validation: (r) => r.required().min(1) }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'image' },
  },
});
