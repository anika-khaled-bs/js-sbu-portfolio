import React from 'react'
import Image from 'next/image'
import { Media, Service } from '@/payload-types'

import { TechStackList } from './TechStackList'
import { KeyFeaturesList } from './KeyFeaturesList'
import { ServiceHeader } from './ServiceHeader'
import { ServiceContent } from './ServiceContent'
import { RelatedServices } from './RelatedServices'

type ServiceDetailsProps = {
  service: Service
  allServices?: Service[]
}

const ServiceDetails: React.FC<ServiceDetailsProps> = ({ service, allServices = [] }) => {
  if (!service) return null

  const {
    id,
    title,
    shortDescription,
    featuredImage,
    keyFeatures,
    techStacks,
    content,
    categories,
  } = service

  // Handle featuredImage which can be a string or Media object
  const imageData = typeof featuredImage === 'object' ? featuredImage : null
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <ServiceHeader title={title} shortDescription={shortDescription} />

      {/* Featured Image */}
      {imageData?.url && (
        <div className="my-8 relative w-full h-[300px] md:h-[400px] lg:h-[500px] rounded-lg overflow-hidden">
          <Image
            src={imageData.url}
            alt={imageData.alt || title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            priority
          />
        </div>
      )}

      {/* Main content with sticky sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="col-span-2">
          {content && <ServiceContent content={content} />}{' '}
          {keyFeatures && keyFeatures.length > 0 && <KeyFeaturesList features={keyFeatures} />}
        </div>
        <div className="col-span-1">
          {techStacks && techStacks.length > 0 && <TechStackList techStacks={techStacks} />}
        </div>
      </div>

      {/* Related Services */}
      {allServices.length > 0 && (
        <RelatedServices
          currentServiceId={id}
          categoryIds={categories?.map((cat) => (typeof cat === 'object' ? cat.id : cat))}
          services={allServices}
        />
      )}
    </div>
  )
}

export default ServiceDetails
