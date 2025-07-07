import { payload } from '@/utils/payload'
import { CollectionSlug } from 'payload'

const createCsvToExport = async (collection: string) => {
  const data = await payload.find({
    collection: collection as CollectionSlug,
    depth: 0,
    limit: 10000,
    sort: 'createdAt:desc',
  })
  return data
}
export default createCsvToExport
