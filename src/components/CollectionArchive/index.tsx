import { cn } from '@/utilities/ui'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar } from 'lucide-react'

import { Card } from '@/components/Card'
import { ContactCard } from '@/components/ContactCard'
import {
  type Post,
  type ContactDetail,
  Value,
  TechStack,
  Testimonial,
  Team,
  Service,
  Portfolio,
  Media,
} from '@/payload-types'
import OurValues from '../About/OurValues'
import TeamComponent from '../About/Team'
import { formatDate } from '@/utilities/formatDate'

export type Props = {
  items: (Post | ContactDetail | Value | TechStack | Testimonial | Team | Service | Portfolio)[]
  relationTo: string
  displayType: 'grid' | 'slider' | 'feature' | 'card' | 'list' | 'default'
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const { items, relationTo, displayType } = props
  const getLayoutClasses = () => {
    switch (displayType) {
      case 'grid':
        return 'grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8'
      case 'slider':
        return 'flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory'
      case 'feature':
        return 'grid grid-cols-1 lg:grid-cols-3 gap-8'
      case 'list':
        return 'flex flex-col gap-4'
      case 'card':
      case 'default':
        return ''
      default:
        return 'grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8'
    }
  }
  const getItemClasses = () => {
    switch (displayType) {
      case 'grid':
        return 'col-span-4'
      case 'slider':
        return 'min-w-[300px] snap-center'
      case 'feature':
        return displayType === 'feature' ? 'col-span-1' : ''
      case 'list':
        return 'w-full'
      case 'card':
      case 'default':
        return ''
      default:
        return 'col-span-4'
    }
  }
  const shouldHaveContainer = !(relationTo === 'values' && displayType === 'default')

  return (
    <div className={cn(shouldHaveContainer ? 'container' : '')}>
      <div className={getLayoutClasses()}>
        {relationTo === 'values' && displayType === 'default' ? (
          <OurValues values={items as Value[]} />
        ) : relationTo === 'team' && displayType === 'default' ? (
          <TeamComponent team={items} />
        ) : (
          items?.map((item, index) => {
            if (typeof item === 'object' && item !== null) {
              // Handle items with _collection marker from selectedDocs
              const itemCollection = (item as any)._collection || relationTo

              if (itemCollection === 'contact-details') {
                return (
                  <ContactCard
                    key={index}
                    className={getItemClasses()}
                    doc={item as ContactDetail}
                    displayType={displayType}
                  />
                )
              } else {
                // Skip contact details here as they're handled above
                if (itemCollection === 'contact-details') return null

                return (
                  <div className={getItemClasses()} key={index}>
                    <CollectionCard
                      className="h-full"
                      doc={item as Exclude<typeof item, ContactDetail>}
                      relationTo={itemCollection}
                      showCategories={itemCollection === 'posts'}
                      displayType={displayType}
                    />
                  </div>
                )
              }
            }
            return null
          })
        )}
      </div>
    </div>
  )
}

// Type definitions for the collection card
type CommonCardProps = {
  className?: string
  showCategories?: boolean
  displayType?: 'grid' | 'slider' | 'feature' | 'card' | 'list' | 'default'
}

type CollectionCardProps = CommonCardProps & {
  doc: Post | Value | TechStack | Testimonial | Team | Service | Portfolio
  relationTo: string
}

// This component handles rendering the appropriate card based on the collection type
const CollectionCard: React.FC<CollectionCardProps> = ({
  doc,
  relationTo,
  className,
  showCategories,
  displayType,
}) => {
  // Extract common properties for meta
  const getMetaData = () => {
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
  }

  // Extract title
  const getTitle = () => {
    switch (relationTo) {
      case 'posts':
      case 'services':
      case 'portfolio':
        return (doc as Post | Service | Portfolio).title
      case 'values':
        return (doc as Value).title
      case 'tech-stacks':
        return (doc as TechStack).name
      case 'testimonials':
        return (doc as Testimonial).clientName || 'Testimonial'
      case 'team':
        return (doc as Team).name
      default:
        return 'Untitled'
    }
  }

  // Extract slug for the href
  const getSlug = () => {
    if ('slug' in doc && doc.slug) {
      return doc.slug
    }
    return undefined
  }

  // Get description
  const getDescription = () => {
    switch (relationTo) {
      case 'posts':
        return (doc as Post).meta?.description
      case 'services':
        return (doc as Service).shortDescription
      case 'portfolio':
        return (doc as Portfolio).shortDescription
      case 'values':
        return (doc as Value).shortDescription
      case 'tech-stacks':
        return (doc as TechStack).description
      case 'testimonials':
        return (doc as Testimonial).meta?.description || (doc as Testimonial).clientCompany
      case 'team':
        return (doc as Team).shortBio
      default:
        return undefined
    }
  }

  // Get the appropriate image for display
  const getImage = () => {
    switch (relationTo) {
      case 'posts':
        return (doc as Post).meta?.image
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
  }

  // Get completion date (if any)
  const getCompletionDate = () => {
    if (relationTo === 'portfolio' && 'completionDate' in doc) {
      return (doc as Portfolio).completionDate
    }
    return undefined
  }

  // Get related services (if any)
  const getRelatedServices = () => {
    if ((relationTo === 'portfolio' || relationTo === 'testimonials') && 'relatedServices' in doc) {
      return (doc as Portfolio | Testimonial).relatedServices
    }
    return undefined
  }

  // Get URLs
  const getUrl = () => {
    const slug = getSlug()
    if (!slug) return '#'
    return `/${relationTo}/${slug}`
  }

  // For feature display type, we'll use a custom card similar to ProjectCard.tsx
  if (displayType === 'feature') {
    const title = getTitle()
    const description = getDescription()
    const image = getImage()
    const url = getUrl()
    const completionDate = getCompletionDate()
    const relatedServices = getRelatedServices()

    return (
      <Link
        href={url}
        className={cn(
          'group flex flex-col h-full overflow-hidden rounded-xl bg-muted shadow-sm hover:shadow-md transition-all',
          className,
        )}
      >
        <div className="px-6 py-4 flex-grow flex flex-col">
          {/* Screenshot/Image Section */}
          <div className="relative aspect-[4/3] overflow-hidden mb-6 rounded-md">
            {image && typeof image !== 'string' && (
              <Image
                src={(image as Media).url!}
                alt={title || 'Image'}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            )}
            {!image && (
              <div className="min-h-[200px] bg-muted flex items-center justify-center">
                No image
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="flex md:justify-around items-center mb-2 flex-wrap md:flex-nowrap gap-2">
            <p className="text-xl font-semibold min-w-max">{title}</p>{' '}
            {/* Completion Date - display if present */}
            {completionDate && (
              <div className="text-xs text-muted-foreground mt-auto mb-2 flex items-center md:justify-end w-full">
                <span className="mx-1">
                  <Calendar size={12} />
                </span>
                {formatDate(completionDate, { format: 'medium' })}
              </div>
            )}
          </div>
          {description && (
            <p className="text-sm text-muted-foreground line-clamp-3 mb-2">{description}</p>
          )}

          {/* Services Tags */}
          {relatedServices && Array.isArray(relatedServices) && relatedServices.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-auto">
              {relatedServices
                .filter((service): service is any => typeof service !== 'string')
                .slice(0, 3)
                .map((service, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 text-xs bg-muted-foreground/10 rounded-full text-muted-foreground before:content-['•'] before:mr-1.5 before:text-sm"
                  >
                    {service.title}
                  </span>
                ))}
            </div>
          )}
        </div>
      </Link>
    )
  }

  // For other display types we'll use the existing Card component
  return (
    <Card
      className={className}
      doc={{
        slug: getSlug(),
        title: getTitle(),
        meta: {
          description: getDescription(),
          image: getImage(),
        },
        ...(showCategories && 'categories' in doc ? { categories: doc.categories } : {}),
      }}
      relationTo={relationTo}
      showCategories={showCategories}
      displayType={displayType}
    />
  )
}
