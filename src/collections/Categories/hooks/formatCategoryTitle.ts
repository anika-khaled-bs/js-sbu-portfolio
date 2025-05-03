import type { CollectionBeforeChangeHook } from 'payload'

/**
 * This hook ensures consistent formatting of category titles
 * by proper capitalization and removing extra spaces
 */
export const formatCategoryTitle: CollectionBeforeChangeHook = async ({ data, operation }) => {
  if ((operation === 'create' || operation === 'update') && data.title) {
    // Normalize spacing
    let formattedTitle = data.title.trim().replace(/\s+/g, ' ')

    // Apply title case - capitalize first letter of each word
    formattedTitle = formattedTitle
      .split(' ')
      .map((word: string): string => {
        // Skip small connecting words unless they're the first word
        const smallWords: string[] = [
          'and',
          'or',
          'the',
          'in',
          'on',
          'at',
          'for',
          'to',
          'of',
          'by',
          'with',
        ]
        if (smallWords.includes(word.toLowerCase()) && formattedTitle.indexOf(word) !== 0) {
          return word.toLowerCase()
        }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      })
      .join(' ')

    data.title = formattedTitle
  }

  return data
}
