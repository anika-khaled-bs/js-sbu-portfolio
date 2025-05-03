import type { CollectionBeforeChangeHook } from 'payload'

/**
 * This hook validates the category hierarchy to prevent circular references
 * where a category could become its own ancestor
 */
export const validateCategoryHierarchy: CollectionBeforeChangeHook = async ({
  data,
  operation,
  req: { payload },
  originalDoc,
}) => {
  // Skip if no parent is being set
  if (!data.parent) {
    return data
  }

  // Get the category ID (from originalDoc during update)
  const categoryId = originalDoc?.id

  // Prevent self-reference
  if (categoryId && data.parent === categoryId) {
    throw new Error('A category cannot be its own parent')
  }

  // For updates, check for circular references
  if (operation === 'update' && categoryId) {
    try {
      // Follow the parent chain to ensure this category isn't in it
      let currentParentId = data.parent
      const visitedParents = new Set()

      // Loop until we reach a category with no parent or detect a cycle
      while (currentParentId) {
        // Detect cycles
        if (visitedParents.has(currentParentId)) {
          throw new Error('Circular reference detected in category hierarchy')
        }
        visitedParents.add(currentParentId)

        // If the current category is found in the ancestry chain, we have a cycle
        if (currentParentId === categoryId) {
          throw new Error('This would create a circular reference in the category hierarchy')
        }

        // Get the parent's parent
        const parentCategory = await payload.findByID({
          collection: 'categories',
          id: currentParentId,
        })

        // Move up the chain
        currentParentId = parentCategory.parent || null
      }
    } catch (error: unknown) {
      // Type guard for Error objects with message property
      if (error instanceof Error) {
        // If the error is one we threw, rethrow it
        if (
          error.message.includes('circular reference') ||
          error.message.includes('its own parent')
        ) {
          throw error
        }

        // Otherwise log any lookup errors but continue
        payload.logger.error(`Error validating category hierarchy: ${error.message}`)
      } else {
        // Handle non-Error exceptions
        payload.logger.error('Unknown error validating category hierarchy')
      }
    }
  }

  return data
}
