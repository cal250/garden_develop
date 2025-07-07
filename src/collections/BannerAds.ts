import { CollectionConfig } from 'payload'

export const BannerAdd: CollectionConfig = {
  slug: 'bannerAd',
  versions: {
    maxPerDoc: 10,
  },
  admin: {
    useAsTitle: 'title',
    group: 'Admin',
    components: {
      beforeListTable: [
        {
          path: '@/components/import-export/import-button.tsx',
          clientProps: {
            collection: 'bannerAd',
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
      name: 'title',
      type: 'text',
    },
    {
      name: 'subTitle',
      type: 'text',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'buttonText',
      type: 'text',
    },
    {
      name: 'buttonUrl',
      type: 'text',
    },
  ],
}
