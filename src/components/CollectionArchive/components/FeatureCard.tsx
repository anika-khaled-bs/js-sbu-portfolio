import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar } from 'lucide-react'
import { cn } from '@/utilities/ui'
import { Media } from '@/payload-types'
import { formatDate } from '@/utilities/formatDate'

import { CollectionCardProps } from '../types'
import { collectionDataExtractors } from '../utils/dataExtractors'
import { RatingStars, TagList } from './UIComponents'

/**
 * Feature Card Component - Used for featured content display
 */
const FeatureCard: React.FC<CollectionCardProps> = ({ doc, relationTo, className }) => {
  const {
    getTitle,
    getDescription,
    getImage,
    getSlug,
    getCompletionDate,
    getRelatedServices,
    getTechStacks,
    getClientCompany,
    getClientTitle,
    getUrl,
    getRating,
    getRole,
  } = collectionDataExtractors

  const title = getTitle(doc, relationTo)
  const description = getDescription(doc, relationTo)
  const image = getImage(doc, relationTo)
  const slug = getSlug(doc)
  const url = getUrl(relationTo, slug)
  const completionDate = getCompletionDate(doc, relationTo)
  const relatedServices = getRelatedServices(doc, relationTo)
  const techStacks = getTechStacks(doc, relationTo)
  const clientCompany = getClientCompany(doc, relationTo)
  const clientTitle = getClientTitle(doc, relationTo)
  const rating = getRating(doc, relationTo)
  const role = getRole(doc, relationTo)

  return (
    <Link
      href={url}
      className={cn(
        'group flex flex-col h-full overflow-hidden rounded-xl bg-muted shadow-sm hover:shadow-md transition-all',
        className,
      )}
    >
      <div className="px-4 py-4 flex-grow flex flex-col">
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
            <div className="min-h-[200px] bg-muted flex items-center justify-center">No image</div>
          )}
        </div>

        {/* Content Section */}
        <div className="flex flex-col mb-2">
          <p className="text-xl font-semibold break-words">{title}</p>

          {/* Role - display for Team */}
          {relationTo === 'team' && role && <p className="text-sm text-muted-foreground">{role}</p>}

          {/* Company and Title - display for Testimonials */}
          {relationTo === 'testimonials' && (
            <>
              {clientCompany && (
                <p className="text-sm font-medium text-muted-foreground">{clientCompany}</p>
              )}
              {clientTitle && <p className="text-xs text-muted-foreground">{clientTitle}</p>}
            </>
          )}

          {/* Rating - display for Testimonials */}
          {relationTo === 'testimonials' && rating && (
            <div className="mt-1 mb-2">
              <RatingStars rating={rating} />
            </div>
          )}

          {/* Completion Date - display if present */}
          {completionDate && (
            <div className="text-xs text-muted-foreground mt-2 flex items-center">
              <span className="mr-1">
                <Calendar size={12} />
              </span>
              {formatDate(completionDate, { format: 'medium' })}
            </div>
          )}
        </div>

        {description && (
          <p className="text-sm text-muted-foreground line-clamp-3 mb-2 overflow-hidden text-ellipsis">
            {description}
          </p>
        )}

        {/* Footer section with tags */}
        <div className="mt-auto pt-2">
          {/* Tech Stacks - for Portfolio */}
          {techStacks && Array.isArray(techStacks) && techStacks.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {techStacks
                .filter((tech): tech is any => typeof tech !== 'string')
                .slice(0, 3)
                .map((tech, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 text-xs bg-muted-foreground/10 rounded-full text-muted-foreground"
                  >
                    {tech.name}
                  </span>
                ))}
            </div>
          )}

          {/* Services Tags */}
          {relatedServices && Array.isArray(relatedServices) && relatedServices.length > 0 && (
            <div className="flex flex-wrap gap-2">
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

          {/* Category Tags */}
          {(() => {
            const categories = collectionDataExtractors.getCategories(doc, relationTo)
            return categories && categories.length > 0 ? <TagList tags={categories} /> : null
          })()}
        </div>
      </div>
    </Link>
  )
}

export default FeatureCard
