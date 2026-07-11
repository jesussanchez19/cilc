import { defineField, defineType } from 'sanity';

export const teamMemberSchema = defineType({
  name: 'teamMember',
  title: 'Equipo',
  type: 'document',
  fields: [
    defineField({ name: 'nombre', title: 'Nombre', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'cargo', title: 'Cargo', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'foto', title: 'Foto', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'bio', title: 'Descripción', type: 'text', rows: 3 }),
  ],
  preview: {
    select: { title: 'nombre', subtitle: 'cargo', media: 'foto' },
  },
});
