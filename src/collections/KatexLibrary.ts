import { CollectionConfig } from 'payload'

const KatexLibrary: CollectionConfig = {
  slug: 'katexLibrary',
  admin: {
    group: 'Wellgorithm',
  },
  fields: [
    {
      name: 'formula',
      type: 'text',
    },
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'icon',
      type: 'relationship',
      relationTo: 'media',
    },
  ],
}

export default KatexLibrary
