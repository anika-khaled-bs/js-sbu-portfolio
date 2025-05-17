import { ContactDetail } from '@/payload-types'
import { cn } from '@/utilities/ui'

import { Mail, MapPin, Phone } from 'lucide-react'

interface ContactInfoProps {
  contactInfo: ContactDetail | null
  className?: string
}

const ContactInfoComponent = ({ contactInfo, className }: ContactInfoProps) => {
  const { email, phone, time, addressLine1, addressLine2 } = contactInfo || {}

  return (
    <>
      {email && (
        <div className={cn('bg-card p-6 rounded-lg text-center border', className)}>
          <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail size={24} />
          </div>
          <h3 className="text-xl font-semibold mb-2">Email Us</h3>
          <p className="text-muted-foreground mb-2">For general inquiries:</p>
          <a href="mailto:info@aurastudio.com" className="text-primary hover:underline">
            {email}
          </a>
        </div>
      )}
      {phone && (
        <div className={cn('bg-card p-6 rounded-lg text-center border', className)}>
          <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Phone size={24} />
          </div>
          <h3 className="text-xl font-semibold mb-2">Call Us</h3>
          <p className="text-muted-foreground mb-2">{time}</p>
          <a href="tel:+11234567890" className="text-primary hover:underline">
            {phone}
          </a>
        </div>
      )}
      {(addressLine1 || addressLine2) && (
        <div className={cn('bg-card p-6 rounded-lg text-center border', className)}>
          <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin size={24} />
          </div>
          <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
          <p className="text-muted-foreground mb-0">{addressLine1 ?? addressLine2}</p>
        </div>
      )}
    </>
  )
}

export default ContactInfoComponent
