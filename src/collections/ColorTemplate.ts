import { isAdminOrSelf } from '../access/isAdminOrSelf'
import { isAdmin } from '../access/isAdmin'
import { CollectionConfig } from 'payload'
import { validateHexColor } from '../components/color-picker/config'

export const ColorTemplate: CollectionConfig = {
  slug: 'colorTemplate',
  versions: {
    maxPerDoc: 10,
  },
  admin: {
    useAsTitle: 'name',
    group: 'Colors',
  },
  access: {
    create: isAdmin,
    read: isAdminOrSelf,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'image',
      type: 'relationship',
      relationTo: 'media',
    },
    {
      name: 'icon',
      type: 'relationship',
      relationTo: 'media',
    },
    {
      name: 'rank',
      type: 'number',
    },
    {
      name: 'default_monochrome',
      type: 'radio',
      options: ['Yes', 'No'],
      defaultValue: 'No',
    },
    // {
    //   name: 'colors',
    //   type: 'array',
    //   fields: [
    //     {
    //       name: 'color',
    //       type: 'text',
    //       // validate: validateHexColor,
    //       admin: {
    //         components: {
    //           Field: '@/components/color-picker/InputField.tsx',
    //           Cell: '@/components/color-picker/Cell.tsx',
    //         },
    //       },
    //     },
    //   ],
    // },
    {
      name: 'colorGroup',
      type: 'relationship',
      relationTo: 'color',
      hasMany: true,
    },

    // {
    //   name: 'color1',
    //   type: 'text',
    //   validate: validateHexColor,
    //   admin: {
    //     components: {
    //       Field: '@/components/color-picker/InputField.tsx',
    //       Cell: '@/components/color-picker/Cell.tsx',
    //     },
    //   },
    // },
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
  ],
}
