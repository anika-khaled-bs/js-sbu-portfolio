'use client'

import React from 'react'
import { Skeleton } from './Skeleton'

interface PortfolioGridSkeletonProps {
  count?: number
}

export const PortfolioGridSkeleton: React.FC<PortfolioGridSkeletonProps> = ({ count = 6 }) => {
  return (
    <div className="container py-10">
      {/* Filter buttons */}
      <div className="mb-10 flex gap-2 justify-center flex-wrap">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-10 w-24 md:w-32 rounded-full" />
        ))}
      </div>

      {/* Portfolio grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="bg-card rounded-lg shadow-md overflow-hidden">
            {/* Project image */}
            <Skeleton className="h-52 w-full" />

            <div className="p-6">
              <Skeleton className="h-7 w-3/4 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-5/6 mb-4" />

              {/* Tech stack tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {Array.from({ length: Math.floor(Math.random() * 3) + 2 }).map((_, i) => (
                  <Skeleton key={i} className="h-5 w-16 rounded-full" />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Loading more indicator */}
      <div className="flex justify-center mt-8">
        <Skeleton className="h-4 w-48" />
      </div>
    </div>
  )
}

export default PortfolioGridSkeleton
