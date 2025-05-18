import React from 'react'
import Image from 'next/image'
import { Media, Portfolio, Service } from '@/payload-types'

import { TechStackList } from './TechStackList'
import { KeyFeaturesList } from './KeyFeaturesList'
import { ServiceHeader } from './ServiceHeader'
import { ServiceContent } from './ServiceContent'
import { RelatedServices } from './RelatedServices'
import { RelatedProjects } from './RelatedProjects'

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
    relatedProjects, // Using relatedProjects directly from service response
  } = service

  // Handle featuredImage which can be a string or Media object
  const imageData = typeof featuredImage === 'object' ? featuredImage : null

  // Check if we have any related projects
  const hasRelatedProjects =
    relatedProjects && Array.isArray(relatedProjects) && relatedProjects?.length! > 0

  return (
    <div className="bg-background text-foreground w-full">
      {/* Hero section with full width background */}
      <div className="w-full bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <ServiceHeader title={title} shortDescription={shortDescription} />
        </div>
      </div>

      {/* Featured Image section */}
      {imageData?.url && (
        <div className="w-full py-8">
          <div className="container mx-auto px-4">
            <div className="relative w-full h-[250px] sm:h-[350px] md:h-[450px] rounded-lg overflow-hidden shadow-md">
              <Image
                src={imageData.url}
                alt={imageData.alt || title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1200px) 90vw, 1200px"
                priority
              />
            </div>
          </div>
        </div>
      )}

      {/* Main content section - fixed 5-cols left sidebar and fluid right content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left sidebar taking exactly 5 columns */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="space-y-8 lg:sticky lg:top-24">
              {/* Tech Stack section */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Technologies</h3>
                <div className="bg-card text-card-foreground p-5 rounded-lg shadow-sm border border-border">
                  {techStacks && techStacks.length > 0 ? (
                    <TechStackList techStacks={techStacks} />
                  ) : (
                    <p className="text-muted-foreground">No technologies specified</p>
                  )}
                </div>
              </div>

              {/* Key Features section */}
              {keyFeatures && keyFeatures.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                  <KeyFeaturesList
                    features={keyFeatures.map((feature) => ({
                      ...feature,
                      description: feature.description || '',
                    }))}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Main content area taking remaining 7 columns */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            {content && (
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <ServiceContent content={content} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Services with muted background */}
      {allServices.length > 0 && (
        <div className="w-full bg-muted mt-12 py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center text-accent-foreground">
              Related Services
            </h2>
            <RelatedServices currentServiceId={id} services={allServices} />
          </div>
        </div>
      )}

      {/* Related Projects with accent background */}
      {hasRelatedProjects && (
        <div className="w-full mt-12 py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center text-accent-foreground">
              Related Projects
            </h2>
            <RelatedProjects currentServiceId={id} projects={relatedProjects as Portfolio[]} />
          </div>
        </div>
      )}
    </div>
  )
}

export default ServiceDetails
