// import PageTemplate, { generateMetadata } from './[slug]/page'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import HeroSlider from '@/components/Home/HeroSliders'
import '@/components/Home/HeroSliders/index.scss'
import ClientLogoSlider from '@/components/TrustedBySection'
import FeaturedWorks from '@/components/Home/FeaturedProjects'
import FeaturedServices from '@/components/Home/ServicesSection'
import AboutUsComponent from '@/components/Home/AboutUsSection'
import { Suspense } from 'react'
import ContactCTA from '@/components/ContactCTA'
import {
  HeroSliderSkeleton,
  ClientLogoSliderSkeleton,
  ServicesSkeleton,
  FeaturedProjectsSkeleton,
  AboutUsSkeleton,
  ContactCTASkeleton,
} from '@/components/skeletons'

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
      <Suspense fallback={<HeroSliderSkeleton />}>
        <HeroSlider sliders={heroBannerSliders.docs} />
      </Suspense>

      <Suspense fallback={<ClientLogoSliderSkeleton />}>
        <ClientLogoSlider clientTestimonials={clientTestimonials.docs} />
      </Suspense>

      <Suspense fallback={<ServicesSkeleton />}>
        <FeaturedServices services={services.docs} />
      </Suspense>

      <Suspense fallback={<FeaturedProjectsSkeleton />}>
        <FeaturedWorks featuredProjects={featuredProjects.docs} />
      </Suspense>

      <Suspense fallback={<AboutUsSkeleton />}>
        <AboutUsComponent aboutUs={aboutUs.docs[0]!} />
      </Suspense>

      <Suspense fallback={<ContactCTASkeleton />}>
        <ContactCTA />
      </Suspense>
    </div>
  )
}
