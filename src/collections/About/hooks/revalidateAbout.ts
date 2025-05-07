import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

/**
 * Hook to revalidate cache when an about page is updated
 * This ensures that the latest content is displayed to users
 */
export const revalidateAbout: CollectionAfterChangeHook = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/about/${doc.slug}`

      payload.logger.info(`Revalidating about page at path: ${path}`)

      revalidatePath(path)
      revalidateTag('about')

      // Always revalidate main about page
      revalidatePath('/about')
    }

    // If the about page was previously published, revalidate the old path
    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      const oldPath = `/about/${previousDoc.slug}`

      payload.logger.info(`Revalidating old about page at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidateTag('about')
    }

    // Always revalidate homepage as it may display company data
    revalidatePath('/')
  }
  return doc
}

/**
 * Hook to clean up cache after about page deletion
 */
export const revalidateDelete: CollectionAfterDeleteHook = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const path = `/about/${doc?.slug}`

    revalidatePath(path)
    revalidatePath('/about')
    revalidateTag('about')

    // Also revalidate homepage
    revalidatePath('/')
  }

  return doc
}
