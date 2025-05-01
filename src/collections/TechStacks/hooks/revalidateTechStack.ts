import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

export const revalidateTechStack: CollectionAfterChangeHook = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    const path = `/tech-stacks/${doc.slug}`

    payload.logger.info(`Revalidating tech stack at path: ${path}`)

    revalidatePath(path)
    revalidateTag('tech-stacks')

    // Also revalidate services that might be using this tech stack
    revalidateTag('services')
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const path = `/tech-stacks/${doc?.slug}`

    revalidatePath(path)
    revalidateTag('tech-stacks')
    revalidateTag('services')
  }

  return doc
}
