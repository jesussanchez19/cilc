import { defineField, defineType } from 'sanity';

export const configuracionSchema = defineType({
  name: 'configuracion',
  title: 'Configuración del sitio',
  type: 'document',
  groups: [
    { name: 'contacto',  title: 'Contacto',       default: true },
    { name: 'redes',     title: 'Redes sociales' },
    { name: 'seguridad', title: 'Seguridad'       },
  ],
  fields: [
    defineField({
      name: 'emailAdmin',
      group: 'contacto',
      title: 'Email administrador',
      type: 'string',
      description: 'A este correo llegan los mensajes del formulario de contacto y las cotizaciones.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'telefonos',
      title: 'Números de WhatsApp',
      group: 'contacto',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'display',
              title: 'Número visible',
              type: 'string',
              description: 'Ej: 55 1894 4494',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'wa',
              title: 'Número para wa.me (solo dígitos, con código de país)',
              type: 'string',
              description: 'Ej: 525518944494',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'esPrincipal',
              title: 'Usar para botón WhatsApp',
              type: 'boolean',
              description: 'Actívalo en el número que abrirá el chat cuando el usuario toque "Abrir WhatsApp" o el ícono flotante.',
              initialValue: false,
            }),
          ],
          preview: {
            select: { title: 'display', subtitle: 'wa', principal: 'esPrincipal' },
            prepare({ title, subtitle, principal }) {
              return {
                title: `${principal ? '⭐ ' : ''}+${subtitle}`,
                subtitle: principal ? `${title} — BOTÓN PRINCIPAL` : title,
              };
            },
          },
        },
      ],
      description: 'Activa "Usar para botón WhatsApp" en el número que quieras como principal.',
    }),
    defineField({
      name: 'direccion',
      title: 'Dirección de la oficina',
      type: 'text',
      group: 'contacto',
      rows: 3,
      description: 'Cada línea se muestra por separado. Ej:\nAv. Insurgentes Sur 863, Piso 7\nCol. Nápoles, C.P. 03810\nCDMX, México',
    }),
    defineField({
      name: 'urlMapa',
      title: 'Ubicación en Google Maps',
      type: 'string',
      group: 'contacto',
      description: 'Abre Google Maps, busca la ubicación y copia la URL que aparece en la barra del navegador. El texto de la tarjeta y el mapa se generan solos.',
    }),

    // ── Redes sociales ─────────────────────────────────────────────────────────
    defineField({
      name: 'facebook',
      title: 'Facebook',
      type: 'url',
      group: 'redes',
      description: 'URL completa: https://facebook.com/cilc',
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram',
      type: 'url',
      group: 'redes',
      description: 'URL completa: https://instagram.com/cilc',
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn',
      type: 'url',
      group: 'redes',
      description: 'URL completa: https://linkedin.com/company/cilc',
    }),
    defineField({
      name: 'youtube',
      title: 'YouTube',
      type: 'url',
      group: 'redes',
      description: 'URL completa: https://youtube.com/@cilc',
    }),
    defineField({
      name: 'tiktok',
      title: 'TikTok',
      type: 'url',
      group: 'redes',
      description: 'URL completa: https://tiktok.com/@cilc',
    }),
    defineField({
      name: 'studioPassword',
      title: 'Contraseña del Studio',
      type: 'string',
      group: 'seguridad',
      description: 'Contraseña para acceder a /studio. Si se deja vacío se usa la del servidor.',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Configuración del sitio' };
    },
  },
});
