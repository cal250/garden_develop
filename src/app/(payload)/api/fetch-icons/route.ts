import { NextRequest, NextResponse } from 'next/server'
import { payload } from '@/utils/payload' // Ensure you import the correct payload instance

export const POST = async (req: NextRequest) => {
  try {
    // Extract user from request (assuming auth middleware is used)
    // const user = req.headers.get('user') // Adjust this based on your auth setup
    // if (!user) {
    //   return NextResponse.json({ error: 'Unauthorized Access' }, { status: 401 })
    // }

    const body = await req.json()
    const { depth = '1', where = {}, sort = '', page = '', limit = '', pagination = false } = body

    const result = await payload.find({
      collection: 'platformIcon',
      depth,
      where,
      sort,
      page,
      limit,
      pagination,
    })

    return NextResponse.json({ success: true, data: result }, { status: 200 })
  } catch (error) {
    console.error('Error in findData:', error)
    return NextResponse.json({ error: (error as Error).message }, { status: 400 })
  }
}
