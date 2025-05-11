import RichText from '@/components/RichText'
import { Portfolio, Testimonial } from '@/payload-types'
import ClientTestimonial from './Testimonial'

interface PortfolioDetailsProps {
  portfolio: Portfolio
}

const MainContent = ({ portfolio }: PortfolioDetailsProps) => {
  return (
    <div className="lg:col-span-2 order-1 lg:order-2">
      {/* Challenge */}
      <div className="mb-12">
        <RichText data={portfolio?.content!} />
      </div>

      {/* Testimonial (if available) */}
      {portfolio.client && (
        <ClientTestimonial testimonialContent={portfolio.client! as Testimonial} />
      )}
    </div>
  )
}

export default MainContent
