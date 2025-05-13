import type { Post, ContactDetail, ArchiveBlock as ArchiveBlockProps, Value } from '@/payload-types'

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

  let items: (Post | ContactDetail | Value)[] = []
  const collectionType = relationTo || 'posts'

  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise })

    if (collectionType === 'posts') {
      const flattenedCategories = categories?.map((category) => {
        if (typeof category === 'object') return category.id
        else return category
      })

      const fetchedPosts = await payload.find({
        collection: 'posts',
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
        depth: 1,
        limit,
      })

      items = fetchedContactDetails.docs
    } else if (collectionType === 'values') {
      const fetchedValues = await payload.find({
        collection: 'values',
        depth: 1,
        limit,
      })

      items = fetchedValues.docs
    }
  } else {
    if (selectedDocs?.length) {
      const filteredSelectedItems = selectedDocs
        .map((item) => {
          if (typeof item === 'object' && item !== null) {
            if (item.relationTo === 'contact-details' && typeof item.value === 'object') {
              return {
                ...item.value,
                _collection: 'contact-details',
              }
            } else if (item.relationTo === 'posts' && typeof item.value === 'object') {
              return {
                ...item.value,
                _collection: 'posts',
              }
            } else if (item.relationTo === 'values' && typeof item.value === 'object') {
              return {
                ...item.value,
                _collection: 'values',
              }
            }
          }
          return null
        })
        .filter(Boolean) as (Post | ContactDetail)[]

      items = filteredSelectedItems
    }
  }

  return (
    <div className="my-16" id={`block-${id}`}>
      {introContent && (
        <div className="container mb-16">
          <RichText className="ms-0 max-w-[48rem]" data={introContent} enableGutter={false} />
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
