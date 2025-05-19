import { getPayload } from 'payload'
import configPromise from '@payload-config'
import PageHeader from '@/components/PageHeader'
import PortfolioList from '@/components/Portfolio/List'
import { cache, Suspense } from 'react'

const PortfolioPage = async () => {
  const payload = await getPayload({ config: configPromise })

  const projects = await queryProjects()
  const services = await queryServices()

  return (
    <Suspense
      fallback={
        <div className="flex justify-center mt-8">
          <p className="text-muted-foreground">Loading details...</p>
        </div>
      }
    >
      <div className="mt-16">
        <PageHeader
          title="Our Portfolio"
          description="Explore our collection of successful projects that showcase our expertise in creating impactful digital solutions."
        />
        <PortfolioList initialData={projects!} services={services!} />
      </div>
    </Suspense>
  )
}

export default PortfolioPage

const queryProjects = cache(async () => {
  const payload = await getPayload({ config: configPromise })

  const projects = await payload.find({
    collection: 'portfolio',
    overrideAccess: false,
    depth: 1,
    limit: 3, // Using a higher limit for initial load
    page: 1,
  })

  return projects || null
})

const queryServices = cache(async () => {
  const payload = await getPayload({ config: configPromise })

  const services = await payload.find({
    collection: 'services',
    overrideAccess: false,
    limit: 100, // Fetch all services for filtering
  })

  return services.docs || null
})
