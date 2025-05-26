import { BeforeSync, DocToSync } from '@payloadcms/plugin-search/types'

export const beforeSyncWithSearch: BeforeSync = async ({ originalDoc, searchDoc }) => {
  const {
    doc: { relationTo: collection },
  } = searchDoc

  const {
    slug,
    id,
    categories,
    title,
    meta,
    shortDescription,
    featuredImage,
    thumbnailImage,
    heroImage,
  } = originalDoc

  const modifiedDoc: DocToSync = {
    ...searchDoc,
    slug,
    title,
    shortDescription,
    thumbnailImage,
    featuredImage,
    heroImage,
    meta: {
      ...meta,
      title: meta?.title || title,
      image: meta?.image?.id || meta?.image,
      description: meta?.description,
      keywords: meta?.keywords || [],
    },
    categories: [],
  }

  if (categories && Array.isArray(categories) && categories.length > 0) {
    // get full categories and keep a flattened copy of their most important properties
    try {
      const mappedCategories = categories.map((category) => {
        const { id, title } = category

        return {
          relationTo: 'categories',
          id,
          title,
        }
      })

      modifiedDoc.categories = mappedCategories
    } catch (_err) {
      console.error(
        `Failed. Category not found when syncing collection '${collection}' with id: '${id}' to search.`,
      )
    }
  }

  return modifiedDoc
}
