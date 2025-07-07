import payload from 'payload'
import { CollectionConfig } from 'payload'

export const Stack: CollectionConfig = {
  slug: 'stack',
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
            collection: 'stack',
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
      // {
      //   name: 'tagIcons',
      //   type: 'array',
      //   fields: [
      //     {
      //       name: 'leftEmoji',
      //       type: 'upload',
      //       relationTo: 'media',
      //     },
      //     {
      //       name: 'tags',
      //       type: 'relationship',
      //       relationTo: 'tag',
      //       hasMany: true,
      //     },
      //     {
      //       name: 'rightEmoji',
      //       type: 'upload',
      //       relationTo: 'media',
      //     },
      //   ],
      // },

      {
        name: 'leftIcon',
        type: 'relationship',
        relationTo: 'stackIcon',
      },
      {
        name: 'tags',
        type: 'relationship',
        relationTo: 'tag',
        hasMany: true,
      },
      {
        name: 'rightIcon',
        type: 'relationship',
        relationTo: 'stackIcon',
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
