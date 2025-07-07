import { CollectionConfig } from 'payload'

export const SproutWellgorithm: CollectionConfig = {
  slug: 'sproutWellgorithm',
  versions: {
    maxPerDoc: 10,
    drafts: {
      autosave: {
        interval: 100,
      },
    },
  },
  admin: {
    useAsTitle: 'title',
    group: 'Wellgorithm',
    components: {
      beforeListTable: [
        {
          path: '@/components/import-export/import-button.tsx',
          clientProps: {
            collection: 'sproutWellgorithm',
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
      name: 'seedWelgorithm',
      type: 'relationship',
      relationTo: 'seedWellgorithm',
    },
    {
      name: 'intention',
      type: 'textarea',
    },
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'subTitle',
      type: 'text',
    },
    {
      name: 'contents',
      type: 'array',
      fields: [
        {
          name: 'content',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'innerAIHumometer',
      type: 'relationship',
      relationTo: 'innerAIHumometer',
    },
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'points',
      type: 'number',
    },
    {
      name: 'pointsType',
      type: 'relationship',
      relationTo: 'tag',
      filterOptions: {
        'type.key': {
                equals: 'points',
              }
      }
    },
    {
      name: 'stack',
      type: 'relationship',
      relationTo: 'stack',
    },
    {
      name: 'colorTemplate',
      type: 'relationship',
      relationTo: 'colorTemplate',
    },
    {
      name: 'weatherTag',
      type: 'relationship',
      relationTo: 'tag',
    },
    {
      name: 'generalTags',
      type: 'relationship',
      relationTo: 'tag',
      hasMany: true,
    },
    {
      name: 'privacy',
      type: 'radio',
      options: ['Public', 'Private'],
      defaultValue: 'Public',
    },
    {
      name: 'contributors',
      type: 'relationship',
      relationTo: 'creator',
      hasMany: true,
    },
    {
      name: 'rank',
      type: 'number',
    },
    {
      name: 'creator',
      type: 'relationship',
      relationTo: 'creator',
    },
    {
      name: 'createdOn',
      type: 'date',
    },
    {
      name: 'lastUpdatedOn',
      type: 'date',
    },
    {
      name: 'deleted',
      type: 'radio',
      options: ['Yes', 'No'],
    },
    {
      name: 'deletedOn',
      type: 'date',
    },
  ],

  hooks: {
    beforeChange: [
      async ({ req, operation, data }) => {
        const user = req.user

        if (operation === 'create' && data['_status'] !== 'draft') {
          return {
            ...data,
            createdOn: new Date(),
            lastUpdatedOn: new Date(),
            creator: user?.collection === 'creator' ? user?.id : data?.creator || null,
          }
        }

        if (operation === 'update' && data['_status'] !== 'draft') {
          return {
            ...data,
            lastUpdatedOn: new Date(),
            creator: user?.collection === 'creator' ? user?.id : data?.creator || null,
          }
        }

        return data
      },
    ],
  },
}
