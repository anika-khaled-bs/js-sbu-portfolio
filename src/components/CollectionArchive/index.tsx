import React from 'react'
import { ContactCard } from '@/components/ContactCard'
import { ContactDetail, Value, TechStack, Service } from '@/payload-types'
import OurValues from '../About/OurValues'
import TeamComponent from '../About/Team'
import ClientLogoSlider from '../TrustedBySection'
import TechStackGrid from './components/TechStackGrid'

import { Props } from './types'
import { useLayoutClasses, useItemClasses } from './utils/layoutClasses'
import CollectionCard from './components/CollectionCard'
import FeaturedServices from '../Home/ServicesSection'

/**
 * Main CollectionArchive component that renders collections of different types
 */
export const CollectionArchive: React.FC<Props> = ({ items, relationTo, displayType }) => {
  const layoutClasses = useLayoutClasses(displayType)
  const itemClasses = useItemClasses(displayType)

  // Only nest in container if not a special collection that handles its own container
  const shouldHaveContainer = !(relationTo === 'values' && displayType === 'default')

  // Check if we should use a specialized component for this collection type
  if (relationTo === 'values' && displayType === 'default') {
    return <OurValues values={items as Value[]} />
  }

  if (relationTo === 'team' && displayType === 'default') {
    return <TeamComponent team={items} />
  }

  if (relationTo === 'testimonials' && displayType === 'default') {
    return <ClientLogoSlider clientTestimonials={items} />
  }

  if (relationTo === 'services' && displayType === 'default') {
    return <FeaturedServices services={items as Service[]} />
  }

  // Special handling for tech stacks - use our specialized component for all display types
  if (relationTo === 'tech-stacks') {
    return <TechStackGrid techStacks={items as TechStack[]} displayType={displayType} />
  }

  return (
    <div className={shouldHaveContainer ? 'container' : ''}>
      <div className={layoutClasses}>
        {items?.map((item, index) => {
          if (typeof item !== 'object' || item === null) return null

          // Handle items with _collection marker from selectedDocs
          const itemCollection = (item as any)._collection || relationTo

          // Special handling for contact details
          if (itemCollection === 'contact-details') {
            return (
              <ContactCard
                key={index}
                className={itemClasses}
                doc={item as ContactDetail}
                displayType={displayType}
              />
            )
          }

          return (
            <div className={itemClasses} key={index}>
              <CollectionCard
                className="h-full"
                doc={item as Exclude<typeof item, ContactDetail>}
                relationTo={itemCollection}
                showCategories={itemCollection === 'posts'}
                displayType={displayType}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Export utility types
export * from './types'
