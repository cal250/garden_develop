import { isAdmin } from '../access/isAdmin'
import { isAdminOrSelf } from '../access/isAdminOrSelf'
import { CollectionConfig } from 'payload'

const Dimension: CollectionConfig = {
  slug: 'dimension',
  admin: {
    useAsTitle: 'name',
    group: 'Activators',
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
    // Everyone can create new users
    create: () => true,
    // Admins can read all, but any other logged in user can only read themselves
    read: () => true, // need to change to isAdminOrSelf
    // Admins can update all, but any other logged in user can only update themselves
    update: isAdminOrSelf,
    // Only admins can delete
    delete: isAdmin,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'description',
      type: 'text',
    },
    {
      name: 'collectionOfTags',
      type: 'relationship',
      relationTo: 'tag',
      hasMany: true,
      // filterOptions: 'title'
    },
    {
      name: "rank",
      type: "number"
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
    {
      // Not sure what this means, keeping for now
      name: 'slider',
      type: 'number',
      max: 10,
      min: 1,
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

export default Dimension
