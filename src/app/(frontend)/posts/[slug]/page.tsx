import type { Metadata } from 'next'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React, { cache } from 'react'

import { generateMeta } from '@/utilities/generateMeta'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import ContactCTA from '@/components/ContactCTA'
import PostDetails from '@/components/PostDetails'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const postDetails = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = postDetails.docs
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

export default async function PostDetailsPage({ params }: Args) {
  const { slug = '' } = await params
  const url = '/posts/' + slug

  // Fetch current post details
  const postDetails = await queryPostBySlug({ slug })

  if (!postDetails) {
    return <PayloadRedirects url={url} />
  }

  return (
    <div className="my-16">
      <PayloadRedirects disableNotFound url={url} />
      <PostDetails post={postDetails} />
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const post = await queryPostBySlug({ slug })

  return generateMeta({ doc: post })
}

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
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
