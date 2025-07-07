import { CollectionConfig } from 'payload'

export function camelCase(str: string) {
  // Using replace method with regEx
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index == 0 ? word.toLowerCase() : word.toUpperCase()
    })
    .replace(/\s+/g, '')
}

export const PlatformIcon: CollectionConfig = {
  slug: 'platformIcon',
  versions: {
    maxPerDoc: 4,
  },
  admin: {
    components: {
      beforeListTable: [
        {
          path: '@/components/import-export/import-button.tsx',
          clientProps: {
            collection: 'platformIcon',
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
    imageSizes: [
      {
        name: 'icon',
        width: 512,
        height: 512,
        position: 'centre',
      },
    ],
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
      type: 'text',
    },
  ],
  hooks: {
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
            // Ensure req.body is an object and not a stream
            const body = typeof req.body === 'object' ? req.body : JSON.parse(req.body)

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
