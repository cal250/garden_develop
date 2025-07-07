import { CollectionConfig } from 'payload'

export const SpecialEco: CollectionConfig = {
  slug: 'specialeco',
  versions: {
    maxPerDoc: 10,
  },
  admin: {
    useAsTitle: 'name',
    group: 'Ecosystems',
    components: {
      beforeListTable: [
        {
          path: '@/components/import-export/import-button.tsx',
          clientProps: {
            collection: 'specialeco',
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
      name: 'shortDescription',
      type: 'text',
    },
    {
      name: 'longDescription',
      type: 'textarea',
    },
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'rank',
      type: 'number',
    },
    {
      name: 'ecosystem',
      type: 'relationship',
      relationTo: 'ecosystem',
    },
    {
      name: 'zoneSize',
      type: 'number',
    },
    {
      name: 'iboundaryDescription',
      type: 'text',
    },
    {
      name: 'oboundaryDescription',
      type: 'text',
    },
    {
      name: 'starsDescription',
      type: 'text',
    },
    {
      name: 'allowPrivacy',
      type: 'radio',
      options: ['Yes', 'No'],
      defaultValue: 'No',
    },
    {
      name: 'wellgorithmActions',
      type: 'array',
      fields: [{ name: 'actions', type: 'relationship', relationTo: 'wellgorithmAction' }],
    },
    {
      name: 'usageCount',
      type: 'number',
    },
    {
      name: 'enabled',
      type: 'radio',
      options: ['Yes', 'No'],
      defaultValue: 'Yes',
    },
    {
      name: 'compulsory',
      type: 'radio',
      options: ['Yes', 'No'],
      defaultValue: 'No',
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
      name: 'updatedOn',
      type: 'date',
    },
    {
      name: 'lastUpdatedBy',
      type: 'relationship',
      relationTo: 'admin',
    },
  ],
}
