import React from 'react'
import { ContactCard } from '@/components/ContactCard'
import { ContactDetail, Value, TechStack, Service, Team } from '@/payload-types'
import OurValues from '../About/OurValues'
import TeamComponent from '../About/Team'
import ClientLogoSlider from '../TrustedBySection'
import TechStackGrid from './components/TechStackGrid'

import { Props } from './types'
import { useLayoutClasses, useItemClasses } from './utils/layoutClasses'
import CollectionCard from './components/CollectionCard'
import FeaturedServices from '../Home/ServicesSection'
import { groupBy } from '@/utilities/helpers'
import ListCard from './components/ListCard'

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

  // Special handling for team members in list view - group by department category
  if (relationTo === 'team' && displayType === 'list') {
    // Cast items to Team[] for proper typing
    const teamMembers = items as Team[]

    // Group team members by department category
    const groupedByDepartment = groupBy(teamMembers, (member) => {
      if (member.departmentCategory) {
        if (typeof member.departmentCategory === 'object' && member.departmentCategory.title) {
          return member.departmentCategory.title
        }
        return 'Other'
      }
      return 'Other'
    })

    // Sort departments alphabetically
    const sortedDepartments = Object.keys(groupedByDepartment).sort()

    return (
      <div className={shouldHaveContainer ? 'container' : ''}>
        {sortedDepartments.map((department) => (
          <div key={department} className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-primary">{department}</h2>
            <div className={layoutClasses}>
              {groupedByDepartment[department]?.map((member, index) => (
                <div className={itemClasses} key={index}>
                  <ListCard
                    className="h-full"
                    doc={member}
                    relationTo="team"
                    displayType={displayType}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
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
