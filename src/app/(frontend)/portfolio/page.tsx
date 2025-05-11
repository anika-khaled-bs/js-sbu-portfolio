import { getPayload } from 'payload'
import configPromise from '@payload-config'
import PageHeader from '@/components/PageHeader'
import PortfolioList from '@/components/Portfolio/List'
import { Suspense } from 'react'
import { PortfolioGridSkeleton } from '@/components/skeletons'

export const dynamic = 'force-dynamic' // Force dynamic rendering to get fresh data

const PortfolioPage = async () => {
  const payload = await getPayload({ config: configPromise })

  const projects = await payload.find({
    collection: 'portfolio',
    depth: 1,
    limit: 3, // Using a higher limit for initial load
    page: 1,
  })

  const services = await payload.find({
    collection: 'services',
    limit: 100, // Fetch all services for filtering
  })

  return (
    <div className="mt-16">
      <PageHeader
        title="Our Portfolio"
        description="Explore our collection of successful projects that showcase our expertise in creating impactful digital solutions."
      />
      <Suspense fallback={<PortfolioGridSkeleton />}>
        <PortfolioList initialData={projects} services={services?.docs!} />
      </Suspense>
    </div>
  )
}

export default PortfolioPage
