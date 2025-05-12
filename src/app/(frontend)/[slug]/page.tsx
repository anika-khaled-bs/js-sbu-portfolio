import type { Metadata } from 'next'

import configPromise from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'

import { generateMeta } from '@/utilities/generateMeta'
import SkillSetPage from '@/components/SkillSet'
import AboutUsComponent from '@/components/About'
import ContactUsComponent from '@/components/ContactUs'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { RenderHero } from '@/heros/RenderHero'
import { RenderBlocks } from '@/blocks/RenderBlocks'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = pages.docs
    ?.filter((doc) => {
      return doc.slug !== 'home'
    })
    .map(({ slug }) => {
      return { slug }
    })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = 'full-stack-development' } = await paramsPromise
  const url = '/' + slug

  let page: RequiredDataFromCollectionSlug<'pages'> | null

  page = await queryPageBySlug({
    slug,
  })

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  const { hero, layout } = page

  return (
    <div className="mt-16">
      {page?.type === 'skill' ? (
        <SkillSetPage skillSet={page} />
      ) : page?.type === 'about' ? (
        <AboutUsComponent aboutUs={page!} />
      ) : page?.type === 'contact' ? (
        <ContactUsComponent contactUsDetails={page!} />
      ) : (
        <article className="pt-16 pb-24">
          <PageClient />
          {/* Allows redirects for valid pages too */}
          <PayloadRedirects disableNotFound url={url} />

          {draft && <LivePreviewListener />}

          <RenderHero {...hero} />
          <RenderBlocks blocks={layout} />
        </article>
      )}
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = 'full-stack-development' } = await paramsPromise
  const page = await queryPageBySlug({
    slug,
  })

  return generateMeta({ doc: page })
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
