'use server'

import { payload } from '@/utils/payload'
import getCurrentCreator from './get-current-creator'

export default async function getCocoons() {
  const { creator } = await getCurrentCreator()

  if (!creator) {
    return null
  }

  const { docs: cocoons } = await payload.find({
    collection: 'cocoon',
    where: {
      creator: {
        equals: creator.id,
      },
    },
  })

  if (cocoons.length === 0) {
    return null
  }

  return cocoons
}
