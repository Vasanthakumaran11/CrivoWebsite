export default {
  name: 'leader',
  title: 'Leaders',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'role',
      title: 'Title / Designation',
      type: 'string'
    },
    {
      name: 'email',
      title: 'Email ID',
      type: 'string'
    },
    {
      name: 'linkedin',
      title: 'LinkedIn Profile URL',
      type: 'url'
    },
    {
      name: 'image',
      title: 'Leader Photo',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first. Bharanidharan (0), Gokulnath (1), and Hareeni (2) are pinned to the front — leave this at the default for any new leader so they append after the pinned three.',
      initialValue: 100
    },
    {
      name: 'isVisible',
      title: 'Show on website',
      type: 'boolean',
      initialValue: true,
      description: 'Turn off to hide this leader from the public site without deleting their record'
    }
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }]
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      isVisible: 'isVisible',
      media: 'image'
    },
    prepare({ title, subtitle, isVisible, media }) {
      const status = isVisible === false ? '🔴 Hidden' : '🟢 Visible';
      return {
        title,
        subtitle: subtitle ? `${status} · ${subtitle}` : status,
        media
      };
    }
  }
}
