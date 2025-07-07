'use server'

import { payload } from '@/utils/payload'
import getCurrentCreator from './get-current-creator'

export default async function getCocoon(specialeco: string) {
  const { creator } = await getCurrentCreator()

  if (!creator) {
    return null
  }

  const { docs: cocoon } = await payload.find({
    collection: 'cocoon',
    where: {
      creator: {
        equals: creator.id,
      },
      specialeco: {
        equals: specialeco,
      },
    },
  })

  if (cocoon.length === 0) {
    return null
  }

  return cocoon[0]
}
