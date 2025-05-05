import clsx from 'clsx'
import React from 'react'
import Image from 'next/image'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
  src?: string
  alt?: string
  width?: number
  height?: number
  decoding?: 'async' | 'sync' | 'auto'
  fetchPriority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const {
    loading: loadingFromProps,
    priority: priorityFromProps,
    className,
    alt = 'Aura Studio',
    src = '/media/js-sbu-logo.png',
    width = 193,
    height = 34,
  } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx('max-w-[9.375rem] w-full h-[34px]', className)}
      src={src}
    />
  )
}
