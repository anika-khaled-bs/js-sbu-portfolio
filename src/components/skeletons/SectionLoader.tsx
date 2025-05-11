'use client'

import React from 'react'
import { Loader2 } from 'lucide-react'

interface SectionLoaderProps {
  height?: string
  text?: string
  className?: string
}

export const SectionLoader: React.FC<SectionLoaderProps> = ({
  height = 'h-[400px]',
  text = 'Loading content...',
  className = '',
}) => (
  <div
    className={`${height} ${className} w-full flex flex-col items-center justify-center bg-background/60 backdrop-blur-sm`}
  >
    <Loader2 className="h-10 w-10 animate-spin text-primary mb-2" />
    <p className="text-sm text-muted-foreground">{text}</p>
  </div>
)

export default SectionLoader
