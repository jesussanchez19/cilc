import { defineField, defineType } from 'sanity';

/**
 * Acreditaciones y certificaciones de CILC, las que se muestran en el pie.
 *
 * Antes había una sola, la de ICEF, con la imagen y el enlace escritos a mano en
 * el componente del pie: añadir otra exigía tocar código y desplegar. Ahora se
 * cargan desde aquí, y el pie las va rotando conforme se acumulen.
 */
export const certificacionSchema = defineType({
  name: 'certificacion',
  title: 'Certificaciones',
  type: 'document',
  fields: [
    defineField({
      name: 'nombre',
      title: 'Nombre',
      type: 'string',
      description:
        'Cómo se llama la acreditación. No se ve en la página: se usa como texto ' +
        'alternativo para lectores de pantalla y cuando la imagen no carga. ' +
        'Ej: "ICEF Trusted Agency #3797".',
      validation: (r) => r.required().min(2).max(120),
    }),
    defineField({
      name: 'imagen',
      title: 'Sello o logotipo',
      type: 'image',
      options: { hotspot: true },
      description: 'Preferiblemente cuadrada y con fondo transparente (PNG).',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'url',
      title: 'Enlace de verificación',
      type: 'url',
      description:
        'Opcional. La página donde se puede comprobar la acreditación. Si se ' +
        'deja vacío, el sello se muestra sin ser pulsable.',
      validation: (r) => r.uri({ scheme: ['https'] }),
    }),
    defineField({
      name: 'orden',
      title: 'Orden',
      type: 'number',
      initialValue: 0,
      description: 'Menor número aparece antes en la rotación.',
      validation: (r) => r.integer().min(0),
    }),
  ],
  preview: {
    select: { title: 'nombre', subtitle: 'url', media: 'imagen' },
  },
  orderings: [
    { title: 'Orden', name: 'ordenAsc', by: [{ field: 'orden', direction: 'asc' }] },
  ],
});
