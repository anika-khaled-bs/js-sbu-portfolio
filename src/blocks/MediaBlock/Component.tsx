'use client'

import React, { useState } from 'react'
import type { StaticImageData } from 'next/image'
import type { MediaBlock as MediaBlockProps } from '@/payload-types'
import {
  SerializedEditorState,
  SerializedLexicalNode,
  SerializedParagraphNode,
  SerializedTextNode,
} from '@payloadcms/richtext-lexical/lexical'

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
  content?: SerializedEditorState | null | undefined
}

// Helper function to check if rich text content has actual content
const hasRichTextContent = (content: SerializedEditorState | null | undefined): boolean => {
  if (!content || !content.root || !Array.isArray(content.root.children)) {
    return false
  }

  // Check if there's at least one child with text content
  return content.root.children.some((child: SerializedLexicalNode) => {
    // For paragraphs, check for text content
    if (child.type === 'paragraph') {
      const paragraphNode = child as SerializedParagraphNode
      if (Array.isArray(paragraphNode.children)) {
        return paragraphNode.children.some((textNode: SerializedLexicalNode) => {
          if (textNode.type === 'text') {
            const typedTextNode = textNode as SerializedTextNode
            return typeof typedTextNode.text === 'string' && typedTextNode.text.trim() !== ''
          }
          return false
        })
      }
    }

    // Other block level elements that might contain content
    return child.type !== 'paragraph'
  })
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

  const [videoActive, setVideoActive] = useState(false)

  let caption
  if (media && typeof media === 'object') caption = media.caption

  // Check if the media is a video
  const isVideo = typeof media === 'object' && media?.mimeType?.includes('video')

  // Fix URL for videos - replace 'image' with 'video' in the URL path
  if (isVideo && media && typeof media === 'object' && media.url) {
    media.url = media.url.replace('/image/upload/', '/video/upload/')
  }

  // Check content to determine display style
  const hasTitle = !!title
  const hasContent = hasRichTextContent(content)
  const hasBoth = hasTitle && hasContent
  const hasSingleElement = (hasTitle || hasContent) && !hasBoth

  // Handler for video activation
  const handleMediaClick = () => {
    if (isVideo) {
      setVideoActive(true)
    }
  }

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
        {hasBoth && !isVideo ? (
          // If we have both title and content, use a two-column layout on larger screens (for images only)
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {(media || staticImage) && (
              <div
                className={cn(index % 2 === 0 ? 'md:order-2' : 'md:order-1')}
                onClick={handleMediaClick}
              >
                <Media
                  imgClassName={cn(
                    'border border-border rounded-xl shadow-md w-full h-auto',
                    imgClassName,
                  )}
                  videoClassName={cn('w-full h-auto rounded-xl', imgClassName)}
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
        ) : isVideo ? (
          // For videos, render video with title and content below
          <div className="w-full">
            <div className="relative">
              <Media
                imgClassName={cn('w-full h-auto rounded-xl', imgClassName)}
                videoClassName={cn('w-full h-auto rounded-xl', imgClassName)}
                resource={media}
                src={staticImage}
              />
              {!videoActive && (
                <div
                  className="absolute inset-0 bg-black/30 rounded-xl flex items-center justify-center cursor-pointer"
                  onClick={handleMediaClick}
                >
                  <div className="w-16 h-16 rounded-full bg-primary/80 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-8 h-8 text-white ml-1"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
            {/* Title and content after video */}
            {(hasTitle || hasContent) && (
              <div className="mt-6 max-w-3xl">
                {hasTitle && <h2 className="text-2xl md:text-3xl font-bold mb-4">{title}</h2>}
                {hasContent && (
                  <div className="prose max-w-none">
                    <RichText data={content} enableGutter={false} />
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          // If we have only image or media with just title or just content
          <div className="relative w-full">
            {(media || staticImage) && (
              <div className="w-full">
                {/* Full width media */}
                <div className="relative cursor-pointer" onClick={handleMediaClick}>
                  <Media
                    imgClassName={cn('w-full h-auto rounded-xl', imgClassName)}
                    videoClassName={cn('w-full h-auto rounded-xl', imgClassName)}
                    resource={media}
                    src={staticImage}
                  />

                  {/* Overlay for ONLY title or ONLY content (not both) - only for images */}
                  {hasSingleElement && !isVideo && (
                    <div className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center transition-opacity duration-300">
                      <div className="p-6 md:p-10 max-w-3xl text-center text-white">
                        {hasTitle && (
                          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                            {title}
                          </h2>
                        )}
                        {hasContent && (
                          <div className="prose prose-invert max-w-none">
                            <RichText data={content} enableGutter={false} />
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
