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
      title: 'Email de contacto',
      type: 'string',
      description:
        'A este correo llegan los mensajes del formulario de contacto, las cotizaciones, ' +
        'los testimonios nuevos y las suscripciones. Es el buzón comercial del día a día.',
      // Sin comprobar el formato, una errata aquí hace que los envíos del
      // formulario fallen en silencio: el usuario ve "enviado" y no llega nada.
      validation: (r) => r.required().email(),
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
              validation: (r) => r.required().max(30),
            }),
            defineField({
              name: 'wa',
              title: 'Número para wa.me (solo dígitos, con código de país)',
              type: 'string',
              description: 'Ej: 525518944494',
              // Este valor va directo a la URL de wa.me. Con espacios o
              // guiones el enlace no abre el chat, y el fallo solo se ve al
              // pulsar el botón.
              validation: (r) =>
                r.required().regex(/^\d{10,15}$/, {
                  name: 'solo dígitos',
                  invert: false,
                }).error('Solo dígitos, con código de país y sin espacios. Ej: 525518944494'),
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
      // El código toma el primero marcado como principal. Si hay varios, cuál
      // gana depende del orden de la lista, que no es evidente al editar.
      validation: (r) =>
        r.custom((tels?: { esPrincipal?: boolean }[]) => {
          const principales = (tels ?? []).filter((t) => t?.esPrincipal).length;
          if (principales > 1) return 'Solo un número puede ser el principal';
          if (tels?.length && principales === 0) {
            return 'Marca uno como principal o el botón flotante usará el primero de la lista';
          }
          return true;
        }),
    }),
    defineField({
      name: 'direccion',
      title: 'Dirección de la oficina',
      type: 'text',
      group: 'contacto',
      rows: 3,
      description: 'Cada línea se muestra por separado. Ej:\nAv. Insurgentes Sur 863, Piso 7\nCol. Nápoles, C.P. 03810\nCDMX, México',
      validation: (r) => r.max(300),
    }),
    defineField({
      name: 'urlMapa',
      title: 'Ubicación en Google Maps',
      type: 'string',
      group: 'contacto',
      description: 'Abre Google Maps, busca la ubicación y copia la URL que aparece en la barra del navegador. El texto de la tarjeta y el mapa se generan solos.',
      // La página extrae la dirección y el mapa de esta URL; si no es de Maps
      // el parseo no encuentra nada y la tarjeta sale vacía.
      validation: (r) =>
        r.custom((valor?: string) => {
          if (!valor) return true;
          if (!/^https?:\/\/(www\.)?(google\.[a-z.]+\/maps|maps\.app\.goo\.gl|goo\.gl\/maps)/i.test(valor)) {
            return 'Debe ser una URL de Google Maps';
          }
          return true;
        }),
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
      name: 'emailSeguridad',
      title: 'Email de seguridad',
      type: 'string',
      group: 'seguridad',
      description:
        'Aquí llegan los enlaces para recuperar la contraseña del Studio. Sepáralo del correo de ' +
        'contacto: quien tenga acceso a este buzón puede restablecer la contraseña y entrar al Studio, ' +
        'así que no debería ser un correo compartido por el equipo comercial.',
      validation: (r) => r.required().email(),
    }),
    defineField({
      name: 'studioPassword',
      title: 'Contraseña del Studio',
      type: 'string',
      group: 'seguridad',
      description:
        'Contraseña para entrar a /studio. Se guarda cifrada: el valor largo que empieza por "scrypt$" NO es la contraseña, es su hash. ' +
        'Para cambiarla, escribe aquí la nueva en texto normal y publica; se cifrará sola en el siguiente inicio de sesión. ' +
        'No puede quedar vacía: es la única llave de acceso al Studio.',
      validation: (r) =>
        r
          // Obligatorio de verdad: vacío bloquea la publicación. Es la única
          // credencial del Studio, y el servidor falla cerrado si no la
          // encuentra, así que dejarla en blanco cierra la puerta a todos.
          .required()
          .custom((valor?: string) => {
            // El vacío ya lo cubre required(); aquí solo la política de fuerza.
            if (!valor) return true;
            // Un valor ya cifrado se deja pasar sin mirar longitud: son 168
            // caracteres de hash, no una contraseña que alguien haya escrito.
            if (valor.startsWith('scrypt$')) return true;
            if (valor.length < 10) return 'Usa al menos 10 caracteres';
            return true;
          }),
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Configuración del sitio' };
    },
  },
});
