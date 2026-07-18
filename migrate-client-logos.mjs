// migrate-client-logos.mjs
//
// One-time seed: uploads the 4 client logo marks (recreated as SVGs from the
// designs already hardcoded in src/components/Home/Client.jsx) as Sanity image
// assets, then creates/publishes one `clientLogo` document per client.
//
// Usage:  node migrate-client-logos.mjs
//
// Safe to re-run: uses fixed _ids + createOrReplace, so it never duplicates.

import 'dotenv/config'
import fs from 'node:fs'
import { createClient } from '@sanity/client'

const projectId = process.env.VITE_SANITY_PROJECT_ID
const dataset = process.env.VITE_SANITY_DATASET
const token = process.env.VITE_SANITY_TOKEN

if (!projectId || !token || !dataset) {
  console.error('Missing VITE_SANITY_PROJECT_ID, VITE_SANITY_DATASET, or VITE_SANITY_TOKEN in .env')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2024-01-01',
  useCdn: false,
})

const ASSET_DIR = 'C:\\Users\\Raja\\AppData\\Local\\Temp\\claude\\c--Users-Raja-Desktop-CrivoWebsite\\81fe0745-37a2-4ac0-8376-e34eef872b3b\\scratchpad\\client-logos'

const clients = [
  { _id: 'client-logo-young-indians', name: 'Young Indians', file: 'young-indians.svg', order: 1 },
  { _id: 'client-logo-ayon', name: 'Ayon', file: 'ayon.svg', order: 2 },
  { _id: 'client-logo-vts', name: 'VTS', file: 'vts.svg', order: 3 },
  { _id: 'client-logo-twincord', name: 'Twincord', file: 'twincord.svg', order: 4 },
]

async function run() {
  console.log(`Uploading ${clients.length} client logos to dataset "${dataset}"...\n`)

  let success = 0
  let failed = 0

  for (const c of clients) {
    try {
      const filePath = `${ASSET_DIR}\\${c.file}`
      const asset = await client.assets.upload('image', fs.createReadStream(filePath), {
        filename: c.file,
      })

      await client.createOrReplace({
        _id: c._id,
        _type: 'clientLogo',
        name: c.name,
        order: c.order,
        logo: {
          _type: 'image',
          asset: { _type: 'reference', _ref: asset._id },
        },
      })

      console.log(`✔ Uploaded + published ${c.name} -> ${c._id}`)
      success++
    } catch (err) {
      console.error(`✘ Failed ${c.name}:`, err.message)
      failed++
    }
  }

  console.log(`\nDone: ${success} succeeded, ${failed} failed (of ${clients.length}).`)
  if (failed > 0) process.exit(1)
}

run().catch((err) => {
  console.error('Aborted:', err.message)
  process.exit(1)
})
