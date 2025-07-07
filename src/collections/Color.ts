import { isAdminOrSelf } from '../access/isAdminOrSelf'
import { isAdmin } from '../access/isAdmin'
import { CollectionConfig } from 'payload'
import { validateHexColor } from '../components/color-picker/config'

export const Color: CollectionConfig = {
  slug: 'color',
  versions: {
    maxPerDoc: 10,
  },
  admin: {
    useAsTitle: 'colorName',
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
      name: 'colorName',
      type: 'text',
      required: true,
    },
    {
      name: 'color',
      type: 'text',
      validate: validateHexColor,
      required: true,
      admin: {
        components: {
          Field: {
            path: '@/components/color-picker/InputField.tsx',
            // clientProps: {
            //   validate: validateHexColor,
            // },
          },
          Cell: '@/components/color-picker/Cell.tsx',
        },
        
      },
    },
  ],
}
