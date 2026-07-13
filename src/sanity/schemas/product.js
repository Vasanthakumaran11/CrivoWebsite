export default {
  name: 'product',
  title: 'Product Cards',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'type',
      title: 'Product Type',
      type: 'string',
      placeholder: 'e.g. DC Fast Charger, AC Charging Station'
    },
    {
      name: 'power',
      title: 'Max Power Output',
      type: 'string',
      placeholder: 'e.g. 120 kW, 22 kW'
    },
    {
      name: 'connectors',
      title: 'Connectors/Interface',
      type: 'string',
      placeholder: 'e.g. Dual CCS-2, Type-2 Cable'
    },
    {
      name: 'price',
      title: 'Price Point',
      type: 'string'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    }
  ]
}
