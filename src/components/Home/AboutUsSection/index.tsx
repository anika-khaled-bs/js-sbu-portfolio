import RichText from '@/components/RichText'
import { Media } from '@/payload-types'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { RequiredDataFromCollectionSlug } from 'payload'

interface AboutUsProps {
  aboutUs: RequiredDataFromCollectionSlug<'pages'> | null
  className?: string
}

const AboutUsHomeComponent = ({ aboutUs }: AboutUsProps) => {
  return (
    <>
      <section className="section mb-6 py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Image
                src={(aboutUs?.heroItems?.[0]?.hero?.media as Media)?.url ?? ''}
                alt={(aboutUs?.heroItems?.[0]?.hero?.media as Media)?.alt!}
                className="rounded-lg shadow-lg h-auto w-full"
                height={100}
                width={100}
              />
            </div>
            <div>
              <p className="text-sm text-primary mb-2 font-medium">
                {aboutUs?.heroItems?.[0]?.heading ?? ''}
              </p>
              <p className="mb-6 text-4xl font-bold">{aboutUs?.heroItems?.[0]?.subHeading ?? ''}</p>
              <RichText
                data={aboutUs?.heroItems?.[0]?.hero?.richText!}
                className="text-sm text-muted-foreground mb-3 p-0"
              />

              <Link
                className="text-primary text-sm hover:text-secondary-foreground"
                href={aboutUs?.slug!}
              >
                Learn More <ArrowRight className="inline" size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default AboutUsHomeComponent
