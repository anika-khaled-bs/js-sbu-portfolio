import React from 'react'
import { cn } from '@/utilities/ui'
import type { PageHeaderBlock as PageHeaderBlockProps } from '@/payload-types'
import { Media } from '@/components/Media'
import PageHeader from '@/components/PageHeader'

type Props = PageHeaderBlockProps & {
  className?: string
  disableInnerContainer?: boolean
}

export const PageHeaderBlock: React.FC<Props> = (props) => {
  const { className, title, description, image, richText, disableInnerContainer } = props

  // Get the image URL if it exists
  let imageUrl = undefined
  if (image && typeof image === 'object' && image.url) {
    imageUrl = image.url
  }
  return (
    <div
      className={cn(
        '',
        {
          container: !disableInnerContainer,
        },
        className,
      )}
    >
      <PageHeader
        title={title}
        description={description || undefined}
        image={imageUrl}
        richText={richText}
      />
    </div>
  )
}
