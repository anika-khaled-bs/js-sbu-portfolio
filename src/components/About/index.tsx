import { About, Testimonial } from '@/payload-types'
import PageHeader from '../PageHeader'
import Introduction from './Introduction'
import OurValues from './OurValues'
import ClientLogoSlider from '../TrustedBySection'

interface AboutUsProps {
  aboutUs: About
}

const AboutUsComponent = ({ aboutUs }: AboutUsProps) => {
  return (
    <>
      <PageHeader title="Our Story" />
      <div className="container">
        <Introduction aboutUs={aboutUs} />
      </div>
      <OurValues aboutUs={aboutUs} />
      <ClientLogoSlider clientTestimonials={aboutUs.featuredTestimonials! as Testimonial[]} />
    </>
  )
}

export default AboutUsComponent
