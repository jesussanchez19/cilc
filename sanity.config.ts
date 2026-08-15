import { defineConfig } from 'sanity';
import type { DocumentActionComponent } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemas } from './src/sanity/schemas';
import EliminarAction from './src/sanity/plugins/eliminarAction';
import CtrlSPublishAction from './src/sanity/plugins/ctrlSPublish';
import { programs } from './src/lib/data/programs';

const SINGLETONS = ['configuracion'];
const HIDDEN     = ['testimonial', 'teamMember'];

/**
 * Tipos que no se deben poder crear desde el botón + de la barra superior.
 *
 * Ese menú lista TODOS los tipos del schema y se salta la estructura de la
 * barra lateral: aunque ahí se oculten los singletons y los tipos internos,
 * desde el + global se podía crear una segunda "Configuración del sitio" o un
 * séptimo programa, que romperían las páginas que esperan documentos con un id
 * fijo.
 *
 *   configuracion → documento único con id fijo
 *   programa      → lista cerrada, con ids fijos derivados de programs.ts
 *   testimonial / teamMember → ya ocultos en la barra lateral
 *   tokenTestimonio → los genera el servidor, con su token y su URL
 *   lead            → los crean /api/contact y /api/quote al recibir un envío
 */
const NO_CREABLES = ['configuracion', 'programa', 'testimonial', 'teamMember', 'tokenTestimonio', 'lead'];

/**
 * Renombra el botón de publicar a "Guardar y publicar".
 *
 * Sanity guarda el borrador solo mientras escribes y el botón únicamente lo
 * pone en producción, pero el rótulo "Publish" no transmite que lo tecleado ya
 * está a salvo. Quien no conoce la herramienta busca un botón de guardar que no
 * existe, o teme perder lo escrito. El nombre explícito evita esa duda.
 *
 * Envuelve la acción original en lugar de reemplazarla: la lógica de publicar,
 * el estado deshabilitado y los mensajes siguen siendo los de Sanity.
 */
function renombrarPublicar(accion: DocumentActionComponent): DocumentActionComponent {
  const envuelta: DocumentActionComponent = (props) => {
    const resultado = accion(props);
    if (!resultado) return resultado;
    return { ...resultado, label: 'Guardar y publicar' };
  };
  envuelta.action = accion.action;
  return envuelta;
}

export default defineConfig({
  name: 'cilc',
  title: 'CILC Admin',
  basePath: '/studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Contenido')
          .items([
            S.listItem()
              .title('⚙️ Configuración del sitio')
              .id('configuracion')
              .child(
                S.document()
                  .schemaType('configuracion')
                  .documentId('configuracion-singleton'),
              ),
            S.divider(),
            // Programas — lista cerrada, sin botón "+": se genera desde programs.ts
            S.listItem()
              .title('Programas')
              .id('programa')
              .child(
                S.list()
                  .title('Programas')
                  /* Un ítem por programa, con su id fijo. Se genera desde la
                     misma lista que usa el sitio: antes estaban los seis
                     escritos a mano y añadir uno exigía acordarse de este
                     rincón del Studio. El icono sale del propio programa. */
                  .items(
                    programs.map((p) =>
                      S.listItem()
                        .title(`${p.icon} ${p.title}`)
                        .id(`programa-${p.slug}`)
                        .child(S.document().schemaType('programa').documentId(`programa-${p.slug}`)),
                    ),
                  ),
              ),
            ...S.documentTypeListItems().filter(
              (item) =>
                !SINGLETONS.includes(item.getId() ?? '') &&
                !HIDDEN.includes(item.getId() ?? '') &&
                item.getId() !== 'programa',
            ),
          ]),
    }),
    visionTool(),
  ],
  schema: { types: schemas },
  document: {
    // Filtra el menú del botón + de la barra superior, que por defecto ofrece
    // todos los tipos del schema sin respetar la estructura de la barra lateral.
    newDocumentOptions: (prev) =>
      prev.filter((plantilla) => !NO_CREABLES.includes(plantilla.templateId)),

    actions: (prev, ctx) => {
      const base = [
        CtrlSPublishAction,
        ...prev
          .filter((a) => a.action !== 'delete')
          .map((a) => (a.action === 'publish' ? renombrarPublicar(a) : a)),
      ];
      if (SINGLETONS.includes(ctx.schemaType)) return base;
      if (ctx.schemaType === 'programa') return base;
return [...base, EliminarAction];
    },
  },
});
