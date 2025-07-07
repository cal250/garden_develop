import { CollectionConfig } from 'payload'

export const Hero: CollectionConfig = {
  slug: 'hero',
  versions: {
    maxPerDoc: 10,
  },
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  admin: {
    useAsTitle: 'name',
    group: 'Journals',
    components: {
      beforeListTable: [
        {
          path: '@/components/import-export/import-button.tsx',
          clientProps: {
            collection: 'hero',
          },
        },
      ],
    },
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'creator',
      hasMany: true,
    },
  ],
}
