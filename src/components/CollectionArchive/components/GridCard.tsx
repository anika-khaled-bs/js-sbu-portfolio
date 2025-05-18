import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, User, CalendarDays } from 'lucide-react'
import { cn } from '@/utilities/ui'
import { Media, Team } from '@/payload-types'
import { formatDate } from '@/utilities/formatDate'

import { CollectionCardProps } from '../types'
import { collectionDataExtractors } from '../utils/dataExtractors'
import { RatingStars, SocialLinks } from './UIComponents'

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
    getPublishedDate,
    getFormattedDate,
    getReadingTime,
    getAuthors,
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

  // Post-specific fields
  const publishedDate = getPublishedDate(doc, relationTo)
  const formattedPublishedDate = getFormattedDate(publishedDate)
  const readingTime = relationTo === 'posts' ? getReadingTime(doc, relationTo) : undefined
  const authors = getAuthors(doc, relationTo)

  // Special handling for team members
  if (relationTo === 'team') {
    const teamMember = doc as Team

    return (
      <div
        className={cn(
          'flex flex-col h-full overflow-hidden rounded-xl bg-muted shadow-sm hover:shadow-md transition-all',
          className,
        )}
      >
        {/* Team Member Image - Square aspect ratio */}
        <div className="relative aspect-square overflow-hidden">
          {image && typeof image !== 'string' && (
            <Image
              src={(image as Media).url!}
              alt={title || 'Team member'}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-center"
            />
          )}
          {!image && (
            <div className="h-full w-full bg-muted flex items-center justify-center">No image</div>
          )}
        </div>

        {/* Team Member Info */}
        <div className="p-4 flex flex-col text-center">
          <h3 className="text-lg font-semibold mb-1">{title}</h3>
          {role && <p className="text-sm text-primary mb-2">{role}</p>}
          {description && <p className="text-sm text-muted-foreground mb-3">{description}</p>}

          {/* Social Links - using our new reusable component */}
          <SocialLinks socialLinks={teamMember.socialLinks} layout="center" className="mt-auto" />
        </div>
      </div>
    )
  }

  // Special handling for post grid cards
  if (relationTo === 'posts') {
    return (
      <Link
        href={url}
        className={cn(
          'group flex flex-col h-full overflow-hidden rounded-xl bg-card border border-border shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1',
          className,
        )}
      >
        <div className="flex-grow flex flex-col">
          {/* Image Section */}
          <div className="relative h-48 overflow-hidden">
            {image && typeof image !== 'string' && (
              <Image
                src={(image as Media).url!}
                alt={title || 'Post image'}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
            )}
            {!image && (
              <div className="h-full w-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary/50">No image</span>
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="p-5 flex flex-col flex-grow">
            {/* Categories */}
            {categories && categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="inline-flex items-center px-3 py-1 text-xs font-medium bg-primary/10 rounded-full text-primary">
                  {categories[0]}
                </span>
              </div>
            )}

            {/* Title */}
            <h3 className="text-lg font-semibold line-clamp-2 mb-2 group-hover:text-primary transition-colors">
              {title}
            </h3>

            {/* Description */}
            {description && (
              <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{description}</p>
            )}

            {/* Post metadata */}
            <div className="mt-auto pt-3 border-t border-border">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                {/* Date */}
                {formattedPublishedDate && (
                  <div className="flex items-center">
                    <CalendarDays size={14} className="mr-1.5" />
                    <span>{formattedPublishedDate}</span>
                  </div>
                )}

                {/* Reading time */}
                {readingTime && (
                  <div className="flex items-center">
                    <Clock size={14} className="mr-1.5" />
                    <span>{readingTime}</span>
                  </div>
                )}
              </div>

              {/* Author info if available */}
              {authors && authors.length > 0 && (
                <div className="flex items-center text-xs text-muted-foreground mt-3">
                  <User size={14} className="mr-2" />
                  <span>
                    by{' '}
                    <span className="font-medium">
                      {authors
                        .map((author: any) => (typeof author === 'object' ? author.name : 'Author'))
                        .join(', ')}
                    </span>
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    )
  }

  // Standard grid card for other collection types
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
