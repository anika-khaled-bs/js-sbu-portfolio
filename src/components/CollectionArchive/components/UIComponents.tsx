import React from 'react'
import { cn } from '@/utilities/ui'
import { Star } from 'lucide-react'

/**
 * Rating Stars Component
 */
export const RatingStars: React.FC<{ rating: string; size?: number }> = ({ rating, size = 16 }) => (
  <div className="flex">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={size}
        className={
          i < parseInt(rating || '0', 10)
            ? 'fill-yellow-400 text-yellow-400'
            : 'fill-gray-200 text-gray-200'
        }
      />
    ))}
  </div>
)

/**
 * Tags/Categories display component
 */
export const TagList: React.FC<{ tags: string[]; className?: string }> = ({ tags, className }) => (
  <div className={cn('flex flex-wrap gap-2', className)}>
    {tags.map((tag, index) => (
      <span
        key={index}
        className="inline-flex items-center px-2.5 py-0.5 text-xs bg-muted-foreground/10 rounded-full text-muted-foreground before:content-['•'] before:mr-1.5 before:text-sm"
      >
        {tag}
      </span>
    ))}
  </div>
)
