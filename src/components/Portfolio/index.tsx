// /components/PortfolioList.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { fetchPortfolio } from './action'
import { PaginatedDocs } from 'payload'
import { Media, Portfolio, Service } from '@/payload-types'
import { ProjectCard } from './ProjectCard'
import { Button } from '../Button'

interface PortfolioListProps {
  initialData: PaginatedDocs<Portfolio>
  services: Service[]
}

export default function PortfolioList({ initialData, services }: PortfolioListProps) {
  const [projects, setProjects] = useState(initialData.docs || [])
  const [page, setPage] = useState(2)
  const [hasNextPage, setHasNextPage] = useState(initialData.hasNextPage)
  const [loading, setLoading] = useState(false)
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const loaderRef = useRef(null)

  const fetchMore = async () => {
    if (loading || !hasNextPage) return
    setLoading(true)

    const data = await fetchPortfolio(page, 3, {
      services: selectedServices,
    })

    setProjects((prev) => [...prev, ...data.docs])
    setHasNextPage(data.hasNextPage)
    setPage((prev) => prev + 1)
    setLoading(false)
  }

  const handleServiceToggle = (serviceId: string) => {
    setProjects([]) // Clear results on new filter
    setPage(1)
    setHasNextPage(true)

    setSelectedServices((prev) =>
      prev.includes(serviceId) ? prev.filter((id) => id !== serviceId) : [...prev, serviceId],
    )
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) fetchMore()
      },
      { threshold: 1.0 },
    )

    const el = loaderRef.current
    if (el) observer.observe(el)

    return () => {
      if (el) observer.unobserve(el)
    }
  }, [loaderRef, hasNextPage, loading])

  return (
    <div className="container py-10">
      <div className="mb-10 flex gap-2 justify-center">
        {services.map((service) => (
          <Button
            variant={selectedServices.includes(service.slug!) ? 'default' : 'secondary'}
            key={service.id}
            onClick={() => handleServiceToggle(service.slug!)}
            className="min-w-max rounded-xl"
          >
            {service.title}
          </Button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project: Portfolio) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      {hasNextPage && <div ref={loaderRef} className="h-10" />}
      {loading && (
        <div className="flex justify-center mt-8">
          <p className="text-muted-foreground">Loading more projects...</p>
        </div>
      )}
    </div>
  )
}
