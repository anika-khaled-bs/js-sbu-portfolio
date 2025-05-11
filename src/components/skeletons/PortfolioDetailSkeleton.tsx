'use client'

import React from 'react'
import { Skeleton } from './Skeleton'

export const PortfolioDetailSkeleton: React.FC = () => {
  return (
    <div className="mt-16">
      {/* Page header with image */}
      <div className="relative h-[300px] md:h-[400px] bg-muted/20">
        <Skeleton className="absolute inset-0 z-0" />
        <div className="absolute inset-0 bg-black/50 z-1"></div>

        <div className="container relative z-10 h-full flex flex-col justify-center items-center text-center">
          <Skeleton className="h-12 md:h-16 w-3/4 md:w-1/2 mb-4" />
          <Skeleton className="h-6 w-full md:w-2/3 max-w-2xl" />
        </div>
      </div>

      <div className="container my-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Sidebar / Info */}
          <div className="space-y-8">
            <div className="p-6 bg-card rounded-lg shadow-sm">
              <Skeleton className="h-8 w-40 mb-4" />

              {/* Client info */}
              <div className="mb-6">
                <Skeleton className="h-5 w-24 mb-2" />
                <Skeleton className="h-6 w-40" />
              </div>

              {/* Completion date */}
              <div className="mb-6">
                <Skeleton className="h-5 w-36 mb-2" />
                <Skeleton className="h-6 w-32" />
              </div>

              {/* Project URL */}
              <div className="mb-6">
                <Skeleton className="h-5 w-28 mb-2" />
                <Skeleton className="h-6 w-48" />
              </div>

              {/* Tech stack */}
              <div>
                <Skeleton className="h-5 w-28 mb-4" />
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <Skeleton key={i} className="h-8 w-20 rounded-md" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="lg:col-span-2">
            <Skeleton className="h-8 w-72 mb-6" />
            <div className="space-y-4 mb-10">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-5/6" />
              <Skeleton className="h-5 w-full" />
            </div>

            <Skeleton className="h-8 w-64 my-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="p-5 border border-border rounded-lg">
                  <Skeleton className="h-7 w-40 mb-3" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              ))}
            </div>

            <Skeleton className="h-[300px] w-full rounded-lg mb-10" />

            <div className="space-y-4 mb-8">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-4/5" />
            </div>
          </div>
        </div>

        {/* Related projects */}
        <hr className="mt-16" />
        <Skeleton className="h-10 w-72 my-10" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-card rounded-lg shadow-md overflow-hidden">
              <Skeleton className="h-48 w-full" />
              <div className="p-5">
                <Skeleton className="h-6 w-3/4 mb-3" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PortfolioDetailSkeleton
