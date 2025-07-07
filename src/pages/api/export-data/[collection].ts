import { NextApiRequest, NextApiResponse } from 'next'
import createCsvToExport from '@/controllers/createCsvToExport'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).send('Method Not Allowed')
  }

  try {
    const { collection } = req.query

    if (typeof collection !== 'string') {
      return res.status(400).send('Invalid collection parameter')
    }

    const result = await createCsvToExport(collection)

    return res.status(200).send(result)
  } catch (error) {
    console.error('Error exporting CSV:', error)
    return res.status(400).send((error as Error).message)
  }
}
