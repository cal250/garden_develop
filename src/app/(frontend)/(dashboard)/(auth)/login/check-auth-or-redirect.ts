'use server'

import { redirect } from 'next/navigation'
import getCurrentCreator from './get-current-creator'
import { payload } from '@/utils/payload'

interface CheckAuthOrRedirectParams {
  skipLoginRedirect: boolean
}

export default async function checkAuthOrRedirect({
  skipLoginRedirect,
}: CheckAuthOrRedirectParams) {
  const { creator } = await getCurrentCreator()

  if (!creator) {
    if (!skipLoginRedirect) {
      redirect('/login')
    }

    console.log('No creator found')
    return
  }

  const { docs: specialeco } = await payload.find({
    collection: 'specialeco',
  })

  const defaultEcoId = specialeco[0].id

  const { docs: cocoons } = await payload.find({
    collection: 'cocoon',
    where: {
      specialeco: {
        equals: defaultEcoId,
      },
      creator: {
        equals: creator.id,
      },
    },
  })

  if (cocoons.length === 0) {
    redirect(`/${encodeURIComponent(defaultEcoId)}/onboarding`)
  }

  redirect(`/${encodeURIComponent(defaultEcoId)}/builder`)
}
