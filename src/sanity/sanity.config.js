// src/sanity/sanity.config.js
import { defineConfig }  from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool }    from '@sanity/vision'
import { schemaTypes }   from './schemas'

export default defineConfig({
  name:       'crivo-studio',
  title:      'Crivo CMS',

  projectId:  import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset:    import.meta.env.VITE_SANITY_DATASET,

  apiVersion: '2024-01-01',

  basePath:   '/admin/studio',

  plugins: [
    structureTool(),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})