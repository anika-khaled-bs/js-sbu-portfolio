// import PageTemplate, { generateMetadata } from './[slug]/page'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import HeroSlider from '@/components/Home/HeroSliders'
import '@/components/Home/HeroSliders/index.scss'
import ClientLogoSlider from '@/components/Home/TrustedBySection'
import FeaturedWorks from '@/components/Home/FeaturedProjects'
import FeaturedServices from '@/components/Home/ServicesSection'
import AboutUsComponent from '@/components/Home/AboutUsSection'
import { Suspense } from 'react'
import { Loader2 } from 'lucide-react'

// export default PageTemplate

// export { generateMetadata }

// Loading component for sections
const SectionLoader = ({ height = 'h-[400px]', text = 'Loading content...' }) => (
  <div
    className={`${height} w-full flex flex-col items-center justify-center bg-background/60 backdrop-blur-sm`}
  >
    <Loader2 className="h-10 w-10 animate-spin text-primary mb-2" />
    <p className="text-muted-foreground">{text}</p>
  </div>
)

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
    collection: 'about',
    select: {
      hero: true,
      heading: true,
      subHeading: true,
    },
  })

  return (
    <div>
      <Suspense fallback={<SectionLoader height="h-[700px]" text="Loading hero content..." />}>
        <HeroSlider sliders={heroBannerSliders.docs} />
      </Suspense>

      <Suspense fallback={<SectionLoader text="Loading trusted partners..." />}>
        <ClientLogoSlider clientTestimonials={clientTestimonials} />
      </Suspense>

      <Suspense fallback={<SectionLoader text="Loading our services..." />}>
        <FeaturedServices services={services.docs} />
      </Suspense>

      <Suspense fallback={<SectionLoader text="Loading featured projects..." />}>
        <FeaturedWorks featuredProjects={featuredProjects.docs} />
      </Suspense>

      <Suspense fallback={<SectionLoader text="Loading about us section..." />}>
        <AboutUsComponent aboutUs={aboutUs.docs[0]} />
      </Suspense>
    </div>
  )
}
