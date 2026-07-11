import { defineField, defineType } from 'sanity';

export const solicitudTestimonioSchema = defineType({
  name: 'solicitudTestimonio',
  title: 'Solicitudes de Testimonio',
  type: 'document',
  fields: [
    defineField({ name: 'nombre', title: 'Nombre', type: 'string' }),
    defineField({ name: 'email', title: 'Email (privado)', type: 'string' }),
    defineField({
      name: 'programa', title: 'Programa', type: 'string',
      options: { list: ['Idiomas', 'Au Pair', 'Años Académicos', 'Estudia y Trabaja', 'Formación Corporativa', 'Idiomas en Línea'] },
    }),
    defineField({ name: 'pais', title: 'País/Ciudad', type: 'string' }),
    defineField({ name: 'bandera', title: 'Bandera (emoji)', type: 'string', description: 'Ej: 🇨🇦 🇮🇪 🇬🇧 🇦🇺 🇺🇸 🇫🇷' }),
    defineField({ name: 'foto', title: 'Fotografía', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'texto', title: 'Testimonio', type: 'text', rows: 4 }),
    defineField({
      name: 'videoUrl', title: 'Video de YouTube', type: 'url',
      description: 'Ej: https://www.youtube.com/watch?v=xxxxxx',
      validation: (r) => r.uri({ scheme: ['https'] }),
    }),
    defineField({
      name: 'estado', title: 'Estado', type: 'string',
      initialValue: 'pendiente',
      options: { list: [
        { title: '⏳ Pendiente', value: 'pendiente' },
        { title: '✅ Aprobado', value: 'aprobado' },
        { title: '❌ Rechazado', value: 'rechazado' },
      ]},
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { title: 'nombre', subtitle: 'estado', media: 'foto' },
    prepare({ title, subtitle, media }) {
      const icons: Record<string, string> = { pendiente: '⏳', aprobado: '✅', rechazado: '❌' };
      return { title, subtitle: icons[subtitle] ? `${icons[subtitle]} ${subtitle}` : subtitle, media };
    },
  },
  orderings: [{ title: 'Más recientes', name: 'fechaDesc', by: [{ field: '_createdAt', direction: 'desc' }] }],
});
