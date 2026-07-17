export default {
  name: 'applyPage',
  title: 'Apply To Join Page Content',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Document Title',
      type: 'string',
      initialValue: 'Apply To Join Page Content',
      validation: Rule => Rule.required()
    },
    // Hero Section
    {
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        { name: 'eyebrow', title: 'Eyebrow Text', type: 'string', placeholder: 'Careers at Crivo' },
        { name: 'titleLine1', title: 'Title Line 1', type: 'string', placeholder: 'JOIN' },
        { name: 'titleLine2', title: 'Title Line 2', type: 'string', placeholder: 'CRIVO.' },
        { name: 'description', title: 'Description', type: 'text' }
      ]
    },
    // Form Intro
    {
      name: 'formIntro',
      title: 'Application Form Intro',
      type: 'object',
      fields: [
        { name: 'eyebrow', title: 'Eyebrow Text', type: 'string', placeholder: 'Apply Now' },
        { name: 'titleLine1', title: 'Title Line 1', type: 'string', placeholder: 'DROP YOUR' },
        { name: 'titleLine2', title: 'Title Line 2', type: 'string', placeholder: 'APPLICATION.' },
        { name: 'description', title: 'Description', type: 'text' }
      ]
    },
    // Bottom CTA Strip
    {
      name: 'ctaStrip',
      title: 'Bottom CTA Strip',
      type: 'object',
      fields: [
        { name: 'title', title: 'Title', type: 'string', placeholder: 'Have questions before applying?' },
        { name: 'description', title: 'Description', type: 'string', placeholder: "Reach out directly — we're happy to talk." },
        { name: 'buttonText', title: 'Button Text', type: 'string', placeholder: 'Contact Us' }
      ]
    }
  ]
}
