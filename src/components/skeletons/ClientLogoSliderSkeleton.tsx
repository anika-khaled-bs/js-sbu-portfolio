'use client'

import React from 'react'
import { Skeleton } from './Skeleton'

export const ClientLogoSliderSkeleton: React.FC = () => {
  return (
    <section className="py-10 bg-muted/5">
      <div className="container">
        <Skeleton className="h-8 w-64 mx-auto mb-8" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-20 w-full rounded-md" />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ClientLogoSliderSkeleton
