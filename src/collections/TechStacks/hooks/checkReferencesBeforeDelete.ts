import type { CollectionBeforeDeleteHook } from 'payload'

export const checkReferencesBeforeDelete: CollectionBeforeDeleteHook = async ({
  id,
  req: { payload },
}) => {
  // Check if any services use this tech stack
  const servicesWithRef = await payload.find({
    collection: 'services',
    where: {
      techStacks: {
        contains: id,
      },
    },
  })

  if (servicesWithRef.totalDocs > 0) {
    const serviceNames = servicesWithRef.docs.map((doc) => doc.title).join(', ')
    throw new Error(
      `Cannot delete this tech stack because it is currently used by ${servicesWithRef.totalDocs} service(s): ${serviceNames}. Please remove this tech stack from those services first.`,
    )
  }

  return id
}
