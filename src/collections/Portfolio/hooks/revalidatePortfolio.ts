import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

export const revalidatePortfolio: CollectionAfterChangeHook = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/portfolio/${doc.slug}`

      payload.logger.info(`Revalidating portfolio at path: ${path}`)

      revalidatePath(path)
      revalidateTag('portfolio-sitemap')
    }

    // If the portfolio was previously published, we need to revalidate the old path
    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      const oldPath = `/portfolio/${previousDoc.slug}`

      payload.logger.info(`Revalidating old portfolio at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidateTag('portfolio-sitemap')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const path = `/portfolio/${doc?.slug}`

    revalidatePath(path)
    revalidateTag('portfolio-sitemap')
  }

  return doc
}
