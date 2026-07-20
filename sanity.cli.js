// Lets the Sanity CLI (sanity exec, sanity dataset, etc.) resolve the
// project/dataset when run from the repo root, where there's no standalone
// Studio scaffold — sanity.config.js lives under src/sanity instead.
import { defineCliConfig } from 'sanity/cli'
import { config as loadEnv } from 'dotenv'

loadEnv()

export default defineCliConfig({
  api: {
    projectId: process.env.VITE_SANITY_PROJECT_ID,
    dataset: process.env.VITE_SANITY_DATASET,
  },
})
