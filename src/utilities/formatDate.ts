import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

// Initialize dayjs plugins
dayjs.extend(localizedFormat)
dayjs.extend(relativeTime)
dayjs.extend(utc)
dayjs.extend(timezone)

export type DateFormatType =
  | 'default' // '5/11/2025'
  | 'full' // 'May 11, 2025'
  | 'long' // 'May 11, 2025'
  | 'medium' // 'May 11, 2025'
  | 'short' // '5/11/25'
  | 'iso' // '2025-05-11'
  | 'isoDateTime' // '2025-05-11T12:00:00Z'
  | 'relative' // '2 days ago', 'in 3 months'
  | 'time' // '12:00 PM'
  | 'timeWithSeconds' // '12:00:00 PM'
  | 'custom' // Custom format with provided formatString

export interface FormatDateOptions {
  format?: DateFormatType
  formatString?: string // Used with format: 'custom'
  timezone?: string // e.g., 'America/New_York', 'Asia/Tokyo'
  locale?: string // e.g., 'en', 'fr', 'ja'
}

/**
 * Format a date with various display options using dayjs
 *
 * @param date Date to format (Date object, timestamp string, or number)
 * @param options Formatting options
 * @returns Formatted date string
 */
export function formatDate(date: Date | string | number, options: FormatDateOptions = {}): string {
  const { format = 'default', formatString, timezone: tz, locale } = options

  let dayjsDate = dayjs(date)

  // Apply timezone if provided
  if (tz) {
    dayjsDate = dayjsDate.tz(tz)
  }

  // Apply locale if provided
  if (locale) {
    dayjsDate = dayjsDate.locale(locale)
  }

  switch (format) {
    case 'full':
    case 'long':
    case 'medium':
      return dayjsDate.format('MMMM D, YYYY')
    case 'short':
      return dayjsDate.format('M/D/YY')
    case 'iso':
      return dayjsDate.format('YYYY-MM-DD')
    case 'isoDateTime':
      return dayjsDate.format('YYYY-MM-DDTHH:mm:ssZ')
    case 'relative':
      return dayjsDate.fromNow()
    case 'time':
      return dayjsDate.format('h:mm A')
    case 'timeWithSeconds':
      return dayjsDate.format('h:mm:ss A')
    case 'custom':
      return dayjsDate.format(formatString || '')
    case 'default':
    default:
      return dayjsDate.format('M/D/YYYY')
  }
}
