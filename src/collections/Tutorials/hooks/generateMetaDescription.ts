import type { CollectionBeforeChangeHook } from 'payload'

/**
 * Automatically generates a meta description from the tutorial's shortDescription
 * when one is not explicitly provided
 */
export const generateMetaDescription: CollectionBeforeChangeHook = async ({
  data,
  operation,
  originalDoc,
}) => {
  // Make sure we're processing a tutorial that has a short description
  if (!data?.shortDescription) {
    return data
  }

  // If this is a create operation or the shortDescription has changed
  if (
    operation === 'create' ||
    (operation === 'update' && originalDoc?.shortDescription !== data.shortDescription)
  ) {
    // Only generate if there's no meta description already
    if (!data.meta?.description || data.meta.description === '') {
      // Initialize meta if it doesn't exist
      data.meta = data.meta || {}

      // Use the shortDescription as meta description (truncate if too long)
      const maxLength = 160
      data.meta.description =
        data.shortDescription.length > maxLength
          ? `${data.shortDescription.substring(0, maxLength - 3)}...`
          : data.shortDescription
    }
  }

  return data
}
