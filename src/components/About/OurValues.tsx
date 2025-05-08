import { About, Media } from '@/payload-types'
import Image from 'next/image'

interface AboutUsProps {
  aboutUs: Partial<About>
  className?: string
}

const OurValues = ({ aboutUs }: AboutUsProps) => {
  return (
    <section className="section bg-muted mt-16">
      <div className="container py-16">
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <p className="font-medium text-primary mb-2">Our Values</p>
          <p className="mb-4 text-4xl font-semibold">What Drives Us</p>
          <p className="text-muted-foreground">
            Our core values shape everything we do, from how we collaborate with clients to how we
            approach every project.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {aboutUs?.values?.map((value) => {
            return (
              <div className="bg-card border rounded-lg p-6 text-center" key={value.id}>
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Image
                    src={(value.icon as Media).url!}
                    alt={(value.icon as Media).alt!}
                    height={100}
                    width={100}
                  />
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default OurValues
