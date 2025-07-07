'use server'

import { cookies, headers as getHeaders } from 'next/headers'
import type { Creator } from '@/payload-types'

import { payload } from '@/utils/payload'
export default async function getCurrentCreator(): Promise<{
  creator: Creator | null
}> {
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
