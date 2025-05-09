import { About, Media, Team, Testimonial } from '@/payload-types'
import PageHeader from '../PageHeader'
import Introduction from './Introduction'
import OurValues from './OurValues'
import ClientLogoSlider from '../TrustedBySection'
import TeamComponent from './Team'
import MissionVisionComponent from './MissionVision'

interface AboutUsProps {
  aboutUs: About
}

const AboutUsComponent = ({ aboutUs }: AboutUsProps) => {
  return (
    <>
      <PageHeader title="Our Story" />
      <Introduction aboutUs={aboutUs} />
      <MissionVisionComponent aboutUs={aboutUs} />
      <OurValues aboutUs={aboutUs} />
      <TeamComponent team={aboutUs?.featuredTeamMembers! as Team[]} />
      <ClientLogoSlider
        clientTestimonials={aboutUs.featuredTestimonials! as Testimonial[]}
        title="Our Clients"
        subTitle="Trusted by Leading Companies"
      />
    </>
  )
}

export default AboutUsComponent
