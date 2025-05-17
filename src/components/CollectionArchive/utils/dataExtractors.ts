import {
  Post,
  Service,
  Testimonial,
  Team,
  Portfolio,
  Value,
  TechStack,
  Media,
} from '@/payload-types'
import { CollectionItem } from '../types'

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
      default:
        return undefined
    }
  },

  getTitle: (doc: CollectionItem, relationTo: string): string => {
    switch (relationTo) {
      case 'posts':
      case 'services':
      case 'portfolio':
        return (doc as Post | Service | Portfolio).title || 'Untitled'
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
      default:
        return undefined
    }
  },

  getImage: (doc: CollectionItem, relationTo: string) => {
    switch (relationTo) {
      case 'posts':
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
      default:
        return undefined
    }
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
    if (relationTo === 'posts' && 'categories' in doc) {
      return (doc as Post).categories?.map((category) => {
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
