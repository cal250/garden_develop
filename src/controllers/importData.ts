'use server'

import { payload } from '@/utils/payload'
import { CollectionSlug } from 'payload'

// import payload from 'payload';

const importData = async (collection: string, data: Array<ParsedRow>) => {
  if (data.length > 0) {
    const fields = Object.keys(data[0])
    const duplicates = []

    for (const row of data) {
      try {
        const newData: ParsedRow = {}
        fields.map((field) => {
          newData[field] = row[field]
        })

        // Check if a document with the same title already exists
        const existingEntry = await payload.find({
          collection: collection as CollectionSlug,
          where: {
            id: {
              equals: row['id'], // assuming the title field is used for checking duplicates
            },
          },
        })

        // If a duplicate is found, add the whole document (row) to the duplicates array
        if (existingEntry.docs.length > 0) {
          // console.log(`Duplicate data found - Title: ${row['title']}`);
          duplicates.push(row) // Add the full document to duplicates
        } else {
          await payload.create({
            collection: collection as CollectionSlug,
            data: newData,
          })
        }
      } catch (error) {
        console.log('Error from importData - ', error)
      }
    }

    if (duplicates.length === 0) {
      return { success: 'Data imported successfully.' }
    } else {
      return { success: 'Data imported successfully.', duplicates }
    }
  } else {
    return { error: 'No data to import.' }
  }
}

export default importData
