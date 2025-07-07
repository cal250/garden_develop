import payload from 'payload'
import { CollectionConfig } from 'payload'

export const TagType: CollectionConfig = {
  slug: 'tagType',
  versions: {
    maxPerDoc: 10,
  },
  admin: {
    useAsTitle: 'name',
    group: 'Tags',
    components: {
      beforeListTable: [
        {
          path: '@/components/import-export/import-button.tsx',
          clientProps: {
            collection: 'tagType',
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
        name: 'key',
        type: 'text',
      },
      {
        name: 'description',
        type: 'text',
      },
      {
        name: "createdOn",
        type: "date"
      },
      {
        name: "createdBy",
        type: "relationship",
        relationTo: "admin"
      },
      {
        name: "lastUpdatedOn",
        type: "date"
      },
      {
        name: "lastUpdatedBy",
        type: "relationship",
        relationTo: "admin"
      },
    ],
    hooks: {
      beforeChange: [
        ({ req, operation, data }) => {
          const user = req.user;
  
          if (operation === 'create') {
            return {
              ...data,
              createdOn: new Date(),
              createdBy: user?.id,
              lastUpdatedOn: new Date(),
              lastUpdatedBy: user?.id
            };
          }
  
          if (operation === 'update') {
            console.log('update', user)
            return {
              ...data,
              lastUpdatedOn: new Date(),
              lastUpdatedBy: user?.id,
            };
          }
  
          return data;
        }
      ]
    },
  }
