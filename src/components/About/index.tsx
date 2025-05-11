import { getPayload, RequiredDataFromCollectionSlug } from 'payload'

import { Team, Testimonial } from '@/payload-types'
import configPromise from '@payload-config'

import PageHeader from '../PageHeader'
import ClientLogoSlider from '../TrustedBySection'
import Introduction from './Introduction'
import OurValues from './OurValues'
import TeamComponent from './Team'
import ContactCTA from '../ContactCTA'

interface AboutUsProps {
  aboutUs: RequiredDataFromCollectionSlug<'pages'> | null
}

const AboutUsComponent = async ({ aboutUs }: AboutUsProps) => {
  const payload = await getPayload({ config: configPromise })

  const ourValues = await payload.find({
    collection: 'values',
    depth: 1,
    limit: 12,
  })

  const team = await payload.find({
    collection: 'team',
    depth: 1,
    where: {
      isFeatured: {
        equals: true, // Only fetch featured testimonials
      },
    },
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

  return (
    <>
      <PageHeader title="Our Story" />
      <Introduction aboutUs={aboutUs} />

      <OurValues values={ourValues.docs} />
      <TeamComponent team={team.docs as Team[]} />
      <ClientLogoSlider
        clientTestimonials={clientTestimonials.docs as Testimonial[]}
        title="Our Clients"
        subTitle="Trusted by Leading Companies"
      />
      <ContactCTA />
    </>
  )
}

export default AboutUsComponent
