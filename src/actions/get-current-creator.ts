'use server'

import { headers as getHeaders } from 'next/headers'
import { payload } from '@/utils/payload'

export default async function getCurrentCreator() {
  const headers = await getHeaders()
  const { user } = await payload.auth({ headers })

  if (!user) {
    return {
      creator: null,
    }
  }

  return {
    creator: user,
  }
}
