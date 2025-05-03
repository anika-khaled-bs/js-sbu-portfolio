import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

export const revalidateCategory: CollectionAfterChangeHook = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    const path = `/categories/${doc.slug}`

    payload.logger.info(`Revalidating category at path: ${path}`)

    // Revalidate the specific category page
    revalidatePath(path)

    // Revalidate the categories listing page
    revalidatePath('/categories')

    // Revalidate content that might use this category
    revalidateTag('categories')

    // Revalidate related content based on category type
    if (doc.type === 'blog') {
      revalidateTag('posts')
      revalidatePath('/blog')
    } else if (doc.type === 'service') {
      revalidateTag('services')
      revalidatePath('/services')
    } else if (doc.type === 'portfolio') {
      revalidateTag('portfolio')
      revalidatePath('/portfolio')
    } else if (doc.type === 'team') {
      revalidateTag('team')
      revalidatePath('/about/team')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const path = `/categories/${doc?.slug}`

    revalidatePath(path)
    revalidatePath('/categories')
    revalidateTag('categories')

    // Revalidate related content based on category type
    if (doc?.type === 'blog') {
      revalidateTag('posts')
      revalidatePath('/blog')
    } else if (doc?.type === 'service') {
      revalidateTag('services')
      revalidatePath('/services')
    } else if (doc?.type === 'portfolio') {
      revalidateTag('portfolio')
      revalidatePath('/portfolio')
    } else if (doc?.type === 'team') {
      revalidateTag('team')
      revalidatePath('/about/team')
    }
  }

  return doc
}
