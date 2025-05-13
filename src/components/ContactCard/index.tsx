'use client'
import { cn } from '@/utilities/ui'
import React from 'react'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

import type { ContactDetail } from '@/payload-types'
import ContactInfoComponent from '../ContactUs/ContactInfo'

export type ContactCardProps = {
  className?: string
  doc?: ContactDetail
  displayType?: 'grid' | 'slider' | 'feature' | 'card' | 'list'
}

export const ContactCard: React.FC<ContactCardProps> = (props) => {
  const { className, doc, displayType = 'grid' } = props

  const getCardStyle = () => {
    switch (displayType) {
      case 'feature':
        return 'flex flex-col lg:flex-row border border-border rounded-lg overflow-hidden bg-card'
      case 'list':
        return 'flex flex-row border border-border rounded-lg overflow-hidden bg-card'
      case 'slider':
        return 'flex flex-col h-full border border-border rounded-lg overflow-hidden bg-card'
      case 'grid':
        return 'grid grid-cols-1 md:grid-cols-3 gap-8 mb-16'
      case 'card':
      default:
        return 'border border-border rounded-lg overflow-hidden bg-card'
    }
  }

  return (
    // <article className={cn(getCardStyle(), className, 'container')}>
    <ContactInfoComponent contactInfo={doc!} className={className} />
    // </article>
  )
}
