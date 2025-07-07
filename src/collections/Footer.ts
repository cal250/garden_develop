import { CollectionConfig } from 'payload'

export const Footer: CollectionConfig = {
  slug: 'footer',
  versions: {
    maxPerDoc: 10,
  },
  admin: {
    useAsTitle: 'text',
    group: 'Admin',
    components: {
      beforeListTable: [
        {
          path: '@/components/import-export/import-button.tsx',
          clientProps: {
            collection: 'footer',
          },
        },
      ],
    },
  },
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'text',
      type: 'text',
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'colorTemplate',
      type: 'relationship',
      relationTo: 'colorTemplate',
    },
  ],
}
