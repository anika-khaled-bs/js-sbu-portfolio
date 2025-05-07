// import PageTemplate, { generateMetadata } from './[slug]/page'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import HeroSlider from '@/components/Home/HeroSliders'
import '@/components/Home/HeroSliders/index.scss'
import ClientLogoSlider from '@/components/Home/TrustedBySection'
import FeaturedServices from '@/components/Home/ServicesSection'

// export default PageTemplate

// export { generateMetadata }

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const heroBannerSliders = await payload.find({
    collection: 'hero-sliders',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    // select: {
    //   title: true,
    //   slug: true,
    //   categories: true,
    //   meta: true,
    // },
  })

  const clientTestimonials = await payload.find({
    collection: 'testimonials',
    depth: 2, // Increase depth to properly resolve media relations
    limit: 20,
    where: {
      clientLogo: {
        not_equals: null, // Only fetch testimonials with logos
      },
    },
  })

  const services = await payload.find({
    collection: 'services',
    depth: 1,
    limit: 12,
  })
  console.log('services', services)

  return (
    <div>
      <HeroSlider sliders={heroBannerSliders.docs} />
      <ClientLogoSlider clientTestimonials={clientTestimonials} />
      <FeaturedServices services={services.docs} />
    </div>
  )
}
