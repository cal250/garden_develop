import payload from 'payload'
import { CollectionConfig } from 'payload'

export const FAQType: CollectionConfig = {
  slug: 'faqType',
  versions: {
    maxPerDoc: 10,
  },
  admin: {
    useAsTitle: 'name',
    group: 'Academy',
    components: {
      beforeListTable: [
        {
          path: '@/components/import-export/import-button.tsx',
          clientProps: {
            collection: 'faqType',
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
      name: 'key',
      type: 'text',
    },
    {
      name: 'description',
      type: 'text',
    },
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
