import { defineField, defineType } from 'sanity';

export const testimonialSchema = defineType({
  name: 'testimonial',
  title: 'Testimonios',
  type: 'document',
  fields: [
    defineField({ name: 'nombre', title: 'Nombre', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'foto', title: 'Foto', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'programa', title: 'Programa', type: 'string',
      options: { list: ['Idiomas', 'Au Pair', 'Años Académicos', 'Estudia y Trabaja', 'Formación Corporativa', 'Idiomas en Línea'] },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'pais', title: 'País', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'bandera', title: 'Bandera (emoji)', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'rating', title: 'Calificación', type: 'number',
      options: { list: [1, 2, 3, 4, 5] },
      validation: (r) => r.required().min(1).max(5),
    }),
    defineField({ name: 'texto', title: 'Testimonio', type: 'text', rows: 4, validation: (r) => r.required() }),
  ],
  preview: {
    select: { title: 'nombre', subtitle: 'programa', media: 'foto' },
  },
});
