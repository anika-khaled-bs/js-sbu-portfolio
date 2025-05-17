import type { Metadata } from 'next'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React, { cache } from 'react'

import { generateMeta } from '@/utilities/generateMeta'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import ContactCTA from '@/components/ContactCTA'
import ServiceDetails from '@/components/ServiceDetails'
import { Service } from '@/payload-types'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const serviceDetails = await payload.find({
    collection: 'services',
    draft: false,
    limit: 1000,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = serviceDetails.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug: string
  }>
}

export default async function serviceDetailsPage({ params }: Args) {
  const { slug = '' } = await params
  const url = '/services/' + slug

  // Fetch current service details
  const serviceDetails = await queryServiceBySlug({ slug })

  // Fetch all services for related services component

  if (!serviceDetails) {
    return <PayloadRedirects url={url} />
  }

  return (
    <div className="mt-16">
      <PayloadRedirects disableNotFound url={url} />
      <ServiceDetails
        service={serviceDetails}
        allServices={serviceDetails?.relatedServices! as Service[]}
      />
      <ContactCTA />
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const service = await queryServiceBySlug({ slug })

  return generateMeta({ doc: service })
}

const queryServiceBySlug = cache(async ({ slug }: { slug: string }) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'services',
    limit: 1,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
