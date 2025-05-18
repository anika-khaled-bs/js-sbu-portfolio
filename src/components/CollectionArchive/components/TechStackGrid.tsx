import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { Media, TechStack } from '@/payload-types'
import { cn } from '@/utilities/ui'

type TechStackGridProps = {
  techStacks: TechStack[]
  displayType: 'grid' | 'slider' | 'feature' | 'card' | 'list' | 'default'
}

/**
 * A specialized component for displaying tech stacks with their key features
 */
const TechStackGrid: React.FC<TechStackGridProps> = ({ techStacks, displayType }) => {
  // For default display, use a simple card layout
  return (
    <div
      className={cn(
        displayType === 'grid' && 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6',
        displayType === 'slider' && 'flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory',
        displayType === 'list' && 'space-y-4',
        (displayType === 'feature' || displayType === 'card' || displayType === 'default') &&
          'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
        'container',
      )}
    >
      {techStacks.map((stack) => (
        <div
          key={stack.id}
          className={cn(
            'bg-card shadow hover:shadow-md transition-shadow rounded-lg overflow-hidden border border-border flex flex-col h-full',
            displayType === 'list' ? 'p-4 flex-row items-start gap-4' : 'p-5',
            displayType === 'slider' && 'min-w-[300px] snap-center',
          )}
        >
          <div
            className={cn(
              displayType === 'list'
                ? 'w-12 h-12 relative flex-shrink-0'
                : 'flex items-center gap-3 mb-4',
            )}
          >
            {displayType === 'list' ? (
              // For list view, icon is standalone
              <>
                {stack.icon && typeof stack.icon === 'object' && (
                  <Image
                    src={(stack.icon as Media).url!}
                    alt={stack.name}
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                )}
              </>
            ) : (
              // For all other views, icon is next to title
              <>
                {stack.icon && typeof stack.icon === 'object' && (
                  <div className="w-10 h-10 relative flex-shrink-0">
                    <Image
                      src={(stack.icon as Media).url!}
                      alt={stack.name}
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </div>
                )}
                <h3 className="text-lg font-semibold text-primary">{stack.name}</h3>
              </>
            )}
          </div>

          <div className={displayType === 'list' ? 'flex-1' : ''}>
            {displayType === 'list' && (
              <h3 className="text-lg font-semibold mb-1 text-primary">{stack.name}</h3>
            )}

            {stack.description && (
              <p className="text-muted-foreground mb-4 line-clamp-2">{stack.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default TechStackGrid
