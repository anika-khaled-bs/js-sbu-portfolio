import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Service } from '@/payload-types'

type ServiceCardProps = {
  service: Service
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const { title, slug, shortDescription, icon, featuredImage } = service
  const iconData = typeof icon === 'object' ? icon : null
  const imageData = featuredImage && typeof featuredImage === 'object' ? featuredImage : null
  // Get description from shortDescription or meta.description
  const description =
    shortDescription || (service.meta?.description ? service.meta.description : '')

  return (
    <Link
      href={`/services/${slug}`}
      className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
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
        {!iconData?.url && imageData?.thumbnailURL && (
          <div className="flex-shrink-0">
            <Image
              src={imageData.thumbnailURL}
              alt={imageData.alt || title}
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
        )}
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      {description && <p className="text-secondary-foreground line-clamp-3">{description}</p>}
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
      if (categoryIds.length > 0 && service.categories) {
        // Check if any of the service's categories match our category IDs
        const serviceCategories =
          service.categories?.map((cat) => (typeof cat === 'object' ? cat.id : cat)) || []

        return serviceCategories.some((catId) => categoryIds.includes(catId))
      }

      // If no categories to filter by, include the service
      return true
    })
    .slice(0, 3)

  if (relatedServices.length === 0) {
    return null
  }

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-8">Visit More Services</h2>
      <hr className="text-secondary mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {relatedServices.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  )
}
