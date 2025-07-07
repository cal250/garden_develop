'use server'

import { payload } from '@/utils/payload'

export const getSpecialEcosystem = async (specialEcoId: string) => {
  const specialEcosystem = await payload.findByID({
    collection: 'specialeco',
    id: specialEcoId,
  })

  return specialEcosystem
}
