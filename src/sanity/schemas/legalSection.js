export default {
  name: 'legalSection',
  title: 'Legal Page Section',
  type: 'object',
  fields: [
    { name: 'title', title: 'Section Title', type: 'string', validation: Rule => Rule.required() },
    {
      name: 'isList',
      title: 'Render as Bullet List',
      type: 'boolean',
      initialValue: false,
      description: 'Turn on to render the body paragraphs as a bulleted list instead of plain paragraphs'
    },
    {
      name: 'body',
      title: 'Body Paragraphs',
      type: 'array',
      of: [{ type: 'text' }],
      description: 'Each entry renders as its own paragraph (or bullet item)'
    }
  ]
}
