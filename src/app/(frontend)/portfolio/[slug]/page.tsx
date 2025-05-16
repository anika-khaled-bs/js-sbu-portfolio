import type { Metadata } from 'next'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React, { cache } from 'react'

import { generateMeta } from '@/utilities/generateMeta'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import PortfolioDetailsComponent from '@/components/Portfolio/Details'
import ContactCTA from '@/components/ContactCTA'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const portfolioDetails = await payload.find({
    collection: 'portfolio',
    overrideAccess: false,
    draft: false,
    limit: 1000,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = portfolioDetails.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug: string
  }>
}

export default async function PortfolioDetailsPage({ params }: Args) {
  const { slug = '' } = await params
  const url = '/portfolio/' + slug

  const portfolioDetails = await queryPortfolioBySlug({ slug })

  if (!portfolioDetails) {
    if (!portfolioDetails) return <PayloadRedirects url={url} />
  }

  return (
    <div className="mt-16">
      <PayloadRedirects disableNotFound url={url} />
      <PortfolioDetailsComponent portfolio={portfolioDetails} />
      <ContactCTA />
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const portfolio = await queryPortfolioBySlug({ slug })

  return generateMeta({ doc: portfolio })
}

const queryPortfolioBySlug = cache(async ({ slug }: { slug: string }) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'portfolio',
    overrideAccess: false,
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
