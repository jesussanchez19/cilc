import { defineField, defineType } from 'sanity';
import type { ValidationContext } from 'sanity';
import { PROGRAM_NAMES } from '@/lib/data/programs';

/**
 * Estos documentos los crea el formulario público a través de /api/testimonio,
 * que ya valida con zod. Los límites de aquí son deliberadamente los mismos:
 * si las dos capas no coinciden, se puede guardar desde el Studio algo que la
 * API habría rechazado, y la página acaba mostrando datos que nadie previó.
 *
 * Referencia: `testimonioSchema` en app/api/testimonio/route.ts
 *
 * Con UNA excepción a propósito: los testimonios que solo son un vídeo.
 *
 * En el sitio anterior de CILC hay testimonios grabados de los que únicamente se
 * conserva el enlace de YouTube — no hay correo del alumno ni texto escrito, y
 * no tiene sentido inventarlos para poder guardar. Por eso `email` y `texto`
 * dejan de ser obligatorios cuando el documento trae `videoUrl`.
 *
 * La API no cambia: los testimonios nuevos siguen llegando por el formulario
 * con todos sus datos. La excepción existe solo para cargar a mano lo antiguo.
 */

/**
 * ¿Este documento es un testimonio que consiste solo en el vídeo?
 *
 * `ValidationContext.document` es un `SanityDocument` genérico, sin los campos
 * de este esquema, así que hay que estrecharlo a mano para leer `videoUrl`.
 */
function tieneVideo(contexto: ValidationContext): boolean {
  const doc = contexto.document as { videoUrl?: unknown } | undefined;
  return Boolean(doc?.videoUrl);
}

const SOLO_SI_NO_HAY_VIDEO = 'Obligatorio, salvo en los testimonios que son solo un vídeo';
export const solicitudTestimonioSchema = defineType({
  name: 'solicitudTestimonio',
  title: 'Solicitudes de Testimonio',
  type: 'document',
  fields: [
    defineField({
      name: 'nombre',
      title: 'Nombre',
      type: 'string',
      validation: (r) => r.required().min(2).max(100),
    }),
    defineField({
      name: 'email',
      title: 'Email (privado)',
      type: 'string',
      description:
        'No se publica. Sirve para contactar al alumno si hace falta. ' +
        'Puede quedar vacío si el testimonio es solo un vídeo.',
      validation: (r) =>
        r.email().max(200).custom((valor, ctx) =>
          valor || tieneVideo(ctx) ? true : SOLO_SI_NO_HAY_VIDEO,
        ),
    }),
    defineField({
      name: 'programa', title: 'Programa', type: 'string',
      options: { list: PROGRAM_NAMES },
      validation: (r) => r.max(100),
    }),
    defineField({
      name: 'pais',
      title: 'País/Ciudad',
      type: 'string',
      validation: (r) => r.max(100),
    }),
    defineField({
      name: 'bandera',
      title: 'Código de país',
      type: 'string',
      /**
       * Pedía un emoji, y era falso: el sitio usa este valor para construir
       * `https://flagcdn.com/w20/{valor}.png`. Con un emoji dentro esa URL da
       * 404 y en la página sale una imagen rota. Lo que guarda la API es el
       * código ISO en minúsculas, resuelto a partir del país.
       */
      description:
        'Dos letras en minúscula, del país: ca (Canadá), us (Estados Unidos), ' +
        'gb (Reino Unido), ie (Irlanda), au (Australia), fr (Francia), de (Alemania). ' +
        'Se rellena solo cuando el testimonio llega por el formulario.',
      validation: (r) =>
        r.lowercase().length(2).regex(/^[a-z]{2}$/, {
          name: 'código ISO de dos letras',
        }),
    }),
    defineField({ name: 'foto', title: 'Fotografía', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'texto',
      title: 'Testimonio',
      type: 'text',
      rows: 4,
      description: 'Puede quedar vacío si el testimonio es solo un vídeo.',
      validation: (r) =>
        r.min(10).max(2000).custom((valor, ctx) =>
          valor || tieneVideo(ctx) ? true : SOLO_SI_NO_HAY_VIDEO,
        ),
    }),
    defineField({
      name: 'calificacion', title: 'Calificación', type: 'number',
      description: 'Estrellas (1–5)',
      // `integer()` faltaba: un 4.5 pasaba el min/max y luego rompe el pintado
      // de estrellas, que repite el carácter tantas veces como diga el número.
      validation: (r) => r.min(1).max(5).integer(),
    }),
    defineField({
      name: 'videoUrl', title: 'Video de YouTube', type: 'url',
      description: 'Ej: https://www.youtube.com/watch?v=xxxxxx',
      validation: (r) => r.uri({ scheme: ['https'] }),
    }),
    defineField({
      name: 'estado', title: 'Estado', type: 'string',
      initialValue: 'pendiente',
      options: { list: [
        { title: '⏳ Pendiente', value: 'pendiente' },
        { title: '✅ Aprobado', value: 'aprobado' },
        { title: '❌ Rechazado', value: 'rechazado' },
      ]},
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { title: 'nombre', subtitle: 'estado', media: 'foto' },
    prepare({ title, subtitle, media }) {
      const icons: Record<string, string> = { pendiente: '⏳', aprobado: '✅', rechazado: '❌' };
      return { title, subtitle: icons[subtitle] ? `${icons[subtitle]} ${subtitle}` : subtitle, media };
    },
  },
  orderings: [{ title: 'Más recientes', name: 'fechaDesc', by: [{ field: '_createdAt', direction: 'desc' }] }],
});
