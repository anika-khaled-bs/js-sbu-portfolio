import { About, Media, Testimonial } from '@/payload-types'
import Link from 'next/link'
import { PaginatedDocs } from 'payload'

interface AboutUsProps {
  aboutUs: Partial<About>
  className?: string
}

const AboutUsComponent = ({ aboutUs }: AboutUsProps) => {
  return (
    <>
      <section className="section mb-6 py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
                alt="About Aura Digital Studio"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-primary mb-2">About Us</p>
              <h2 className="mb-6">Transforming Ideas into Digital Reality</h2>
              <p className="text-muted-foreground mb-6">
                Aura Digital Studio is a forward-thinking tech team passionate about crafting
                innovative digital experiences. With expertise spanning web development, mobile
                applications, design, and marketing, we work closely with our clients to transform
                their visions into impactful digital solutions.
              </p>
              <p className="text-muted-foreground mb-6">
                Since our founding in 2018, we've helped businesses of all sizes elevate their
                digital presence and achieve their goals through strategic thinking and technical
                excellence.
              </p>
              <Link href="/about" className="btn btn-primary">
                Learn More About Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default AboutUsComponent
