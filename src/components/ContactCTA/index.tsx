import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

const ContactCTA = async () => {
  const payload = await getPayload({ config: configPromise })

  const contactUs = await payload.find({
    collection: 'pages',
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
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container text-center max-w-3xl">
          <p className="mb-6 text-primary-foreground text-4xl font-semibold">
            Want to Start a Project?
          </p>
          <p className="text-primary-foreground/90 mb-8 text-lg max-w-xl mx-auto">
            Let's collaborate to build something amazing together. Our team is ready to bring your
            vision to life.
          </p>
          <Link
            href={`/${contactUs?.docs[0]?.slug}`}
            className="btn bg-white text-primary hover:bg-white/90 px-8 py-3 rounded-md font-medium"
          >
            Contact Us
          </Link>
        </div>
      </section>
    )
  )
}

export default ContactCTA
