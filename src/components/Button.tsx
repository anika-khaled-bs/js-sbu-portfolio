'use client'

import React from 'react'
import Link from 'next/link'
import {
  Button as BaseButton,
  ButtonProps as BaseButtonProps,
  buttonVariants,
} from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import { LucideIcon } from 'lucide-react'

export interface ButtonProps extends Omit<BaseButtonProps, 'asChild'> {
  href?: string
  icon?: LucideIcon
  iconPosition?: 'left' | 'right'
  isExternal?: boolean
  fullWidth?: boolean
}

/**
 * Centralized Button component for the application
 * Extends the base Button component with additional functionality
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'default',
  size = 'default',
  href,
  icon: Icon,
  iconPosition = 'left',
  isExternal = false,
  fullWidth = false,
  disabled,
  ...props
}) => {
  // Add custom styles without modifying the buttonVariants
  const classes = cn(
    buttonVariants({ variant, size, className }),
    fullWidth && 'w-full',
    Icon && 'flex items-center gap-2',
  )

  const content = (
    <>
      {Icon && iconPosition === 'left' && <Icon size={size === 'sm' ? 16 : 20} />}
      {children}
      {Icon && iconPosition === 'right' && <Icon size={size === 'sm' ? 16 : 20} />}
    </>
  )

  // If href is provided, render as a link
  if (href) {
    const linkProps = isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {}

    return (
      <Link
        href={href}
        className={cn(classes, disabled && 'pointer-events-none opacity-50')}
        {...linkProps}
      >
        {content}
      </Link>
    )
  }

  // Otherwise render as a button
  return (
    <BaseButton className={classes} disabled={disabled} {...props}>
      {content}
    </BaseButton>
  )
}
