'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }: any) => {
  // Determine if we need to show the overlay
  const showOverlay = richText || (Array.isArray(links) && links.length > 0)

  return (
    <div
      className="relative -mt[64px] flex items-center justify-center text-white"
      data-theme="dark"
    >
      <div className="min-h-[50vh] w-full absolute inset-0">
        {media && typeof media === 'object' && (
          <Media fill imgClassName="object-cover" priority resource={media} />
        )}
        {showOverlay && <div className="absolute inset-0 bg-black opacity-60"></div>}
      </div>

      <div className="container relative z-10 flex items-center min-h-[50vh]">
        <div className="">
          {richText && <RichText className="mb-6" data={richText} enableGutter={false} />}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="gap-4">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink {...link} />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
