'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Media } from '@/payload-types'
import { Calendar } from 'lucide-react'
import { formatDate } from '@/utilities/formatDate'
import { Media as MediaComponent } from '@/components/Media'

interface SearchResultCardProps {
  result: {
    id: string
    title: string
    shortDescription?: string
    slug?: string
    featuredImage?: Media | string
    thumbnailImage?: Media | string
    completionDate?: string
    categories?: Array<{
      relationTo?: string
      id?: string
      title?: string
    }>
  }
}

export const SearchResultCard: React.FC<SearchResultCardProps> = ({ result }) => {
  const image = result.thumbnailImage || result.featuredImage

  return (
    <Link
      href={`/${result.slug}`}
      className="group flex flex-col h-full overflow-hidden rounded-xl bg-muted shadow-sm hover:shadow-md transition-all"
    >
      <div className="px-6 py-4 flex-grow flex flex-col">
        {/* Screenshot/Image Section */}
        {image && (
          <div className="relative aspect-[4/3] overflow-hidden mb-6 rounded-md">
            <MediaComponent
              resource={image}
              fill
              alt={result.title}
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}

        {/* Content Section */}
        <div className="flex md:justify-around items-center mb-2 flex-wrap md:flex-nowrap gap-2">
          <p className="text-xl font-semibold w-2/3 truncate">{result.title}</p>
          {/* Completion Date - display if present */}
          {result.completionDate && (
            <div className="text-xs text-muted-foreground mt-auto mb-2 flex items-center md:justify-end w-full">
              <span className="mx-1">
                <Calendar size={12} />
              </span>
              {formatDate(result.completionDate, { format: 'medium' })}
            </div>
          )}
        </div>
        {result.shortDescription && (
          <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
            {result.shortDescription}
          </p>
        )}

        {/* Categories Tags */}
        {result.categories && result.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-auto">
            {result.categories.slice(0, 3).map((category, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2.5 py-0.5 text-xs bg-muted-foreground/10 rounded-full text-muted-foreground before:content-['•'] before:mr-1.5 before:text-sm"
              >
                {category.title}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}
