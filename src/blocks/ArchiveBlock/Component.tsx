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

import { CollectionArchive } from '@/components/CollectionArchive'

export const ArchiveBlock: React.FC<
  ArchiveBlockProps & {
    id?: string
  }
> = async (props) => {
  const {
    id,
    categories,
    introContent,
    limit: limitFromProps,
    populateBy,
    relationTo,
    displayType,
    selectedDocs,
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

  return (
    <div className="my-16" id={`block-${id}`}>
      {introContent && (
        <div className="container">
          <RichText className="max-w-[48rem]" data={introContent} enableGutter={false} />
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
