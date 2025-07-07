'use server'

import { payload } from '@/utils/payload'
import { getSpecialEcosystem } from './get-special-ecosystem'

export const getZonesBySpecialEcosystem = async ({
  specialEcoId,
  // type,
}: {
  specialEcoId: string
  // type: string
}) => {
  const specialEco: any = await getSpecialEcosystem(specialEcoId)

  if (!specialEco) {
    return null
  }

  const { docs: zones } = await payload.find({
    collection: 'zone',
    limit: 200,
    where: {
      ecosystem: {
        equals: specialEco.ecosystem?.id,
      },
      // weedSeedPreference: {
      //   equals: type,
      // },
    },

    sort: 'rank',
  })

  return zones
}
