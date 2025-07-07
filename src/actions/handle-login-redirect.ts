'use server'

import getCurrentCreator from './get-current-creator'
import { redirect } from 'next/navigation'
import getSpecialEcosystems from './get-special-ecosystems'
import { payload } from '@/utils/payload'

export default async function handleLoginRedirect() {
  const { creator } = await getCurrentCreator()

  if (!creator) {
    return
  }

  const specialEcosystems = await getSpecialEcosystems()

  if (specialEcosystems.length === 0) {
    console.error('No specialeco found')
    return
  }

  const { docs: cocoon } = await payload.find({
    collection: 'cocoon',
    where: {
      creator: {
        equals: creator.id,
      },
      specialeco: {
        equals: specialEcosystems[0].id,
      },
    },
  })

  const stepRoutes = [
    '/onboarding/landscape',
    '/onboarding/zone',
    '/onboarding/name',
    '/onboarding/bio',
    '/onboarding/grow',
  ]

  if (!cocoon || cocoon.length === 0) {
    return redirect(`/onboarding-action`)
  }

  if (cocoon[0].step && cocoon[0].step < 5) {
    return redirect(
      `/${encodeURIComponent(specialEcosystems[0].id)}${stepRoutes[cocoon[0].step - 1]}`,
    )
  }

  return redirect(`/${encodeURIComponent(specialEcosystems[0].id)}/builder`)
}
