import type { CollectionBeforeChangeHook } from 'payload'

/**
 * This hook formats the team member display name by capitalizing names
 * and ensuring proper role formatting
 */
export const formatTeamDisplayName: CollectionBeforeChangeHook = async ({ data, operation }) => {
  // Only run this hook during create or update operations
  if (operation === 'create' || operation === 'update') {
    // Format the name if it exists
    if (data.name) {
      // Split the name by spaces
      const nameParts = data.name.trim().split(/\s+/)

      // Capitalize each part of the name
      const formattedName: string = nameParts
        .map((part: string): string => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
        .join(' ')

      data.name = formattedName
    }

    // Format role if it exists (capitalize first letter of each word)
    if (data.role) {
      const roleParts = data.role.trim().split(/\s+/)

      const formattedRole: string = roleParts
        .map((part: string): string => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
        .join(' ')

      data.role = formattedRole
    }
  }

  return data
}
