import { CollectionConfig } from 'payload'

export const XBT: CollectionConfig = {
  slug: 'xbt',
  admin: {
    group: 'Journals',
  },
  access: {
    read: () => true,
    update: () => true,
    create: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'type',
      type: 'radio',
      options: ['custom', 'default'],
    },
    {
      name: 'content',
      type: 'textarea',
    },
  ],
}
