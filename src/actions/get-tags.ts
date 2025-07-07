'use server'

import { payload } from '@/utils/payload'

export default async function getTags() {
  const tag = await payload.find({
    collection: 'tag',
    limit: 100,
    sort: '-createdAt',
  })

  return tag.docs
}
