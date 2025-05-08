import type { Metadata } from 'next'

import configPromise from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'

import { generateMeta } from '@/utilities/generateMeta'
import SkillSetHero from '@/components/SkillSet/SkillSetHero'
import SkillSetOverview from '@/components/SkillSet/SkillSetOverview'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

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

  console.log('page params', params)

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { slug = 'full-stack-development' } = await paramsPromise

  let skillSet: RequiredDataFromCollectionSlug<'pages'> | null

  skillSet = await queryPageBySlug({
    slug,
  })
  console.log('full stack page', skillSet)

  return (
    <div className="min-h-screen pb-16">
      <SkillSetHero title={skillSet?.title!} subtitle={skillSet?.subHeading!} />

      <SkillSetOverview content={<RichText data={skillSet?.pageContent!} />} />

      <section className="container py-12 bg-slate-50">
        <div className="mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-slate-900">Related Links</h2>

          <ul className="space-y-4">
            {skillSet?.hero.links!.map((resource, index) => (
              <li
                key={index}
                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <Link
                  href={resource.link.url!}
                  className="flex items-center justify-between text-slate-900 hover:text-blue-600 transition-colors"
                >
                  <span className="font-medium">{resource.link.label}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-slate-900">Explore Other Skill Sets</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(skillSets)
              .filter(([key]) => key !== slug)
              .slice(0, 3)
              .map(([key, value]) => (
                <a 
                  key={key} 
                  href={`/skill-set/${key}`}
                  className="block p-6 bg-white rounded-lg border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all duration-200"
                >
                  <h3 className="text-xl font-semibold mb-2 text-slate-900">{value.title}</h3>
                  <p className="text-slate-600 line-clamp-2">{value.subtitle}</p>
                </a>
              ))}
          </div>
        </div>
      </section> */}
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
