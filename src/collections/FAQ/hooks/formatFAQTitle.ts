import type { CollectionBeforeChangeHook } from 'payload'

/**
 * This hook ensures consistent formatting of FAQ questions
 * by proper capitalization and removing extra spaces
 */
export const formatFAQTitle: CollectionBeforeChangeHook = async ({ data, operation }) => {
  if ((operation === 'create' || operation === 'update') && data.question) {
    // Normalize spacing
    let formattedQuestion = data.question.trim().replace(/\s+/g, ' ')

    // Capitalize first letter of the question
    if (formattedQuestion.length > 0) {
      formattedQuestion = formattedQuestion.charAt(0).toUpperCase() + formattedQuestion.slice(1)
    }

    // Ensure question ends with a question mark if it doesn't already
    if (!formattedQuestion.endsWith('?')) {
      formattedQuestion += '?'
    }

    data.question = formattedQuestion
  }

  return data
}
