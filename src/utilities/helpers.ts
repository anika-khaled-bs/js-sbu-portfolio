/**
 * Utility helper functions
 */

/**
 * Group an array of objects by a key or key selector function
 * @param arr Array to group
 * @param keySelector Function that returns the key to group by, or string key name
 * @returns Object with keys as group names and values as arrays of items
 */
export function groupBy<T>(
  arr: T[],
  keySelector: ((item: T) => string) | keyof T,
): Record<string, T[]> {
  return arr.reduce<Record<string, T[]>>((groups, item) => {
    const key =
      typeof keySelector === 'function' ? keySelector(item) : String(item[keySelector] || 'other')

    // Create the group if it doesn't exist
    if (!groups[key]) {
      groups[key] = []
    }

    // Add the item to the group
    groups[key].push(item)

    return groups
  }, {})
}

/**
 * Formats a number with comma separators
 */
export function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

/**
 * Truncates text to a specified length and adds ellipsis
 */
export function truncateText(text: string, maxLength: number = 150): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

/**
 * Converts a string to title case (capitalizes first letter of each word)
 */
export function toTitleCase(str: string): string {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase(),
  )
}

/**
 * Creates a URL-friendly string (slug) from any text
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
}

/**
 * Checks if current device is mobile based on user agent
 * Note: This should only be used on the client side
 */
export function isMobile(): boolean {
  if (typeof window === 'undefined') return false
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

/**
 * Get initial avatar/letters from a name
 */
export function getInitials(name: string): string {
  if (!name) return ''
  const names = name.split(' ')
  if (names?.length! === 1) return names[0]?.charAt(0).toUpperCase()!
  return (names[0]?.charAt(0) + names[names.length - 1]!.charAt(0)).toUpperCase()
}
