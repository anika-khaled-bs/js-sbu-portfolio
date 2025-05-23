// import type { Metadata } from 'next'

// import configPromise from '@payload-config'
// import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
// import { draftMode } from 'next/headers'
// import React, { cache } from 'react'

// import { generateMeta } from '@/utilities/generateMeta'

// import { PayloadRedirects } from '@/components/PayloadRedirects'
// import PageClient from './page.client'
// import { LivePreviewListener } from '@/components/LivePreviewListener'
// import { RenderHero } from '@/heros/RenderHero'
// import { RenderBlocks } from '@/blocks/RenderBlocks'
// import ContactCTA from '@/components/ContactCTA'

// export async function generateStaticParams() {
//   const payload = await getPayload({ config: configPromise })
//   const pages = await payload.find({
//     collection: 'pages',
//     draft: false,
//     limit: 1000,
//     overrideAccess: false,
//     pagination: false,
//     select: {
//       slug: true,
//     },
//   })

//   const params = pages.docs
//     ?.filter((doc) => {
//       return doc.slug === 'home'
//     })
//     .map(({ slug }) => {
//       return { slug }
//     })

//   return params
// }

// type Args = {
//   params: Promise<{
//     slug?: string
//   }>
// }

// export default async function Page({ params: paramsPromise }: Args) {
//   const { isEnabled: draft } = await draftMode()
//   const { slug = 'full-stack-development' } = await paramsPromise
//   const url = '/'

//   const page: RequiredDataFromCollectionSlug<'pages'> | null = await queryPageBySlug({
//     slug,
//   })

//   if (!page) {
//     return <PayloadRedirects url={url} />
//   }

//   const { hero, layout, showContactCTA } = page

//   return (
//     <div className="mt-16 overflow-x-hidden">
//       <article className="">
//         <PageClient />
//         {/* Allows redirects for valid pages too */}
//         <PayloadRedirects disableNotFound url={url} />

//         {draft && <LivePreviewListener />}

//         <RenderBlocks blocks={layout} hero={<RenderHero {...hero} />} />
//         {showContactCTA && <ContactCTA />}
//       </article>
//     </div>
//   )
// }

// export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
//   const { slug = 'full-stack-development' } = await paramsPromise
//   const page = await queryPageBySlug({
//     slug,
//   })

//   return generateMeta({ doc: page })
// }

// const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
//   const payload = await getPayload({ config: configPromise })

//   const result = await payload.find({
//     collection: 'pages',
//     limit: 1,
//     pagination: false,
//     overrideAccess: false,
//     where: {
//       slug: {
//         equals: slug,
//       },
//     },
//   })

//   return result.docs?.[0] || null
// })

import PageTemplate, { generateMetadata } from './[slug]/page'

export default PageTemplate

export { generateMetadata }
