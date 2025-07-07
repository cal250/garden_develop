import payload from 'payload'
import { CollectionConfig } from 'payload'

export const StackIcon: CollectionConfig = {
  slug: 'stackIcon',
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
            collection: 'stackIcon',
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
        name: 'icon',
        type: 'upload',
        relationTo: "media"
      },
      {
        name: 'type',
        type: 'radio',
        options: ['before', 'after'],
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
