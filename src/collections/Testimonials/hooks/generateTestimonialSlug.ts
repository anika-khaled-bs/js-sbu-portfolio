import type { CollectionBeforeChangeHook } from 'payload'
import { toKebabCase } from '../../../utilities/toKebabCase'

/**
 * Generates SEO-friendly slugs for testimonials based on client name and company
 * Follows Open/Closed principle by being easily extendable for different slug formats
 */
export const generateTestimonialSlug: CollectionBeforeChangeHook = async ({
  data,
  operation,
  originalDoc,
}) => {
  // Skip if slugLock is true or slug already provided
  if (data.slugLock === true || (data.slug && data.slug.length > 0)) {
    return data
  }

  // Generate new slug for new testimonials or when relevant fields change
  if (
    operation === 'create' ||
    (operation === 'update' &&
      ((data.clientName && originalDoc.clientName !== data.clientName) ||
        (data.clientCompany && originalDoc.clientCompany !== data.clientCompany)))
  ) {
    // Create a semantic slug combining client name and company for better SEO
    let slugBase = ''

    // Use client name as primary slug component
    if (data.clientName) {
      slugBase = data.clientName

      // Add company name for more specificity if available
      if (data.clientCompany) {
        slugBase += `-${data.clientCompany}`
      }
    }
    // Fallback to just company if no client name
    else if (data.clientCompany) {
      slugBase = data.clientCompany
    }
    // Last resort is to use a timestamp
    else {
      slugBase = `testimonial-${Date.now()}`
    }

    // Convert to kebab case
    data.slug = toKebabCase(slugBase)
  }

  return data
}
