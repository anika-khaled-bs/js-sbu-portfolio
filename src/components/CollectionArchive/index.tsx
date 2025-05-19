import React from 'react'
import { ContactCard } from '@/components/ContactCard'
import { ContactDetail, Value, TechStack, Service, Team, Post, Tutorial } from '@/payload-types'
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
import PostCard from '@/components/PostDetails/PostCard'
import TutorialCard from './components/TutorialCard'

/**
 * Main CollectionArchive component that renders collections of different types
 */
export const CollectionArchive: React.FC<Props> = ({ items, relationTo, displayType, type }) => {
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
    return <TechStackGrid techStacks={items as TechStack[]} displayType={displayType} type={type} />
  }

  // Special handling for posts collection with featuredBlock display type
  if (relationTo === 'posts' && displayType === 'feature') {
    return (
      <div className={shouldHaveContainer ? 'container' : ''}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items?.map((item, index) => {
            if (typeof item !== 'object' || item === null) return null
            return <PostCard key={index} post={item as Post} className={itemClasses} />
          })}
        </div>
      </div>
    )
  }

  // Special handling for tutorials with feature display type - to match post's featured layout
  if (relationTo === 'tutorials' && displayType === 'feature') {
    return (
      <div className={shouldHaveContainer ? 'container' : ''}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items?.map((item, index) => {
            if (typeof item !== 'object' || item === null) return null
            return (
              <TutorialCard
                key={index}
                doc={item as Tutorial}
                relationTo="tutorials"
                displayType={displayType}
                className={itemClasses}
              />
            )
          })}
        </div>
      </div>
    )
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

  // Special handling for tutorials in list view - group by difficulty level
  if (relationTo === 'tutorials' && displayType === 'list') {
    // Cast items to Tutorial[] for proper typing
    const tutorials = items as Tutorial[]

    // Group tutorials by difficulty level
    const groupedByDifficulty = groupBy(tutorials, (tutorial) => {
      return tutorial.difficultyLevel || 'Other'
    })

    // Define the order of difficulty levels
    const difficultyOrder = ['beginner', 'intermediate', 'advanced', 'Other']

    // Sort levels by the defined order
    const sortedLevels = Object.keys(groupedByDifficulty).sort(
      (a, b) => difficultyOrder.indexOf(a) - difficultyOrder.indexOf(b),
    )

    // Format difficulty level for display (capitalize first letter)
    const formatDifficultyLevel = (level: string) => {
      return level.charAt(0).toUpperCase() + level.slice(1)
    }

    return (
      <div className={shouldHaveContainer ? 'container' : ''}>
        {sortedLevels.map((level) => (
          <div key={level} className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-primary">
              {formatDifficultyLevel(level)}
            </h2>
            <div className={layoutClasses}>
              {groupedByDifficulty[level]?.map((tutorial, index) => (
                <div className={itemClasses} key={index}>
                  <TutorialCard
                    className="h-full"
                    doc={tutorial}
                    relationTo="tutorials"
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
                showCategories={itemCollection === 'posts' || itemCollection === 'tutorials'}
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
