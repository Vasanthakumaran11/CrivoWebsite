export default {
  name: 'siteFooter',
  title: 'Footer Content',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Document Title',
      type: 'string',
      initialValue: 'Footer Content',
      validation: Rule => Rule.required()
    },
    {
      name: 'bannerTitle',
      title: 'Footer Banner Title',
      type: 'string',
      placeholder: 'e.g. Get Ready to Grow Your Business'
    },
    {
      name: 'email',
      title: 'Info/Support Email',
      type: 'string',
      placeholder: 'info@crivo.in'
    },
    {
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      placeholder: '+91 96007 60063'
    },
    {
      name: 'instagramLink',
      title: 'Instagram Link',
      type: 'url'
    },
    {
      name: 'youtubeLink',
      title: 'YouTube Link',
      type: 'url'
    },
    {
      name: 'xLink',
      title: 'X (formerly Twitter) Link',
      type: 'url'
    },
    {
      name: 'linkedinLink',
      title: 'LinkedIn Company Link',
      type: 'url'
    },
    {
      name: 'copyrightText',
      title: 'Copyright Text',
      type: 'string',
      placeholder: 'e.g. © 2026 Crivo. All Rights Reserved.'
    },
    {
      name: 'madeByText',
      title: 'Signature Text',
      type: 'string',
      placeholder: 'e.g. Made by Crivo'
    }
  ]
}
