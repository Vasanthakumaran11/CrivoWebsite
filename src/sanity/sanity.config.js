import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || 'mu7huxyd'
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production'

export default defineConfig({
  name: 'default',
  title: 'Crivo Admin Studio',
  projectId,
  dataset,
  basePath: '/admin/studio',
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
})
