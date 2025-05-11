'use client'

import React from 'react'
import { Skeleton } from './Skeleton'

export const AboutUsSkeleton: React.FC = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <Skeleton className="h-10 w-64 mx-auto mb-4" />
          <Skeleton className="h-6 w-full md:w-2/3 lg:w-1/2 mx-auto" />
        </div>

        <div className="space-y-16">
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Image placeholder on alternating sides */}
              <div className={index % 2 === 0 ? 'order-1 md:order-1' : 'order-1 md:order-2'}>
                <Skeleton className="h-64 md:h-80 w-full rounded-xl shadow-md" />
              </div>

              <div className={index % 2 === 0 ? 'order-2 md:order-2' : 'order-2 md:order-1'}>
                <Skeleton className="h-8 w-3/4 mb-6" />
                <Skeleton className="h-5 w-full mb-3" />
                <Skeleton className="h-5 w-full mb-3" />
                <Skeleton className="h-5 w-full mb-3" />
                <Skeleton className="h-5 w-4/5 mb-6" />

                <Skeleton className="h-10 w-32 mt-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AboutUsSkeleton
