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
          <div className="relative p-6 rounded-xl bg-background/60 backdrop-blur-sm border border-border shadow-md dark:bg-background/30 dark:backdrop-blur-md">
            <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-50 pointer-events-none rounded-xl dark:from-primary/10"></div>
            <div className="flex flex-wrap justify-center gap-8 relative z-10">
              {clientTestimonials?.map((client) => (
                <div
                  className="w-5/12 md:w-[30%] lg:w-[15%] flex justify-center relative"
                  key={client.id}
                >
                  <div className="bg-card/80 p-4 rounded-lg border border-border shadow-sm hover:shadow transition-all w-full flex items-center justify-center">
                    <ClientLogo name={client?.clientCompany!} logo={client.clientLogo as Media} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ClientLogoSlider
