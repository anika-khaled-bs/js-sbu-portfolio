'use client'

import React from 'react'
import type { StaticImageData } from 'next/image'
import type { MediaBlock as MediaBlockProps } from '@/payload-types'

import { cn } from '@/utilities/ui'
import RichText from '@/components/RichText'
import { Media } from '../../components/Media'

type Props = MediaBlockProps & {
  breakout?: boolean
  captionClassName?: string
  className?: string
  enableGutter?: boolean
  imgClassName?: string
  staticImage?: StaticImageData
  disableInnerContainer?: boolean
  index?: number // for alternating layout
  title?: string | null | undefined
  content?: string | null | undefined
}

export const MediaBlock: React.FC<any> = (props) => {
  const {
    captionClassName,
    className,
    enableGutter = true,
    imgClassName,
    media,
    staticImage,
    disableInnerContainer,
    index = 1,
    title,
    content,
  } = props

  let caption
  if (media && typeof media === 'object') caption = media.caption

  return (
    <div
      className={cn(
        'px-4 md:px-10',
        {
          container: enableGutter,
        },
        className,
      )}
    >
      <div className="mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {(media || staticImage) && (
            <div className={cn(index % 2 === 0 ? 'md:order-2' : 'md:order-1')}>
              <Media
                imgClassName={cn('border border-border rounded-xl shadow-md w-full', imgClassName)}
                resource={media}
                src={staticImage}
              />
            </div>
          )}
          <div className={cn(index % 2 === 0 ? 'md:order-1' : 'md:order-2')}>
            {title && <h3 className="text-primary mb-2">{title}</h3>}
            {content && <RichText data={content} enableGutter={false} />}
          </div>
        </div>
      </div>
    </div>
  )
}
