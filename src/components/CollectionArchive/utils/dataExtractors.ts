import {
  Post,
  Service,
  Testimonial,
  Team,
  Portfolio,
  Value,
  TechStack,
  Media,
  Tutorial,
} from '@/payload-types'
import { CollectionItem } from '../types'
import { formatDate } from '@/utilities/formatDate'

/**
 * Utility functions to extract data from various collection types
 */
export const collectionDataExtractors = {
  getMetaData: (doc: CollectionItem, relationTo: string) => {
    switch (relationTo) {
      case 'posts':
        return (doc as Post).meta
      case 'services':
        return (doc as Service).meta
      case 'testimonials':
        return (doc as Testimonial).meta
      case 'team':
        return (doc as Team).meta
      case 'portfolio':
        return (doc as Portfolio).meta
      case 'tutorials':
        return (doc as Tutorial).meta
      default:
        return undefined
    }
  },

  getTitle: (doc: CollectionItem, relationTo: string): string => {
    switch (relationTo) {
      case 'posts':
      case 'services':
      case 'portfolio':
      case 'tutorials':
        return (doc as Post | Service | Portfolio | Tutorial).title || 'Untitled'
      case 'values':
        return (doc as Value).title || 'Untitled'
      case 'tech-stacks':
        return (doc as TechStack).name || 'Untitled'
      case 'testimonials':
        return (doc as Testimonial).clientName || 'Testimonial'
      case 'team':
        return (doc as Team).name || 'Untitled'
      default:
        return 'Untitled'
    }
  },

  getSlug: (doc: CollectionItem): string | undefined => {
    return 'slug' in doc && doc.slug ? doc.slug : undefined
  },

  getDescription: (doc: CollectionItem, relationTo: string): string | undefined => {
    switch (relationTo) {
      case 'posts':
        return (doc as Post).shortDescription || undefined
      case 'services':
        return (doc as Service).shortDescription || undefined
      case 'portfolio':
        return (doc as Portfolio).shortDescription || undefined
      case 'values':
        return (doc as Value).shortDescription || undefined
      case 'tech-stacks':
        return (doc as TechStack).description || undefined
      case 'testimonials':
        return (
          (doc as Testimonial).meta?.description || (doc as Testimonial).clientCompany || undefined
        )
      case 'team':
        return (doc as Team).shortBio || undefined
      case 'tutorials':
        return (doc as Tutorial).shortDescription || undefined
      default:
        return undefined
    }
  },

  getPublishedDate: (doc: CollectionItem, relationTo: string): string | undefined => {
    if ((relationTo === 'posts' || relationTo === 'tutorials') && 'publishedAt' in doc) {
      return (doc as Post | Tutorial).publishedAt || undefined
    }
    return undefined
  },

  getFormattedDate: (
    date: string | undefined,
    format: 'short' | 'medium' | 'long' = 'medium',
  ): string | undefined => {
    if (!date) return undefined
    return formatDate(date, { format })
  },

  getAuthors: (doc: CollectionItem, relationTo: string) => {
    if (relationTo === 'posts' || relationTo === 'tutorials') {
      // Handle both authors and populatedAuthors fields
      if ('populatedAuthors' in doc && (doc as Post | Tutorial).populatedAuthors?.length) {
        return (doc as Post | Tutorial).populatedAuthors
      } else if ('authors' in doc && (doc as Post | Tutorial).authors?.length) {
        return (doc as Post | Tutorial).authors
      }
    }
    return undefined
  },

  getReadingTime: (doc: CollectionItem, relationTo: string): string => {
    if (relationTo === 'posts' && 'content' in doc) {
      const post = doc as Post
      if (!post.content || !post.content.root || !post.content.root.children) return '3 min'

      // Extract text from content
      let textContent = ''
      const extractText = (node: any) => {
        if (node.text) {
          textContent += node.text + ' '
        } else if (node.children) {
          node.children.forEach(extractText)
        }
      }

      post.content.root.children.forEach(extractText)

      // Calculate reading time (200 words per minute)
      const words = textContent.trim().split(/\s+/).length
      const minutes = Math.max(1, Math.ceil(words / 200))
      return `${minutes} min read`
    }
    return '3 min read'
  },

  getDuration: (doc: CollectionItem, relationTo: string): string | undefined => {
    if (relationTo === 'tutorials' && 'duration' in doc) {
      const duration = (doc as Tutorial).duration
      if (!duration) return undefined
      return `${duration} min`
    }
    return undefined
  },

  getDifficultyLevel: (doc: CollectionItem, relationTo: string): string | undefined => {
    if (relationTo === 'tutorials' && 'difficultyLevel' in doc) {
      return (doc as Tutorial).difficultyLevel || undefined
    }
    return undefined
  },

  getTechStacksForTutorial: (doc: CollectionItem, relationTo: string) => {
    if (relationTo === 'tutorials' && 'techStacks' in doc) {
      return (doc as Tutorial).techStacks
    }
    return undefined
  },

  getImage: (doc: CollectionItem, relationTo: string) => {
    switch (relationTo) {
      case 'posts':
        // For posts, prefer heroImage, then featuredImage
        if ('heroImage' in doc && (doc as Post).heroImage) {
          return (doc as Post).heroImage
        }
        return 'featuredImage' in doc ? (doc as Post).featuredImage : undefined
      case 'portfolio':
      case 'services':
        return 'featuredImage' in doc ? (doc as Portfolio | Service).featuredImage : undefined
      case 'tech-stacks':
        return (doc as TechStack).icon
      case 'team':
        return (doc as Team).profileImage
      case 'testimonials':
        return (doc as Testimonial).clientImage || (doc as Testimonial).clientLogo
      case 'values':
        return (doc as Value).icon
      case 'tutorials':
        // For tutorials, prefer thumbnailImage, then featuredImage
        if ('thumbnailImage' in doc && (doc as Tutorial).thumbnailImage) {
          return (doc as Tutorial).thumbnailImage
        }
        return 'featuredImage' in doc ? (doc as Tutorial).featuredImage : undefined
      default:
        return undefined
    }
  },

  getVideoFile: (doc: CollectionItem, relationTo: string) => {
    if (relationTo === 'tutorials' && 'videoFile' in doc) {
      return (doc as Tutorial).videoFile
    }
    return undefined
  },

  getExternalVideoUrl: (doc: CollectionItem, relationTo: string): string | undefined => {
    if (relationTo === 'tutorials' && 'externalVideoUrl' in doc) {
      return (doc as Tutorial).externalVideoUrl || undefined
    }
    return undefined
  },

  getCompletionDate: (doc: CollectionItem, relationTo: string): string | undefined => {
    if (relationTo === 'portfolio' && 'completionDate' in doc) {
      return (doc as Portfolio).completionDate || undefined
    }
    return undefined
  },

  getRelatedServices: (doc: CollectionItem, relationTo: string) => {
    if ((relationTo === 'portfolio' || relationTo === 'testimonials') && 'relatedServices' in doc) {
      return (doc as Portfolio | Testimonial).relatedServices
    }
    return undefined
  },

  getTechStacks: (doc: CollectionItem, relationTo: string) => {
    if (relationTo === 'portfolio' && 'techStacks' in doc) {
      return (doc as Portfolio).techStacks
    }
    return undefined
  },

  getRating: (doc: CollectionItem, relationTo: string): string | undefined => {
    if (relationTo === 'testimonials' && 'rating' in doc) {
      return (doc as Testimonial).rating
    }
    return undefined
  },

  getCategories: (doc: CollectionItem, relationTo: string) => {
    if ((relationTo === 'posts' || relationTo === 'tutorials') && 'categories' in doc) {
      return (doc as Post | Tutorial).categories?.map((category) => {
        if (typeof category === 'object') return category.title
        else return category
      })
    }
    return undefined
  },

  getRole: (doc: CollectionItem, relationTo: string): string | undefined => {
    if (relationTo === 'team' && 'role' in doc) {
      return (doc as Team).role
    }
    return undefined
  },

  getClientCompany: (doc: CollectionItem, relationTo: string): string | undefined => {
    if (relationTo === 'testimonials' && 'clientCompany' in doc) {
      return (doc as Testimonial).clientCompany || undefined
    }
    return undefined
  },

  getClientTitle: (doc: CollectionItem, relationTo: string): string | undefined => {
    if (relationTo === 'testimonials' && 'clientTitle' in doc) {
      return (doc as Testimonial).clientTitle || undefined
    }
    return undefined
  },

  getUrl: (relationTo: string, slug?: string): string => {
    if (!slug) return '#'
    return `/${relationTo}/${slug}`
  },
}
