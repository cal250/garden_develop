'use server'

import getCurrentCreator from './get-current-creator'
import { redirect } from 'next/navigation'
import getSpecialEcosystems from './get-special-ecosystems'

export default async function handleEcosystemRedirect(specialEcoId?: string) {
  const { creator } = await getCurrentCreator()

  if (!creator) {
    return
  }

  if (specialEcoId) {
    return redirect(`/${encodeURIComponent(specialEcoId)}`)
  }

  const specialEcosystems = await getSpecialEcosystems()

  if (specialEcosystems.length === 0) {
    console.error('No specialeco found')
    return
  }

  return redirect(`/${encodeURIComponent(specialEcosystems[0].id)}`)
}
