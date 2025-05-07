import { About } from '@/payload-types'
import type { CollectionBeforeValidateHook } from 'payload'

/**
 * Hook to enforce a singleton pattern for the About collection
 * Ensures only one About document can exist in the collection
 */
export const validateSingletonDocument: CollectionBeforeValidateHook<About> = async ({
  operation,
  data,
  req: { payload },
}) => {
  // Only validate on create operation
  if (operation === 'create') {
    try {
      // Check if any documents already exist
      const existingDocs = await payload.find({
        collection: 'about',
        limit: 1,
      })

      // If there are existing documents, prevent the creation of a new one
      if (existingDocs.docs.length > 0) {
        throw new Error(
          'Only one About document can exist. Please edit the existing document instead.',
        )
      }
    } catch (error) {
      // Re-throw any error that occurred during validation
      throw error
    }
  }

  return data
}
