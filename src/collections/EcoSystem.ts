import { CollectionConfig } from 'payload'

export const EcoSystem: CollectionConfig = {
  slug: 'ecosystem',
  versions: {
    maxPerDoc: 10,
  },
  admin: {
    useAsTitle: 'name',
    group: 'Ecosystems',
    components: {
      beforeListTable: [
        {
          path: '@/components/import-export/import-button.tsx',
          clientProps: {
            collection: 'ecosystem',
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
      name: 'name',
      type: 'text',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'rank',
      type: 'number',
    },
    {
      name: 'colorTemplate',
      type: 'relationship',
      relationTo: 'colorTemplate',
    },
    {
      name: 'createdOn',
      type: 'date',
    },
    {
      name: 'createdBy',
      type: 'relationship',
      relationTo: 'admin',
    },
    {
      name: 'lastUpdatedOn',
      type: 'date',
    },
    {
      name: 'lastUpdatedBy',
      type: 'relationship',
      relationTo: 'admin',
    },
  ],

  hooks: {
    beforeChange: [
      ({ req, operation, data }) => {
        const user = req.user

        if (operation === 'create') {
          return {
            ...data,
            createdOn: new Date(),
            createdBy: user?.id,
            lastUpdatedOn: new Date(),
            lastUpdatedBy: user?.id,
          }
        }

        if (operation === 'update') {
          console.log('update', user)
          return {
            ...data,
            lastUpdatedOn: new Date(),
            lastUpdatedBy: user?.id,
          }
        }

        return data
      },
    ],
  },
}
