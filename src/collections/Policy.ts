import { CollectionConfig } from 'payload'

export const Policy: CollectionConfig = {
  slug: 'policy',
  versions: {
    maxPerDoc: 10,
  },
  admin: {
    useAsTitle: 'headline',
    group: 'Admin',
    components: {
      beforeListTable: [
        {
          path: '@/components/import-export/import-button.tsx',
          clientProps: {
            collection: 'policy',
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
      name: 'headline',
      type: 'text',
    },
    {
      name: 'subHeadline',
      type: 'text',
    },
    {
      name: 'text',
      type: 'text',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'colorTemplate',
      type: 'relationship',
      relationTo: 'colorTemplate',
    },
    {
      name: 'url',
      type: 'text',
      hooks: {
        // TODO: study this to see what it does and how to re-implement this
        // afterChange: [
        //   async ({ originalDoc, req }) => {
        //     if (!originalDoc.url) {
        //       const updatedDoc = await payload.update({
        //         collection: 'policy',
        //         id: originalDoc.id,
        //         data: {
        //           url: `http://localhost:3001/api/policy/${originalDoc.id}`,
        //         },
        //       })
        //       return updatedDoc
        //     }
        //   },
        // ],
      },
    },
  ],
}
