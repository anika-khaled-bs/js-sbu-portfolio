import { Media, Testimonial } from '@/payload-types'
import { PaginatedDocs } from 'payload'
import { ClientLogo } from './ClientLogo'

interface ClientSliderProps {
  clientTestimonials: PaginatedDocs<Partial<Testimonial>>
  className?: string
}

const ClientLogoSlider = ({ clientTestimonials }: ClientSliderProps) => {
  return (
    <>
      <section className="section bg-muted mb-6 py-16 min-h-[50vh]">
        <div className="container">
          <div className="mb-12 text-center">
            <p className="text-sm font-medium text-primary mb-2">Trusted By</p>
            <p className="text-4xl font-semibold">Industry Leaders</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {clientTestimonials?.docs?.map((client) => (
              <ClientLogo
                key={client.id}
                name={client?.clientCompany!}
                logo={(client.clientLogo as Media).url!}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default ClientLogoSlider
