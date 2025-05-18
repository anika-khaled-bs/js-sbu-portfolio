import React from 'react'
import { formatDate } from '@/utilities/formatDate'
import { Media, Category, User } from '@/payload-types'
import { Clock, Calendar, Award, User as UserIcon, Tag } from 'lucide-react'
import { cn } from '@/utilities/ui'
import { Media as RenderMedia } from '@/components/Media'

interface TutorialHeaderProps {
  title: string
  shortDescription?: string
  difficultyLevel?: 'beginner' | 'intermediate' | 'advanced'
  duration?: number
  publishedAt?: string
  categories?: Category[] | string[]
  authors?: User[] | string[]
  featuredImage?: Media | string
}

const TutorialHeader: React.FC<TutorialHeaderProps> = ({
  title,
  shortDescription,
  difficultyLevel,
  duration,
  publishedAt,
  categories,
  authors,
  featuredImage,
}) => {
  // Format difficulty level with proper badge styling
  const getDifficultyBadge = (level?: string) => {
    if (!level) return null

    let badgeClass = ''
    switch (level) {
      case 'beginner':
        badgeClass = 'bg-green-100 text-green-700'
        break
      case 'intermediate':
        badgeClass = 'bg-blue-100 text-blue-700'
        break
      case 'advanced':
        badgeClass = 'bg-purple-100 text-purple-700'
        break
      default:
        badgeClass = 'bg-gray-100 text-gray-700'
    }

    return (
      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${badgeClass}`}>
        {level.charAt(0).toUpperCase() + level.slice(1)}
      </span>
    )
  }

  // Format date using the utility
  const formattedDate = publishedAt ? formatDate(publishedAt, { format: 'medium' }) : null

  // Format categories for display
  const categoryList =
    categories?.filter(
      (category): category is Category => typeof category === 'object' && category !== null,
    ) || []

  // Format duration
  const formattedDuration = duration ? `${duration} min` : null

  // Format authors
  const authorNames =
    authors
      ?.filter((author): author is User => typeof author === 'object' && author !== null)
      .map((author) => author.name)
      .join(', ') || null

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-xl overflow-hidden shadow-md pb-6 relative">
        {/* Black overlay only for lg screens */}
        <div className="hidden lg:block absolute inset-0 bg-black/70 z-10"></div>

        {/* Featured Image (if available) */}
        {featuredImage && typeof featuredImage !== 'string' && (
          <div className="w-full max-h-[300px] md:min-h-[300px] mb-6">
            <RenderMedia
              resource={featuredImage}
              alt={title}
              fill
              className="object-cover hidden md:block"
              priority
            />
          </div>
        )}

        <div className="px-6 relative z-20 py-10">
          {/* Categories similar to posts */}
          {categoryList.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {categoryList.map((category) => (
                <span
                  key={category.id}
                  className="bg-primary/10 backdrop-blur-sm border border-primary/20 text-primary lg:text-white/90 lg:bg-white/20 lg:border-white/30 px-3 py-1 rounded-full text-xs font-medium flex items-center"
                >
                  <Tag className="h-3 w-3 mr-1" />
                  {category.title}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold mb-4 lg:text-white">{title}</h1>

          {/* Description */}
          {shortDescription && (
            <p className="text-lg text-muted-foreground lg:text-white/80 mb-6">
              {shortDescription}
            </p>
          )}

          {/* Metadata row - similar to PostDetails */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground lg:text-white/70 border-t border-border lg:border-white/20 pt-4">
            {/* Difficulty Level */}
            {difficultyLevel && (
              <div className="flex items-center gap-2">
                <Award size={16} className="text-primary lg:text-white/90" />
                <span
                  className={cn(
                    'px-2.5 py-1 rounded-full text-xs font-medium',
                    difficultyLevel === 'beginner'
                      ? 'bg-green-100 text-green-700 lg:bg-green-700/30 lg:text-white'
                      : '',
                    difficultyLevel === 'intermediate'
                      ? 'bg-blue-100 text-blue-700 lg:bg-blue-700/30 lg:text-white'
                      : '',
                    difficultyLevel === 'advanced'
                      ? 'bg-purple-100 text-purple-700 lg:bg-purple-700/30 lg:text-white'
                      : '',
                  )}
                >
                  {difficultyLevel.charAt(0).toUpperCase() + difficultyLevel.slice(1)}
                </span>
              </div>
            )}

            {/* Duration */}
            {formattedDuration && (
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-primary lg:text-white/90" />
                <span>{formattedDuration}</span>
              </div>
            )}

            {/* Publication date */}
            {formattedDate && (
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-primary lg:text-white/90" />
                <span>{formattedDate}</span>
              </div>
            )}

            {/* Authors */}
            {authorNames && (
              <div className="flex items-center gap-2">
                <UserIcon size={16} className="text-primary lg:text-white/90" />
                <span>By {authorNames}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TutorialHeader
