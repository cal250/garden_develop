'use server'

import { payload } from '@/utils/payload'

export default async function getIcons() {
  const icons = await payload.find({
    collection: 'platformIcon',
    limit: 100,
  })

  return icons.docs
}
