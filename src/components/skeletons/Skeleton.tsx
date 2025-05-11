import { cn } from '@/utilities/ui'
import React from 'react'

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return <div className={cn('animate-pulse rounded-md bg-muted/60', className)} {...props} />
}
