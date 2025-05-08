import { getPayload } from 'payload'
import configPromise from '@payload-config'
import '@/components/Home/HeroSliders/index.scss'
import AboutUsComponent from '@/components/About'

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const aboutUs = await payload.find({
    collection: 'about',
    limit: 1,
    depth: 8,
  })

  return <AboutUsComponent aboutUs={aboutUs.docs[0]!} />
}
