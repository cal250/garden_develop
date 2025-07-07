'use server'

import { payload } from '@/utils/payload'

export default async function getSpecialEcosystems() {
  const { docs: specialEcosystems } = await payload.find({
    collection: 'specialeco',
    limit: 200,
    sort: ['-compulsory', 'rank'],
  })

  return specialEcosystems
}
