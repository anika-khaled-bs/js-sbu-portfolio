import type { CollectionBeforeValidateHook } from 'payload'

/**
 * Validates testimonial content to ensure quality and prevent spam
 * Enhances data quality by enforcing minimum content standards
 */
export const validateTestimonialContent: CollectionBeforeValidateHook = async ({
  data,
  req: _req,
  operation,
}) => {
  // For non-admin created testimonials or when publishing, perform enhanced validation
  if ((operation === 'create' || operation === 'update') && data?._status === 'published') {
    // Validate testimonial content
    if (data.testimonial) {
      let testimonialText = ''

      // Extract text to validate from rich text
      if (typeof data.testimonial === 'object' && data.testimonial.root?.children) {
        // Combine all text from all paragraph nodes
        for (const node of data.testimonial.root.children) {
          if (node.type === 'paragraph' && Array.isArray(node.children)) {
            for (const textNode of node.children) {
              if (textNode.type === 'text' && textNode.text) {
                testimonialText += textNode.text + ' '
              }
            }
          }
        }
      }
      // Handle plain text
      else if (typeof data.testimonial === 'string') {
        testimonialText = data.testimonial
      }

      // Trim and get word count
      testimonialText = testimonialText.trim()
      const wordCount = testimonialText.split(/\s+/).length

      // Check for minimum testimonial length (at least 10 words)
      if (wordCount < 10) {
        throw new Error('Testimonial content should be at least 10 words for quality purposes.')
      }

      // Simple spam detection: check for excessive capitalization (shouting)
      const upperCaseChars = testimonialText.replace(/[^A-Z]/g, '').length
      const totalChars = testimonialText.replace(/\s/g, '').length

      if (totalChars > 20 && upperCaseChars / totalChars > 0.5) {
        throw new Error('Please use normal capitalization in testimonial content.')
      }
    } else {
      throw new Error('Testimonial content is required.')
    }

    // Client information validation
    if (!data.clientName && !data.clientCompany) {
      throw new Error('At least one of client name or company must be provided.')
    }
  }

  return data
}
