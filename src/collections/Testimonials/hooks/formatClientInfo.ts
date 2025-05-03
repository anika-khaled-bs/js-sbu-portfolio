import type { CollectionBeforeChangeHook } from 'payload'

/**
 * Hook to consistently format client information before saving
 * Handles both client name and company formatting for consistency
 */
export const formatClientInfo: CollectionBeforeChangeHook = async ({ data, operation }) => {
  // Only run during create/update operations
  if (operation === 'create' || operation === 'update') {
    // Format client name if present
    if (data.clientName) {
      // Normalize whitespace
      const clientName = data.clientName.trim().replace(/\s+/g, ' ')

      // Apply title case to name (capitalize each word)
      data.clientName = clientName
        .split(' ')
        .map((word: string): string => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ')
    }

    // Format company name if present
    if (data.clientCompany) {
      const companyName = data.clientCompany.trim().replace(/\s+/g, ' ')

      // Special handling for company names with common patterns
      const companyPatterns = [
        { pattern: /\binc\.?$/i, replacement: 'Inc.' },
        { pattern: /\bllc\.?$/i, replacement: 'LLC' },
        { pattern: /\bltd\.?$/i, replacement: 'Ltd.' },
        { pattern: /\bcorp\.?$/i, replacement: 'Corp.' },
        { pattern: /\bgmbh\.?$/i, replacement: 'GmbH' },
        { pattern: /\bpvt\.?$/i, replacement: 'Pvt.' },
        { pattern: /\bco\.?$/i, replacement: 'Co.' },
      ]

      // Apply standard title case first
      let formattedCompany = companyName
        .split(' ')
        .map((word: string) => {
          // Skip small connecting words unless they're the first word
          const smallWords = ['and', 'or', 'the', 'in', 'on', 'at', 'for', 'to', 'of', 'by', 'with']
          if (smallWords.includes(word.toLowerCase()) && companyName.indexOf(word) !== 0) {
            return word.toLowerCase()
          }
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        })
        .join(' ')

      // Apply special company suffix patterns
      for (const { pattern, replacement } of companyPatterns) {
        formattedCompany = formattedCompany.replace(pattern, replacement)
      }

      data.clientCompany = formattedCompany
    }

    // Format job title if present
    if (data.clientTitle) {
      const title = data.clientTitle.trim().replace(/\s+/g, ' ')

      // Apply sentence case (only capitalize first letter)
      data.clientTitle = title.charAt(0).toUpperCase() + title.slice(1).toLowerCase()
    }
  }

  return data
}
