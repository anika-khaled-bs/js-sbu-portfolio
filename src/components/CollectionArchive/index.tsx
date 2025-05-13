import { cn } from '@/utilities/ui'
import React from 'react'

import { Card } from '@/components/Card'
import { ContactCard } from '@/components/ContactCard'
import { type Post, type ContactDetail } from '@/payload-types'

export type Props = {
  items: (Post | ContactDetail)[]
  relationTo: string
  displayType: 'grid' | 'slider' | 'feature' | 'card' | 'list'
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const { items, relationTo, displayType } = props

  const getLayoutClasses = () => {
    switch (displayType) {
      case 'grid':
        return 'grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8'
      case 'slider':
        return 'flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory'
      case 'feature':
        return 'grid grid-cols-1 lg:grid-cols-2 gap-8'
      case 'list':
        return 'flex flex-col gap-4'
      case 'card':
      default:
        return 'grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8'
    }
  }

  const getItemClasses = () => {
    switch (displayType) {
      case 'grid':
        return 'col-span-4'
      case 'slider':
        return 'min-w-[300px] snap-center'
      case 'feature':
        return displayType === 'feature' ? 'col-span-1' : ''
      case 'list':
        return 'w-full'
      case 'card':
      default:
        return 'col-span-4'
    }
  }

  return (
    <div className={cn('container')}>
      <div className={getLayoutClasses()}>
        {items?.map((item, index) => {
          if (typeof item === 'object' && item !== null) {
            // Handle items with _collection marker from selectedDocs
            const itemCollection = (item as any)._collection || relationTo

            if (itemCollection === 'contact-details') {
              return (
                // <div className={getItemClasses()} key={index}>
                <ContactCard
                  key={index}
                  className={getItemClasses()}
                  doc={item as ContactDetail}
                  displayType={displayType}
                />
                // </div>
              )
            } else {
              return (
                <div className={getItemClasses()} key={index}>
                  <Card
                    className="h-full"
                    doc={item as Post}
                    relationTo={itemCollection}
                    showCategories={itemCollection === 'posts'}
                    displayType={displayType}
                  />
                </div>
              )
            }
          }
          return null
        })}
      </div>
    </div>
  )
}
