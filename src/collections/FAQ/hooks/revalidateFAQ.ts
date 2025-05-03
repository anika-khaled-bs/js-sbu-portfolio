import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

export const revalidateFAQ: CollectionAfterChangeHook = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/faqs/${doc.slug}`

      payload.logger.info(`Revalidating FAQ at path: ${path}`)

      revalidatePath(path)
      revalidateTag('faqs-sitemap')
    }

    // If the FAQ was previously published, we need to revalidate the old path
    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      const oldPath = `/faqs/${previousDoc.slug}`

      payload.logger.info(`Revalidating old FAQ at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidateTag('faqs-sitemap')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const path = `/faqs/${doc?.slug}`

    revalidatePath(path)
    revalidateTag('faqs-sitemap')
  }

  return doc
}
