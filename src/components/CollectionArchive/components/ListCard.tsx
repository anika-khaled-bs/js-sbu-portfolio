import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, CalendarDays, Clock, User, ArrowRight } from 'lucide-react'
import { cn } from '@/utilities/ui'
import { Media, Team } from '@/payload-types'
import { formatDate } from '@/utilities/formatDate'

import { CollectionCardProps } from '../types'
import { collectionDataExtractors } from '../utils/dataExtractors'
import { RatingStars, TagList, SocialLinks } from './UIComponents'

/**
 * List Card Component - Used for list layout displays
 */
const ListCard: React.FC<CollectionCardProps> = ({ doc, relationTo, className }) => {
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
    getPublishedDate,
    getFormattedDate,
    getReadingTime,
    getAuthors,
    getCategories,
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
  const categories = getCategories(doc, relationTo)

  // Post-specific fields
  const publishedDate = getPublishedDate(doc, relationTo)
  const formattedPublishedDate = getFormattedDate(publishedDate)
  const readingTime = relationTo === 'posts' ? getReadingTime(doc, relationTo) : undefined
  const authors = getAuthors(doc, relationTo)

  // Special handling for posts
  if (relationTo === 'posts') {
    return (
      <Link
        href={url}
        className={cn(
          'group flex flex-col sm:flex-row overflow-hidden rounded-xl bg-card border border-border shadow-sm hover:shadow-lg transition-all duration-300',
          className,
        )}
      >
        {/* Post image - square aspect ratio thumbnail */}
        <div className="relative sm:w-48 h-48 flex-shrink-0 overflow-hidden">
          {image && typeof image !== 'string' && (
            <Image
              src={(image as Media).url!}
              alt={title || 'Post image'}
              fill
              className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
          )}
          {!image && (
            <div className="h-full w-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary/50">No image</span>
            </div>
          )}
        </div>

        {/* Content section */}
        <div className="p-5 flex flex-col flex-grow">
          <div className="flex flex-col">
            {/* Categories */}
            {categories && categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium bg-primary/10 rounded-full text-primary">
                  {categories[0]}
                </span>
              </div>
            )}

            {/* Title */}
            <h3 className="text-lg font-semibold line-clamp-1 mb-1 group-hover:text-primary transition-colors">
              {title}
            </h3>

            {/* Post metadata: date and reading time */}
            <div className="flex items-center flex-wrap gap-4 text-xs text-muted-foreground mb-2">
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

              {/* Author info if available */}
              {authors && authors.length > 0 && (
                <div className="flex items-center">
                  <User size={14} className="mr-1.5" />
                  <span>
                    {authors
                      .map((author: any) => (typeof author === 'object' ? author.name : 'Author'))
                      .join(', ')}
                  </span>
                </div>
              )}
            </div>

            {/* Description */}
            {description && (
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{description}</p>
            )}

            {/* Read more link */}
            <div className="mt-auto">
              <span className="inline-flex items-center text-primary text-sm font-medium group-hover:underline">
                Read article
                <ArrowRight
                  size={16}
                  className="ml-1.5 transition-all duration-300 transform group-hover:translate-x-1.5"
                />
              </span>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  // Special handling for team members
  if (relationTo === 'team') {
    const teamMember = doc as Team

    return (
      <div
        className={cn(
          'flex flex-col sm:flex-row h-full overflow-hidden rounded-xl bg-muted shadow-sm hover:shadow-md transition-all',
          className,
        )}
      >
        {/* Team Member Image with square aspect ratio */}
        <div className="relative sm:w-48 h-48 flex-shrink-0 overflow-hidden">
          {image && typeof image !== 'string' && (
            <Image
              src={(image as Media).url!}
              alt={title || 'Team member'}
              fill
              className="object-cover object-center"
            />
          )}
          {!image && (
            <div className="h-full w-full bg-muted flex items-center justify-center">No image</div>
          )}
        </div>

        {/* Team Member Info */}
        <div className="p-4 flex flex-col flex-grow">
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold mb-1">{title}</h3>
            {role && <p className="text-sm text-primary mb-2">{role}</p>}
            {description && <p className="text-sm text-muted-foreground mb-3">{description}</p>}
          </div>

          {/* Social Links */}
          <SocialLinks socialLinks={teamMember.socialLinks} className="mt-4" />
        </div>
      </div>
    )
  }

  // Special handling for Testimonials
  if (relationTo === 'testimonials') {
    return (
      <div
        className={cn(
          'flex flex-col h-full overflow-hidden rounded-xl bg-muted shadow-sm hover:shadow-md transition-all',
          className,
        )}
      >
        <div className="flex flex-col sm:flex-row p-4 h-full">
          {/* Testimonial Image with square aspect ratio or client logo */}
          {image && typeof image !== 'string' && (
            <div className="relative sm:w-32 h-32 flex-shrink-0 mb-4 sm:mb-0 sm:mr-4 overflow-hidden">
              <Image
                src={(image as Media).url!}
                alt={title || 'Client'}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-center"
              />
            </div>
          )}

          {/* Testimonial Content */}
          <div className="flex flex-col flex-grow">
            {/* Rating and client info */}
            <div className="mb-3">
              {rating && <RatingStars rating={rating} />}
              <h3 className="text-lg font-semibold mb-1">{title}</h3>
              {clientCompany && (
                <p className="text-sm font-medium text-muted-foreground">{clientCompany}</p>
              )}
              {clientTitle && <p className="text-xs text-muted-foreground">{clientTitle}</p>}
            </div>

            {/* Testimonial text */}
            {description && (
              <blockquote className="text-sm text-muted-foreground italic mb-3 pl-3 border-l-2 border-muted-foreground">
                "{description}"
              </blockquote>
            )}

            {/* Related Services */}
            {/* {relatedServices && Array.isArray(relatedServices) && relatedServices.length > 0 && (
              <div className="mt-auto">
                <TagList
                  items={relatedServices}
                  className="mb-3"
                  tagStyle="project"
                  baseUrl="/services"
                />
              </div>
            )} */}
          </div>
        </div>
      </div>
    )
  }

  // Portfolio case
  if (relationTo === 'portfolio') {
    return (
      <Link
        href={url}
        className={cn(
          'group flex flex-col sm:flex-row h-full overflow-hidden rounded-xl bg-muted shadow-sm hover:shadow-md transition-all',
          className,
        )}
      >
        {/* Project Image */}
        <div className="relative sm:w-48 h-48 flex-shrink-0 overflow-hidden">
          {image && typeof image !== 'string' && (
            <Image
              src={(image as Media).url!}
              alt={title || 'Image'}
              fill
              sizes="(max-width: 768px) 100vw, 25vw"
              className="object-cover object-center"
            />
          )}
        </div>

        <div className="p-4 flex flex-col flex-grow">
          {/* Project title & description */}
          <div className="mb-3">
            <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
              {title}
            </h3>
            {description && (
              <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{description}</p>
            )}
          </div>

          {/* Tech stack tags */}
          {techStacks && techStacks.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {techStacks
                .filter((tech): tech is any => typeof tech !== 'string')
                .slice(0, 3)
                .map((tech, index) => (
                  <span
                    key={`tech-${index}`}
                    className="inline-flex items-center px-2.5 py-0.5 text-xs bg-secondary/20 rounded-full text-secondary-foreground"
                  >
                    {tech.name}
                  </span>
                ))}
            </div>
          )}

          {/* Completion date */}
          {completionDate && (
            <div className="text-xs text-muted-foreground flex items-center mt-auto">
              <Calendar size={14} className="mr-1" />
              {formatDate(completionDate, { format: 'medium' })}
            </div>
          )}
        </div>
      </Link>
    )
  }

  // Generic case
  return (
    <Link
      href={url}
      className={cn(
        'group flex flex-col sm:flex-row h-full overflow-hidden rounded-xl bg-muted shadow-sm hover:shadow-md transition-all',
        className,
      )}
    >
      {/* Image */}
      {image && typeof image !== 'string' && (
        <div className="relative sm:w-48 h-48 flex-shrink-0 overflow-hidden">
          <Image
            src={(image as Media).url!}
            alt={title || 'Image'}
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            className="object-cover object-center"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="mb-3">
          <h3 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors">
            {title}
          </h3>
          {description && (
            <p className="text-sm text-muted-foreground line-clamp-3">{description}</p>
          )}
        </div>

        {/* Categories */}
        {categories && categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-auto">
            {categories.map((category, index) => (
              <span
                key={`cat-${index}`}
                className="inline-flex items-center px-2.5 py-0.5 text-xs bg-secondary/20 rounded-full text-secondary-foreground"
              >
                {category}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}

export default ListCard
