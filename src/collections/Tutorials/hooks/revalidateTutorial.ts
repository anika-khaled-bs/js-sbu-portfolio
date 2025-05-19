import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Tutorial } from '../../../payload-types'

export const revalidateTutorial: CollectionAfterChangeHook<Tutorial> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/tutorials/${doc.slug}`

      payload.logger.info(`Revalidating tutorial at path: ${path}`)

      revalidatePath(path)
      revalidateTag('tutorials-sitemap')
    }

    // If the tutorial was previously published, we need to revalidate the old path
    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      const oldPath = `/tutorials/${previousDoc.slug}`

      payload.logger.info(`Revalidating old tutorial at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidateTag('tutorials-sitemap')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Tutorial> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    const path = `/tutorials/${doc?.slug}`

    revalidatePath(path)
    revalidateTag('tutorials-sitemap')
  }

  return doc
}
