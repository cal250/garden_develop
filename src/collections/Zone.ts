import { CollectionConfig } from 'payload'

export const Zone: CollectionConfig = {
  slug: 'zone',
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
            collection: 'zone',
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
      name: 'usage',
      type: 'number',
    },
    {
      name: 'ecosystem',
      type: 'relationship',
      relationTo: 'ecosystem',
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
      name: 'lastUpdatedOn',
      type: 'date',
    },
    {
      name: 'weedSeedPreference',
      type: 'radio',
      options: ['Weed', 'Seed'],
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
            lastUpdatedOn: new Date(),
          };
        }

        if (operation === 'update') {
          console.log('update', user)
          return {
            ...data,
            lastUpdatedOn: new Date(),
          };
        }

        return data;
      }
    ]
  },
  endpoints: [
    {
      path: '/filter-by-eco',
      method: 'get',
      handler: async (req: any): Promise<any> => {
        const { eco } = req.query;
        if (!eco) {
          return Response.json({
            message: 'Missing ecosystem query parameter',
          });
        }

        try {
          const zones = await req.payload.find({
            limit: req.query.limit as number || 10,
            collection: 'zone',
            where: {
              'ecosystem': {
                equals: eco,
              },
            },
          });

          return Response.json(zones);
        } catch (error: any) {
          return Response.json(error);
        }
      }
    },

    {
      path: '/filter-by-eco-seed-or-weed',
      method: 'get',
      handler: async (req: any): Promise<any> => {
        const { eco, seedweed } = req.query;
        console.log(seedweed)
        if (!eco) {
          return Response.json({
            message: 'Missing ecosystem query parameter',
          });
        }

        try {
          const zones = await req.payload.find({
            limit: req.query.limit as number || 10,
            collection: 'zone',
            where: {
              and: [
                {
                  'ecosystem': {
                    equals: eco,
                  },
                },
                {
                  'weedSeedPreference': {
                    equals: seedweed,
                  },
                },
                // {
                //   and: [
                //     {
                //       'weedSeedPreference': {
                //         equals: seedweed,
                //       },
                //     }
                //   ],
                // },
              ],
            },
          });

          return Response.json(zones);
        } catch (error: any) {
          return Response.json(error);
        }
      }
    },
  ],
}
