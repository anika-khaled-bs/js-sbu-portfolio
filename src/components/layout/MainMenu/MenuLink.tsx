'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/utilities/ui'
import React from 'react'

interface MenuLinkProps {
  href: string
  label: string
  className?: string
  activeClassName?: string
}

export const MenuLink: React.FC<MenuLinkProps> = ({ href, label, className, activeClassName }) => {
  const pathname = usePathname()
  const isActive = pathname === href

  return href ? (
    <Link
      href={href}
      className={cn(
        'transition-colors hover:text-primary',
        isActive ? 'text-primary font-medium' : 'text-foreground',
        className,
        isActive && activeClassName,
      )}
    >
      {label}
    </Link>
  ) : (
    <button
      className={cn(
        'transition-colors hover:text-primary',
        isActive ? 'text-primary font-medium' : 'text-foreground',
        className,
        isActive && activeClassName,
      )}
    >
      {label}
    </button>
  )
}
