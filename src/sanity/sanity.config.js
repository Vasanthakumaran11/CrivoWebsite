// src/sanity/sanity.config.js
import { defineConfig }  from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool }    from '@sanity/vision'
import { schemaTypes }   from './schemas'

// Page-content schemas that only ever have ONE real document, fetched by the
// site via a fixed _id (see src/hooks/*.js). Sanity's default list view lets
// editors accidentally create a second document of the same type — since the
// site's queries filter by _type, that second "orphan" document can silently
// take the place of the real one. Pinning these here means the Studio nav
// always opens the one true document directly, so a duplicate can never be
// created (or edited by mistake) through the UI again.
const singletons = [
  { type: 'banner', id: 'banner-main', title: 'Home Hero Banner' },
  { type: 'homePage', id: 'home-page', title: 'Home Page Content' },
  { type: 'siteFooter', id: 'site-footer', title: 'Footer Content' },
  { type: 'aboutPage', id: 'about-page', title: 'About Us Page' },
  { type: 'reachPage', id: 'reach-page', title: 'Reach Us Page' },
  { type: 'bookMeetPage', id: 'book-meet-page', title: 'Book A Meet Page' },
  { type: 'productCsms', id: 'product-csms', title: 'CSMS Product Page' },
  { type: 'productPlanner', id: 'product-ev-planner', title: 'EV Planner Product Page' },
  { type: 'productsPage', id: 'products-page', title: 'Products Index Page' },
  { type: 'applyPage', id: 'apply-page', title: 'Apply To Join Page' },
  { type: 'privacyPolicy', id: 'privacy-policy', title: 'Privacy Policy' },
  { type: 'termsConditions', id: 'terms-conditions', title: 'Terms & Conditions' },
  { type: 'accessibilityStatement', id: 'accessibility-statement', title: 'Accessibility Statement' },
]

const singletonTypeNames = new Set(singletons.map((s) => s.type))

const structure = (S) =>
  S.list()
    .title('Content')
    .items([
      ...singletons.map(({ type, id, title }) =>
        S.listItem()
          .title(title)
          .id(type)
          .child(S.document().schemaType(type).documentId(id))
      ),
      S.divider(),
      // Everything else (blog, faq, clientLogo — real
      // collections) keeps the normal list view with create/delete.
      ...S.documentTypeListItems().filter((item) => !singletonTypeNames.has(item.getId())),
    ])

export default defineConfig({
  name:       'crivo-studio',
  title:      'Crivo CMS',

  projectId:  import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset:    import.meta.env.VITE_SANITY_DATASET,

  apiVersion: '2024-01-01',

  basePath:   '/admin/studio',

  plugins: [
    structureTool({ structure }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },

  document: {
    // Second line of defense: even from a pinned singleton's own document
    // menu, block "Duplicate" so a stray second document can't be spun off.
    actions: (prev, context) =>
      singletonTypeNames.has(context.schemaType)
        ? prev.filter(({ action }) => action !== 'duplicate')
        : prev,
  },
})