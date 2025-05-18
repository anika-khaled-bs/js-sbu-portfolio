import React, { Fragment } from 'react'

import type { Props } from './types'

import { ImageMedia } from './ImageMedia'
import { VideoMedia } from './VideoMedia'

export const Media: React.FC<Props> = (props) => {
  const { className, htmlElement = 'div', resource } = props

  // Check if the media is a video
  const isVideo = typeof resource === 'object' && resource?.mimeType?.includes('video')

  // Fix URL for videos - replace 'image' with 'video' in the URL path
  if (isVideo && resource && typeof resource === 'object' && resource.url) {
    resource.url = resource.url.replace('/image/upload/', '/video/upload/')
  }

  const Tag = htmlElement || Fragment

  return (
    <Tag
      {...(htmlElement !== null
        ? {
            className,
          }
        : {})}
    >
      {isVideo ? <VideoMedia {...props} /> : <ImageMedia {...props} />}
    </Tag>
  )
}
