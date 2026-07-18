export default {
  name: 'clientLogo',
  title: 'Client Logos',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Client / Company Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'logo',
      title: 'Logo Image',
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required()
    },
    {
      name: 'website',
      title: 'Website URL (optional)',
      type: 'url',
      description: 'If set, the logo links out to this URL on the site'
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first. Leave blank to sort alphabetically after ordered ones.'
    }
  ],
  preview: {
    select: { title: 'name', subtitle: 'website', media: 'logo' }
  }
}
