import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

export const revalidateHeroSlider: CollectionAfterChangeHook = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    const path = `/hero-sliders/${doc.slug}`

    payload.logger.info(`Revalidating hero slider at path: ${path}`)

    revalidatePath(path)
    revalidateTag('hero-sliders')

    // Also revalidate pages that might be displaying hero sliders
    revalidatePath('/') // Home page
    revalidatePath('/services') // Services page that might show featured sliders
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const path = `/hero-sliders/${doc?.slug}`

    revalidatePath(path)
    revalidateTag('hero-sliders')

    // Also revalidate pages that might be displaying hero sliders
    revalidatePath('/') // Home page
    revalidatePath('/services') // Services page that might show featured sliders
  }

  return doc
}
