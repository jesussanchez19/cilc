import { defineField, defineType } from 'sanity';

export const tokenTestimonioSchema = defineType({
  name: 'tokenTestimonio',
  title: 'Tokens de Testimonio',
  type: 'document',
  fields: [
    defineField({
      name: 'label',
      title: 'Para quién es',
      type: 'string',
      description: 'Ej: "María García — Au Pair Alemania 2024"',
    }),
    defineField({
      name: 'token',
      title: 'Token',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'url',
      title: 'URL para compartir',
      type: 'string',
      readOnly: true,
      description: 'Copia esta URL y envíala al estudiante',
    }),
    defineField({
      name: 'usado',
      title: 'Usado',
      type: 'boolean',
      readOnly: true,
      initialValue: false,
    }),
    defineField({
      name: 'creadoEn',
      title: 'Creado el',
      type: 'datetime',
      readOnly: true,
    }),
    defineField({
      name: 'usadoEn',
      title: 'Usado el',
      type: 'datetime',
      readOnly: true,
    }),
  ],
  preview: {
    select: { title: 'label', token: 'token', usado: 'usado' },
    prepare({ title, token, usado }) {
      return {
        title: title ?? 'Sin etiqueta',
        subtitle: usado ? '✅ Ya fue usado' : `🔗 ${(token as string | undefined)?.slice(0, 18) ?? ''}…`,
      };
    },
  },
});
