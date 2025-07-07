'use server'

import { payload } from '@/utils/payload'

export async function getEcosystemBySpecialEco(specialEcoId: string) {
  const specialEco = await payload.findByID({
    collection: 'specialeco',
    id: specialEcoId,
  })

  if (!specialEco || !(specialEco.ecosystem instanceof Object)) {
    throw new Error('SpecialEco not found')
  }

  const ecosystem = await payload.findByID({
    collection: 'ecosystem',
    id: specialEco.ecosystem.id,
  })

  return ecosystem
}
