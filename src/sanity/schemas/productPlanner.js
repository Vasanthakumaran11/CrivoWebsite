export default {
  name: 'productPlanner',
  title: 'Smart EV Trip Planner Page Content',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Document Title',
      type: 'string',
      initialValue: 'Planner Page Content',
      validation: Rule => Rule.required()
    },
    // Hero Section
    {
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        { name: 'titleLine1', title: 'Title Line 1', type: 'string', placeholder: 'AI SMART TRIP' },
        { name: 'titleLine2', title: 'Title Line 2', type: 'string', placeholder: 'PLANNER SYSTEM' },
        { name: 'subtitle', title: 'Subtitle Line', type: 'string', placeholder: 'PREDICT RANGE, OPTIMIZE ROUTE STOPS, AND TRANSACT...' },
        { name: 'description', title: 'Description', type: 'text' }
      ]
    },
    // Intro Section
    {
      name: 'intro',
      title: 'Intro Section',
      type: 'object',
      fields: [
        { name: 'titleLine1', title: 'Title Line 1', type: 'string', placeholder: 'Predictive Trip Intelligence' },
        { name: 'titleLine2', title: 'Title Line 2', type: 'string', placeholder: 'Designed for the Indian Terrain' },
        { name: 'description', title: 'Description', type: 'text' }
      ]
    },
    // Simulator metadata
    {
      name: 'simulator',
      title: 'Simulator Section Info',
      type: 'object',
      fields: [
        { name: 'eyebrow', title: 'Eyebrow Text', type: 'string', placeholder: 'Route Intelligence Simulator' },
        { name: 'titleLine1', title: 'Title Line 1', type: 'string', placeholder: 'EXPERIENCE THE AI' },
        { name: 'titleLine2', title: 'Title Line 2', type: 'string', placeholder: 'ROUTE ADVISER' },
        { name: 'routeName', title: 'Route Name Title', type: 'string', placeholder: 'Mumbai ➔ Pune ➔ Kolhapur' },
        { name: 'description', title: 'Description', type: 'text' }
      ]
    },
    // Unified Wallet Section
    {
      name: 'wallet',
      title: 'Unified Wallet Section',
      type: 'object',
      fields: [
        { name: 'eyebrow', title: 'Eyebrow Text', type: 'string', placeholder: 'Unified EV Wallet' },
        { name: 'titleLine1', title: 'Title Line 1', type: 'string', placeholder: 'ONE WALLET.' },
        { name: 'titleLine2', title: 'Title Line 2', type: 'string', placeholder: 'EVERY CHARGER.' },
        { name: 'description', title: 'Description', type: 'text' }
      ]
    },
    // Core Capabilities / Bento Modules Grid
    {
      name: 'capabilities',
      title: 'Core Capabilities Section',
      type: 'object',
      fields: [
        { name: 'eyebrow', title: 'Eyebrow Text', type: 'string', placeholder: 'Core Capabilities' },
        { name: 'titleLine1', title: 'Title Line 1', type: 'string', placeholder: 'EVERYTHING YOUR' },
        { name: 'titleLine2', title: 'Title Line 2', type: 'string', placeholder: 'EV JOURNEY NEEDS.' },
        { name: 'countText', title: 'Capabilities Count Text', type: 'string', placeholder: '06 MODULES COMPLETE' },
        {
          name: 'modulesList',
          title: 'Modules List',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'title', title: 'Module Title', type: 'string' },
                { name: 'desc', title: 'Module Description', type: 'text' }
              ]
            }
          ]
        }
      ]
    },
    // AI Engine Architecture
    {
      name: 'aiEngine',
      title: 'AI Engine Architecture Section',
      type: 'object',
      fields: [
        { name: 'eyebrow', title: 'Eyebrow Text', type: 'string', placeholder: 'AI Engine Architecture' },
        { name: 'titleLine1', title: 'Title Line 1', type: 'string', placeholder: 'PREDICTIVE ENGINE' },
        { name: 'titleLine2', title: 'Title Line 2', type: 'string', placeholder: 'SPECIFICATIONS' },
        { name: 'description', title: 'Description', type: 'text' }
      ]
    },
    // Specifications
    {
      name: 'specifications',
      title: 'Planner Specifications Table',
      type: 'object',
      fields: [
        { name: 'title', title: 'Table Title', type: 'string', placeholder: 'Core Planner Specifications' },
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
    // CTA Section
    {
      name: 'cta',
      title: 'Bottom CTA Section',
      type: 'object',
      fields: [
        { name: 'eyebrow', title: 'Eyebrow Text', type: 'string', placeholder: 'Experience Smart Mobility' },
        { name: 'titleLine1', title: 'Title Line 1', type: 'string', placeholder: 'PLAN YOUR TRIP' },
        { name: 'titleLine2', title: 'Title Line 2', type: 'string', placeholder: 'WITHOUT RANGE ANXIETY.' },
        { name: 'description', title: 'Description', type: 'text' }
      ]
    }
  ]
}
