import { Media } from '@/payload-types'
import Image from 'next/image'
import RichText from '../RichText'
import { RequiredDataFromCollectionSlug } from 'payload'
import { cn } from '@/utilities/ui'

interface AboutUsProps {
  aboutUs: RequiredDataFromCollectionSlug<'pages'> | null
  className?: string
}

const Introduction = ({ aboutUs }: AboutUsProps) => {
  return (
    <>
      <section className="bg-white py-16 px-4 md:px-10 container">
        {aboutUs &&
          aboutUs?.heroItems?.length! > 0 &&
          aboutUs?.heroItems?.map((item, index) => {
            return (
              <div
                className={cn('mx-auto', index < aboutUs?.heroItems?.length! - 1 && 'mb-10')}
                key={item.id}
              >
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <Image
                    src={(item.hero.media as Media)?.url!}
                    alt="Mission Illustration"
                    className={`rounded-xl shadow-md w-full order-1 ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}
                    height={500}
                    width={500}
                  />
                  <div className={`order-2 ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                    <h3 className="text-primary mb-2">{item.heading!}</h3>
                    <RichText data={item.hero.richText!} />
                  </div>
                </div>
              </div>
            )
          })}
      </section>
    </>
  )
}

export default Introduction
