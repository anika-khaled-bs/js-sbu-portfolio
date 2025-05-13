'use client'
import { cn } from '@/utilities/ui'
import React from 'react'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

import type { ContactDetail } from '@/payload-types'

export type ContactCardProps = {
  className?: string
  doc?: ContactDetail
  displayType?: 'grid' | 'slider' | 'feature' | 'card' | 'list'
}

export const ContactCard: React.FC<ContactCardProps> = (props) => {
  const { className, doc, displayType = 'grid' } = props

  const { email, phone, time, addressLine1, addressLine2 } = doc || {}

  const getCardStyle = () => {
    switch (displayType) {
      case 'feature':
        return 'flex flex-col lg:flex-row border border-border rounded-lg overflow-hidden bg-card'
      case 'list':
        return 'flex flex-row border border-border rounded-lg overflow-hidden bg-card'
      case 'slider':
        return 'flex flex-col h-full border border-border rounded-lg overflow-hidden bg-card'
      case 'grid':
      case 'card':
      default:
        return 'border border-border rounded-lg overflow-hidden bg-card'
    }
  }

  const getContentStyle = () => {
    switch (displayType) {
      case 'feature':
        return 'p-6'
      case 'list':
        return 'p-4 w-full'
      default:
        return 'p-4'
    }
  }

  return (
    <article className={cn(getCardStyle(), className)}>
      <div className={getContentStyle()}>
        <h3 className="text-xl font-bold mb-4">Contact Information</h3>

        <div className="space-y-4">
          {' '}
          {email && (
            <div className="flex items-center gap-3">
              <Mail className="text-primary h-5 w-5" />
              <a href={`mailto:${email}`} className="hover:text-primary">
                {email}
              </a>
            </div>
          )}
          {phone && (
            <div className="flex items-center gap-3">
              <Phone className="text-primary h-5 w-5" />
              <a href={`tel:${phone}`} className="hover:text-primary">
                {phone}
              </a>
            </div>
          )}
          {time && (
            <div className="flex items-center gap-3">
              <Clock className="text-primary h-5 w-5" />
              <span>{time}</span>
            </div>
          )}
          {addressLine1 && (
            <div className="flex items-start gap-3">
              <MapPin className="text-primary h-5 w-5 mt-1" />
              <div>
                <p>{addressLine1}</p>
                {addressLine2 && <p>{addressLine2}</p>}
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}
