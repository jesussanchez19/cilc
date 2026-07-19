import { defineField, defineType } from 'sanity';

const PROGRAMAS = [
  { title: 'Idiomas',              value: 'idiomas' },
  { title: 'Au Pair',              value: 'au-pair' },
  { title: 'Años Académicos',      value: 'anos-academicos' },
  { title: 'Estudia y Trabaja',    value: 'estudia-trabaja' },
  { title: 'Formación Corporativa',value: 'formacion-corporativa' },
  { title: 'Idiomas en Línea',     value: 'idiomas-en-linea' },
];

export const programaSchema = defineType({
  name: 'programa',
  title: 'Programas',
  type: 'document',
  fields: [
    defineField({
      name: 'programaId',
      title: 'Programa',
      type: 'string',
      options: { list: PROGRAMAS },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'descripcion',
      title: 'Descripción',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'duracion',
      title: 'Duración',
      type: 'string',
      placeholder: 'Ej: Desde 2 semanas',
    }),
    defineField({
      name: 'rangoEdad',
      title: 'Rango de edad',
      type: 'string',
      placeholder: 'Ej: 12–60 años',
    }),
    defineField({
      name: 'puntosClave',
      title: 'Puntos clave',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Lista de características destacadas del programa',
    }),
    defineField({
      name: 'queIncluye',
      title: '¿Qué incluye?',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Servicios y gestiones que CILC realiza',
    }),
    defineField({
      name: 'paraQuien',
      title: '¿Para quién es este programa?',
      type: 'text',
      rows: 2,
      placeholder: 'Ej: Estudiantes y profesionales que quieren dominar un idioma en su ambiente natural.',
    }),
  ],
  preview: {
    select: { title: 'programaId' },
    prepare({ title }) {
      const label = PROGRAMAS.find((p) => p.value === title)?.title ?? title;
      return { title: label, subtitle: 'Programa' };
    },
  },
});
