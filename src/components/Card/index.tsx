'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'

export type CardPostData = Pick<Post, 'slug' | 'categories' | 'meta' | 'title'>

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: string
  showCategories?: boolean
  title?: string
  displayType?: 'grid' | 'slider' | 'feature' | 'card' | 'list' | 'default'
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, showCategories, title: titleFromProps } = props
  const { slug, categories, meta, title } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space

  // Don't generate hrefs for contact-details as they don't have dedicated pages
  const href = relationTo === 'contact-details' ? '#' : `/${relationTo}/${slug}`
  const { displayType = 'grid' } = props

  const getCardStyle = () => {
    switch (displayType) {
      case 'feature':
        return 'flex flex-col lg:flex-row border border-border rounded-lg overflow-hidden bg-card hover:cursor-pointer'
      case 'list':
        return 'flex flex-row border border-border rounded-lg overflow-hidden bg-card hover:cursor-pointer'
      case 'slider':
        return 'flex flex-col h-full border border-border rounded-lg overflow-hidden bg-card hover:cursor-pointer'
      case 'grid':
      case 'card':
      default:
        return 'border border-border rounded-lg overflow-hidden bg-card hover:cursor-pointer'
    }
  }

  const getImageStyle = () => {
    switch (displayType) {
      case 'feature':
        return 'relative lg:w-1/2'
      case 'list':
        return 'relative w-1/4'
      default:
        return 'relative w-full'
    }
  }

  const getContentStyle = () => {
    switch (displayType) {
      case 'feature':
        return 'p-6 lg:w-1/2'
      case 'list':
        return 'p-4 w-3/4'
      default:
        return 'p-4'
    }
  }

  return (
    <article className={cn(getCardStyle(), className)} ref={card.ref}>
      <div className={getImageStyle()}>
        {!metaImage && (
          <div className="min-h-[200px] bg-muted flex items-center justify-center">No image</div>
        )}
        {metaImage && typeof metaImage !== 'string' && <Media resource={metaImage} size="33vw" />}
      </div>
      <div className={getContentStyle()}>
        {showCategories && hasCategories && (
          <div className="uppercase text-sm mb-4">
            {showCategories && hasCategories && (
              <div>
                {categories?.map((category, index) => {
                  if (typeof category === 'object') {
                    const { title: titleFromCategory } = category

                    const categoryTitle = titleFromCategory || 'Untitled category'

                    const isLast = index === categories.length - 1

                    return (
                      <Fragment key={index}>
                        {categoryTitle}
                        {!isLast && <Fragment>, &nbsp;</Fragment>}
                      </Fragment>
                    )
                  }

                  return null
                })}
              </div>
            )}
          </div>
        )}
        {titleToUse && (
          <div className="prose">
            <h3>
              <Link className="not-prose" href={href} ref={link.ref}>
                {titleToUse}
              </Link>
            </h3>
          </div>
        )}
        {description && <div className="mt-2">{description && <p>{sanitizedDescription}</p>}</div>}
      </div>
    </article>
  )
}
