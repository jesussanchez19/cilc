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
