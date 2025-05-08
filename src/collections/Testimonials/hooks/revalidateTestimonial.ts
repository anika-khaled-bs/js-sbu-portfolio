import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'

/**
 * Hook to selectively revalidate pages containing testimonials after changes
 * Follows SRP (Single Responsibility Principle) by focusing only on revalidation
 */
export const revalidateTestimonial: CollectionAfterChangeHook = ({
  doc,
  req: { payload, context },
}) => {
  // Skip revalidation if explicitly disabled in context
  if (context.disableRevalidate) return doc

  // Only revalidate published testimonials
  if (doc._status === 'published') {
    // Revalidate testimonials listing page and individual testimonial
    const individualPath = `/testimonials/${doc.slug}`
    payload.logger.info(`Revalidating testimonial at path: ${individualPath}`)

    // Revalidate specific paths
    revalidatePath(individualPath)
    revalidatePath('/testimonials')

    // Revalidate the homepage which might feature testimonials
    revalidatePath('/')
    revalidatePath('/about')

    // Revalidate service pages that might display related testimonials
    // if (doc.relatedServices?.length) {
    //   // Only revalidate relevant service pages, not all
    //   doc.relatedServices.forEach((service) => {
    //     const serviceId = typeof service === 'object' ? service.id : service
    //     if (serviceId) {
    //       revalidatePath(`/services/${serviceId}`)
    //     }
    //   })
    // }

    // Tag-based revalidation for components that might render testimonials
    revalidateTag('testimonials')
  }

  return doc
}

/**
 * Hook to clean up cache after testimonial deletion
 */
export const revalidateDelete: CollectionAfterDeleteHook = ({ doc, req: { context } }) => {
  // Skip revalidation if explicitly disabled in context
  if (context.disableRevalidate) return doc

  // Basic paths to revalidate
  const path = `/testimonials/${doc?.slug}`
  revalidatePath(path)
  revalidatePath('/testimonials')
  revalidatePath('/')

  // Clean up tag cache
  revalidateTag('testimonials')

  return doc
}
