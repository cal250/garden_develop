import { CollectionConfig } from 'payload'

export const InnerAcademy: CollectionConfig = {
  slug: 'innerAcademy',
  versions: {
    maxPerDoc: 10,
  },
  admin: {
    useAsTitle: 'title',
    group: 'Academy',
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
      name: 'section',
      type: 'array',
      label: 'Sections',
      interfaceName: 'InnerAcademySection',
      labels: {
        singular: 'section',
        plural: 'sections',
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
          name: 'policy',
          type: 'relationship',
          relationTo: 'policy',
        },
      ],
    },
  ],
}
