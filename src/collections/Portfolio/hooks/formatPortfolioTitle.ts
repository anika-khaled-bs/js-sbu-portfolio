import type { CollectionBeforeChangeHook } from 'payload'

/**
 * This hook ensures consistent formatting of portfolio titles
 * by proper capitalization and removing extra spaces
 */
export const formatPortfolioTitle: CollectionBeforeChangeHook = async ({ data, operation }) => {
  if ((operation === 'create' || operation === 'update') && data.title) {
    // Normalize spacing
    let formattedTitle = data.title.trim().replace(/\s+/g, ' ')

    // Capitalize first letter of each sentence
    formattedTitle = formattedTitle
      .split('. ')
      .map((sentence: string): string => {
        if (sentence.length > 0) {
          return sentence.charAt(0).toUpperCase() + sentence.slice(1)
        }
        return sentence
      })
      .join('. ')

    // Ensure first letter of the title is always capital
    if (formattedTitle.length > 0) {
      formattedTitle = formattedTitle.charAt(0).toUpperCase() + formattedTitle.slice(1)
    }

    data.title = formattedTitle
  }

  return data
}
