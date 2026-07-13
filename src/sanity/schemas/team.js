export default {
  name: 'team',
  title: 'Team Members',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Member Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'role',
      title: 'Role / Designation',
      type: 'string',
      placeholder: 'e.g. Lead Firmware Engineer'
    },
    {
      name: 'bio',
      title: 'Biography',
      type: 'text'
    },
    {
      name: 'image',
      title: 'Member Photo',
      type: 'image',
      options: {
        hotspot: true
      }
    }
  ]
}
