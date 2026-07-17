export default {
  name: 'productsPage',
  title: 'Products Index Page Content',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Document Title',
      type: 'string',
      initialValue: 'Products Index Page Content',
      validation: Rule => Rule.required()
    },
    // Hero Section
    {
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        { name: 'eyebrow', title: 'Eyebrow Text', type: 'string', placeholder: 'STANDALONE PRODUCTS INDEX' },
        { name: 'titleLine1', title: 'Title Line 1', type: 'string', placeholder: 'OUR' },
        { name: 'titleLine2', title: 'Title Line 2', type: 'string', placeholder: 'PRODUCTS.' },
        { name: 'description', title: 'Description', type: 'text' }
      ]
    },
    // Products list (showcase cards)
    {
      name: 'productsList',
      title: 'Products Showcase List',
      type: 'array',
      description: 'Cards shown in the products showcase, in display order',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Product Title', type: 'string', validation: Rule => Rule.required() },
            { name: 'number', title: 'Display Number (e.g. 01)', type: 'string' },
            { name: 'status', title: 'Status', type: 'string', options: { list: ['Active', 'Upcoming'] } },
            { name: 'route', title: 'Product Page Route', type: 'string', placeholder: 'e.g. /product/csms' },
            { name: 'description', title: 'Description', type: 'text' },
            {
              name: 'features',
              title: 'Feature Bullets',
              type: 'array',
              of: [{ type: 'string' }]
            },
            { name: 'image', title: 'Showcase Image', type: 'image', options: { hotspot: true } }
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
        { name: 'eyebrow', title: 'Eyebrow Text', type: 'string', placeholder: 'SCALING SOLUTIONS' },
        { name: 'titleLine1', title: 'Title Line 1', type: 'string', placeholder: 'INTEGRATE' },
        { name: 'titleLine2', title: 'Title Line 2', type: 'string', placeholder: 'CRIVO TECHNOLOGY.' },
        { name: 'description', title: 'Description', type: 'text' },
        { name: 'buttonText', title: 'Button Text', type: 'string', placeholder: 'Book A Technical Meet' }
      ]
    }
  ]
}
