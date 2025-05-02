import type { CollectionBeforeDeleteHook } from 'payload'

/**
 * This hook cleans up references to team members when they're deleted
 * It searches through project references and removes the deleted team member
 */
export const cleanupTeamReferences: CollectionBeforeDeleteHook = async ({
  id,
  req: { payload },
}) => {
  try {
    // Find posts/projects that reference this team member
    const projectsWithTeamMember = await payload.find({
      collection: 'posts', // Will update to 'portfolio' when that collection exists
      where: {
        'teamMembers.contains': id,
      },
      depth: 0,
      limit: 100,
    })

    // Remove this team member from each project's teamMembers array
    if (projectsWithTeamMember.docs && projectsWithTeamMember.docs.length > 0) {
      for (const project of projectsWithTeamMember.docs) {
        if (project.teamMembers) {
          await payload.update({
            collection: 'posts', // Will update to 'portfolio' when that collection exists
            id: project.id,
            data: {
              // Filter out the ID of the team member being deleted
              teamMembers: project.teamMembers.filter((memberId) =>
                typeof memberId === 'string' ? memberId !== id : memberId.id !== id,
              ),
            },
          })
        }
      }
    }
  } catch (error) {
    // Log the error but don't block the deletion
    payload.logger.error(`Error cleaning up team member references: ${error.message}`)
  }

  return id
}
