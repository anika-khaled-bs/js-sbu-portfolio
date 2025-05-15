'use client'

import { Loader2 } from 'lucide-react'
import { cn } from '@/utilities/ui'

interface LoadingIndicatorProps {
  message?: string
  fullHeight?: boolean
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function LoadingIndicator({ 
  message = 'Loading...', 
  fullHeight = true, 
  className,
  size = 'md'
}: LoadingIndicatorProps) {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-12 w-12',
    lg: 'h-16 w-16'
  }

  return (
    <div className={cn(
      'w-full flex justify-center items-center', 
      fullHeight ? 'min-h-[60vh]' : 'py-8',
      className
    )}>
      <div className="flex flex-col items-center gap-4">
        <Loader2 className={cn('animate-spin text-primary', sizeClasses[size])} />
        {message && (
          <p className="text-lg font-medium text-foreground">{message}</p>
        )}
      </div>
    </div>
  )
}