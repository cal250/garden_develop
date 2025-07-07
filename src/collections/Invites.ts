import payload, { APIError, getPayload } from 'payload'
import { CollectionConfig } from 'payload'
import randomstring from 'randomstring'
import configPromise from '@payload-config'
import { encryptField } from '@/utils/field-hooks/encrypt-hook'
import { decryptField } from '@/utils/field-hooks/decrypt-hook'
import { decrypt } from '@/utils/encrypt-decrypt'

export const Invites: CollectionConfig = {
  slug: 'invites',
  versions: {
    maxPerDoc: 10,
  },
  admin: {
    useAsTitle: 'firstName',
    group: 'Creators',
    components: {
      beforeListTable: [
        {
          path: '@/components/import-export/import-button.tsx',
          clientProps: {
            collection: 'invites',
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
      name: 'firstName',
      type: 'text',
      required: true,
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'text',
      unique: true,
      required: true,
      localized: false,
    },
    {
      name: 'prefferedPassword',
      type: 'text',
      required: true,
      hooks: {
        beforeChange: [encryptField],
        // afterRead: [decryptField], // this is only needed if we want user to see this data in it's real format. for passwords we don't want anyone to see the data in it's real format
      },
      // admin: {
      //   disabled: true,
      // },
      // access: {
      //   read: () => false,
      // },
    },
    {
      name: 'inspiration',
      type: 'text',
      required: true,
    },
    {
      name: 'approved',
      type: 'radio',
      options: ['Yes', 'No'],
      defaultValue: 'No',
    },
    {
      name: 'rejected',
      type: 'radio',
      options: ['Yes', 'No'],
      defaultValue: 'No',
    },
    {
      name: 'rejectedReason',
      type: 'text',
    },
    {
      name: 'creatorType',
      type: 'relationship',
      relationTo: 'creatorType',
      hasMany: true,
    },
    {
      name: 'dateRequested',
      type: 'date',
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
    {
      name: 'creator',
      type: 'relationship',
      relationTo: 'creator',
    },
  ],
  hooks: {
    beforeChange: [
      async ({ req, operation, data: restData }) => {
        const user = req.user
        const { prefferedPassword, ...data } = restData

        const payload = await getPayload({ config: configPromise })
        if (operation === 'create') {
          // Check for existing tag with the same name
          const existingEmail = await payload.find({
            collection: 'invites',
            where: {
              email: {
                equals: data.email,
              },
            },
          })

          if (existingEmail.docs.length > 0) {
            throw new APIError('An account with this email already exists', 400)
          }
          return {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            inspiration: data.inspiration,
            creatorType: data.creatorType,
            prefferedPassword,
            createdOn: new Date(),
          }
        }

        const existingInvites = await payload.find({
          collection: 'invites',
          where: {
            email: {
              equals: data.email,
            },
          },
        })

        const existingInvite = existingInvites.docs[0]

        let finalPreferredPassword = prefferedPassword

        if (existingInvite && existingInvite.prefferedPassword === prefferedPassword) {
          finalPreferredPassword = decrypt(prefferedPassword)
        }

        if (operation === 'update' && data.approved === 'Yes' && !data.creator) {
          if (!data.creatorType) {
            throw new APIError('Missing creator type data', 400)
          }
          // Create a new creator record
          const payload = req.payload
          const newCreator = await payload.create({
            collection: 'creator',
            data: {
              firstName: data.firstName,
              lastName: data.lastName,
              email: data.email,
              prefferedPassword: finalPreferredPassword,
              password: finalPreferredPassword,
              inspiration: data.inspiration,
              creatorType: data.creatorType,
              // emailVerificationToken: randomstring.generate(),
              createdOn: new Date().toISOString(),
              lastUpdatedOn: new Date().toISOString(),
            },
          })

          // Update the invite with the new creator reference
          return {
            ...data,
            prefferedPassword: finalPreferredPassword,
            creator: newCreator.id,
            lastUpdatedOn: new Date(),
            lastUpdatedBy: user?.id,
          }
        }

        // For other cases, just update the timestamps
        return {
          ...data,
          prefferedPassword: finalPreferredPassword,
          lastUpdatedOn: new Date(),
          lastUpdatedBy: user?.id,
        }
      },
    ],
  },
}
