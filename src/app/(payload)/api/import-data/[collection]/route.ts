import importData from '@/controllers/importData'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (
  req: NextRequest,
  { params }: { params: Promise<{ collection: string }> },
) => {
  try {
    const collection = (await params).collection
    const body = await req.json()
    const transformedData = body.transformedData as ParsedRow[] | undefined

    if (!transformedData) {
      return new NextResponse('Unprocessable Entity', { status: 422 })
    }

    // const parsedT = JSON.parse(transformedData) as ParsedRow[]
    const result = await importData(collection, transformedData)

    return NextResponse.json(
      result.duplicates
        ? { success: result.success, duplicates: result.duplicates }
        : { success: result.success },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 })
  }
}
