'use client'

import React from 'react'
import { Loader2 } from 'lucide-react'

export const FullPageLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-12 w-12 rounded-full border-t-2 border-primary animate-spin"></div>
          </div>
          <Loader2 className="h-16 w-16 animate-spin text-primary" />
        </div>
        <p className="text-lg font-medium text-foreground">Loading your experience...</p>
      </div>
    </div>
  )
}

export default FullPageLoader
