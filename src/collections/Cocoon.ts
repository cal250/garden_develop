import { CollectionConfig } from 'payload'

export const Cocoon: CollectionConfig = {
  slug: 'cocoon',
  versions: {
    maxPerDoc: 10,
  },
  admin: {
    useAsTitle: 'name',
    components: {
      beforeListTable: [
        {
          path: '@/components/import-export/import-button.tsx',
          clientProps: {
            collection: 'cocoon',
          },
        },
      ],
    },
    group: 'Ecosystems',
  },
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'specialeco',
      type: 'relationship',
      relationTo: 'specialeco',
    },
    {
      name: 'creator',
      type: 'relationship',
      relationTo: 'creator',
    },
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'welcomeMessage',
      type: 'textarea',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'landscape',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'platformIcon',
    },
    {
      name: 'rank',
      type: 'number',
    },
    {
      name: 'step',
      type: 'number',
    },
    // {
    //   name: 'zones',
    //   type: 'relationship',
    //   relationTo: 'zone',
    //   hasMany: true,
    // },
    {
      name: 'zones',
      type: 'array',
      fields: [
        { name: 'zone', type: 'relationship', relationTo: 'zone' },
        { name: 'position', type: 'number' },
      ],
    },
    {
      name: 'colorTemplate',
      type: 'relationship',
      relationTo: 'colorTemplate',
    },
    {
      name: 'innerBoundaries',
      type: 'array',
      fields: [
        { name: 'innerTag', type: 'relationship', relationTo: 'tag' },
        { name: 'position', type: 'number' },
      ],
    },
    {
      name: 'outerBoundaries',
      type: 'array',
      fields: [
        { name: 'outerTag', type: 'relationship', relationTo: 'tag' },
        { name: 'position', type: 'number' },
      ],
    },
    {
      name: 'stars',
      type: 'array',
      fields: [
        { name: 'starTag', type: 'relationship', relationTo: 'tag' },
        { name: 'position', type: 'number' },
      ],
    },
    {
      name: 'privacy',
      type: 'radio',
      options: ['Public', 'Private'],
      defaultValue: 'Public',
    },
    {
      name: 'monochrome',
      type: 'radio',
      options: ['Yes', 'No'],
      defaultValue: 'No',
    },
    {
      name: 'createdOn',
      type: 'date',
    },
    {
      name: 'lastUpdatedOn',
      type: 'date',
    },
  ],
  endpoints: [
    {
      path: '/filter-by-creator-special-eco',
      method: 'get',
      handler: async (req: any): Promise<any> => {
        const { creator, specialEco } = req.query;
        if (!creator) {
          return Response.json({
            message: 'Missing creator query parameter',
          });
        }
        if (!specialEco) {
          return Response.json({
            message: 'Missing special eco query parameter',
          });
        }

        try {
          const cocoons = await req.payload.find({
            limit: req.query.limit as number || 10,
            collection: 'cocoon',
            where: {
              'creator': {
                equals: creator,
              },
              'specialeco': {
                equals: specialEco,
              },
            },
          });

          return Response.json(cocoons);
        } catch (error: any) {
          return Response.json(error);
        }
      }
    },
  ],
}
