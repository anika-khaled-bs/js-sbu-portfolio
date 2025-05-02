import type { CollectionBeforeDeleteHook } from 'payload'

export const checkReferencesBeforeDelete: CollectionBeforeDeleteHook = async ({
  id,
  req: { payload },
}) => {
  // Only fetch the necessary fields (title) and limit results
  const servicesWithRef = await payload.find({
    collection: 'services',
    where: {
      techStacks: {
        contains: id,
      },
    },
    limit: 5, // Only need a few to show in the error message
    depth: 0, // Don't need to populate relationships
    select: {
      title: true,
    }, // Use the proper ServicesSelect type syntax
  })

  if (servicesWithRef.totalDocs > 0) {
    // Get service names for the error message
    const serviceNames = servicesWithRef.docs.map((doc) => doc.title).join(', ')

    // If there are more services than we fetched, indicate that in the message
    const additionalText =
      servicesWithRef.totalDocs > servicesWithRef.docs.length
        ? ` and ${servicesWithRef.totalDocs - servicesWithRef.docs.length} more`
        : ''

    throw new Error(
      `Cannot delete this tech stack because it is currently used by ${servicesWithRef.totalDocs} service(s): ${serviceNames}${additionalText}. Please remove this tech stack from those services first.`,
    )
  }

  return id
}
