import { CollectionConfig } from 'payload'

export const InnerTv: CollectionConfig = {
  slug: 'innerTv',
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  admin: {
    useAsTitle: 'title',
    group: 'Academy',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'innerTVType',
      type: 'relationship',
      relationTo: 'innerTVType',
    },
    {
      name: 'resource',
      type: 'array',
      label: 'Section',
      interfaceName: 'InnerTvSection',
      fields: [
        {
          name: 'youtubeVideos',
          type: 'array',
          label: 'Youtube Video',
          interfaceName: 'InnerTvYoutubeVideo',
          fields: [
            {
              name: 'youtubeLink',
              type: 'text',
              required: true,
            },
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'thumbnail',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'description',
              type: 'text',
            },
          ],
        },
      ],
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
}
