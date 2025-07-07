'use server'

import { payload } from '@/utils/payload'

export default async function getColorTemplates() {
  const colorTemplates = await payload.find({
    collection: 'colorTemplate',
    sort: 'rank',
  })

  return colorTemplates.docs
}
