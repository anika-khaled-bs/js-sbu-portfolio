// import PageTemplate, { generateMetadata } from './[slug]/page'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import HeroSlider from '@/components/Home/HeroSliders'
import '@/components/Home/HeroSliders/index.scss'
import ClientLogoSlider from '@/components/TrustedBySection'
import FeaturedWorks from '@/components/Home/FeaturedProjects'
import FeaturedServices from '@/components/Home/ServicesSection'
import AboutUsHomeComponent from '@/components/Home/AboutUsSection'

// export default PageTemplate

// export { generateMetadata }

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const heroBannerSliders = await payload.find({
    collection: 'hero-sliders',
    depth: 1,
    limit: 12,
    overrideAccess: false,
  })

  const clientTestimonials = await payload.find({
    collection: 'testimonials',
    depth: 2, // Increase depth to properly resolve media relations
    limit: 6,
    select: {
      clientCompany: true,
      clientLogo: true, // Include clientLogo in the selection
    },
    where: {
      clientLogo: {
        not_equals: null, // Only fetch testimonials with logos
      },
      featured: {
        equals: true, // Only fetch featured testimonials
      },
    },
  })

  const featuredProjects = await payload.find({
    collection: 'portfolio',
    depth: 1,
    limit: 3,
    where: {
      isFeatured: {
        equals: true, // Only fetch featured testimonials
      },
    },
  })

  const services = await payload.find({
    collection: 'services',
    depth: 1,
    limit: 12,
  })

  const aboutUs = await payload.find({
    collection: 'pages',
    depth: 1,
    limit: 1,
    where: {
      type: {
        equals: 'about',
      },
    },
  })

  return (
    <div>
      <HeroSlider sliders={heroBannerSliders.docs} />
      <ClientLogoSlider clientTestimonials={clientTestimonials?.docs!} />
      <FeaturedServices services={services.docs} />
      <FeaturedWorks featuredProjects={featuredProjects.docs} />
      <AboutUsHomeComponent aboutUs={aboutUs.docs[0]!} />
    </div>
  )
}
