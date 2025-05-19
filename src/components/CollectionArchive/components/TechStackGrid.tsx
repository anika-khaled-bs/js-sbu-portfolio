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
    <div className="container relative p-6 rounded-xl bg-background/60 backdrop-blur-sm border border-border shadow-md dark:bg-background/30 dark:backdrop-blur-md">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-50 pointer-events-none rounded-xl dark:from-primary/10"></div>
      <div
        className={cn(
          displayType === 'grid' && 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6',
          displayType === 'slider' && 'flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory',
          displayType === 'list' && 'space-y-4',
          (displayType === 'feature' || displayType === 'card' || displayType === 'default') &&
            'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
          'relative z-10',
        )}
      >
        {techStacks.map((stack) => (
          <div
            key={stack.id}
            className={cn(
              'bg-card shadow hover:shadow-md transition-shadow rounded-lg overflow-hidden border border-border flex flex-col h-full relative',
              displayType === 'list' ? 'p-4 flex-row items-start gap-4' : 'p-5',
              displayType === 'slider' && 'min-w-[300px] snap-center',
            )}
          >
            <div
              className={cn(
                'relative z-10',
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

            <div className={cn('relative z-10', displayType === 'list' ? 'flex-1' : '')}>
              {displayType === 'list' && (
                <h3 className="text-lg font-semibold mb-1 text-primary">{stack.name}</h3>
              )}

              {stack.description && (
                <p className="text-muted-foreground mb-4 line-clamp-2">{stack.description}</p>
              )}
            </div>

            {/* Key features displayed based on display type */}
            {/* {stack.keyFeatures && stack.keyFeatures.length > 0 && (
              <div className="mt-auto">
                {displayType !== 'grid' && displayType !== 'slider' && (
                  <h4 className="text-sm font-medium text-primary mb-2">Key Features</h4>
                )}

                {displayType === 'list' ? (
                  <div className="flex flex-wrap gap-2">
                    {stack.keyFeatures.map((feature, index) => (
                      <span
                        key={index}
                        className="bg-primary/10 text-xs px-2 py-1 rounded-full flex items-center gap-1"
                      >
                        <Check size={12} className="text-primary flex-shrink-0" />
                        <span>{feature.featureDetails}</span>
                      </span>
                    ))}
                  </div>
                ) : displayType === 'grid' ? (
                  <div className="space-y-1">
                    {stack.keyFeatures.slice(0, 3).map((feature, index) => (
                      <div key={index} className="flex items-start gap-1">
                        <Check size={14} className="text-primary mt-0.5 flex-shrink-0" />
                        <p className="text-xs line-clamp-1 text-muted-foreground">
                          {feature.featureDetails}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <ul className="text-sm space-y-2">
                    {stack.keyFeatures.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check size={12} className="text-primary" />
                        </div>
                        <span>{feature.featureDetails}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )} */}
          </div>
        ))}
      </div>
    </div>
  )
}

export default TechStackGrid
