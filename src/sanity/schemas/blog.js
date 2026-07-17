export default {
  name: 'blog',
  title: 'Blog Posts',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Blog Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'readTime',
      title: 'Read Time',
      type: 'string',
      placeholder: 'e.g. 8 min read'
    },
    {
      name: 'author',
      title: 'Author',
      type: 'string',
      initialValue: 'Crivo Team',
      placeholder: 'e.g. Crivo Power Lab'
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      placeholder: 'e.g. IoT & Smart Infrastructure'
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      description: 'Short summary of the post'
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime'
    },
    {
      name: 'sections',
      title: 'Blog Content Sections',
      type: 'array',
      description: 'Divide the blog content into structured, modular sections',
      of: [
        {
          name: 'textSection',
          title: 'Text Content Section',
          type: 'object',
          fields: [
            { name: 'heading', title: 'Section Heading', type: 'string' },
            { name: 'body', title: 'Section Body Text', type: 'text' }
          ]
        },
        {
          name: 'dualCardSection',
          title: 'Dual Card Feature Section',
          type: 'object',
          fields: [
            { name: 'heading', title: 'Section Heading', type: 'string' },
            {
              name: 'cards',
              title: 'Feature Cards',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'title', title: 'Card Title', type: 'string' },
                    { name: 'desc', title: 'Card Description', type: 'text' }
                  ]
                }
              ]
            }
          ]
        },
        {
          name: 'codePlayground',
          title: 'Interactive Code Playground',
          type: 'object',
          fields: [
            { name: 'heading', title: 'Heading', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' },
            { name: 'codeSnippet', title: 'Code Snippet', type: 'text' }
          ]
        },
        {
          name: 'widgetPlaceholder',
          title: 'Interactive Widget Placeholder',
          type: 'object',
          fields: [
            {
              name: 'widgetName',
              title: 'Widget Name',
              type: 'string',
              description: 'Identifier for the widget (e.g. Telemetry, Simulator, Playground)'
            }
          ]
        }
      ]
    }
  ]
}
