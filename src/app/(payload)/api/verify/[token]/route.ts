import { NextRequest, NextResponse } from 'next/server'
import { payload } from '@/utils/payload' // Ensure you import the correct payload instance
import { CollectionSlug } from 'payload'

export const GET = async (req: NextRequest, { params }: { params: Promise<{ token: string }> }) => {
  try {
    const token = (await params).token
    // Extract user from request (assuming auth middleware is used)
    await payload.verifyEmail({
      collection: 'creator',
      token,
    })

    return NextResponse.redirect(`${process.env.INNER_GARDEN_FRONTEND_URL}/login`)
  } catch (error) {
    console.error('Error in findData:', error)
    return NextResponse.redirect(`${process.env.INNER_GARDEN_FRONTEND_URL}/`)
  }
}
