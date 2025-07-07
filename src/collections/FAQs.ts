import payload from 'payload'
import { CollectionConfig } from 'payload'

export const FAQ: CollectionConfig = {
  slug: 'faq',
  versions: {
    maxPerDoc: 10,
  },
  admin: {
    useAsTitle: 'question',
    group: 'Academy',
    components: {
      beforeListTable: [
        {
          path: '@/components/import-export/import-button.tsx',
          clientProps: {
            collection: 'faq',
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
      name: 'question',
      type: 'text',
    },
    {
      name: 'answer',
      type: 'textarea',
    },
    {
      name: 'faqType',
      type: 'relationship',
      relationTo: 'faqType',
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
