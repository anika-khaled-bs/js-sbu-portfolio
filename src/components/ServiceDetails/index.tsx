import { Portfolio, Service } from '@/payload-types'
import Image from 'next/image'
import React from 'react'

import { KeyFeaturesList } from './KeyFeaturesList'
import { RelatedProjects } from './RelatedProjects'
import { RelatedServices } from './RelatedServices'
import { ServiceContent } from './ServiceContent'
import { ServiceHeader } from './ServiceHeader'
import { TechStackList } from './TechStackList'

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
      {/* Hero section with full width background image and overlay */}
      <div className="relative w-full h-[400px] md:h-[450px] lg:h-[500px]">
        {imageData?.url ? (
          <>
            <Image
              src={imageData.url}
              alt={imageData.alt || title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/60"></div>
          </>
        ) : (
          <div className="absolute inset-0 bg-primary"></div>
        )}

        {/* Service Header positioned in the middle of the banner */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4 text-white">
            <ServiceHeader title={title} shortDescription={shortDescription} />
          </div>
        </div>
      </div>

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
