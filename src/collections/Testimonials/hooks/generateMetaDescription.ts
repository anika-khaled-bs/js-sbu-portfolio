import type { CollectionBeforeChangeHook } from 'payload'

/**
 * Automatically generates SEO meta descriptions from testimonial content
 * Uses a performance-optimized approach to extract the most relevant text
 */
export const generateMetaDescription: CollectionBeforeChangeHook = async ({
  data,
  operation,
}) => {
  // Only generate meta description if none exists and we have a testimonial
  if ((operation === 'create' || operation === 'update') && 
      data.meta && 
      !data.meta.description && 
      data.testimonial) {
    
    try {
      // Extract text from testimonial content
      let description = ''
      
      // Handle rich text fields if using Lexical editor
      if (typeof data.testimonial === 'object' && data.testimonial.root?.children) {
        // Extract plain text from first paragraph node (most relevant content)
        for (const node of data.testimonial.root.children) {
          if (node.type === 'paragraph' && Array.isArray(node.children)) {
            for (const textNode of node.children) {
              if (textNode.type === 'text' && textNode.text) {
                description += textNode.text + ' '
              }
            }
            // Only process first paragraph for efficiency
            if (description) break
          }
        }
      } 
      // Handle plain text testimonials
      else if (typeof data.testimonial === 'string') {
        description = data.testimonial
      }
      
      if (description) {
        // Clean up the description
        description = description.trim()
        
        // Add attribution for more compelling meta description
        if (data.clientName) {
          const attribution = data.clientCompany 
            ? `${data.clientName}, ${data.clientTitle || 'Client'} at ${data.clientCompany}` 
            : data.clientName
            
          description = `"${description}" - ${attribution}`
        }
        
        // Enforce length limits for SEO best practices (150-160 chars)
        if (description.length > 155) {
          description = description.substring(0, 152) + '...'
        }
        
        // Update the meta description
        data.meta.description = description
      }
    } catch (error) {
      // Fail silently - meta description is optional
      console.error('Error generating testimonial meta description:', error)
    }
  }
  
  return data
}