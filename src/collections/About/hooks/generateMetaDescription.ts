import type { CollectionBeforeChangeHook } from 'payload'

/**
 * Automatically generates meta descriptions for SEO if one is not provided
 * by extracting text from the about page content
 */
export const generateMetaDescription: CollectionBeforeChangeHook = async ({ data, operation }) => {
  // Only run during create or update operations when meta field exists
  if ((operation === 'create' || operation === 'update') && data.meta) {
    // Skip if a description is already provided
    if (!data.meta.description) {
      // Try to create a description from the content
      if (data.content) {
        try {
          // Extract text from the lexical rich text content
          let description = ''

          // Process paragraph nodes to extract text
          if (data.content.root?.children) {
            for (const child of data.content.root.children) {
              // Check if it's a text node
              if (child.type === 'paragraph' && child.children) {
                for (const textNode of child.children) {
                  if (textNode.type === 'text' && textNode.text) {
                    description += textNode.text + ' '

                    // If we have enough text, stop extracting
                    if (description.length > 200) {
                      break
                    }
                  }
                }

                if (description.length > 0) {
                  break // Got enough text from first paragraph
                }
              }
            }
          }

          // Clean and trim the description
          if (description) {
            description = description.trim()

            // Limit to ~155-160 characters for SEO best practices
            if (description.length > 155) {
              description = description.substring(0, 152) + '...'
            }

            // Set the meta description
            data.meta.description = description
          }
        } catch (error) {
          // Silently fail if we can't extract text
          console.error('Error generating meta description:', error)
        }
      }

      // Use mission statement as fallback if available
      if (!data.meta.description && data.mission) {
        const mission = data.mission.trim()

        if (mission.length > 155) {
          data.meta.description = mission.substring(0, 152) + '...'
        } else {
          data.meta.description = mission
        }
      }

      // Final fallback if we couldn't generate from content
      if (!data.meta.description && data.title) {
        data.meta.description = `Learn more about ${data.title} - our company story, mission, values, and team.`
      }
    }
  }

  return data
}
