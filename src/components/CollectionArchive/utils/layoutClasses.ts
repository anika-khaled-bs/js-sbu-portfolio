import { DisplayType } from '../types'

/**
 * Get layout classes based on display type
 */
export const useLayoutClasses = (displayType: DisplayType): string => {
  switch (displayType) {
    case 'grid':
      return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
    case 'slider':
      return 'flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory'
    case 'feature':
      return 'grid grid-cols-1 lg:grid-cols-3 gap-8'
    case 'list':
      return 'flex flex-col gap-6'
    case 'card':
    case 'default':
    default:
      return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
  }
}

/**
 * Get item classes based on display type
 */
export const useItemClasses = (displayType: DisplayType): string => {
  switch (displayType) {
    case 'grid':
      return 'w-full'
    case 'slider':
      return 'min-w-[300px] snap-center'
    case 'feature':
      return 'col-span-1'
    case 'list':
      return 'w-full'
    case 'card':
    case 'default':
    default:
      return 'w-full'
  }
}
