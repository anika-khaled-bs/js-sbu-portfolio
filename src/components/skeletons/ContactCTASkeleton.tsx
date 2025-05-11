'use client'

import React from 'react'
import { Skeleton } from './Skeleton'

export const ContactCTASkeleton: React.FC = () => {
  return (
    <section className="py-16 bg-primary/10">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <Skeleton className="h-10 w-64 mx-auto mb-6" />
          <Skeleton className="h-5 w-full mb-2" />
          <Skeleton className="h-5 w-5/6 mx-auto mb-2" />
          <Skeleton className="h-5 w-4/5 mx-auto mb-8" />

          <div className="flex justify-center gap-4">
            <Skeleton className="h-12 w-36" />
            <Skeleton className="h-12 w-36" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactCTASkeleton
