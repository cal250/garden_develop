import { CollectionConfig } from 'payload'

export const InnerDirectory: CollectionConfig = {
  slug: 'innerDirectory',
  admin: {
    // useAsTitle: 'title',
    group: 'Academy',
  },
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'quotes',
      type: 'array',
      label: 'Quotes',
      fields: [
        {
          name: 'quote',
          type: 'text',
        },
      ],
    },
    {
      name: 'helpText',
      type: 'text',
    },
  ],
}
