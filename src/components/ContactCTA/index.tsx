import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

const ContactCTA = async () => {
  const payload = await getPayload({ config: configPromise })

  const contactUs = await payload.find({
    collection: 'pages',
    overrideAccess: false,
    depth: 1,
    pagination: false,
    where: {
      type: {
        equals: 'contact',
      },
    },
    select: {
      slug: true,
    },
  })

  return (
    contactUs && (
      <section className="py-16">
        <div className="container max-w-4xl">
          <div className="backdrop-blur-sm bg-card/90 rounded-xl shadow-lg px-8 py-12 border border-muted">
            <div className="text-center">
              <p className="mb-6 text-4xl font-semibold text-card-foreground">
                Want to Start a Project?
              </p>
              <p className="mb-8 text-lg max-w-xl mx-auto text-muted-foreground">
                Let&apos;s collaborate to build something amazing together. Our team is ready to
                bring your vision to life.
              </p>
              <Link
                href={`/${contactUs?.docs[0]?.slug}`}
                className="btn bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-md font-medium transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    )
  )
}

export default ContactCTA
