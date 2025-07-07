import { CollectionConfig } from 'payload'

const Read: CollectionConfig = {
  slug: 'read',
  admin: {
    group: 'Journals',
  },
  fields: [
    {
      name: 'journalID',
      type: 'relationship',
      relationTo: 'sproutWellgorithm',
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'creator',
    },
    {
      name: 'switchID',
      type: 'relationship',
      relationTo: 'tag',
    },
    {
      name: 'activators',
      type: 'array',
      label: 'activators',
      interfaceName: 'activators',
      fields: [
        {
          name: 'tag',
          type: 'relationship',
          relationTo: 'tag',
        },
        {
          name: 'status',
          type: 'radio',
          options: ['On', 'Off'],
        },
      ],
      maxRows: 6,
    },
    {
      name: 'awarenestStage',
      type: 'radio',
      options: ['Caterpillar', 'Cocoon', 'Butterfly'],
    },
  ],
}

export default Read
