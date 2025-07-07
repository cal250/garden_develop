import { CollectionConfig } from 'payload'

export const Comment: CollectionConfig = {
  slug: 'comment',
  versions: {
    maxPerDoc: 10,
  },
  admin: {
    group: 'Wellgorithm',
  },
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'sproutWellgorithm',
      type: 'relationship',
      relationTo: 'sproutWellgorithm'
    },
    {
      name: 'creator',
      type: 'relationship',
      relationTo: 'creator',
    },
    {
      name: 'type',
      type: 'relationship',
      relationTo: 'commentType',
    },
    {
      name: 'content',
      type: 'text',
    },
    {
      name: "createdOn",
      type: "date"
    },
    {
      name: "lastUpdatedOn",
      type: "date"
    },
    {
      name: 'deleted',
      type: 'radio',
      options: ['Yes', 'No'],
    },
    {
      name: "deletedOn",
      type: "date"
    }
  ],
}
