import { CollectionConfig, Data } from 'payload'

export const Principles: CollectionConfig = {
  slug: 'principles',
  versions: {
    maxPerDoc: 10,
  },
  admin: {
    useAsTitle: 'name',
    group: 'Wellgorithm',
    components: {
      beforeListTable: [
        {
          path: '@/components/import-export/import-button.tsx',
          clientProps: {
            collection: 'principles',
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
    //     name : 'section',
    //     type : 'radio',
    //     options :[
    //         'Wellgorithm', 'Journal'
    //     ],
    //     access : {
    //       update : ()=> false,
    //     }
    // },
    {
      name: 'tag',
      type: 'relationship',
      relationTo: 'tag',
      hasMany: true,
      filterOptions: (data) => {
        if (data.data.section === 'Wellgorithm') {
          return {
            section: {
              in: ['Wellgorithm', 'Global'],
            },
          }
        } else if (data.data.section === 'Journal') {
          return {
            section: {
              in: ['Journal', 'Global'],
            },
          }
        }
        return false // No filtering if section is not selected or if another section is selected
      },
    },
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
