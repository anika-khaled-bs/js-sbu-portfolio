'use client'

import { cn } from '@/utilities/ui'
import React, { useEffect, useRef } from 'react'

import type { Props as MediaProps } from '../types'

export const VideoMedia: React.FC<MediaProps> = (props) => {
  const { onClick, resource, videoClassName } = props

  const videoRef = useRef<HTMLVideoElement>(null)
  // const [showFallback] = useState<boolean>()

  useEffect(() => {
    const { current: video } = videoRef
    if (video) {
      video.addEventListener('suspend', () => {
        // setShowFallback(true);
        // console.warn('Video was suspended, rendering fallback image.')
      })
    }
  }, [])

  if (resource && typeof resource === 'object') {
    const { url } = resource

    return (
      <video
        autoPlay={false}
        className={cn(videoClassName)}
        controls={true}
        loop
        muted
        onClick={onClick}
        playsInline
        ref={videoRef}
      >
        {/* <source src={`${getClientSideURL()}/media/${filename}`} /> */}
        <source src={`${url!}`} />
      </video>
    )
  }

  return null
}
