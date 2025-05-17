import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar } from 'lucide-react'
import { cn } from '@/utilities/ui'
import { Media } from '@/payload-types'
import { formatDate } from '@/utilities/formatDate'

import { CollectionCardProps } from '../types'
import { collectionDataExtractors } from '../utils/dataExtractors'
import { RatingStars } from './UIComponents'

/**
 * Grid Card Component - Used for grid layout displays
 */
const GridCard: React.FC<CollectionCardProps> = ({ doc, relationTo, className }) => {
  const {
    getTitle,
    getDescription,
    getImage,
    getSlug,
    getCompletionDate,
    getCategories,
    getRole,
    getRating,
    getClientCompany,
    getClientTitle,
    getUrl,
  } = collectionDataExtractors

  const title = getTitle(doc, relationTo)
  const description = getDescription(doc, relationTo)
  const image = getImage(doc, relationTo)
  const slug = getSlug(doc)
  const url = getUrl(relationTo, slug)
  const completionDate = getCompletionDate(doc, relationTo)
  const categories = getCategories(doc, relationTo)
  const role = getRole(doc, relationTo)
  const rating = getRating(doc, relationTo)
  const clientCompany = getClientCompany(doc, relationTo)
  const clientTitle = getClientTitle(doc, relationTo)

  return (
    <Link
      href={url}
      className={cn(
        'group flex flex-col h-full overflow-hidden rounded-xl bg-muted shadow-sm hover:shadow-md transition-all',
        className,
      )}
    >
      <div className="flex-grow flex flex-col">
        {/* Image Section - Properly centered */}
        <div className="relative h-48 overflow-hidden">
          {image && typeof image !== 'string' && (
            <Image
              src={(image as Media).url!}
              alt={title || 'Image'}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-center"
            />
          )}
          {!image && (
            <div className="h-full w-full bg-muted flex items-center justify-center">No image</div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-4 flex flex-col">
          <h3 className="text-lg font-semibold line-clamp-2 mb-1">{title}</h3>

          {/* Subtitle based on collection type */}
          {role && <p className="text-sm text-muted-foreground mb-2">{role}</p>}

          {/* Company and Title - display for Testimonials */}
          {relationTo === 'testimonials' && (
            <div className="mb-2">
              {clientCompany && (
                <p className="text-sm font-medium text-muted-foreground">{clientCompany}</p>
              )}
              {clientTitle && <p className="text-xs text-muted-foreground">{clientTitle}</p>}
            </div>
          )}

          {rating && (
            <div className="mb-2">
              <RatingStars rating={rating} size={14} />
            </div>
          )}

          {completionDate && (
            <div className="text-xs text-muted-foreground flex items-center mb-2">
              <Calendar size={12} className="mr-1" />
              {formatDate(completionDate, { format: 'medium' })}
            </div>
          )}

          {description && (
            <p className="text-sm text-muted-foreground line-clamp-3 mb-3">{description}</p>
          )}

          {/* Categories or tags */}
          {categories && categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-auto">
              {categories.slice(0, 2).map((category, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-0.5 text-xs bg-muted-foreground/10 rounded-full text-muted-foreground"
                >
                  {category}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

export default GridCard
