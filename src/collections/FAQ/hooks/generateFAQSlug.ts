import type { CollectionBeforeChangeHook } from 'payload'
import { toKebabCase } from '../../../utilities/toKebabCase'

/**
 * Automatically generates a URL-friendly slug from the FAQ question
 * if one is not provided explicitly
 */
export const generateFAQSlug: CollectionBeforeChangeHook = async ({
  data,
  operation,
  originalDoc,
}) => {
  // Skip if slugLock is true or the slug is already provided
  if (data.slugLock === true || (data.slug && data.slug.length > 0)) {
    return data
  }

  // Generate new slug for new documents or when question changes
  if (
    operation === 'create' ||
    (operation === 'update' && data.question && originalDoc.question !== data.question)
  ) {
    // Use question for the slug
    if (data.question) {
      data.slug = toKebabCase(data.question)
    }
  }

  return data
}
