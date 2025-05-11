import { Media, Portfolio } from '@/payload-types'
import PageHeader from '@/components/PageHeader'
import Info from './Info'
import MainContent from './Maincontent'

interface PortfolioDetailsProps {
  portfolio: Portfolio
}

const PortfolioDetailsComponent = async ({ portfolio }: PortfolioDetailsProps) => {
  console.log('🚀 ~ PortfolioDetailsComponent ~ portfolio:', portfolio)

  return (
    <div className="mt-16">
      <PageHeader
        title={portfolio.title}
        description={portfolio.shortDescription!}
        image={(portfolio.featuredImage! as Media).url!}
      />
      <div className="container my-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <Info portfolio={portfolio} />
          <MainContent portfolio={portfolio} />
        </div>
      </div>
    </div>
  )
}

export default PortfolioDetailsComponent
