import configPromise from '@payload-config'
import { APIError, getPayload } from 'payload'
import { CollectionConfig } from 'payload'
import lodash from 'lodash'

export const Tag: CollectionConfig = {
  slug: 'tag',
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
            collection: 'tag',
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
      unique: true,
      required: true,
    },
    {
      name: 'description',
      type: 'text',
    },
    {
      name: 'type',
      type: 'relationship',
      relationTo: 'tagType',
    },
    {
      name: 'tagTitles',
      type: 'array',
      fields: [{ name: 'tagTitle', type: 'text' }],
    },
    {
      name: 'creator',
      type: 'relationship',
      relationTo: 'creator',
    },
    {
      name: 'rank',
      type: 'number',
    },
    {
      name: 'sentiment',
      type: 'radio',
      options: ['Positive', 'Negative', 'Neutral', 'Humor', 'Rehab'],
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
      name: 'createdOn',
      type: 'date',
    },
    {
      name: 'lastUpdatedOn',
      type: 'date',
    },
    // {
    //   name: 'type',
    //   type: 'radio',
    //   options: [
    //     'General',
    //     'Weather',
    //     'Activator',
    //     'Sprout',
    //     'Weed',
    //     'Compost',
    //     'i-boundary',
    //     'o-boundary',
    //     'star',
    //     'Comments',
    //     'Seeds',
    //     'Fertilizer',
    //   ],
    // },
  ],
  hooks: {
    beforeChange: [
      async ({ req, operation, data }) => {
    if (operation !== 'create' && operation !== 'update') return data;

      const {id: documentId} = (req as any)?.params || {};
        
    const payload = await getPayload({ config: configPromise });

    // Format name in Title Case
    if (data.name) {
      data.name = lodash.startCase(data.name);
    }

    // Check uniqueness of name (case-insensitive)
    if (data.name) {
      const nameToCheck = data.name.toLowerCase();
      const where: any = {
        name: { like: data.name }, // case-insensitive match
      };

      if (operation === 'update' && documentId) {
        where.id = { not_equals: documentId };
      }

      const { docs } = await payload.find({
        collection: 'tag',
        where,
        limit: 1,
      });

      const conflict = docs.find(doc => doc.name?.toLowerCase() === nameToCheck);
      if (conflict) {
          throw new APIError('A tag with this name already exists (case insensitive)', 400);
        }
      }

    const timestampField = operation === 'create' ? 'createdOn' : 'lastUpdatedOn';
    return {
      ...data,
      [timestampField]: new Date(),
    };
  },
    ],
  },
  endpoints: [
    {
      path: '/filter-by-type',
      method: 'get',
      handler: async (req: any): Promise<any> => {
        const { typeKey } = req.query;
        if (!typeKey) {
          return Response.json({
            message: 'Missing typeKey query parameter',
          });
        }

        try {
          // Fetch tags where type.key equals the provided typeKey
          const tags = await req.payload.find({
            limit: req.query.limit as number || 10,
            collection: 'tag',
            where: {
              'type.key': {
                equals: typeKey,
              },
            },
          });

          return Response.json(tags);
        } catch (error: any) {
          return Response.json(error);
        }
      }
    },
  ],
}
