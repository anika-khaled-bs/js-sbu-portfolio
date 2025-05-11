'use client'

import React from 'react'
import { Skeleton } from './Skeleton'

export const ServicesSkeleton: React.FC = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <Skeleton className="h-10 w-64 mx-auto mb-4" />
          <Skeleton className="h-6 w-full md:w-2/3 lg:w-1/2 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="bg-card rounded-lg p-6 shadow-sm flex flex-col">
              <div className="flex items-center mb-4">
                <Skeleton className="h-12 w-12 rounded-lg mr-4" />
                <Skeleton className="h-7 w-full flex-1" />
              </div>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-5/6 mb-2" />
              <Skeleton className="h-4 w-4/5 mb-6" />
              <div className="mt-auto">
                <Skeleton className="h-10 w-32" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesSkeleton
