export default {
  name: 'accessibilityStatement',
  title: 'Accessibility Statement Page Content',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Document Title',
      type: 'string',
      initialValue: 'Accessibility Statement Page Content',
      validation: Rule => Rule.required()
    },
    {
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        { name: 'eyebrow', title: 'Eyebrow Text', type: 'string', placeholder: 'Legal' },
        { name: 'titleLine1', title: 'Title Line 1', type: 'string', placeholder: 'ACCESSIBILITY' },
        { name: 'titleLine2', title: 'Title Line 2', type: 'string', placeholder: 'STATEMENT.' },
        { name: 'lastUpdated', title: 'Last Updated Text', type: 'string', placeholder: 'Last updated: June 2026' }
      ]
    },
    {
      name: 'intro',
      title: 'Intro Paragraph',
      type: 'text',
      description: 'Optional — leave empty if the page has no intro paragraph before the sections'
    },
    {
      name: 'sections',
      title: 'Accessibility Sections',
      type: 'array',
      of: [{ type: 'legalSection' }]
    }
  ]
}
