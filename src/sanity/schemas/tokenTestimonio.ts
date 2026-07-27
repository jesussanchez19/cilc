import { defineField, defineType } from 'sanity';
import { TokenGeneratorInput } from '../components/TokenGeneratorInput';

export const tokenTestimonioSchema = defineType({
  name: 'tokenTestimonio',
  title: 'Tokens de Testimonio',
  type: 'document',
  fields: [
    defineField({
      name: 'label',
      title: 'Nombre del alumno',
      type: 'string',
      description: 'Escribe el nombre y presiona "Generar token" — los demás campos se llenan solos.',
      components: { input: TokenGeneratorInput },
      // Mismo tope que /api/admin/generar-token, que es quien crea el documento.
      validation: (r) => r.required().max(120),
    }),
    defineField({
      name: 'token',
      title: 'Token',
      type: 'string',
      readOnly: true,
      // Lo genera crypto.randomUUID() en el servidor. `readOnly` evita la
      // edición desde la interfaz, pero no desde la API: si el formato no es
      // UUID el enlace no valida y el alumno se queda sin poder responder.
      validation: (r) =>
        r.required().regex(
          /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
          { name: 'UUID' },
        ),
    }),
    defineField({
      name: 'url',
      title: 'URL para compartir',
      type: 'string',
      readOnly: true,
      description: 'Copia esta URL y envíala al estudiante',
      validation: (r) => r.required(),
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
