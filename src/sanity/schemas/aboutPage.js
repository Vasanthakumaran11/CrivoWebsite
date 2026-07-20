export default {
  name: 'aboutPage',
  title: 'About Us Page Content',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Document Title',
      type: 'string',
      initialValue: 'About Us Page Content',
      validation: Rule => Rule.required()
    },
    // Hero Section
    {
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        { name: 'eyebrow', title: 'Eyebrow text', type: 'string', placeholder: 'Our Story' },
        { name: 'titleLine1', title: 'Title Line 1', type: 'string', placeholder: 'ABOUT' },
        { name: 'titleLine2', title: 'Title Line 2', type: 'string', placeholder: 'CRIVO.' },
        { name: 'description', title: 'Description', type: 'text' }
      ]
    },
    // Who We Are / Stats Section
    {
      name: 'statsSection',
      title: 'Who We Are / Stats Section',
      type: 'object',
      fields: [
        { name: 'eyebrow', title: 'Eyebrow text', type: 'string', placeholder: 'Who We Are' },
        { name: 'title', title: 'Title', type: 'string', placeholder: 'Elevate your Brand with CRIVO' },
        { name: 'description1', title: 'Paragraph 1', type: 'text' },
        { name: 'description2', title: 'Paragraph 2', type: 'text' },
        { name: 'ctaButtonText', title: 'CTA Button Text', type: 'string', placeholder: 'BUILD WITH US' },
        {
          name: 'statsList',
          title: 'Statistics List',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'value', title: 'Value (e.g. 50+)', type: 'string' },
                { name: 'label', title: 'Label (e.g. Supported Platforms)', type: 'string' }
              ]
            }
          ]
        }
      ]
    },
    // Mission & Vision Section
    {
      name: 'missionVision',
      title: 'Mission & Vision Section',
      type: 'object',
      fields: [
        {
          name: 'mission',
          title: 'Mission Box',
          type: 'object',
          fields: [
            { name: 'title', title: 'Mission Title', type: 'string', placeholder: 'OUR MISSION' },
            { name: 'description', title: 'Mission Description', type: 'text' }
          ]
        },
        {
          name: 'vision',
          title: 'Vision Box',
          type: 'object',
          fields: [
            { name: 'title', title: 'Vision Title', type: 'string', placeholder: 'OUR VISION' },
            { name: 'description', title: 'Vision Description', type: 'text' }
          ]
        }
      ]
    },
    // Leaders and Core Team are no longer part of this document — they're
    // managed as standalone 'leader' / 'coreTeamMember' documents (see
    // leader.js / coreTeamMember.js) so each person can be individually
    // shown/hidden via isVisible. Their section headings are hardcoded in
    // Leaders.jsx / CoreTeam.jsx.
    // Bottom CTA
    {
      name: 'cta',
      title: 'Bottom CTA Section',
      type: 'object',
      fields: [
        { name: 'eyebrow', title: 'Eyebrow', type: 'string', placeholder: 'Work With Us' },
        { name: 'titleLine1', title: 'Title Line 1', type: 'string', placeholder: 'GET STARTED WITH' },
        { name: 'titleLine2', title: 'Title Line 2', type: 'string', placeholder: 'CRIVO TODAY.' },
        { name: 'ctaBookText', title: 'Book Button Text', type: 'string', placeholder: 'BOOK A MEET' },
        { name: 'ctaEmailText', title: 'Email Button Text', type: 'string', placeholder: 'EMAIL US' }
      ]
    }
  ]
}
