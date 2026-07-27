import { defineField, defineType } from 'sanity';

/**
 * Estos documentos los crea el formulario público a través de /api/testimonio,
 * que ya valida con zod. Los límites de aquí son deliberadamente los mismos:
 * si las dos capas no coinciden, se puede guardar desde el Studio algo que la
 * API habría rechazado, y la página acaba mostrando datos que nadie previó.
 *
 * Referencia: `testimonioSchema` en app/api/testimonio/route.ts
 */
export const solicitudTestimonioSchema = defineType({
  name: 'solicitudTestimonio',
  title: 'Solicitudes de Testimonio',
  type: 'document',
  fields: [
    defineField({
      name: 'nombre',
      title: 'Nombre',
      type: 'string',
      validation: (r) => r.required().min(2).max(100),
    }),
    defineField({
      name: 'email',
      title: 'Email (privado)',
      type: 'string',
      description: 'No se publica. Sirve para contactar al alumno si hace falta.',
      validation: (r) => r.required().email().max(200),
    }),
    defineField({
      name: 'programa', title: 'Programa', type: 'string',
      options: { list: ['Idiomas', 'Au Pair', 'Años Académicos', 'Estudia y Trabaja', 'Formación Corporativa', 'Idiomas en Línea'] },
      validation: (r) => r.max(100),
    }),
    defineField({
      name: 'pais',
      title: 'País/Ciudad',
      type: 'string',
      validation: (r) => r.max(100),
    }),
    defineField({
      name: 'bandera',
      title: 'Bandera (emoji)',
      type: 'string',
      description: 'Ej: 🇨🇦 🇮🇪 🇬🇧 🇦🇺 🇺🇸 🇫🇷',
      // Una bandera son dos caracteres indicadores regionales, de ahí el margen.
      validation: (r) => r.max(8).warning('Se espera un solo emoji de bandera'),
    }),
    defineField({ name: 'foto', title: 'Fotografía', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'texto',
      title: 'Testimonio',
      type: 'text',
      rows: 4,
      validation: (r) => r.required().min(10).max(2000),
    }),
    defineField({
      name: 'calificacion', title: 'Calificación', type: 'number',
      description: 'Estrellas (1–5)',
      // `integer()` faltaba: un 4.5 pasaba el min/max y luego rompe el pintado
      // de estrellas, que repite el carácter tantas veces como diga el número.
      validation: (r) => r.min(1).max(5).integer(),
    }),
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
