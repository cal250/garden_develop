import type { CollectionConfig } from 'payload'
import { HTMLConverterFeature, lexicalEditor, lexicalHTML } from '@payloadcms/richtext-lexical'

export const EmailTemplates: CollectionConfig = {
  slug: 'emailTemplates',
  versions: {
    maxPerDoc: 10,
    // drafts: {
    //     autosave: {
    //         interval : 100
    //     }
    // }
  },
  admin: {
    useAsTitle: 'templateName',
    group: 'Admin',
  },
  access: {
    read: () => true,
    update: () => true,
    create: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'templateName',
      type: 'text',
    },
    {
      name: 'type',
      type: 'radio',
      options: ['emailVerification', 'forgotPassword', 'invitation'],
      unique: true,
    },
    {
      name: 'richTextContent',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [...defaultFeatures, HTMLConverterFeature({})],
      }),
    },
    lexicalHTML('richTextContent', { name: 'richTextContent_html' }),
  ],
}
