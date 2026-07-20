// src/lib/sanityClient.js
import { createClient } from '@sanity/client'
import imageUrlBuilder  from '@sanity/image-url'

// Public, read-only client used by the browser bundle. No API token here —
// that's what keeps drafts and isVisible:false records from ever being
// fetchable from client code, regardless of what a query asks for.
// useCdn:false hits Sanity's live API instead of the edge cache, so a
// publish in Studio (e.g. toggling isVisible) shows up on the site
// immediately instead of lagging ~30-60s behind on the CDN.
export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset:   import.meta.env.VITE_SANITY_DATASET,
  useCdn:    false,
  apiVersion: '2024-01-01',
})

const builder = imageUrlBuilder(client)
export const urlFor = (source) => builder.image(source)