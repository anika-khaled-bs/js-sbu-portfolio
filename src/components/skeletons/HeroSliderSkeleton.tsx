'use client'

import React from 'react'
import { Skeleton } from './Skeleton'

export const HeroSliderSkeleton: React.FC = () => {
  return (
    <div className="relative w-full h-[600px] md:h-[700px] bg-muted/20">
      {/* Background image skeleton */}
      <Skeleton className="absolute inset-0 z-0" />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 z-[1]"></div>

      {/* Content */}
      <div className="container relative z-10 h-full flex flex-col justify-center">
        <Skeleton className="h-16 w-3/4 md:w-1/2 mb-4" />
        <Skeleton className="h-8 w-full md:w-2/3 mb-8" />
        <Skeleton className="h-12 w-36 rounded-md" />

        {/* Navigation dots */}
        <div className="absolute bottom-[5%] top-auto left-0 right-0 z-20 flex justify-center">
          <div className="flex gap-2">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="w-2.5 h-2.5 rounded-full" />
            ))}
          </div>
        </div>

        {/* Navigation arrows */}
        <Skeleton className="absolute left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full" />
        <Skeleton className="absolute right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full" />
      </div>
    </div>
  )
}

export default HeroSliderSkeleton
