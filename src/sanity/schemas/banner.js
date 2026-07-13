export default {
  name: 'banner',
  title: 'Homepage Banners',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Banner Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string'
    },
    {
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
      placeholder: 'e.g. DISCOVER CHARGERS'
    },
    {
      name: 'ctaLink',
      title: 'CTA Button Link',
      type: 'string',
      placeholder: 'e.g. /product'
    }
  ]
}
