export default {
  name: 'productCsms',
  title: 'CRIVO CSMS Page Content',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Document Title',
      type: 'string',
      initialValue: 'CSMS Page Content',
      validation: Rule => Rule.required()
    },
    // Hero Section
    {
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        { name: 'title', title: 'Title Headline', type: 'string', placeholder: 'CONNECT THROUGH CRIVO' },
        { name: 'subtitle', title: 'Subtitle Line', type: 'string', placeholder: 'CONNECT, MONITOR, CONTROL, AND SCALE YOUR EV CHARGING INFRASTRUCTURE...' },
        { name: 'description', title: 'Short Description', type: 'text' },
        { name: 'extendedDescription', title: 'Extended Description', type: 'text' }
      ]
    },
    // Indicators
    {
      name: 'indicators',
      title: 'Metrics Indicators',
      type: 'object',
      fields: [
        { name: 'uptime', title: 'Uptime Rate (e.g. 99.98%)', type: 'string' }
      ]
    },
    // Intro Description
    {
      name: 'intro',
      title: 'Intro Description Section',
      type: 'object',
      fields: [
        { name: 'titleLine1', title: 'Title Line 1', type: 'string', placeholder: 'A Cloud-Native Operating System' },
        { name: 'titleLine2', title: 'Title Line 2', type: 'string', placeholder: 'For EV Charging Infrastructure' },
        { name: 'description', title: 'Description', type: 'text' }
      ]
    },
    // Interactive Live Demo header
    {
      name: 'demo',
      title: 'Interactive Live Demo Section',
      type: 'object',
      fields: [
        { name: 'eyebrow', title: 'Eyebrow Text', type: 'string', placeholder: 'Interactive Live Demo' },
        { name: 'titleLine1', title: 'Title Line 1', type: 'string', placeholder: 'EXPERIENCE THE' },
        { name: 'titleLine2', title: 'Title Line 2', type: 'string', placeholder: 'LIVE OPERATOR HUB' },
        { name: 'description', title: 'Description', type: 'text' }
      ]
    },
    // System Architecture / How it Works
    {
      name: 'architecture',
      title: 'System Architecture Section',
      type: 'object',
      fields: [
        { name: 'eyebrow', title: 'Eyebrow Text', type: 'string', placeholder: 'System Architecture' },
        { name: 'title', title: 'Section Title', type: 'string', placeholder: 'CONNECTING EV CHARGERS TO A SMART CENTRAL SYSTEM' },
        { name: 'description', title: 'Section Description', type: 'text' }
      ]
    },
    // Bento Feature layout
    {
      name: 'bentoFeatures',
      title: 'Bento Feature Grid Section',
      type: 'object',
      fields: [
        { name: 'eyebrow', title: 'Eyebrow Text', type: 'string', placeholder: 'Core Infrastructure Capabilities' },
        { name: 'titleLine1', title: 'Title Line 1', type: 'string', placeholder: 'COMPLETE CONTROL.' },
        { name: 'titleLine2', title: 'Title Line 2', type: 'string', placeholder: 'ANY NETWORK SIZE.' },
        { name: 'description', title: 'Description', type: 'text' }
      ]
    },
    // Technical Standards
    {
      name: 'standards',
      title: 'Technical Standards Section',
      type: 'object',
      fields: [
        { name: 'eyebrow', title: 'Eyebrow Text', type: 'string', placeholder: 'Technical Standards' },
        { name: 'titleLine1', title: 'Title Line 1', type: 'string', placeholder: 'BUILT ON INDUSTRY' },
        { name: 'titleLine2', title: 'Title Line 2', type: 'string', placeholder: 'OPEN STANDARD PROTOCOLS' },
        { name: 'description', title: 'Description', type: 'text' },
        {
          name: 'standardsList',
          title: 'Standards Bullets',
          type: 'array',
          of: [{ type: 'string' }]
        }
      ]
    },
    // Core Architecture Specs
    {
      name: 'specifications',
      title: 'CSMS Specifications Table',
      type: 'object',
      fields: [
        { name: 'title', title: 'Table Title', type: 'string', placeholder: 'CSMS Core Architecture Specifications' },
        {
          name: 'specsList',
          title: 'Specifications List',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'label', title: 'Spec Label', type: 'string' },
                { name: 'val', title: 'Spec Value', type: 'string' }
              ]
            }
          ]
        }
      ]
    },
    // CTA
    {
      name: 'cta',
      title: 'Bottom CTA Section',
      type: 'object',
      fields: [
        { name: 'eyebrow', title: 'Eyebrow Text', type: 'string', placeholder: 'Scale Smarter, Operate Faster' },
        { name: 'titleLine1', title: 'Title Line 1', type: 'string', placeholder: 'READY TO RUN YOUR' },
        { name: 'titleLine2', title: 'Title Line 2', type: 'string', placeholder: 'CHARGING NETWORK?' },
        { name: 'description', title: 'Description', type: 'text' },
        { name: 'buttonText', title: 'Button Text', type: 'string', placeholder: 'SCHEDULE A DEMO' }
      ]
    }
  ]
}
