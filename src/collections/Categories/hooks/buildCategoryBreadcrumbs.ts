import type { CollectionAfterReadHook } from 'payload'
import type { Category } from '../../../payload-types'

/**
 * This hook builds breadcrumb navigation for categories
 * by traversing the parent relationship
 */
export const buildCategoryBreadcrumbs: CollectionAfterReadHook<Category> = async ({
  doc,
  req: { payload },
}) => {
  if (!doc.parent) {
    // No parent means no breadcrumbs needed beyond self
    return {
      ...doc,
      breadcrumbs: [
        {
          label: doc.title,
          url: `/categories/${doc.slug}`,
        },
      ],
    }
  }

  try {
    const breadcrumbs = []
    let currentDoc = doc
    let parentDoc = null

    // Add self as first breadcrumb
    breadcrumbs.unshift({
      label: currentDoc.title,
      url: `/categories/${currentDoc.slug}`,
      doc: currentDoc.id,
    })

    // Follow parent chain to build breadcrumbs
    while (currentDoc.parent) {
      const parentId =
        typeof currentDoc.parent === 'object' ? currentDoc.parent.id : currentDoc.parent

      parentDoc = await payload.findByID({
        collection: 'categories',
        id: parentId,
      })

      if (!parentDoc) break

      breadcrumbs.unshift({
        label: parentDoc.title,
        url: `/categories/${parentDoc.slug}`,
        doc: parentDoc.id,
      })

      currentDoc = parentDoc
    }

    return {
      ...doc,
      breadcrumbs,
    }
  } catch (error) {
    if (error instanceof Error) {
      payload.logger.error(`Error building breadcrumbs for category ${doc.id}: ${error.message}`)
    } else {
      payload.logger.error(`Error building breadcrumbs for category ${doc.id}: ${String(error)}`)
    }
    return doc
  }
}
