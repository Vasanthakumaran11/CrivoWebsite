export default {
  name: 'termsConditions',
  title: 'Terms & Conditions Page Content',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Document Title',
      type: 'string',
      initialValue: 'Terms & Conditions Page Content',
      validation: Rule => Rule.required()
    },
    {
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        { name: 'eyebrow', title: 'Eyebrow Text', type: 'string', placeholder: 'Legal' },
        { name: 'titleLine1', title: 'Title Line 1', type: 'string', placeholder: 'TERMS &' },
        { name: 'titleLine2', title: 'Title Line 2', type: 'string', placeholder: 'CONDITIONS.' },
        { name: 'lastUpdated', title: 'Last Updated Text', type: 'string', placeholder: 'Last updated: June 2026' }
      ]
    },
    {
      name: 'intro',
      title: 'Intro Paragraph',
      type: 'text'
    },
    {
      name: 'sections',
      title: 'Terms Sections',
      type: 'array',
      of: [{ type: 'legalSection' }]
    }
  ]
}
