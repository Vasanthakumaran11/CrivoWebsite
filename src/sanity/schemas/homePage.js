export default {
  name: 'homePage',
  title: 'Home Page Content',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Document Title',
      type: 'string',
      initialValue: 'Home Page Content',
      validation: Rule => Rule.required()
    },
    // Header section
    {
      name: 'header',
      title: 'Header Section',
      type: 'object',
      fields: [
        {
          name: 'bannerTitle',
          title: 'Header Banner Title',
          type: 'string',
          placeholder: 'e.g. CRIVO TECH'
        },
        {
          name: 'bannerSubtitle',
          title: 'Header Banner Subtitle',
          type: 'string',
          placeholder: 'e.g. DESIGNING DIGITAL SYSTEMS FOR HIGH GROWTH'
        },
        {
          name: 'meetButtonText',
          title: 'Meet Button Text',
          type: 'string',
          placeholder: 'e.g. BOOK A MEET'
        },
        {
          name: 'productButtonText',
          title: 'Product Button Text',
          type: 'string',
          placeholder: 'e.g. OUR PRODUCT'
        }
      ]
    },
    // WhyChoosecrivo Section
    {
      name: 'whyChooseUs',
      title: 'Why Choose Crivo Section',
      type: 'object',
      fields: [
        {
          name: 'box1',
          title: 'Box 1 (e.g. Engineering Leadership)',
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' }
          ]
        },
        {
          name: 'box2',
          title: 'Box 2 (e.g. Deep Product Focus)',
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' }
          ]
        },
        {
          name: 'box3',
          title: 'Box 3 (e.g. Dynamic Agility)',
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' }
          ]
        }
      ]
    },
    // The process section
    {
      name: 'process',
      title: 'The Process Section',
      type: 'object',
      fields: [
        {
          name: 'box1',
          title: 'Box 1 (Step 1)',
          type: 'object',
          fields: [
            { name: 'stepNumber', title: 'Step Number', type: 'string', placeholder: 'e.g. 01' },
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' }
          ]
        },
        {
          name: 'box2',
          title: 'Box 2 (Step 2)',
          type: 'object',
          fields: [
            { name: 'stepNumber', title: 'Step Number', type: 'string', placeholder: 'e.g. 02' },
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' }
          ]
        },
        {
          name: 'box3',
          title: 'Box 3 (Step 3)',
          type: 'object',
          fields: [
            { name: 'stepNumber', title: 'Step Number', type: 'string', placeholder: 'e.g. 03' },
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' }
          ]
        },
        {
          name: 'box4',
          title: 'Box 4 (Step 4)',
          type: 'object',
          fields: [
            { name: 'stepNumber', title: 'Step Number', type: 'string', placeholder: 'e.g. 04' },
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' }
          ]
        },
        {
          name: 'box5',
          title: 'Box 5 (Step 5)',
          type: 'object',
          fields: [
            { name: 'stepNumber', title: 'Step Number', type: 'string', placeholder: 'e.g. 05' },
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' }
          ]
        }
      ]
    },
    // Trusted technologies
    {
      name: 'trustedTechnologies',
      title: 'Trusted Technologies',
      type: 'array',
      description: 'List of 10 trusted technologies',
      of: [{ type: 'string' }],
      validation: Rule => Rule.max(10)
    },
    // Our clients
    {
      name: 'ourClients',
      title: 'Our Clients (Testimonials)',
      type: 'array',
      description: 'List of 4 client testimonials',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Client Name', type: 'string' },
            { name: 'role', title: 'Client Role/Position', type: 'string' },
            { name: 'quote', title: 'Quote Text', type: 'text' },
            { name: 'initial', title: 'Avatar Initial', type: 'string' }
          ]
        }
      ],
      validation: Rule => Rule.max(4)
    }
  ]
}
