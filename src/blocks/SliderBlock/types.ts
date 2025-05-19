export interface SlideType {
  image: {
    id: string
    url: string
    alt?: string
    filename?: string
    mimeType?: string
    width?: number
    height?: number
    createdAt?: string
    updatedAt?: string
  }
  header?: string
  shortDescription?: string
  links?: Array<{
    link: {
      appearance?: 'default' | 'outline'
      label?: string
      type?: 'reference' | 'custom'
      reference?: {
        value: string
        relationTo: string
      }
      url?: string
    }
  }>
}

export interface SliderSettings {
  autoplay?: boolean
  showNavigation?: boolean
  showPagination?: boolean
  speed?: number
  delay?: number
}

export interface SliderBlockType {
  blockType: 'slider'
  blockName?: string
  slides: SlideType[]
  settings?: SliderSettings
}
