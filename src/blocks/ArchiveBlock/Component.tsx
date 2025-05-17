import type {
  Post,
  ContactDetail,
  ArchiveBlock as ArchiveBlockProps,
  Value,
  TechStack,
  Testimonial,
  Team,
  Service,
  Portfolio,
} from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import RichText from '@/components/RichText'
import Link from 'next/link'

import { CollectionArchive } from '@/components/CollectionArchive'

export const ArchiveBlock: React.FC<
  ArchiveBlockProps & {
    id?: string
  }
> = async (props) => {
  const {
    id,
    categories,
    // introContent,
    limit: limitFromProps,
    populateBy,
    relationTo,
    displayType,
    selectedDocs,
    header,
    subheader,
    description,
    links,
  } = props

  const limit = limitFromProps || 3

  let items: (
    | Post
    | ContactDetail
    | Value
    | TechStack
    | Testimonial
    | Team
    | Service
    | Portfolio
  )[] = []
  const collectionType = relationTo || 'posts'

  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise })

    const flattenedCategories = categories?.map((category) => {
      if (typeof category === 'object') return category.id
      else return category
    })

    if (collectionType === 'posts') {
      const fetchedPosts = await payload.find({
        collection: 'posts',
        overrideAccess: false,
        depth: 1,
        limit,
        ...(flattenedCategories && flattenedCategories.length > 0
          ? {
              where: {
                categories: {
                  in: flattenedCategories,
                },
              },
            }
          : {}),
      })

      items = fetchedPosts.docs
    } else if (collectionType === 'contact-details') {
      const fetchedContactDetails = await payload.find({
        collection: 'contact-details',
        overrideAccess: false,
        depth: 1,
        limit,
      })

      items = fetchedContactDetails.docs
    } else if (collectionType === 'values') {
      const fetchedValues = await payload.find({
        collection: 'values',
        overrideAccess: false,
        depth: 1,
        limit,
      })

      items = fetchedValues.docs
    } else if (collectionType === 'tech-stacks') {
      const fetchedTechnologies = await payload.find({
        collection: 'tech-stacks',
        overrideAccess: false,
        depth: 1,
        limit,
      })

      items = fetchedTechnologies.docs
    } else if (collectionType === 'testimonials') {
      const fetchedTestimonials = await payload.find({
        collection: 'testimonials',
        overrideAccess: false,
        depth: 1,
        limit,
      })

      items = fetchedTestimonials.docs
    } else if (collectionType === 'team') {
      const fetchedTeam = await payload.find({
        collection: 'team',
        overrideAccess: false,
        depth: 1,
        limit,
      })

      items = fetchedTeam.docs
    } else if (collectionType === 'services') {
      const fetchedServices = await payload.find({
        collection: 'services',
        overrideAccess: false,
        depth: 1,
        limit,
        ...(flattenedCategories && flattenedCategories.length > 0
          ? {
              where: {
                categories: {
                  in: flattenedCategories,
                },
              },
            }
          : {}),
      })

      items = fetchedServices.docs
    } else if (collectionType === 'portfolio') {
      const fetchedPortfolio = await payload.find({
        collection: 'portfolio',
        overrideAccess: false,
        depth: 1,
        limit,
      })

      items = fetchedPortfolio.docs
    }
  } else if (selectedDocs?.length) {
    // Use a more type-safe approach with any casting where needed
    const filteredSelectedItems = selectedDocs
      .map((item: any) => {
        if (typeof item === 'object' && item !== null && typeof item.value === 'object') {
          return {
            ...item.value,
            _collection: item.relationTo,
          }
        }
        return null
      })
      .filter(Boolean) as (
      | Post
      | ContactDetail
      | Value
      | TechStack
      | Testimonial
      | Team
      | Service
      | Portfolio
    )[]

    items = filteredSelectedItems
  }

  const hasHeaderContent = header || subheader || description
  const hasLinks = links && links.length > 0

  console.log('🚀 ~ >= ~ links:', links)

  const renderLink = () => {
    if (!hasLinks) return null

    const singleLink = links[0]

    if (!singleLink) return null

    // Handle standard linkGroup format
    if (singleLink.link.type === 'custom' && singleLink.link.url) {
      return (
        <Link
          href={singleLink.link.url}
          target={singleLink.link.newTab ? '_blank' : undefined}
          className="inline-block px-4 py-2 mt-4 text-sm font-medium transition-colors bg-primary text-white rounded hover:bg-primary/90"
        >
          {singleLink.link.label || 'Learn More'}
        </Link>
      )
    }

    // Handle reference links
    if (
      singleLink.link.type === 'reference' &&
      singleLink.link.reference?.value &&
      singleLink.link.reference?.relationTo
    ) {
      const { value, relationTo } = singleLink.link.reference
      const href = `/${relationTo === 'pages' ? '' : `${relationTo}/`}${
        typeof value === 'object' ? value.slug : value
      }`

      return (
        <Link
          href={href}
          target={singleLink.link.newTab ? '_blank' : undefined}
          className="inline-block px-4 py-2 mt-4 text-sm font-medium transition-colors bg-primary text-white rounded hover:bg-primary/90"
        >
          {singleLink.link.label || 'Learn More'}
        </Link>
      )
    }

    // Handle custom URL format as fallback
    if (singleLink.link.label && singleLink.link.url) {
      return (
        <Link
          href={singleLink.link.url}
          className="inline-block px-4 py-2 mt-4 text-sm font-medium transition-colors bg-primary text-white rounded hover:bg-primary/90"
        >
          {singleLink.link.label}
        </Link>
      )
    }

    return null
  }

  return (
    <div className="my-16" id={`block-${id}`}>
      {hasHeaderContent && (
        <div className={`container mb-8 ${!hasLinks ? 'text-center' : ''}`}>
          <div
            className={`${
              hasLinks
                ? 'flex flex-col md:flex-row justify-between items-start md:items-center gap-8'
                : ''
            }`}
          >
            <div
              className={`${hasLinks ? 'md:max-w-[70%]' : 'mx-auto max-w-prose'} flex flex-col gap-3`}
            >
              {subheader && <h3 className="text-sm font-medium text-primary">{header}</h3>}
              {header && <h2 className="text-4xl mb-2">{subheader}</h2>}
              {description && <p className="text-muted-foreground">{description}</p>}
            </div>
            {hasLinks && <div className="mt-4 md:mt-0 md:ml-auto">{renderLink()}</div>}
          </div>
        </div>
      )}
      <CollectionArchive
        items={items}
        relationTo={collectionType}
        displayType={displayType || 'grid'}
      />
    </div>
  )
}
