'use client'

import Link from 'next/link'
import { useNavigationLoading } from '@/providers/NavigationLoading'
import { ComponentProps } from 'react'

type LoadingLinkProps = ComponentProps<typeof Link> & {
  loadingDelay?: number // Delay in ms before showing loading state
}

export function LoadingLink({
  children,
  onClick,
  loadingDelay = 300, // Small delay to avoid flashing for fast page loads
  ...props
}: LoadingLinkProps) {
  const { setIsNavigating } = useNavigationLoading()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Set timeout to avoid flashing loading state for fast navigations
    const timer = setTimeout(() => {
      setIsNavigating(true)
    }, loadingDelay)

    // Allow original onClick to run if provided
    if (onClick) {
      onClick(e)
    }

    // Clear timeout if component unmounts before delay
    return () => clearTimeout(timer)
  }

  return (
    <Link onClick={handleClick} {...props}>
      {children}
    </Link>
  )
}
