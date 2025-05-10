import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

export const revalidateValue: CollectionAfterChangeHook = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/values/${doc.slug}`

      payload.logger.info(`Revalidating value at path: ${path}`)

      revalidatePath(path)
      revalidateTag('values-sitemap')
    }

    // If the value was previously published, we need to revalidate the old path
    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      const oldPath = `/values/${previousDoc.slug}`

      payload.logger.info(`Revalidating old value at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidateTag('values-sitemap')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const path = `/values/${doc?.slug}`

    revalidatePath(path)
    revalidateTag('values-sitemap')
  }

  return doc
}
