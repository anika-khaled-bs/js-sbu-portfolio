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
      className="block bg-card text-card-foreground rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 overflow-hidden border border-border"
    >
      {imageData?.url && (
        <div className="relative h-48 w-full">
          <Image
            src={imageData.url}
            alt={imageData.alt || title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-4">
          {iconData?.url && (
            <div className="flex-shrink-0 bg-muted dark:bg-muted p-2 rounded-full">
              <Image
                src={iconData.url}
                alt={iconData.alt || title}
                width={24}
                height={24}
                className="object-contain"
              />
            </div>
          )}
          <h3 className="text-xl font-semibold">{title}</h3>
        </div>
        {description && <p className="text-muted-foreground line-clamp-3 text-sm">{description}</p>}
        <div className="mt-4 flex justify-end">
          <span className="text-primary font-medium text-sm flex items-center">
            Learn more
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
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
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {relatedServices.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  )
}
