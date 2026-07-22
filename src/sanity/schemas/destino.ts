import { defineField, defineType } from 'sanity';

const PROGRAMAS = [
  { title: 'Idiomas',               value: 'idiomas' },
  { title: 'Au Pair',               value: 'au-pair' },
  { title: 'Años Académicos',       value: 'anos-academicos' },
  { title: 'Estudia y Trabaja',     value: 'estudia-trabaja' },
  { title: 'Formación Corporativa', value: 'formacion-corporativa' },
  { title: 'Idiomas en Línea',      value: 'idiomas-en-linea' },
];

export const destinoSchema = defineType({
  name: 'destino',
  title: 'Destinos',
  type: 'document',
  groups: [
    { name: 'basico',    title: 'Información básica', default: true },
    { name: 'detalles', title: 'Detalles' },
    { name: 'programas', title: 'Programas' },
  ],
  fields: [
    // ── Identificador ──────────────────────────────────────────────────────────
    defineField({
      name: 'paisExistente',
      title: 'Actualizar país del catálogo (opcional)',
      type: 'string',
      group: 'basico',
      description: 'Si quieres editar un país que ya está en el sitio, selecciónalo aquí y se llenará el ID automáticamente. Para un país nuevo déjalo vacío.',
      options: {
        list: [
          { title: '🇺🇸 Estados Unidos',  value: 'usa' },
          { title: '🇨🇦 Canadá',          value: 'canada' },
          { title: '🇬🇧 Reino Unido',     value: 'uk' },
          { title: '🇦🇺 Australia',       value: 'australia' },
          { title: '🇩🇪 Alemania',        value: 'germany' },
          { title: '🇳🇱 Países Bajos',    value: 'netherlands' },
          { title: '🇫🇷 Francia',         value: 'france' },
          { title: '🇪🇸 España',          value: 'spain' },
          { title: '🇳🇿 Nueva Zelanda',   value: 'newzealand' },
          { title: '🇸🇬 Singapur',        value: 'singapore' },
          { title: '🇯🇵 Japón',           value: 'japan' },
          { title: '🇮🇹 Italia',          value: 'italy' },
          { title: '🇸🇪 Suecia',          value: 'sweden' },
          { title: '🇮🇪 Irlanda',         value: 'ireland' },
          { title: '🇨🇭 Suiza',           value: 'switzerland' },
          { title: '🇰🇷 Corea del Sur',   value: 'southkorea' },
        ],
      },
    }),
    defineField({
      name: 'countryId',
      title: 'ID del destino (slug)',
      type: 'slug',
      group: 'basico',
      description: 'Se llena automáticamente al elegir un país del catálogo. Para un país nuevo escríbelo manualmente: malta, belgica, dubai… Sin espacios ni acentos.',
      options: {
        source: (doc: Record<string, string>) => doc.paisExistente || doc.nombre || '',
        maxLength: 50,
      },
      validation: (r) => r.required(),
    }),

    // ── Información básica ─────────────────────────────────────────────────────
    defineField({
      name: 'nombre',
      title: 'Nombre del país',
      type: 'string',
      group: 'basico',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'codigoISO',
      title: 'Código ISO (2 letras)',
      type: 'string',
      group: 'basico',
      description: 'Ej: CA, US, IE, GB',
    }),
    defineField({
      name: 'region',
      title: 'Región',
      type: 'string',
      group: 'basico',
      options: {
        list: [
          'América del Norte', 'América del Sur', 'Europa',
          'Asia', 'Oceanía', 'África', 'Medio Oriente',
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'idioma',
      title: 'Idioma principal',
      type: 'string',
      group: 'basico',
      description: 'Ej: Inglés, Francés/Inglés, Alemán',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'descripcion',
      title: 'Descripción breve',
      type: 'text',
      rows: 3,
      group: 'basico',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'imagen',
      title: 'Imagen del destino',
      type: 'image',
      group: 'basico',
      options: { hotspot: true },
      description: 'Imagen principal. Si no se sube, se usa la imagen local del sitio.',
    }),

    // ── Detalles ───────────────────────────────────────────────────────────────
    defineField({
      name: 'universidades',
      title: 'Número de universidades',
      type: 'number',
      group: 'detalles',
      validation: (r) => r.min(0),
    }),
    defineField({
      name: 'estudiantes',
      title: 'Estudiantes internacionales',
      type: 'number',
      group: 'detalles',
      validation: (r) => r.min(0),
    }),
    defineField({
      name: 'clima',
      title: 'Clima',
      type: 'string',
      group: 'detalles',
      description: 'Ej: Templado, Tropical, Frío/Templado',
    }),
    defineField({
      name: 'costoVida',
      title: 'Costo de vida mensual (USD)',
      type: 'number',
      group: 'detalles',
      validation: (r) => r.min(0),
    }),
    defineField({
      name: 'costoVidaNota',
      title: 'Desglose del costo de vida',
      type: 'string',
      group: 'detalles',
      description: 'Ej: Renta ~$600, comida ~$250, transporte ~$100, extras ~$250',
    }),
    defineField({
      name: 'visa',
      title: 'Tipo de visa',
      type: 'string',
      group: 'detalles',
      description: 'Ej: Student Permit, Visa F-1, Study Visa',
    }),
    defineField({
      name: 'visaNota',
      title: 'Detalles de visa',
      type: 'text',
      rows: 3,
      group: 'detalles',
    }),

    // ── Programas ──────────────────────────────────────────────────────────────
    defineField({
      name: 'programas',
      title: 'Programas disponibles',
      type: 'array',
      of: [{ type: 'string' }],
      options: { list: PROGRAMAS, layout: 'grid' },
      group: 'programas',
      description: 'Programas que CILC ofrece en este destino',
      validation: (r) => r.required().min(1),
    }),
  ],
  preview: {
    select: { title: 'nombre', subtitle: 'programas', media: 'imagen' },
    prepare({ title, subtitle, media }) {
      const count = Array.isArray(subtitle) ? subtitle.length : 0;
      return {
        title: title ?? 'Sin nombre',
        subtitle: `${count} programa${count !== 1 ? 's' : ''}`,
        media,
      };
    },
  },
});
