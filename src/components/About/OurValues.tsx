import { Media, Value } from '@/payload-types'
import Image from 'next/image'

interface OurValuesProps {
  values: Value[]
}

const OurValues = ({ values }: OurValuesProps) => {
  return (
    <section className="section bg-muted mt-16">
      <div className="container py-16">
        <div className="relative p-6 rounded-xl bg-background/60 backdrop-blur-sm border border-border shadow-md dark:bg-background/30 dark:backdrop-blur-md">
          <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-50 pointer-events-none rounded-xl dark:from-primary/10"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {values?.map((value) => {
              return (
                <div className="bg-card border rounded-lg p-6 text-center" key={value.id}>
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Image
                      src={(value.icon as Media).url!}
                      alt={(value.icon as Media).alt!}
                      height={100}
                      width={100}
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.shortDescription}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default OurValues
