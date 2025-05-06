// import PageTemplate, { generateMetadata } from './[slug]/page'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import HeroSlider from '@/components/HeroSliders'
import '@/components/HeroSliders/index.scss'

// export default PageTemplate

// export { generateMetadata }

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const sliders = await payload.find({
    collection: 'hero-sliders',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    // select: {
    //   title: true,
    //   slug: true,
    //   categories: true,
    //   meta: true,
    // },
  })

  console.log('sliders', sliders)

  return (
    <div className="min-h-screen">
      <HeroSlider sliders={sliders.docs} />
    </div>
  )
}
