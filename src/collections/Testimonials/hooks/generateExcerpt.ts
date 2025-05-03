import type { CollectionBeforeChangeHook } from 'payload'

/**
 * Automatically generates an excerpt from testimonial content
 * for previews and listings
 */
export const generateExcerpt: CollectionBeforeChangeHook = async ({ data, operation }) => {
  // Only generate excerpt if none exists and we have testimonial content
  if ((operation === 'create' || operation === 'update') && !data.excerpt && data.testimonial) {
    try {
      // Extract text from testimonial content
      let textContent = ''

      // Handle rich text fields if using Lexical editor
      if (typeof data.testimonial === 'object' && data.testimonial.root?.children) {
        // Extract plain text from paragraphs
        for (const node of data.testimonial.root.children) {
          if (node.type === 'paragraph' && Array.isArray(node.children)) {
            for (const textNode of node.children) {
              if (textNode.type === 'text' && textNode.text) {
                textContent += textNode.text + ' '
              }
            }
          }
        }
      }
      // Handle plain text testimonials
      else if (typeof data.testimonial === 'string') {
        textContent = data.testimonial
      }

      if (textContent) {
        // Clean up the text
        textContent = textContent.trim()

        // Create an excerpt (around 160 characters)
        if (textContent.length > 160) {
          data.excerpt = textContent.substring(0, 157) + '...'
        } else {
          data.excerpt = textContent
        }
      }
    } catch {
      // Silently fail - excerpt is optional
      // No need to use the error variable if we're not logging it
    }
  }

  return data
}
