import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Service } from '@/payload-types'

type ServiceCardProps = {
  service: Service
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const { title, slug, shortDescription, icon } = service
  const iconData = typeof icon === 'object' ? icon : null

  return (
    <Link
      href={`/services/${slug}`}
      className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
    >
      <div className="flex items-center space-x-4 mb-3">
        {iconData?.url && (
          <div className="flex-shrink-0">
            <Image
              src={iconData.url}
              alt={iconData.alt || title}
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
        )}
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      {shortDescription && (
        <p className="text-gray-600 dark:text-gray-300 line-clamp-3">{shortDescription}</p>
      )}
    </Link>
  )
}

type RelatedServicesProps = {
  currentServiceId: string
  categoryIds?: string[]
  services: Service[]
}

export const RelatedServices: React.FC<RelatedServicesProps> = ({
  currentServiceId,
  categoryIds = [],
  services,
}) => {
  // Filter out current service and get up to 3 related services
  const relatedServices = services
    .filter((service) => {
      // Filter out current service
      if (service.id === currentServiceId) return false

      // If we have category IDs, filter by those
      if (categoryIds.length > 0) {
        // Check if any of the service's categories match our category IDs
        const serviceCategories =
          service.categories?.map((cat) => (typeof cat === 'object' ? cat.id : cat)) || []

        return serviceCategories.some((catId) => categoryIds.includes(catId))
      }

      return true
    })
    .slice(0, 3)

  if (relatedServices.length === 0) {
    return null
  }

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-8">Related Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {relatedServices.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  )
}
