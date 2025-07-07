import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
// Import collections
import Admin from './collections/Admin'
import { Creator } from './collections/Creator'
import { Media } from './collections/Media'
import { Comment } from './collections/Comment'
import { Color } from './collections/Color'
import { ColorTemplate } from './collections/ColorTemplate'
import { EmailTemplates } from './collections/EmailTemplates'
import Dimension from './collections/Dimension'
import { PlatformIcon } from './collections/PlatformIcon'
import { SproutWellgorithm } from './collections/SproutWellgorithm'
import { Garden } from './collections/Garden'
import { EcoSystem } from './collections/EcoSystem'
import { Tag } from './collections/Tag'
import { SeedWellgorithm } from './collections/SeedWellgorithm'
import { Zone } from './collections/Zone'
import { Cocoon } from './collections/Cocoon'
import { BannerAdd } from './collections/BannerAds'
import { Footer } from './collections/Footer'
import { Policy } from './collections/Policy'
import { InnerAcademy } from './collections/InnerAcademy'
import { Message } from './collections/Message'
import { InnerTv } from './collections/InnerTv'
import { InnerDirectory } from './collections/InnerDirectory'

// Import utilities and components
import { seed } from './utils/seed'
import { send_email } from './utils/try-email'
import sharp from 'sharp'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { WellgorithmType } from './collections/WellgorithmType'
import { TagType } from './collections/TagType'
import { Invites } from './collections/Invites'
import { CreatorType } from './collections/CreatorType'
import { SpecialEco } from './collections/SpecialEco'
import { WellgorithmAction } from './collections/WellgorithmActions'
import { CommentType } from './collections/CommentType'
import { FAQ } from './collections/FAQs'
import { FAQType } from './collections/FAQType'
import { InnerTVType } from './collections/InnerTVType'
import { InnerAIHumometer } from './collections/InnerAIHumometer'
import { Stack } from './collections/Stack'
import { resendAdapter } from '@payloadcms/email-resend'
import { StackIcon } from './collections/StackIcon'

// Configure S3 storage adapter
// const storageAdapter = s3Adapter({
//   config: {
//     endpoint: process.env.S3_ENDPOINT,
//     region: process.env.S3_REGION,
//     credentials: {
//       accessKeyId: process.env.S3_ACCESS_KEY,
//       secretAccessKey: process.env.S3_SECRET_KEY,
//     }
//   },
//   bucket: process.env.S3_BUCKET_NAME
// })

export default buildConfig({
  admin: {
    user: Admin.slug,
    meta: {
      titleSuffix: 'Inner Garden',
      icons: [
        {
          url: '/favicon.svg',
          sizes: '32x32',
        },
      ],
    },
    components: {
      graphics: {
        // TODO: Fix the file imports here
        Logo: '@/graphics/Logo',
        Icon: '@/graphics/Icon',
      },
    },
  },
  editor: lexicalEditor({}),
  collections: [
    EcoSystem,
    Tag,
    Zone,
    TagType,
    Admin,
    ColorTemplate,
    Dimension,
    Invites,
    Creator,
    CreatorType,
    SpecialEco,
    WellgorithmAction,
    Cocoon,
    WellgorithmType,
    SeedWellgorithm,
    SproutWellgorithm,
    InnerAIHumometer,
    Comment,
    CommentType,
    Garden,
    FAQ,
    FAQType,
    InnerTVType,
    InnerTv,
    EmailTemplates,
    Policy,
    BannerAdd,
    Footer,
    Media,
    PlatformIcon,
    Color,
    Message,
    InnerAcademy,
    InnerDirectory,
    Stack,
    StackIcon,
  ],
  upload: {
    // limits: {
    //   fileSize: 1000000, // 5MB
    // },

    limits: {
      fileSize: 5242880, // 5MB
    },
  },
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
    autoGenerate: true, // Enable or disable auto-generation
    declare: { ignoreTSError: true }, // Control the use of 'declare' in generated types
  },
  onInit: async (payload: any) => {
    if (process.env.PAYLOAD_SEED) {
      await seed(payload)
    }
    if (process.env.PAYLOAD_EMAIL_TRIAL) {
      await send_email(payload)
    }
  },
  secret: process.env.PAYLOAD_SECRET || '',
  sharp,
  // i18n: {
  //   // supportedLanguages: {
  //   // },
  // },
  plugins: [
    payloadCloudPlugin(),
    s3Storage({
      collections: {
        media: true,
        platformIcon: true,
      },
      bucket: process.env.S3_BUCKET || '',
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
        region: process.env.S3_REGION || '',
      },
    }),
  ],
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL,
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  email: resendAdapter({
    defaultFromAddress: process.env.DEFAULT_EMAIL_ADDRESS ?? 'dev@payloadcms.com',
    defaultFromName: process.env.DEFAULT_EMAIL_SENDER_NAME ?? 'Inner Garden',
    apiKey: process.env.RESEND_API_KEY ?? '',
  }),
})
