import {
  Post,
  ContactDetail,
  Value,
  TechStack,
  Testimonial,
  Team,
  Service,
  Portfolio,
} from '@/payload-types'

// Common types
export type CollectionItem =
  | Post
  | ContactDetail
  | Value
  | TechStack
  | Testimonial
  | Team
  | Service
  | Portfolio
export type DisplayType = 'grid' | 'slider' | 'feature' | 'card' | 'list' | 'default'

export type Props = {
  items: CollectionItem[]
  relationTo: string
  displayType: DisplayType
}

// Props for the card components
export type CommonCardProps = {
  className?: string
  showCategories?: boolean
  displayType?: DisplayType
}

export type CollectionCardProps = CommonCardProps & {
  doc: Exclude<CollectionItem, ContactDetail>
  relationTo: string
}
