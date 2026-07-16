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
    // Leadership Team
    {
      name: 'leadersSection',
      title: 'Leadership Section',
      type: 'object',
      fields: [
        { name: 'title', title: 'Section Title', type: 'string', placeholder: 'LEADERS' },
        {
          name: 'leaders',
          title: 'Leaders List',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'name', title: 'Name', type: 'string', validation: Rule => Rule.required() },
                { name: 'role', title: 'Title / Designation', type: 'string' },
                { name: 'email', title: 'Email ID', type: 'string' },
                { name: 'linkedin', title: 'LinkedIn Profile URL', type: 'url' },
                { name: 'image', title: 'Leader Photo', type: 'image', options: { hotspot: true } }
              ]
            }
          ]
        }
      ]
    },
    // Core Team
    {
      name: 'coreTeamSection',
      title: 'Core Team Section',
      type: 'object',
      fields: [
        { name: 'title', title: 'Section Title', type: 'string', placeholder: 'CORE TEAM' },
        {
          name: 'members',
          title: 'Core Team Members List',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'name', title: 'Name', type: 'string', validation: Rule => Rule.required() },
                { name: 'role', title: 'Title / Designation', type: 'string' },
                { name: 'email', title: 'Email ID', type: 'string' },
                { name: 'linkedin', title: 'LinkedIn Profile URL', type: 'url' },
                { name: 'github', title: 'GitHub Profile URL', type: 'url' },
                { name: 'initial', title: 'Initial (e.g. V)', type: 'string' },
                { name: 'image', title: 'Member Photo', type: 'image', options: { hotspot: true } }
              ]
            }
          ]
        }
      ]
    },
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
