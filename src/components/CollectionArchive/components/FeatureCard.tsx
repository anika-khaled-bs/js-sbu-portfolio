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
          'group flex flex-col md:flex-row h-full overflow-hidden rounded-xl bg-card border border-border shadow-sm hover:shadow-lg transition-all duration-300',
          className,
        )}
      >
        {/* Post image - takes up 40% width on desktop */}
        <div className="relative md:w-2/5 h-52 md:h-auto overflow-hidden">
          {image && typeof image !== 'string' && (
            <Image
              src={(image as Media).url!}
              alt={title || 'Post image'}
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
          )}
          {!image && (
            <div className="h-full w-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary/50">No image</span>
            </div>
          )}
        </div>

        {/* Content side - takes up 60% width on desktop */}
        <div className="p-6 flex flex-col md:w-3/5">
          {/* Categories */}
          {categories && categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="inline-flex items-center px-3 py-1 text-xs font-medium bg-primary/10 rounded-full text-primary">
                {categories[0]}
              </span>
            </div>
          )}

          {/* Title */}
          <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
            {title}
          </h3>

          {/* Description */}
          {description && (
            <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{description}</p>
          )}

          {/* Post metadata */}
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
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
            <div className="flex items-center text-xs text-muted-foreground mb-4 border-t border-border pt-4">
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

          {/* Read more link */}
          <div className="mt-auto pt-2">
            <span className="inline-flex items-center text-primary text-sm font-medium group-hover:underline">
              Read article
              <ArrowRight
                size={16}
                className="ml-1.5 transition-all duration-300 transform group-hover:translate-x-1.5"
              />
            </span>
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
          'flex flex-col h-full overflow-hidden rounded-xl bg-muted shadow-sm hover:shadow-md transition-all',
          className,
        )}
      >
        <div className="flex flex-col md:flex-row h-full">
          {/* Team Member Image with proper aspect ratio */}
          <div className="relative md:w-2/5 overflow-hidden">
            <div className="aspect-square w-full">
              {image && typeof image !== 'string' && (
                <Image
                  src={(image as Media).url!}
                  alt={title || 'Team member'}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover object-center"
                />
              )}
              {!image && (
                <div className="h-full w-full bg-muted flex items-center justify-center">
                  No image
                </div>
              )}
            </div>
          </div>

          {/* Team Member Info */}
          <div className="p-6 flex flex-col md:w-3/5">
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            {role && <p className="text-primary text-sm mb-3">{role}</p>}
            {description && <p className="text-muted-foreground text-sm mb-4">{description}</p>}

            {/* Social Links - using our new reusable component */}
            <SocialLinks socialLinks={teamMember.socialLinks} className="mt-auto" />
          </div>
        </div>
      </div>
    )
  }

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
