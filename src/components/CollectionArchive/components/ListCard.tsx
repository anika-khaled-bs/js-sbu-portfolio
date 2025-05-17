import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar } from 'lucide-react'
import { cn } from '@/utilities/ui'
import { Media, Team } from '@/payload-types'
import { formatDate } from '@/utilities/formatDate'

import { CollectionCardProps } from '../types'
import { collectionDataExtractors } from '../utils/dataExtractors'
import { RatingStars, SocialLinks } from './UIComponents'

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
    getCategories,
    getRole,
    getRating,
    getTechStacks,
    getRelatedServices,
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
  const techStacks = getTechStacks(doc, relationTo)
  const relatedServices = getRelatedServices(doc, relationTo)
  const clientCompany = getClientCompany(doc, relationTo)
  const clientTitle = getClientTitle(doc, relationTo)

  // Special handling for team members
  if (relationTo === 'team') {
    const teamMember = doc as Team

    return (
      <div
        className={cn(
          'group flex flex-col md:flex-row h-full overflow-hidden rounded-xl bg-muted shadow-sm hover:shadow-md transition-all',
          className,
        )}
      >
        {/* Team Member Image with proper aspect ratio */}
        <div className="relative w-full md:w-1/4 shrink-0">
          <div className="relative aspect-square w-full">
            {image && typeof image !== 'string' && (
              <Image
                src={(image as Media).url!}
                alt={title || 'Team member'}
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
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
        <div className="p-4 md:p-6 flex flex-col justify-center flex-grow">
          <h3 className="text-xl font-semibold mb-1">{title}</h3>
          {role && <p className="text-primary text-sm mb-2">{role}</p>}
          {description && <p className="text-muted-foreground text-sm mb-4">{description}</p>}

          {/* Social Links - using our new reusable component */}
          <SocialLinks socialLinks={teamMember.socialLinks} className="mt-2" />
        </div>
      </div>
    )
  }

  return (
    <Link
      href={url}
      className={cn(
        'group flex flex-col md:flex-row h-full overflow-hidden rounded-xl bg-muted shadow-sm hover:shadow-md transition-all',
        className,
      )}
    >
      {/* Image Section - Optimized for center alignment and full content display */}
      {image && typeof image !== 'string' && (
        <div className="relative w-full md:w-1/4 lg:w-1/5 shrink-0 self-center">
          <div className="relative aspect-video md:aspect-square w-full">
            <Image
              src={(image as Media).url!}
              alt={title || 'Image'}
              fill
              sizes="(max-width: 768px) 100vw, 25vw"
              className="object-cover object-center"
            />
          </div>
        </div>
      )}

      {/* Content Section - Adjusted for better vertical alignment */}
      <div className="p-4 md:p-6 flex flex-col flex-grow justify-center">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
          <div>
            <h3 className="text-xl font-semibold mb-1 group-hover:text-primary transition-colors">
              {title}
            </h3>

            {/* Subtitle or role */}
            {role && <p className="text-sm text-muted-foreground">{role}</p>}

            {/* Client info for testimonials */}
            {relationTo === 'testimonials' && (
              <div>
                {clientCompany && (
                  <p className="text-sm font-medium text-muted-foreground">{clientCompany}</p>
                )}
                {clientTitle && <p className="text-xs text-muted-foreground">{clientTitle}</p>}
              </div>
            )}
          </div>

          {/* Move date, rating to right side on desktop */}
          <div className="flex items-center mt-2 md:mt-0">
            {rating && (
              <div className="flex mr-4">
                <RatingStars rating={rating} />
              </div>
            )}

            {completionDate && (
              <div className="text-xs text-muted-foreground flex items-center">
                <Calendar size={14} className="mr-1" />
                {formatDate(completionDate, { format: 'medium' })}
              </div>
            )}
          </div>
        </div>

        {/* Description - Ensured it's not truncated and fully visible */}
        {description && <p className="text-sm text-muted-foreground mb-4">{description}</p>}

        {/* Tags section */}
        <div className="mt-auto flex flex-wrap gap-2">
          {/* Tech Stacks */}
          {techStacks &&
            Array.isArray(techStacks) &&
            techStacks.length > 0 &&
            techStacks
              .filter((tech): tech is any => typeof tech !== 'string')
              .slice(0, 3)
              .map((tech, index) => (
                <span
                  key={`tech-${index}`}
                  className="inline-flex items-center px-2.5 py-0.5 text-xs bg-primary/10 rounded-full text-primary"
                >
                  {tech.name}
                </span>
              ))}

          {/* Services */}
          {relatedServices &&
            Array.isArray(relatedServices) &&
            relatedServices.length > 0 &&
            relatedServices
              .filter((service): service is any => typeof service !== 'string')
              .slice(0, 2)
              .map((service, index) => (
                <span
                  key={`service-${index}`}
                  className="inline-flex items-center px-2.5 py-0.5 text-xs bg-muted-foreground/10 rounded-full text-muted-foreground"
                >
                  {service.title}
                </span>
              ))}

          {/* Categories */}
          {categories &&
            categories.length > 0 &&
            categories.slice(0, 3).map((category, index) => (
              <span
                key={`cat-${index}`}
                className="inline-flex items-center px-2.5 py-0.5 text-xs bg-secondary/20 rounded-full text-secondary-foreground"
              >
                {category}
              </span>
            ))}
        </div>
      </div>
    </Link>
  )
}

export default ListCard
