import { Category, Media, Portfolio, Service } from '@/payload-types'
import { Card } from '@/components/Card'
import RichText from '@/components/RichText'
import { Button } from '@/components/Button'

interface FeaturedWorksProps {
  featuredProjects: Portfolio[]
}

const FeaturedWorks = ({ featuredProjects }: FeaturedWorksProps) => {
  console.log('🚀 ~ FeaturedWorks ~ featuredProjects:', featuredProjects)
  return (
    <section className="section bg-muted mb-6 py-16 min-h-[50vh]">
      <div className="container">
        <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <p className="text-sm font-medium text-primary mb-2">Featured Work</p>
            <p className="text-4xl font-semibold mb-2">Recent Projects</p>
          </div>
          <Button href="/portfolio" variant="default" className="rounded-xl">
            View All Projects
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects &&
            featuredProjects.map((project) => (
              <Card
                key={project.id}
                link={`/portfolio/${project.slug}`}
                title={project.title}
                imageUrl={(project.featuredImage as Media).url!}
                otherInfo={
                  <p className="m-0 p-0 text-sm text-muted-foreground">
                    {project?.shortDescription!}
                  </p>
                  // <div className="flex flex-wrap gap-2">
                  //   {project?.relatedServices?.map((service: Service) => {
                  //     return <p className="text-muted-foreground text-xs">{service.title}</p>
                  //   })}
                  // </div>
                }
              />
            ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedWorks
