import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemas } from './src/sanity/schemas';
import { ImportarDesdeUrlAction } from './src/sanity/actions/importarDesdeUrl';

export default defineConfig({
  name: 'cilc',
  title: 'CILC Admin',
  basePath: '/studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  plugins: [structureTool(), visionTool()],
  schema: { types: schemas },
  document: {
    actions: (prev, ctx) =>
      ctx.schemaType === 'blogPost'
        ? [...prev, ImportarDesdeUrlAction]
        : prev,
  },
});
