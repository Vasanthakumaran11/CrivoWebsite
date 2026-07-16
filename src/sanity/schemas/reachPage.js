export default {
  name: 'reachPage',
  title: 'Reach Us Page Content',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Document Title',
      type: 'string',
      initialValue: 'Reach Us Page Content',
      validation: Rule => Rule.required()
    },
    // Hero
    {
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        { name: 'eyebrow', title: 'Eyebrow', type: 'string', placeholder: 'Get In Touch' },
        { name: 'titleLine1', title: 'Title Line 1', type: 'string', placeholder: 'REACH' },
        { name: 'titleLine2', title: 'Title Line 2', type: 'string', placeholder: 'US.' },
        { name: 'description', title: 'Description', type: 'text' }
      ]
    },
    // Contact Info (Direct Phone, Email, Address)
    {
      name: 'contactDetails',
      title: 'Direct Contact Info',
      type: 'object',
      fields: [
        { name: 'email', title: 'Email ID', type: 'string', placeholder: 'info@crivo.in' },
        { name: 'phone', title: 'Phone Number', type: 'string', placeholder: '+91 96007 60063' },
        { name: 'address', title: 'Office Address', type: 'text', placeholder: '221 R.K Building, Uthukuli, Tiruppur - 638751' }
      ]
    },
    // Let's Work Together
    {
      name: 'partnerSection',
      title: 'Let\'s Work Together Section',
      type: 'object',
      fields: [
        { name: 'eyebrow', title: 'Eyebrow Text', type: 'string', placeholder: 'Let\'s Work Together' },
        { name: 'titleLine1', title: 'Title Line 1', type: 'string', placeholder: 'PARTNER WITH US TO BUILD' },
        { name: 'titleLine2', title: 'Title Line 2', type: 'string', placeholder: 'THE ECOSYSTEM' },
        // Column 1: Network CPO Integration
        {
          name: 'cpoColumn',
          title: 'CPO Integration Column',
          type: 'object',
          fields: [
            { name: 'tag', title: 'Tag Label', type: 'string', placeholder: 'Network CPO Integration' },
            { name: 'title', title: 'Column Title', type: 'string' },
            { name: 'description', title: 'Column Description', type: 'text' },
            { name: 'buttonText', title: 'Button Text', type: 'string' }
          ]
        },
        // Column 2: Strategic Amenity Mapping
        {
          name: 'amenityColumn',
          title: 'Amenity Mapping Column',
          type: 'object',
          fields: [
            { name: 'tag', title: 'Tag Label', type: 'string', placeholder: 'Strategic Amenity Mapping' },
            { name: 'title', title: 'Column Title', type: 'string' },
            { name: 'description', title: 'Column Description', type: 'text' },
            { name: 'buttonText', title: 'Button Text', type: 'string' }
          ]
        }
      ]
    },
    // Customer assistance section (Emergency Desk)
    {
      name: 'customerAssistance',
      title: 'Customer Assistance (Emergency Desk)',
      type: 'object',
      fields: [
        { name: 'bannerTitle', title: 'Banner Title / Header', type: 'string', placeholder: 'CUSTOMER ASSISTANCE. THE EMERGENCY DESK' },
        // Support email content
        {
          name: 'supportEmailBox',
          title: 'Support Email Box',
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string', placeholder: 'Direct Support Email' },
            { name: 'description', title: 'Support Email Content', type: 'text' },
            { name: 'email', title: 'Support Email Address', type: 'string', placeholder: 'support@crivo.in' }
          ]
        },
        // Urgent support line
        {
          name: 'urgentSupportBox',
          title: 'Urgent Support Box',
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string', placeholder: 'Hotline Call Support' },
            { name: 'description', title: 'Urgent Support Line Content', type: 'text' },
            { name: 'phone', title: 'Urgent Support Phone Number', type: 'string', placeholder: '+91 96007 60063' }
          ]
        },
        // Get Help Console
        {
          name: 'getHelpConsole',
          title: 'Get Help Console (Incident Form)',
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string', placeholder: 'Incident Report Gate' },
            { name: 'description', title: 'Get Help Console Content Description', type: 'text' },
            { name: 'buttonText', title: 'Button Text', type: 'string', placeholder: 'Submit Incident' }
          ]
        }
      ]
    },
    // Office directory section
    {
      name: 'directory',
      title: 'Office Directory Section',
      type: 'object',
      fields: [
        { name: 'eyebrow', title: 'Eyebrow', type: 'string', placeholder: 'Global Directory' },
        { name: 'titleLine1', title: 'Title Line 1', type: 'string', placeholder: 'OFFICE' },
        { name: 'titleLine2', title: 'Title Line 2', type: 'string', placeholder: 'DIRECTORY.' },
        {
          name: 'cards',
          title: 'Directory Cards',
          type: 'array',
          description: 'Store each directory card details (Contact, Office Hours, Socials, Location, Support, Apply)',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'title', title: 'Card Title', type: 'string', validation: Rule => Rule.required() },
                { name: 'description', title: 'Short Description', type: 'text' },
                { name: 'address', title: 'Address / Details', type: 'text' },
                { name: 'phone', title: 'Phone Number', type: 'string' },
                { name: 'email', title: 'Email Address', type: 'string' },
                { name: 'mapLink', title: 'Google Maps Link URL', type: 'url' },
                { name: 'hoursMonSat', title: 'Hours (Mon-Sat)', type: 'string' },
                { name: 'hoursSun', title: 'Hours (Sunday)', type: 'string' }
              ]
            }
          ]
        }
      ]
    }
  ]
}
