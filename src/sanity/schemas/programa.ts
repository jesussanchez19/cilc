import { defineField, defineType } from 'sanity';

const COLORES = [
  { title: 'Azul',     value: 'blue'   },
  { title: 'Rosa',     value: 'pink'   },
  { title: 'Morado',   value: 'purple' },
  { title: 'Verde',    value: 'green'  },
  { title: 'Naranja',  value: 'orange' },
  { title: 'Teal',     value: 'teal'   },
];

/**
 * Los límites de longitud están puestos según lo que soporta el diseño de la
 * página de programa: un título de 200 caracteres no rompe nada, pero desborda
 * el hero y se ve mal. Es más barato avisar aquí que descubrirlo en producción.
 *
 * `imagenHero` se queda opcional a propósito: ninguno de los programas
 * publicados la tiene, así que exigirla marcaría los seis como inválidos.
 * Lleva un aviso no bloqueante para que se note que falta.
 */
export const programaSchema = defineType({
  name: 'programa',
  title: 'Programas',
  type: 'document',
  groups: [
    { name: 'identidad', title: 'Identidad' },
    { name: 'media',     title: 'Imagen'    },
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
      validation: (R) => R.required().error('Sin slug la página del programa no existe'),
    }),
    defineField({
      name: 'titulo',
      title: 'Título',
      type: 'string',
      group: 'identidad',
      placeholder: 'Ej: Idiomas en el Extranjero',
      validation: (R) => R.required().max(80),
    }),
    defineField({
      name: 'subtitulo',
      title: 'Subtítulo',
      type: 'string',
      group: 'identidad',
      placeholder: 'Ej: Aprende un idioma en su país de origen',
      validation: (R) => R.max(160),
    }),
    defineField({
      name: 'icono',
      title: 'Ícono (emoji)',
      type: 'string',
      group: 'identidad',
      placeholder: 'Ej: 🗣️',
      // Un emoji puede ocupar varios caracteres (piel, banderas, ZWJ), de ahí
      // el margen de 8 en vez de 1 o 2.
      validation: (R) => R.max(8).warning('Se espera un solo emoji'),
    }),
    defineField({
      name: 'color',
      title: 'Color del programa',
      type: 'string',
      group: 'identidad',
      options: { list: COLORES },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'imagenHero',
      title: 'Imagen principal (Hero)',
      type: 'image',
      group: 'media',
      description: 'Imagen de fondo del encabezado de la página del programa.',
      options: { hotspot: true },
      validation: (R) => R.warning('Sin imagen, el encabezado se ve plano'),
    }),
    defineField({
      name: 'descripcion',
      title: 'Descripción',
      type: 'text',
      group: 'contenido',
      rows: 3,
      validation: (R) => R.required().max(500),
    }),
    defineField({
      name: 'duracion',
      title: 'Duración',
      type: 'string',
      group: 'contenido',
      placeholder: 'Ej: Desde 2 semanas',
      validation: (R) => R.max(60),
    }),
    defineField({
      name: 'rangoEdad',
      title: 'Rango de edad',
      type: 'string',
      group: 'contenido',
      placeholder: 'Ej: 12–60 años',
      validation: (R) => R.max(40),
    }),
    defineField({
      name: 'puntosClave',
      title: 'Puntos clave',
      type: 'array',
      group: 'contenido',
      of: [{
        type: 'object',
        name: 'puntoClave',
        fields: [
          defineField({
            name: 'texto',
            title: 'Punto',
            type: 'string',
            // Sin texto la lista pinta una viñeta vacía en la página.
            validation: (R) => R.required().max(120),
          }),
          defineField({
            name: 'tooltip',
            title: 'Descripción (tooltip)',
            type: 'text',
            rows: 2,
            validation: (R) => R.max(300),
          }),
        ],
        preview: {
          select: { title: 'texto' },
          prepare({ title }) { return { title: title ?? 'Sin texto' }; },
        },
      }],
    }),
    defineField({
      name: 'queIncluye',
      title: '¿Qué incluye?',
      type: 'array',
      group: 'contenido',
      of: [{
        type: 'object',
        name: 'queIncluyeItem',
        fields: [
          defineField({
            name: 'texto',
            title: 'Ítem',
            type: 'string',
            validation: (R) => R.required().max(120),
          }),
          defineField({
            name: 'tooltip',
            title: 'Descripción (tooltip)',
            type: 'text',
            rows: 2,
            validation: (R) => R.max(300),
          }),
        ],
        preview: {
          select: { title: 'texto' },
          prepare({ title }) { return { title: title ?? 'Sin texto' }; },
        },
      }],
    }),
    defineField({
      name: 'paraQuien',
      title: '¿Para quién es este programa?',
      type: 'text',
      group: 'contenido',
      rows: 2,
      validation: (R) => R.max(500),
    }),
    defineField({
      name: 'whatsappMessage',
      title: 'Mensaje de WhatsApp',
      type: 'text',
      group: 'contenido',
      rows: 2,
      placeholder: 'Hola, me interesa el programa de...',
      // Va en la URL de wa.me, y los mensajes muy largos se truncan al abrir.
      validation: (R) => R.max(300),
    }),
    defineField({
      name: 'secciones',
      title: 'Modalidades / Secciones',
      type: 'array',
      group: 'contenido',
      description: 'Tarjetas de modalidades que aparecen en la página (ej: Inglés en UK, Au Pair en USA, etc.)',
      of: [
        {
          type: 'object',
          name: 'seccion',
          title: 'Sección',
          fields: [
            defineField({
              name: 'titulo',
              title: 'Título',
              type: 'string',
              validation: (R) => R.required().max(100),
            }),
            defineField({
              name: 'descripcion',
              title: 'Descripción',
              type: 'text',
              rows: 2,
              validation: (R) => R.max(400),
            }),
            defineField({
              name: 'items',
              title: 'Puntos',
              type: 'array',
              of: [{ type: 'string', validation: (R) => R.max(150) }],
            }),
          ],
          preview: {
            select: { title: 'titulo' },
            prepare({ title }) { return { title: title ?? 'Sin título' }; },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'titulo', slug: 'programaId.current', icon: 'icono' },
    prepare({ title, slug, icon }) {
      return { title: `${icon ?? ''} ${title ?? slug ?? 'Sin título'}`.trim(), subtitle: slug };
    },
  },
});
