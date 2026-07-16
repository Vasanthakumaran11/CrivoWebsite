export default {
  name: 'bookMeetPage',
  title: 'Book A Meet Page Content',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Document Title',
      type: 'string',
      initialValue: 'Book A Meet Page Content',
      validation: Rule => Rule.required()
    },
    {
      name: 'leftSideContent',
      title: 'Left Side Text Panel Content',
      type: 'object',
      fields: [
        {
          name: 'eyebrow',
          title: 'Eyebrow Tag',
          type: 'string',
          placeholder: 'Book a Meet'
        },
        {
          name: 'titleLine1',
          title: 'Title Line 1',
          type: 'string',
          placeholder: 'GET STARTED'
        },
        {
          name: 'titleLine2',
          title: 'Title Line 2',
          type: 'string',
          placeholder: 'TODAY'
        },
        {
          name: 'description',
          title: 'Description Paragraph',
          type: 'text'
        }
      ]
    }
  ]
}
