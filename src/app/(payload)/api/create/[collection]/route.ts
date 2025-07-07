import { NextRequest, NextResponse } from 'next/server'
import { payload } from '@/utils/payload' // Ensure you import the correct payload instance
import { CollectionSlug } from 'payload'

export const POST = async (
  req: NextRequest,
  { params }: { params: Promise<{ collection: string }> },
) => {
  try {
    const collection = (await params).collection
  } catch (error) {
    console.error('Error in findData:', error)
    return NextResponse.json({ error: (error as Error).message }, { status: 400 })
  }
}
