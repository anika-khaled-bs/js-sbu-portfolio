import React from 'react'
import Image from 'next/image'
import { Media, TechStack as TechStackType } from '@/payload-types'

type TechStackItem = TechStackType | string

type TechStackListProps = {
  techStacks: TechStackItem[]
}

export const TechStackList: React.FC<TechStackListProps> = ({ techStacks }) => {
  // Process tech stacks to handle both string IDs and object references
  const processedStacks = techStacks
    .map((stack) => {
      // Skip if it's just an ID string
      if (typeof stack === 'string') return null

      // It's a TechStack object
      return {
        id: stack.id,
        name: stack.name,
        description: stack.description,
        category: stack.category || 'other',
        icon: typeof stack.icon === 'object' ? stack.icon : null,
      }
    })
    .filter(Boolean) as (TechStackType & {
    icon: Media | null
  })[]

  // Group tech stacks by category
  const groupedTechStacks = processedStacks.reduce(
    (acc, stack) => {
      const category = stack.category || 'other'
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(stack)
      return acc
    },
    {} as Record<string, (TechStackType & { icon: Media | null })[]>,
  )
  // If no tech stacks after processing, return null
  if (Object.keys(groupedTechStacks).length === 0) {
    return null
  }

  return (
    <div className="bg-secondary p-6 rounded-lg">
      <h3 className="text-xl font-bold mb-4">Technology Stack</h3>

      {Object.entries(groupedTechStacks).map(([category, stacks]) => (
        <div key={category} className="mb-6 last:mb-0">
          <h4 className="text-lg font-medium capitalize mb-3">{category}</h4>
          <ul className="grid grid-cols-2 gap-4">
            {stacks.map((stack) => (
              <li key={stack.id} className="flex items-center">
                {stack.icon?.url && (
                  <div className="mr-2 relative flex-shrink-0">
                    <Image
                      src={stack.icon.url}
                      alt={(stack.icon.alt as string) || stack.name}
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                  </div>
                )}
                <span>{stack.name}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
