/**
 * This is a temporary type definition for PageHeaderBlock
 * It will be replaced by the auto-generated payload-types.ts
 */
export interface PageHeaderBlock {
  title: string
  description?: string
  image?:
    | string
    | {
        id: string
        url: string
        filename: string
        [key: string]: any
      }
  richText?: any
  id?: string | null
  blockName?: string | null
  blockType: 'pageHeaderBlock'
}
