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
      <section className="section bg-muted py-16 min-h-[50vh]">
        <div className="container">
          <div className="mb-12 text-center">
            <p className="text-sm font-medium text-primary mb-2">Trusted By</p>
            <p className="text-4xl font-semibold">Industry Leaders</p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {clientTestimonials?.docs?.map((client) => (
              <div className="w-5/12 md:w-[30%] lg:w-[15%] flex justify-center" key={client.id}>
                <ClientLogo
                  name={client?.clientCompany!}
                  logo={(client.clientLogo as Media).url!}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default ClientLogoSlider
