import { Media, Testimonial } from '@/payload-types'
import { ClientLogo } from './ClientLogo'

interface ClientSliderProps {
  clientTestimonials: Partial<Testimonial>[]
  className?: string
  title?: string
  subTitle?: string
}

const ClientLogoSlider = ({
  clientTestimonials,
  title = 'Trusted By',
  subTitle = 'Industry Leaders and Innovators',
}: ClientSliderProps) => {
  return (
    <>
      <section className="section">
        <div className="container">
          {/* <div className="mb-12 text-center">
            <p className="font-medium text-primary mb-2">{title}</p>
            <p className="text-4xl font-semibold">{subTitle}</p>
          </div> */}
          <div className="flex flex-wrap justify-center gap-8">
            {clientTestimonials?.map((client) => (
              <div className="w-5/12 md:w-[30%] lg:w-[15%] flex justify-center" key={client.id}>
                <ClientLogo name={client?.clientCompany!} logo={client.clientLogo as Media} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default ClientLogoSlider
