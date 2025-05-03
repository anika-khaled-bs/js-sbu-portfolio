import type { CollectionBeforeChangeHook } from 'payload'

/**
 * This hook ensures consistent formatting of client names and company names
 * to maintain data quality in testimonials
 */
export const formatClientName: CollectionBeforeChangeHook = async ({ data, operation }) => {
  if (operation === 'create' || operation === 'update') {
    // Format client name if it exists
    if (data.clientName) {
      // Normalize whitespace
      let formattedName = data.clientName.trim().replace(/\s+/g, ' ')

      // Apply proper capitalization
      formattedName = formattedName
        .split(' ')
        .map((part: string): string => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ')

      data.clientName = formattedName
    }

    // Format company name if it exists
    if (data.companyName) {
      // Normalize whitespace
      data.companyName = data.companyName.trim().replace(/\s+/g, ' ')

      // Company names often have specific capitalization patterns,
      // but we'll ensure it starts with a capital letter
      if (data.companyName.length > 0) {
        data.companyName = data.companyName.charAt(0).toUpperCase() + data.companyName.slice(1)
      }
    }

    // Format job title if present
    if (data.clientJobTitle) {
      // Normalize whitespace
      data.clientJobTitle = data.clientJobTitle.trim().replace(/\s+/g, ' ')
    }
  }

  return data
}
