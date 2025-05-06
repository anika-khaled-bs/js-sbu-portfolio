import { cn } from '@/utilities/ui'
import React from 'react'

type GutterProps = {
  children: React.ReactNode
  className?: string
  left?: boolean
  right?: boolean
  leftClass?: string
  rightClass?: string
}

export const Gutter: React.FC<GutterProps> = ({
  children,
  className,
  left = true,
  right = true,
  leftClass = 'pl-4 md:pl-6 lg:pl-8',
  rightClass = 'pr-4 md:pr-6 lg:pr-8',
}) => {
  return (
    <div
      className={cn(
        {
          [leftClass]: left,
          [rightClass]: right,
        },
        className,
      )}
    >
      {children}
    </div>
  )
}
