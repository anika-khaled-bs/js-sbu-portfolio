import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CalendarDays, Clock, User, Video, Award, BookOpen } from 'lucide-react'
import { cn } from '@/utilities/ui'
import { Media, Tutorial } from '@/payload-types'

import { CollectionCardProps } from '../types'
import { collectionDataExtractors } from '../utils/dataExtractors'
import { TagList } from './UIComponents'

/**
 * TutorialCard Component - Specialized component for tutorial display
 */
const TutorialCard: React.FC<CollectionCardProps> = ({ doc, className, displayType }) => {
  // Extract tutorial-specific data
  const {
    getTitle,
    getDescription,
    getImage,
    getSlug,
    getUrl,
    getPublishedDate,
    getFormattedDate,
    getAuthors,
    getDuration,
    getDifficultyLevel,
    getTechStacksForTutorial,
    getCategories,
  } = collectionDataExtractors

  const tutorial = doc as Tutorial
  const title = getTitle(tutorial, 'tutorials')
  const description = getDescription(tutorial, 'tutorials')
  const image = getImage(tutorial, 'tutorials')
  const slug = getSlug(tutorial)
  const url = getUrl('tutorials', slug)
  const publishedDate = getPublishedDate(tutorial, 'tutorials')
  const formattedPublishedDate = getFormattedDate(publishedDate)
  const authors = getAuthors(tutorial, 'tutorials')
  const duration = getDuration(tutorial, 'tutorials')
  const difficultyLevel = getDifficultyLevel(tutorial, 'tutorials')
  const techStacks = getTechStacksForTutorial(tutorial, 'tutorials')
  const categories = getCategories(tutorial, 'tutorials')

  // Difficulty level badge styles based on level
  const getDifficultyStyles = () => {
    switch (difficultyLevel) {
      case 'beginner':
        return 'bg-green-100 text-green-700'
      case 'intermediate':
        return 'bg-blue-100 text-blue-700'
      case 'advanced':
        return 'bg-purple-100 text-purple-700'
      default:
        return 'bg-muted-foreground/10 text-muted-foreground'
    }
  }

  // Capitalize first letter of difficulty level for display
  const formatDifficultyLevel = (level?: string) => {
    if (!level) return ''
    return level.charAt(0).toUpperCase() + level.slice(1)
  }

  // GRID LAYOUT
  if (displayType === 'grid') {
    return (
      <Link
        href={url}
        className={cn(
          'group flex flex-col h-full overflow-hidden rounded-xl border border-border bg-card shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1',
          className,
        )}
      >
        {/* Thumbnail Image */}
        <div className="relative aspect-video overflow-hidden">
          {image && typeof image !== 'string' && (
            <Image
              src={(image as Media).url!}
              alt={title || 'Tutorial'}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
          )}
          {!image && (
            <div className="h-full w-full bg-primary/10 flex items-center justify-center">
              <Video className="h-10 w-10 text-primary/50" />
            </div>
          )}

          {/* Duration Badge */}
          {duration && (
            <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-md flex items-center">
              <Clock size={12} className="mr-1" />
              {duration}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex-grow flex flex-col">
          {/* Difficulty Badge */}
          {difficultyLevel && (
            <div className="mb-2">
              <span
                className={cn(
                  'text-xs px-2 py-1 rounded-full inline-flex items-center',
                  getDifficultyStyles(),
                )}
              >
                <Award size={12} className="mr-1" />
                {formatDifficultyLevel(difficultyLevel)}
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

          {/* Categories */}
          {categories && categories.length > 0 && (
            <div className="flex flex-wrap gap-2 my-2">
              <TagList tags={categories.slice(0, 2)} tagStyle="techSkill" />
            </div>
          )}

          {/* Meta Footer */}
          <div className="mt-auto pt-3 border-t border-border">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              {/* Date */}
              {formattedPublishedDate && (
                <div className="flex items-center">
                  <CalendarDays size={14} className="mr-1.5" />
                  <span>{formattedPublishedDate}</span>
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
      </Link>
    )
  }

  // LIST LAYOUT
  if (displayType === 'list') {
    return (
      <Link
        href={url}
        className={cn(
          'group flex flex-col sm:flex-row overflow-hidden rounded-xl bg-card border border-border shadow-sm hover:shadow-lg transition-all duration-300',
          className,
        )}
      >
        {/* Thumbnail with play button overlay */}
        <div className="relative sm:w-48 h-48 flex-shrink-0 overflow-hidden">
          {image && typeof image !== 'string' && (
            <Image
              src={(image as Media).url!}
              alt={title || 'Tutorial'}
              fill
              className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
          )}
          {!image && (
            <div className="h-full w-full bg-primary/10 flex items-center justify-center">
              <Video className="h-12 w-12 text-primary/50" />
            </div>
          )}

          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
            <div className="rounded-full bg-primary/90 p-3 transform group-hover:scale-110 transition-transform">
              <Video className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* Duration Badge */}
          {duration && (
            <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-md flex items-center">
              <Clock size={12} className="mr-1" />
              {duration}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-grow">
          <div className="flex flex-col">
            {/* Difficulty Level */}
            {difficultyLevel && (
              <div className="mb-2">
                <span
                  className={cn(
                    'text-xs px-2 py-1 rounded-full inline-flex items-center',
                    getDifficultyStyles(),
                  )}
                >
                  <Award size={12} className="mr-1" />
                  {formatDifficultyLevel(difficultyLevel)}
                </span>
              </div>
            )}

            {/* Title */}
            <h3 className="text-lg font-semibold line-clamp-1 mb-1 group-hover:text-primary transition-colors">
              {title}
            </h3>

            {/* Tutorial metadata: date */}
            <div className="flex items-center flex-wrap gap-4 text-xs text-muted-foreground mb-2">
              {formattedPublishedDate && (
                <div className="flex items-center">
                  <CalendarDays size={14} className="mr-1.5" />
                  <span>{formattedPublishedDate}</span>
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

            {/* Tech stacks */}
            {techStacks && techStacks.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-auto">
                {techStacks
                  .filter((tech): tech is any => typeof tech === 'object')
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
          </div>
        </div>
      </Link>
    )
  }

  // FEATURE LAYOUT
  if (displayType === 'feature') {
    return (
      <Link
        href={url}
        className={cn(
          'group flex flex-col md:flex-row h-full overflow-hidden rounded-xl bg-card border border-border shadow-sm hover:shadow-lg transition-all duration-300',
          className,
        )}
      >
        {/* Large Thumbnail with play button overlay */}
        <div className="relative md:w-2/5 h-52 md:h-auto overflow-hidden">
          {image && typeof image !== 'string' && (
            <Image
              src={(image as Media).url!}
              alt={title || 'Tutorial'}
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
          )}
          {!image && (
            <div className="h-full w-full bg-primary/10 flex items-center justify-center">
              <Video className="h-16 w-16 text-primary/50" />
            </div>
          )}

          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
            <div className="rounded-full bg-primary/90 p-4 transform group-hover:scale-110 transition-transform">
              <Video className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Duration Badge */}
          {duration && (
            <div className="absolute bottom-4 right-4 bg-black/60 text-white text-xs px-3 py-1 rounded-md flex items-center">
              <Clock size={14} className="mr-1.5" />
              {duration}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col md:w-3/5">
          {/* Difficulty Level */}
          <div className="flex mb-3">
            {difficultyLevel && (
              <span
                className={cn(
                  'text-sm px-3 py-1 rounded-full inline-flex items-center',
                  getDifficultyStyles(),
                )}
              >
                <Award size={14} className="mr-1.5" />
                {formatDifficultyLevel(difficultyLevel)}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
            {title}
          </h3>

          {/* Description */}
          {description && (
            <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{description}</p>
          )}

          {/* Categories as tags */}
          {categories && categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              <TagList tags={categories} tagStyle="techSkill" />
            </div>
          )}

          <div className="mt-auto pt-4 border-t border-border">
            {/* Meta Info with Icons */}
            <div className="grid grid-cols-2 gap-4">
              {/* Date */}
              {formattedPublishedDate && (
                <div className="flex items-center text-xs text-muted-foreground">
                  <CalendarDays size={14} className="mr-1.5" />
                  <span>{formattedPublishedDate}</span>
                </div>
              )}

              {/* Duration */}
              {duration && (
                <div className="flex items-center text-xs text-muted-foreground">
                  <BookOpen size={14} className="mr-1.5" />
                  <span>{duration}</span>
                </div>
              )}
            </div>

            {/* Author info */}
            {authors && authors.length > 0 && (
              <div className="flex items-center text-xs text-muted-foreground mt-4">
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
      </Link>
    )
  }

  // DEFAULT CARD
  return (
    <Link
      href={url}
      className={cn(
        'group flex flex-col h-full overflow-hidden rounded-xl bg-card border border-border shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1',
        className,
      )}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        {image && typeof image !== 'string' && (
          <Image
            src={(image as Media).url!}
            alt={title || 'Tutorial'}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
        )}
        {!image && (
          <div className="h-full w-full bg-primary/10 flex items-center justify-center">
            <Video className="h-12 w-12 text-primary/50" />
          </div>
        )}

        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
          <div className="rounded-full bg-primary/90 p-3 transform group-hover:scale-110 transition-transform">
            <Video className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Duration Badge */}
        {duration && (
          <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-md flex items-center">
            <Clock size={12} className="mr-1" />
            {duration}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
          {/* Difficulty Badge */}
          {difficultyLevel && (
            <span
              className={cn(
                'text-xs px-2 py-1 rounded-full inline-flex items-center',
                getDifficultyStyles(),
              )}
            >
              <Award size={12} className="mr-1" />
              {formatDifficultyLevel(difficultyLevel)}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold line-clamp-2 mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>

        {/* Description */}
        {description && (
          <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{description}</p>
        )}

        {/* Meta Footer */}
        <div className="mt-auto pt-3 border-t border-border">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            {/* Date */}
            {formattedPublishedDate && (
              <div className="flex items-center">
                <CalendarDays size={14} className="mr-1.5" />
                <span>{formattedPublishedDate}</span>
              </div>
            )}

            {/* Author (shortened) */}
            {authors && authors.length > 0 && (
              <div className="flex items-center truncate">
                <User size={14} className="mr-1.5 flex-shrink-0" />
                <span className="truncate">
                  {authors[0] && typeof authors[0] === 'object' ? authors[0].name : 'Author'}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default TutorialCard
