import { Media, Portfolio } from '@/payload-types'
import PageHeader from '@/components/PageHeader'
import Info from './Info'
import MainContent from './Maincontent'
import { Card } from '@/components/Card'

interface PortfolioDetailsProps {
  portfolio: Portfolio
}

const PortfolioDetailsComponent = async ({ portfolio }: PortfolioDetailsProps) => {
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
        {portfolio.relatedProjects && (
          <>
            <hr className="mt-16" />
            <h2 className="text-3xl font-bold my-10">Explore More of Our Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {(portfolio.relatedProjects as Portfolio[])?.map((project) => (
                <Card
                  key={project.id}
                  link={`/portfolio/${project.slug}`}
                  title={project.title}
                  imageUrl={(project.featuredImage as Media).url!}
                  otherInfo={
                    <p className="m-0 p-0 text-sm text-muted-foreground">
                      {project?.shortDescription!}
                    </p>
                  }
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default PortfolioDetailsComponent
