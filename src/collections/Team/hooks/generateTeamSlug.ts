import type { CollectionBeforeChangeHook } from 'payload'
import { toKebabCase } from '../../../utilities/toKebabCase'

/**
 * Automatically generates a URL-friendly slug from the team member's name
 * if one is not provided explicitly
 */
export const generateTeamSlug: CollectionBeforeChangeHook = async ({
  data,
  operation,
  originalDoc,
}) => {
  // Skip if slugLock is true or the slug is already provided
  if (data.slugLock === true || (data.slug && data.slug.length > 0)) {
    return data
  }

  // Generate new slug for new documents or when name changes
  if (
    operation === 'create' || 
    (operation === 'update' && data.name && originalDoc.name !== data.name)
  ) {
    // Use name for the slug
    if (data.name) {
      data.slug = toKebabCase(data.name)
    }
  }

  return data
}