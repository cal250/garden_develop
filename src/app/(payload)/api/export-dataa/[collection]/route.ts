import createCsvToExport from '@/controllers/createCsvToExport'
import { NextResponse } from 'next/server'

export const GET = async (request: Request, { params }: { params: Promise<{ collection: string }> }) => {
  try {
    const collection = (await params).collection
    const result = await createCsvToExport(collection)

    return NextResponse.json({ result }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 })
  }
}
