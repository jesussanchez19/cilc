import { defineField, defineType } from 'sanity';

export const teamMemberSchema = defineType({
  name: 'teamMember',
  title: 'Equipo',
  type: 'document',
  fields: [
    defineField({
      name: 'nombre', title: 'Nombre', type: 'string',
      validation: (r) => r.required().min(2).max(100),
    }),
    defineField({
      name: 'cargo', title: 'Cargo', type: 'string',
      validation: (r) => r.required().max(100),
    }),
    defineField({
      name: 'foto', title: 'Foto', type: 'image', options: { hotspot: true },
      // La ficha del equipo se ve rota sin retrato, pero no se bloquea la
      // publicación por ello: puede añadirse después.
      validation: (r) => r.warning('Sin foto la ficha se ve incompleta'),
    }),
    defineField({
      name: 'bio', title: 'Descripción', type: 'text', rows: 3,
      validation: (r) => r.max(500),
    }),
  ],
  preview: {
    select: { title: 'nombre', subtitle: 'cargo', media: 'foto' },
  },
});
