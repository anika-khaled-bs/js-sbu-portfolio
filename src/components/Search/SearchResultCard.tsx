'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Media } from '@/payload-types'
import { Calendar, FileText, Tag } from 'lucide-react'
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
    doc?: {
      relationTo: string
      value: string
    }
    relationTo?: string
    categories?: Array<{
      relationTo?: string
      id?: string
      title?: string
    }>
  }
}

export const SearchResultCard: React.FC<SearchResultCardProps> = ({ result }) => {
  const image = result.thumbnailImage || result.featuredImage

  // Determine the correct link URL based on document structure
  const getLinkUrl = () => {
    if (result.doc && result.doc.relationTo && result.slug) {
      return `/${result.doc.relationTo}/${result.slug}`
    } else if (result.relationTo && result.slug) {
      return `/${result.relationTo}/${result.slug}`
    } else {
      return `/${result.slug}`
    }
  }

  return (
    <Link
      href={getLinkUrl()}
      className="group flex flex-col h-full overflow-hidden rounded-xl bg-card border border-border shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      <div className="px-6 py-4 flex-grow flex flex-col">
        {/* Screenshot/Image Section */}
        {image ? (
          <div className="relative aspect-[4/3] overflow-hidden mb-6 rounded-md">
            <MediaComponent
              resource={image}
              fill
              alt={result.title}
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        ) : (
          <div className="relative aspect-[4/3] overflow-hidden mb-6 rounded-md bg-slate-200 flex items-center justify-center group-hover:bg-slate-300 transition-colors duration-300">
            <p className="text-slate-500 text-sm font-medium">No Image Available</p>
          </div>
        )}
        {/* Category badges - display at the top */}

        <div className="flex flex-wrap gap-2 mb-4">
          {result.categories &&
            result.categories.length > 0 &&
            // If we have category titles, show them
            result.categories.map((category, index) =>
              category?.title ? (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-1 text-xs bg-primary/10 rounded-full text-primary font-medium"
                >
                  <Tag className="h-3 w-3 mr-1" />
                  {category.title}
                </span>
              ) : null,
            )}
        </div>

        {/* Content Section */}
        <p className="text-xl font-semibold group-hover:text-primary transition-colors duration-300">
          {result.title}
        </p>

        {result.shortDescription && (
          <p className="text-sm text-muted-foreground line-clamp-3 mb-4 group-hover:text-foreground/80 transition-colors duration-300">
            {result.shortDescription}
          </p>
        )}

        {/* Read more link with arrow */}
        <div className="mt-auto pt-2">
          <span className="inline-flex items-center text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-1">
            Read more
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  )
}
