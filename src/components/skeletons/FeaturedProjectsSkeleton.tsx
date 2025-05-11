'use client'

import React from 'react'
import { Skeleton } from './Skeleton'

export const FeaturedProjectsSkeleton: React.FC = () => {
  return (
    <section className="py-16 bg-muted/10">
      <div className="container">
        <div className="text-center mb-12">
          <Skeleton className="h-10 w-72 mx-auto mb-4" />
          <Skeleton className="h-6 w-full md:w-2/3 lg:w-1/2 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="bg-background rounded-lg shadow-md overflow-hidden">
              {/* Image placeholder */}
              <Skeleton className="h-48 w-full" />

              <div className="p-6">
                <Skeleton className="h-7 w-3/4 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6 mb-2" />
                <Skeleton className="h-4 w-4/5 mb-4" />

                <div className="flex flex-wrap gap-2 mt-4 mb-6">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-6 w-16 rounded-full" />
                  ))}
                </div>

                <Skeleton className="h-10 w-32 mt-4" />
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <Skeleton className="h-12 w-36" />
        </div>
      </div>
    </section>
  )
}

export default FeaturedProjectsSkeleton
