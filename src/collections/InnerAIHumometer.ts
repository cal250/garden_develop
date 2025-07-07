import payload from 'payload'
import { CollectionConfig } from 'payload'

export const InnerAIHumometer: CollectionConfig = {
  slug: 'innerAIHumometer',
  versions: {
    maxPerDoc: 10,
  },
  admin: {
    useAsTitle: 'name',
    group: 'Wellgorithm',
    components: {
      beforeListTable: [
        {
          path: '@/components/import-export/import-button.tsx',
          clientProps: {
            collection: 'innerAIHumometer',
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
      name: 'sproutWellgorithm',
      type: 'relationship',
      relationTo: 'sproutWellgorithm',
    },
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'bigIdea',
      type: 'number',
    },
    {
      name: 'mainPoints',
      type: 'number',
    },
    {
      name: 'factNFlourishes',
      type: 'number',
    },
    {
      name: 'editing',
      type: 'number',
    },
    {
      name: 'finalPolish',
      type: 'number',
    },
    {
      name: 'average',
      type: 'number',
    },
    {
      name: 'createdOn',
      type: 'date',
    },
    {
      name: 'creator',
      type: 'relationship',
      relationTo: 'creator',
    },
    {
      name: 'lastUpdatedOn',
      type: 'date',
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
            creator: user?.id,
            lastUpdatedOn: new Date(),
          }
        }

        if (operation === 'update') {
          console.log('update', user)
          return {
            ...data,
            lastUpdatedOn: new Date(),
          }
        }

        return data
      },
    ],
  },
}
