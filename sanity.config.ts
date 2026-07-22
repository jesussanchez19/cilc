import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemas } from './src/sanity/schemas';
import EliminarAction from './src/sanity/plugins/eliminarAction';
import CtrlSPublishAction from './src/sanity/plugins/ctrlSPublish';

const SINGLETONS = ['configuracion'];
const HIDDEN     = ['testimonial', 'teamMember'];

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
            // Programas — sin botón "+" (solo editar los 6 existentes)
            S.listItem()
              .title('Programas')
              .id('programa')
              .child(
                S.documentTypeList('programa')
                  .title('Programas')
                  .canHandleIntent((name) => name !== 'create'),
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
    actions: (prev, ctx) => {
      const base = [
        CtrlSPublishAction,
        ...prev.filter((a) => a.action !== 'delete'),
      ];
      if (SINGLETONS.includes(ctx.schemaType)) return base;
      if (ctx.schemaType === 'programa') return base;
      return [...base, EliminarAction];
    },
  },
});
