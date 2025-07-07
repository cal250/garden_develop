import { CollectionConfig } from 'payload'

export const Garden: CollectionConfig = {
  slug: 'garden',
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
            collection: 'garden',
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
      name: 'rank',
      type: 'number',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'sproutWellgorithms',
      type: 'relationship',
      hasMany: true,
      relationTo: 'sproutWellgorithm',
    },
    {
      name: 'seedWellgorithms',
      type: 'relationship',
      hasMany: true,
      relationTo: 'seedWellgorithm',
    },
    {
      name: 'creator',
      type: 'relationship',
      relationTo: 'creator',
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
  hooks: {
    beforeChange: [
      ({ req, operation, data }) => {
        const user = req.user;

        if (operation === 'create') {
          return {
            ...data,
            createdOn: new Date(),
            lastUpdatedOn: new Date()
          };
        }

        if (operation === 'update') {
          return {
            ...data,
            lastUpdatedOn: new Date()
          };
        }

        return data;
      }
    ]
  },
}
