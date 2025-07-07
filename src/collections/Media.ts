import { CollectionConfig } from 'payload'

function camelCase(str: string) {
  // Using replace method with regEx
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word: string, index: number) {
      return index == 0 ? word.toLowerCase() : word.toUpperCase()
    })
    .replace(/\s+/g, '')
}

interface RequestBody {
  tag?: string
}

export const Media: CollectionConfig = {
  slug: 'media',
  versions: {
    maxPerDoc: 4,
  },
  admin: {
    components: {
      beforeListTable: [
        {
          path: '@/components/import-export/import-button.tsx',
          clientProps: {
            collection: 'media',
          },
        },
      ],
    },
    group: 'Media',
  },
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  upload: {
    staticDir: 'https://inner-garden-image-store.s3.amazonaws.com',
    filesRequiredOnCreate: true,
    adminThumbnail: 'thumbnail',
    mimeTypes: [
      'image/svg+xml',
      'image/jpg',
      'image/jpeg',
      'image/gif',
      'image/png',
      'image/svg',
      'application/xml',
    ],
  },
  fields: [
    {
      name: 'tag',
      type: 'relationship',
      relationTo: 'tag',
      hasMany: true
    },
  ],
  hooks: {
    // beforeOperation: [async ({ args }) => {
    //   if (args.req?.files?.file?.name) {
    //     const parts = args.req.files.file.name.split('.');
    //     args.req.files.file.name = `${parts.slice(0, -1).join('.')}-${Array.from({ length: 10 }, () => '0123456789'.charAt(Math.floor(Math.random() * 10))).join('')}.${parts[parts.length - 1]}`;
    //   }
    // }],
    beforeOperation: [
      ({ args, operation }) => {
        if (args.req?.files?.file?.name && operation === 'create') {
          const originalFileName = args.req.files.file.name

          // Remove unwanted characters
          const updatedFileName = originalFileName
            .replaceAll('â', ' ')
            .replaceAll('¨', ' ')
            .replaceAll('©', ' ')
            .replaceAll('â', ' ')

          // Split the file name and extension
          const fileParts = updatedFileName.split('.')
          const fileNameWithoutExtension = fileParts.slice(0, -1).join('.')
          const fileExtension = fileParts[fileParts.length - 1]

          // Convert to camel case
          const camelCaseFileName = fileNameWithoutExtension
            .split(/[-_\s]+/) // Split by dash, underscore, or spaces
            .map((word: string, index: number) => {
              return index === 0
                ? word.toLowerCase()
                : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            })
            .join('')

          // Reconstruct the file name with the original extension
          const finalFileName = `${camelCaseFileName}.${fileExtension}`

          // Update the request object
          args.req.files.file.name = finalFileName

          console.log('Final file name:', finalFileName)
        }
      },
    ],
    beforeChange: [
      ({ data, req, operation }) => {
        if ((operation === 'create' || operation === 'update') && req.body) {
          try {
            const body: RequestBody =
              typeof req.body === 'object' ? req.body : JSON.parse(req.body as unknown as string)
            if (body.tag) {
              data.tag = body.tag
            }
          } catch (error) {
            console.error('Error parsing req.body:', error)
          }
        }
        return data
      },
    ],
  },
}
