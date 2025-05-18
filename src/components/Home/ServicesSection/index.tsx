import RichText from '@/components/RichText'
import { Media, Service } from '@/payload-types'
import { ServiceCard } from './ServiceCard'

interface ServiceProps {
  services: Partial<Service>[]
  className?: string
}

const FeaturedServices = ({ services }: ServiceProps) => {
  return (
    <>
      <section className="section py-16 mb-6">
        <div className="container">
          {/* <div className="mb-12 text-center max-w-2xl mx-auto">
            <p className="text-sm font-medium text-primary mb-2">What We Offer</p>
            <p className="text-4xl mb-3 font-semibold">Our Services</p>
            <p className="text-muted-foreground">
              We provide end-to-end digital solutions to help your business thrive in the digital
              landscape.
            </p>
          </div> */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                title={service.title!}
                description={service.shortDescription!}
                icon={service.icon as Media}
                slug={service.slug!}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default FeaturedServices
