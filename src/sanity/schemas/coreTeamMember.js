export default {
  name: 'coreTeamMember',
  title: 'Core Team Members',
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
      name: 'github',
      title: 'GitHub Profile URL',
      type: 'url'
    },
    {
      name: 'initial',
      title: 'Initial (e.g. V)',
      type: 'string',
      description: 'Fallback avatar letter shown when no photo is set'
    },
    {
      name: 'image',
      title: 'Member Photo',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      initialValue: 0
    },
    {
      name: 'isVisible',
      title: 'Show on website',
      type: 'boolean',
      initialValue: true,
      description: 'Turn off to hide this member from the public site without deleting their record'
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
