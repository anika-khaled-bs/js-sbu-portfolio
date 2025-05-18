import React from 'react'
import { Card } from '@/components/Card'
import { CollectionCardProps } from '../types'
import { collectionDataExtractors } from '../utils/dataExtractors'
import FeatureCard from './FeatureCard'
import GridCard from './GridCard'
import ListCard from './ListCard'
import TutorialCard from './TutorialCard' // Import the TutorialCard component
import { Post, Tutorial } from '@/payload-types'
import RelatedPostCard from '@/components/PostDetails/PostCard' // Import the component for post cards

/**
 * This component handles rendering the appropriate card based on the collection type and display type
 */
const CollectionCard: React.FC<CollectionCardProps> = (props) => {
  const { doc, relationTo, className, showCategories, displayType } = props

  // Special case for posts collection with featuredBlock display type
  if (relationTo === 'posts' && displayType === 'feature') {
    return <RelatedPostCard post={doc as Post} />
  }

  // Special case for tutorials - we'll use our dedicated tutorial card component
  if (relationTo === 'tutorials') {
    return <TutorialCard {...props} />
  }

  // Handle different display types with specialized components
  if (displayType === 'feature') {
    return <FeatureCard {...props} />
  }

  if (displayType === 'grid') {
    return <GridCard {...props} />
  }

  if (displayType === 'list') {
    return <ListCard {...props} />
  }

  // For other display types we'll use the existing Card component
  return (
    <Card
      className={className}
      doc={{
        slug: collectionDataExtractors.getSlug(doc),
        title: collectionDataExtractors.getTitle(doc, relationTo),
        meta: {
          description: collectionDataExtractors.getDescription(doc, relationTo),
          image: collectionDataExtractors.getImage(doc, relationTo),
        },
        ...(showCategories && 'categories' in doc ? { categories: doc.categories } : {}),
        ...(relationTo === 'testimonials'
          ? {
              clientCompany: collectionDataExtractors.getClientCompany(doc, relationTo),
              clientTitle: collectionDataExtractors.getClientTitle(doc, relationTo),
            }
          : {}),
      }}
      relationTo={relationTo}
      showCategories={showCategories}
      displayType={displayType}
    />
  )
}

export default CollectionCard
