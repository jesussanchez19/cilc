import { defineField, defineType } from 'sanity';

const COLORES = [
  { title: 'Azul',     value: 'blue'   },
  { title: 'Rosa',     value: 'pink'   },
  { title: 'Morado',   value: 'purple' },
  { title: 'Verde',    value: 'green'  },
  { title: 'Naranja',  value: 'orange' },
  { title: 'Teal',     value: 'teal'   },
];

export const programaSchema = defineType({
  name: 'programa',
  title: 'Programas',
  type: 'document',
  groups: [
    { name: 'identidad', title: 'Identidad' },
    { name: 'contenido', title: 'Contenido' },
  ],
  fields: [
    defineField({
      name: 'programaId',
      title: 'Slug del programa',
      type: 'slug',
      group: 'identidad',
      description: 'Identificador único para la URL. Ej: "idiomas", "nuevo-programa"',
      options: { source: 'titulo', maxLength: 60 },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'titulo',
      title: 'Título',
      type: 'string',
      group: 'identidad',
      placeholder: 'Ej: Idiomas en el Extranjero',
    }),
    defineField({
      name: 'subtitulo',
      title: 'Subtítulo',
      type: 'string',
      group: 'identidad',
      placeholder: 'Ej: Aprende un idioma en su país de origen',
    }),
    defineField({
      name: 'icono',
      title: 'Ícono (emoji)',
      type: 'string',
      group: 'identidad',
      placeholder: 'Ej: 🗣️',
    }),
    defineField({
      name: 'color',
      title: 'Color del programa',
      type: 'string',
      group: 'identidad',
      options: { list: COLORES },
    }),
    defineField({
      name: 'descripcion',
      title: 'Descripción',
      type: 'text',
      group: 'contenido',
      rows: 3,
    }),
    defineField({
      name: 'duracion',
      title: 'Duración',
      type: 'string',
      group: 'contenido',
      placeholder: 'Ej: Desde 2 semanas',
    }),
    defineField({
      name: 'rangoEdad',
      title: 'Rango de edad',
      type: 'string',
      group: 'contenido',
      placeholder: 'Ej: 12–60 años',
    }),
    defineField({
      name: 'puntosClave',
      title: 'Puntos clave',
      type: 'array',
      group: 'contenido',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'queIncluye',
      title: '¿Qué incluye?',
      type: 'array',
      group: 'contenido',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'paraQuien',
      title: '¿Para quién es este programa?',
      type: 'text',
      group: 'contenido',
      rows: 2,
    }),
    defineField({
      name: 'whatsappMessage',
      title: 'Mensaje de WhatsApp',
      type: 'text',
      group: 'contenido',
      rows: 2,
      placeholder: 'Hola, me interesa el programa de...',
    }),
  ],
  preview: {
    select: { title: 'titulo', slug: 'programaId.current', icon: 'icono' },
    prepare({ title, slug, icon }) {
      return { title: `${icon ?? ''} ${title ?? slug ?? 'Sin título'}`.trim(), subtitle: slug };
    },
  },
});
