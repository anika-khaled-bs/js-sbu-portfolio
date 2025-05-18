import type { Metadata } from 'next'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React, { cache } from 'react'

import { generateMeta } from '@/utilities/generateMeta'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import TutorialDetail from '@/components/TutorialDetail'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const tutorialDetails = await payload.find({
    collection: 'tutorials',
    draft: false,
    limit: 1000,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = tutorialDetails.docs
    .filter(({ slug }) => slug && typeof slug === 'string' && slug.trim() !== '')
    .map(({ slug }) => {
      return { slug }
    })

  return params
}

type Args = {
  params: Promise<{
    slug: string
  }>
}

export default async function TutorialDetailsPage({ params }: Args) {
  const { slug = '' } = await params
  const url = '/tutorial/' + slug // Use /tutorial/ singular to match URL in screenshot

  // Fetch current tutorial details
  const tutorial = await queryTutorialBySlug({ slug })

  if (!tutorial) {
    return <PayloadRedirects url={url} />
  }

  return (
    <div className="my-24">
      <PayloadRedirects disableNotFound url={url} />
      <TutorialDetail tutorial={tutorial} />
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const tutorial = await queryTutorialBySlug({ slug })

  return generateMeta({ doc: tutorial })
}

const queryTutorialBySlug = cache(async ({ slug }: { slug: string }) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'tutorials',
    limit: 1,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 2, // Increase depth to properly resolve relationships
  })

  return result.docs?.[0] || null
})
