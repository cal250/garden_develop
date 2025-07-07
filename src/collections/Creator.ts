import { isAdmin } from '../access/isAdmin'
import { isAdminOrSelf } from '../access/isAdminOrSelf'
import { APIError, CollectionConfig, getPayload } from 'payload'
import mongoose from 'mongoose'
// import { toast } from 'react-toastify'
import randomstring from 'randomstring'
import { encryptField } from '@/utils/field-hooks/encrypt-hook'
import configPromise from '@payload-config'
import { decrypt } from '@/utils/encrypt-decrypt'
import { Creator as CreatorType } from '@/payload-types'

export const Creator: CollectionConfig = {
  slug: 'creator',
  versions: {
    maxPerDoc: 10,
  },
  hooks: {
    beforeChange: [
      async ({ req, operation, data: restData }) => {
        const user = req.user
        const { prefferedPassword, ...data } = restData

        if (operation === 'update') {
          console.log('Request Body ==>', req.body)
          console.log('Request Data ==>', req.data)
        }

        if (operation === 'create') {
          const payload = await getPayload({ config: configPromise })
          // Check for existing tag with the same name
          const existingEmail = await payload.find({
            collection: 'creator',
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
            ...data,
            prefferedPassword,
            createdOn: new Date(),
          }
        }

        // Create a new creator record
        const payload = await getPayload({ config: configPromise })
        // Check for existing tag with the same name
        const existingCreators = await payload.find({
          collection: 'creator',
          where: {
            email: {
              equals: data.email,
            },
          },
        })

        const existingCreator = existingCreators.docs[0]

        let finalPreferredPassword = prefferedPassword

        if (existingCreator && existingCreator.prefferedPassword === prefferedPassword) {
          finalPreferredPassword = decrypt(prefferedPassword)
        }

        return {
          ...data,
          prefferedPassword: finalPreferredPassword,
          lastUpdatedOn: new Date(),
          lastUpdatedBy: user?.id,
        }
      },
    ],
    afterChange: [
      async ({ operation, doc, req }) => {
        // if (operation === 'create') {
        //   const client = mongoose.createConnection(process.env.DATABASE_URI!)
        //   const genericSchema = new mongoose.Schema({}, { strict: false })
        //   const coll = client.model('creators', genericSchema)
        //   try {
        //     const creator: CreatorType | null = await coll.findOneAndUpdate(
        //       { _id: doc.id }, // Match by MongoDB's _id
        //       { emailVerificationToken: randomstring.generate() },
        //       { new: true }, // Return the updated document
        //     )
        //     const emailTemplate = await req.payload.find({
        //       collection: 'emailTemplates',
        //       where: {
        //         type: {
        //           equals: 'emailVerification',
        //         },
        //       },
        //     })
        //     if (creator && creator.emailVerificationToken) {
        //       // user.fullName
        //       const url = `${process.env.INNER_GARDEN_FRONTEND_URL}/api/verify/${creator.emailVerificationToken}`
        //       const htmlContent = emailTemplate.docs[0].richTextContent_html
        //       if (typeof htmlContent === 'string') {
        //         const richTextContent_html = htmlContent
        //           .replaceAll('{{fullName}}', creator.firstName ?? creator.lastName ?? '')
        //           .replaceAll('{{url}}', url)
        //         if (richTextContent_html) {
        //           await req.payload
        //             .sendEmail({
        //               // from: 'community@inner.garden',
        //               // from: process.env.DEFAULT_EMAIL_ADDRESS!,
        //               to: doc.email,
        //               subject: 'Inner Garden Email Verification',
        //               html: richTextContent_html,
        //             })
        //             .then((result) => {
        //               // toast.success('Email send successfully.')
        //             })
        //             .then((err) => {
        //               // toast.error(`Error - ${err}`)
        //             })
        //         }
        //         // toast.success('User approved and email sent')
        //       }
        //       mongoose.connection.close()
        //     }
        //   } catch (err) {
        //     return err
        //   }
        //   mongoose.connection.close()
        // }
        // if (doc.approved === 'Yes' && operation === 'update' && doc.verified === false) {
        //   const emailTemplate = await req.payload.find({
        //     collection: 'emailTemplates',
        //     where: {
        //       type: {
        //         equals: 'emailVerification',
        //       },
        //     },
        //   })
        //   const client = mongoose.createConnection(process.env.DATABASE_URI!)
        //   const genericSchema = new mongoose.Schema({}, { strict: false })
        //   const coll = client.model('creators', genericSchema)
        //   const creator: CreatorType | null = await coll.findById(doc.id)
        //   if (creator && creator.emailVerificationToken) {
        //     // user.fullName
        //     const url = `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/creator/verify/${creator.emailVerificationToken}`
        //     const htmlContent = emailTemplate.docs[0].richTextContent_html
        //     if (typeof htmlContent === 'string') {
        //       const richTextContent_html = htmlContent
        //         .replaceAll('{{fullName}}', creator.firstName ?? creator.lastName ?? '')
        //         .replaceAll('{{url}}', url)
        //       if (richTextContent_html) {
        //         await req.payload
        //           .sendEmail({
        //             from: 'community@inner.garden',
        //             to: doc.email,
        //             subject: 'Inner Garden Email Verification',
        //             html: richTextContent_html,
        //           })
        //           .then((result) => {
        //             // toast.success('Email send successfully.')
        //           })
        //           .then((err) => {
        //             // toast.error(`Error - ${err}`)
        //           })
        //       }
        //       // toast.success('User approved and email sent')
        //     }
        //     mongoose.connection.close()
        //   }
        // }
      },
    ],
  },
  auth: {
    tokenExpiration: 86000,
    verify: {
      generateEmailSubject: ({ req, user }) => {
        return `Hey ${user.firstName} ${user.lastName}, verify your email!`
      },

      // @ts-expect-error // jhjjj
      generateEmailHTML: async ({
        req,
        token,
        user,
      }: {
        req: any
        token: string
        user: CreatorType
      }) => {
        const emailTemplate = await req.payload.find({
          collection: 'emailTemplates',
          where: {
            type: {
              equals: 'emailVerification',
            },
          },
        })

        const url = `${process.env.INNER_GARDEN_FRONTEND_URL}/api/verify/${token}`

        const htmlContent = emailTemplate.docs[0].richTextContent_html
        if (typeof htmlContent === 'string') {
          const richTextContent_html = htmlContent
            .replaceAll('{{fullName}}', user.firstName ?? user.lastName ?? '')
            .replaceAll('{{url}}', url)

          // Use the token provided to allow your user to reset their password

          return `<!DOCTYPE html>
                    <html lang="en">
                    <body>
                    ${richTextContent_html}
                    </body>
                    </html>`
        }
      },
    },
    forgotPassword: {
      // @ts-expect-error // jhjjj
      generateEmailSubject: ({ req, user }) => {
        return `Hey ${user.fullName}, reset your password!`
      },

      // @ts-expect-error // jhjjj
      generateEmailHTML: async ({
        req,
        token,
        user,
      }: {
        req: any
        token: string
        user: CreatorType
      }) => {
        const emailTemplate = await req.payload.find({
          collection: 'emailTemplates',
          where: {
            type: {
              equals: 'forgotPassword',
            },
          },
        })

        const resetPasswordURL = `${process.env.INNER_GARDEN_FRONTEND_URL}/reset-password?token=${token}`

        const htmlContent = emailTemplate.docs[0].richTextContent_html
        if (typeof htmlContent === 'string') {
          const richTextContent_html = htmlContent
            .replaceAll('{{fullName}}', user.firstName ?? user.lastName ?? '')
            .replaceAll('{{url}}', resetPasswordURL)

          // Use the token provided to allow your user to reset their password

          return `<!DOCTYPE html>
                    <html lang="en">
                    <body>
                    ${richTextContent_html}
                    </body>
                    </html>`
        }
      },
    },
    //   maxLoginAttempts : 5,
    //   lockTime : 600 * 1000
  },
  admin: {
    useAsTitle: 'firstName',
    group: 'Creators',
    components: {
      beforeListTable: [
        {
          path: '@/components/import-export/import-button.tsx',
          clientProps: {
            collection: 'creator',
          },
        },
      ],
    },
  },
  access: {
    // Everyone can create new users
    create: () => true,
    // Admins can read all, but any other logged in user can only read themselves
    read: () => true, // need to change to isAdminOrSelf
    // Admins can update all, but any other logged in user can only update themselves
    update: isAdminOrSelf,
    // Only admins can delete
    delete: isAdmin,
  },
  fields: [
    // {
    //   name: 'verified',
    //   type: 'checkbox',
    //   defaultValue: false,
    // },
    {
      name: 'firstName',
      type: 'text',
    },
    {
      name: 'lastName',
      type: 'text',
    },
    {
      name: 'email',
      type: 'text',
    },
    {
      name: 'prefferedPassword',
      type: 'text',
      hooks: {
        beforeChange: [encryptField],
        // afterRead: [decryptField], // this is only needed if we want user to see this data in it's real format. for passwords we don't want anyone to see the data in it's real format
      },
      // hidden: true,
    },
    {
      name: 'welcomeMessage',
      type: 'textarea',
    },
    {
      name: 'inspiration',
      type: 'textarea',
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'username',
      type: 'text',
    },
    {
      name: 'creatorType',
      type: 'relationship',
      relationTo: 'creatorType',
      hasMany: true,
    },
    {
      name: 'germinatedBy',
      type: 'relationship',
      relationTo: 'creator',
    },
    {
      name: 'rank',
      type: 'number',
    },
    // {
    //   name: 'emailVerificationToken',
    //   type: 'text',
    //   // access : {
    //   //     read : ()=>true,
    //   //     update : ()=>false
    //   // }
    // },
    {
      name: 'createdOn',
      type: 'date',
    },
    {
      name: 'lastUpdatedOn',
      type: 'date',
    },
    {
      name: 'lastLoggedInOn',
      type: 'date',
    },
  ],
  endpoints: [
    {
      path: '/gardens-count',
      method: 'get',
      handler: async (req: any): Promise<Response> => {
        const { creatorTypeKey } = req.query
        const payload = req.payload

        try {
          // Build base query
          const query: any = {}

          // Add creator type filter if provided
          if (creatorTypeKey) {
            const creatorTypes = await payload.find({
              collection: 'creatorType',
              where: {
                key: {
                  equals: creatorTypeKey,
                },
              },
            })

            if (creatorTypes.docs.length > 0) {
              query.creatorType = {
                contains: creatorTypes.docs[0].id,
              }
            }
          }

          // Get creators
          const creators = await payload.find({
            collection: 'creator',
            where: query,
          })

          // Get garden counts for each creator
          const results = await Promise.all(
            creators.docs.map(async (creator: any) => {
              const gardens = await payload.find({
                collection: 'garden',
                where: {
                  creator: {
                    equals: creator.id,
                  },
                },
              })

              return {
                id: creator.id,
                username: creator.username,
                avatar: creator.avatar,
                gardensCount: gardens.totalDocs,
              }
            }),
          )

          return Response.json(results)
        } catch (error) {
          return Response.json(error)
        }
      },
    },
  ],
}
