import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

export const revalidateContactDetails: CollectionAfterChangeHook = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      // Revalidate paths that might display contact details
      payload.logger.info(`Revalidating contact details on main pages`)

      revalidatePath('/')
      revalidatePath('/contact')
      revalidatePath('/about')
      revalidateTag('contact-details')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook = ({ req: { context } }) => {
  if (!context.disableRevalidate) {
    revalidatePath('/')
    revalidatePath('/contact')
    revalidatePath('/about')
    revalidateTag('contact-details')
  }
}
