import { defineConfig } from 'sanity';
import type { DocumentActionComponent } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemas } from './src/sanity/schemas';
import EliminarAction from './src/sanity/plugins/eliminarAction';
import CtrlSPublishAction from './src/sanity/plugins/ctrlSPublish';

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
 *   programa      → lista cerrada de 6, con ids fijos
 *   testimonial / teamMember → ya ocultos en la barra lateral
 *   tokenTestimonio → los genera el servidor, con su token y su URL
 */
const NO_CREABLES = ['configuracion', 'programa', 'testimonial', 'teamMember', 'tokenTestimonio'];

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
            // Programas — lista fija de 6, sin botón "+"
            S.listItem()
              .title('Programas')
              .id('programa')
              .child(
                S.list()
                  .title('Programas')
                  .items([
                    S.listItem().title('🗣️ Idiomas').id('programa-idiomas')
                      .child(S.document().schemaType('programa').documentId('programa-idiomas')),
                    S.listItem().title('👨‍👩‍👧‍👦 Au Pair').id('programa-au-pair')
                      .child(S.document().schemaType('programa').documentId('programa-au-pair')),
                    S.listItem().title('🎓 Años Académicos').id('programa-anos-academicos')
                      .child(S.document().schemaType('programa').documentId('programa-anos-academicos')),
                    S.listItem().title('💼 Estudia y Trabaja').id('programa-estudia-trabaja')
                      .child(S.document().schemaType('programa').documentId('programa-estudia-trabaja')),
                    S.listItem().title('🏢 Formación Corporativa').id('programa-formacion-corporativa')
                      .child(S.document().schemaType('programa').documentId('programa-formacion-corporativa')),
                    S.listItem().title('💻 Idiomas en Línea').id('programa-idiomas-en-linea')
                      .child(S.document().schemaType('programa').documentId('programa-idiomas-en-linea')),
                  ]),
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
