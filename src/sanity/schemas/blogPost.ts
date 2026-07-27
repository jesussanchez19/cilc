import { defineField, defineType } from 'sanity';
import { UrlImportInput } from '../components/UrlImportInput';

export const blogPostSchema = defineType({
  name: 'blogPost',
  title: 'Blog / Noticias',
  type: 'document',
  fields: [
    defineField({
      name: 'tipo', title: 'Tipo de publicación', type: 'string',
      initialValue: 'propio',
      options: {
        list: [
          { title: '✍️ Artículo propio (escrito aquí)', value: 'propio' },
          { title: '🔗 Enlace externo (noticia o publicación)', value: 'externo' },
        ],
        layout: 'radio',
      },
      validation: (r) => r.required(),
    }),

    defineField({
      name: 'urlExterna', title: 'URL de la publicación',
      type: 'url',
      description: 'Pega la URL y presiona el botón azul para importar título, resumen, imagen y fecha automáticamente.',
      components: { input: UrlImportInput },
      hidden: ({ document }) => document?.tipo !== 'externo',
      validation: (r) =>
        r.custom((value, ctx) => {
          const parent = ctx.parent as { tipo?: string } | undefined;
          if (parent?.tipo === 'externo' && !value) return 'Requerida para artículos externos';
          return true;
        }),
    }),

    defineField({
      name: 'title', title: 'Título', type: 'string',
      validation: (r) => r.required(),
    }),

    defineField({
      name: 'slug', title: 'URL (slug)', type: 'slug',
      options: { source: 'title', maxLength: 96 },
      hidden: ({ document }) => document?.tipo === 'externo',
      validation: (r) =>
        r.custom((value, ctx) => {
          const parent = ctx.parent as { tipo?: string } | undefined;
          if (parent?.tipo !== 'externo' && !(value as { current?: string } | undefined)?.current)
            return 'Requerido para artículos propios';
          return true;
        }),
    }),

    defineField({
      name: 'excerpt', title: 'Resumen', type: 'text', rows: 3,
      validation: (r) => r.required(),
    }),

    defineField({
      name: 'content', title: 'Contenido', type: 'array', of: [{ type: 'block' }],
      hidden: ({ document }) => document?.tipo === 'externo',
      validation: (r) =>
        r.custom((value, ctx) => {
          const parent = ctx.parent as { tipo?: string } | undefined;
          if (parent?.tipo !== 'externo' && (!value || (value as unknown[]).length === 0))
            return 'Requerido para artículos propios';
          return true;
        }),
    }),

    defineField({
      name: 'image', title: 'Imagen de portada', type: 'image',
      options: { hotspot: true },
      hidden: ({ document }) => document?.tipo === 'externo',
    }),

    defineField({
      name: 'imagenUrl', title: 'Imagen (se importa automáticamente)', type: 'string',
      description: 'Se llena al hacer clic en "⬇️ Importar datos". Puedes editarla manualmente si lo necesitas.',
      hidden: ({ document }) => document?.tipo !== 'externo',
    }),

    defineField({
      name: 'date', title: 'Fecha de publicación', type: 'date',
      validation: (r) => r.required(),
    }),

    defineField({
      name: 'category', title: 'Categoría', type: 'string',
      options: {
        list: [
          'Noticias CILC',
          'Vida en el extranjero',
          'Tips de viaje',
          'Au Pair',
          'Formación Corporativa',
        ],
      },
      validation: (r) => r.required(),
    }),

    defineField({
      name: 'readingTime', title: 'Tiempo de lectura (min)', type: 'number',
      hidden: ({ document }) => document?.tipo === 'externo',
    }),

    defineField({
      name: 'visible', title: 'Visible en el sitio', type: 'boolean',
      description: 'Desactiva para ocultar este artículo sin eliminarlo.',
      initialValue: true,
    }),
  ],

  preview: {
    select: { title: 'title', subtitle: 'category', media: 'image', tipo: 'tipo' },
    prepare({ title, subtitle, media, tipo }) {
      return {
        title: `${tipo === 'externo' ? '🔗' : '✍️'} ${title ?? '(sin título)'}`,
        subtitle,
        media,
      };
    },
  },
});
