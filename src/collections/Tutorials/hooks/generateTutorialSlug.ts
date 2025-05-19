import type { CollectionBeforeChangeHook } from 'payload'
import { toKebabCase } from '../../../utilities/toKebabCase'

/**
 * Automatically generates a URL-friendly slug from the tutorial title
 * if one is not provided explicitly
 */
export const generateTutorialSlug: CollectionBeforeChangeHook = async ({
  data,
  operation,
  originalDoc,
}) => {
  // Skip if slugLock is true or the slug is already provided
  if (data.slugLock === true || (data.slug && data.slug.length > 0)) {
    return data
  }

  // Generate new slug for new documents or when title changes
  if (
    operation === 'create' ||
    (operation === 'update' && data.title && originalDoc.title !== data.title)
  ) {
    // Use title for the slug
    if (data.title) {
      data.slug = toKebabCase(data.title)
    }
  }

  return data
}
