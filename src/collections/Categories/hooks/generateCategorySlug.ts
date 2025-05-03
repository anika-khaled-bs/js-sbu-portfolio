import type { CollectionBeforeChangeHook } from 'payload'
import { toKebabCase } from '../../../utilities/toKebabCase'

/**
 * Automatically generates a URL-friendly slug from the category title
 * if one is not provided explicitly. For nested categories, it includes
 * the parent category's slug as a prefix to create hierarchical slugs.
 */
export const generateCategorySlug: CollectionBeforeChangeHook = async ({
  data,
  operation,
  originalDoc,
  req: { payload },
}) => {
  // Skip if slugLock is true or the slug is already provided
  if (data.slugLock === true || (data.slug && data.slug.length > 0)) {
    return data
  }

  // Generate new slug when title changes or on create
  if (
    operation === 'create' ||
    (operation === 'update' && data.title && originalDoc.title !== data.title) ||
    (operation === 'update' && data.parent !== originalDoc.parent)
  ) {
    if (data.title) {
      // Base slug from the title
      let slug = toKebabCase(data.title)

      // If this is a nested category, prefixed by parent's slug
      if (data.parent) {
        try {
          // Fetch parent category to get its slug
          const parentCategory = await payload.findByID({
            collection: 'categories',
            id: data.parent,
          })

          if (parentCategory && parentCategory.slug) {
            // Create a hierarchical slug
            slug = `${parentCategory.slug}/${slug}`
          }
        } catch (error) {
          // If parent isn't found, just use the title slug
          if (error instanceof Error) {
            payload.logger.error(`Error fetching parent category: ${error.message}`)
          } else {
            payload.logger.error('Error fetching parent category: An unknown error occurred')
          }
        }
      }

      data.slug = slug
    }
  }

  return data
}
