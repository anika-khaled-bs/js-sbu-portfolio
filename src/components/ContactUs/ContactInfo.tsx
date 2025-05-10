import { ContactDetail } from '@/payload-types'

import { Mail, MapPin, Phone } from 'lucide-react'

interface ContactInfoProps {
  contactInfo: ContactDetail | null
}

const ContactInfoComponent = async ({ contactInfo }: ContactInfoProps) => {
  const { email, phone, time, addressLine1, addressLine2 } = contactInfo || {}

  return (
    <section className="section">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {email && (
          <div className="bg-card p-6 rounded-lg text-center border">
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
          <div className="bg-card p-6 rounded-lg text-center border">
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
          <div className="bg-card p-6 rounded-lg text-center border">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
            <p className="text-muted-foreground mb-0">{addressLine1 ?? addressLine2}</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default ContactInfoComponent
