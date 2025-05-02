import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

export const revalidateTeam: CollectionAfterChangeHook = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/about/team/${doc.slug}`

      payload.logger.info(`Revalidating team member at path: ${path}`)

      // Revalidate the specific member page
      revalidatePath(path)

      // Revalidate the team listing page
      revalidatePath('/about/team')

      // Revalidate the about page that might show team members
      revalidatePath('/about')

      // Revalidate potential tag for team members
      revalidateTag('team')
    }

    // If the team member was previously published, we need to revalidate the old path
    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      const oldPath = `/about/team/${previousDoc.slug}`

      payload.logger.info(`Revalidating old team member at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidatePath('/about/team')
      revalidatePath('/about')
      revalidateTag('team')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const path = `/about/team/${doc?.slug}`

    revalidatePath(path)
    revalidatePath('/about/team')
    revalidatePath('/about')
    revalidateTag('team')
  }

  return doc
}
