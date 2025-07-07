import { APIError, getPayload } from 'payload'
import configPromise from '@payload-config'
import { CollectionConfig } from 'payload'

export const SeedWellgorithm: CollectionConfig = {
  slug: 'seedWellgorithm',
  versions: {
    maxPerDoc: 10,
    drafts: {
      autosave: {
        interval: 100,
      },
    },
  },
  admin: {
    useAsTitle: 'titles_concat',
    group: 'Wellgorithm',
    components: {
      beforeListTable: [
        {
          path: '@/components/import-export/import-button.tsx',
          clientProps: {
            collection: 'seedWellgorithm',
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
      name: 'titles',
      type: 'text',
      hasMany: true,
      hooks: {
        // afterRead: [
        //   async ({ req, operation, data }) => {
        //     console.log(operation, req.url)
        //     if (data) {
        //       return data.titles_copy?.length > 1 ? [...data.titles_copy, data.titles_copy?.join('∫')] : data.titles_copy
        //     }
        //   },
        // ],
        // afterRead: [decryptField], // this is only needed if we want user to see this data in it's real format. for passwords we don't want anyone to see the data in it's real format
      },
    },
    {
      name: 'titles_concat',
      type: 'text',
      hasMany: true,
      hooks: {
        afterRead: [
          async ({ req, operation, data }) => {
            console.log(operation, req.url)
            if (data) {
              return data.titles?.join('∫')
            }
          },
        ],
        // afterRead: [decryptField], // this is only needed if we want user to see this data in it's real format. for passwords we don't want anyone to see the data in it's real format
      },
    },
    {
      name: 'wellgorithmType',
      type: 'relationship',
      relationTo: 'wellgorithmType',
    },
    // {
    //   name: 'titles',
    //   type: 'array',
    //   fields: [{ name: 'title', type: 'text' }],
    // },
    {
      name: 'sub_title',
      type: 'text',
      required: false,
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
      name: 'intention',
      type: 'textarea',
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
      name: 'rank',
      type: 'number',
    },
    {
      name: 'usageCount',
      type: 'number',
    },
    {
      name: 'ecosystem',
      type: 'relationship',
      relationTo: 'ecosystem',
    },
    {
      name: 'zone',
      type: 'relationship',
      relationTo: 'zone',
      hasMany: true
    },
    {
      name: 'cocoon',
      type: 'relationship',
      relationTo: 'cocoon',
    },
    {
      name: 'wellgorithmActions',
      type: 'array',
      fields: [{ name: 'actions', type: 'relationship', relationTo: 'wellgorithmAction' }],
    },
    {
      name: 'stack',
      type: 'relationship',
      relationTo: 'stack',
    },
    {
      name: 'adminCreated',
      type: 'radio',
      options: ['Yes', 'No'],
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
    {
      name: 'deleted',
      type: 'radio',
      options: ['Yes', 'No'],
    },
    {
      name: 'deletedOn',
      type: 'date',
    },
    {
      name: 'creator',
      type: 'relationship',
      relationTo: 'creator',
    },
    {
      name: 'year',
      type: 'text',
    },
    {
      name: 'isMaster',
      type: 'checkbox',
    },
    {
      name: 'masterSeed',
      type: 'relationship',
      relationTo: 'seedWellgorithm',
    },
    {
      name: 'symbol',
      type: 'radio',
      options: ['large', 'small'],
    },
    {
      name: 'weedSeedPreference',
      type: 'radio',
      options: ['Weed', 'Seed'],
    },

    // {
    //   name: 'url',
    //   type: 'text',
    //   hooks: {
    //     afterChange: [
    //       async ({ originalDoc, req }) => {
    //         if (!originalDoc.url) {
    //           const updatedDoc = await payload.update({
    //             collection: 'wellgorithm',
    //             id: originalDoc.id,
    //             data: {
    //               url: `/api/wellgorithm/${originalDoc.id}`,
    //             },
    //           })
    //           return updatedDoc
    //         }
    //       },
    //     ],
    //   },
    // },
  ],

  hooks: {
    beforeChange: [
      async ({ req, operation, data }) => {
        const user = req.user
        const payload = await getPayload({ config: configPromise })

        if (operation === 'create' && data['_status'] !== 'draft') {
          // Check for existing tag with the same name
          const wellgorithmType = await payload.findByID({
            collection: 'wellgorithmType',
            id: data.wellgorithmType,
          })
          if (!wellgorithmType || wellgorithmType?.numberOfTitles !== data.titles?.length) {
            throw new APIError(
              'The number of titles provided does not match the number of titles in the wellgorithm type selected',
              400,
            )
          }
          return {
            ...data,
            createdOn: new Date(),
            createdBy: user?.collection === 'admin' ? user?.id : null,
            lastUpdatedOn: new Date(),
            lastUpdatedBy: user?.collection === 'admin' ? user?.id : null,
            creator: user?.collection === 'creator' ? user?.id : null,
          }
        }

        if (operation === 'update' && data['_status'] !== 'draft') {
          // Check for existing tag with the same name
          const wellgorithmType = await payload.findByID({
            collection: 'wellgorithmType',
            id: data.wellgorithmType,
          })
          if (!wellgorithmType || wellgorithmType?.numberOfTitles !== data.titles?.length) {
            throw new APIError(
              'The number of titles provided does not match the number of titles in the wellgorithm type selected',
              400,
            )
          }
          return {
            ...data,
            lastUpdatedOn: new Date(),
            lastUpdatedBy: user?.collection === 'admin' ? user?.id : null,
          }
        }

        return data
      },
    ],
  },
  endpoints: [
    {
      path: '/by-ecosystem',
      method: 'get',
      handler: async (req: any): Promise<any> => {
        const { ecosystemId } = req.query
        const payload = await getPayload({ config: configPromise })

        try {
          const wellgorithms = await payload.find({
            collection: 'seedWellgorithm',
            where: {
              ecosystem: {
                equals: ecosystemId,
              },
            },
          })
          return wellgorithms
        } catch (error) {
          return error
        }
      },
    },
  ],
}
