import { About, Media } from '@/payload-types'
import Image from 'next/image'
import RichText from '../RichText'

interface AboutUsProps {
  aboutUs: Partial<About>
  className?: string
}

const Introduction = ({ aboutUs }: AboutUsProps) => {
  return (
    <div className="mt-16 container">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <Image
            src={(aboutUs?.featuredImage as Media)?.url!}
            alt={(aboutUs?.featuredImage as Media)?.alt!}
            className="rounded-lg shadow-lg h-auto w-full"
            height={100}
            width={100}
          />
        </div>
        <div>
          <p className="font-medium text-primary mb-2">{aboutUs.title!}</p>
          <p className="mb-6 text-4xl font-bold">{aboutUs.subHeading!}</p>
          <RichText data={aboutUs.content!} className="text-sm text-muted-foreground p-0" />
        </div>
      </div>
    </div>
  )
}

export default Introduction
