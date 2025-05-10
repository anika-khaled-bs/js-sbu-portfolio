import type { CollectionBeforeChangeHook } from 'payload'

export const enforceUniqueActive: CollectionBeforeChangeHook = async ({
  data,
  req,
  operation,
  collection,
  context,
}) => {
  // Only run this hook if the contact detail is being set to active
  if (data.isActive) {
    try {
      // Find all other active contact details
      const existingActive = await req.payload.find({
        collection: 'contact-details',
        where: {
          isActive: {
            equals: true,
          },
          // Don't include the current document in the search if it's an update operation
          ...(operation === 'update' && {
            id: {
              not_equals: data.id,
            },
          }),
        },
      })

      // Deactivate all other active contact details
      if (existingActive.docs.length > 0) {
        req.payload.logger.info('Deactivating other active contact details')

        await Promise.all(
          existingActive.docs.map(async (doc) => {
            await req.payload.update({
              collection: 'contact-details',
              id: doc.id,
              data: {
                isActive: false,
              },
              // Prevent infinite loops by disabling this hook for these updates
              context: {
                skipEnforceUniqueActive: true,
              },
            })
          }),
        )
      }
    } catch (error) {
      req.payload.logger.error('Error in enforceUniqueActive hook:', error)
    }
  }

  return data
}
