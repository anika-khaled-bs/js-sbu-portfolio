import { getPayload, RequiredDataFromCollectionSlug } from 'payload'

import { FormBlock } from '@/blocks/Form/Component'
import { Media } from '@/payload-types'
import configPromise from '@payload-config'
import { Form as FormType } from '@payloadcms/plugin-form-builder/types'

import PageHeader from '../PageHeader'
import ContactInfoComponent from './ContactInfo'

interface ContactUsProps {
  contactUsDetails: RequiredDataFromCollectionSlug<'pages'> | null
}

const ContactUsComponent = async ({ contactUsDetails }: ContactUsProps) => {
  console.log('🚀 ~ ContactUsComponent ~ contactUsDetails:', contactUsDetails)

  const payload = await getPayload({ config: configPromise })

  const headerInfo = contactUsDetails?.hero
  const headerImage = headerInfo?.media as Media

  const contactInfo = await payload.find({
    collection: 'contact-details',
    depth: 1,
    where: {
      isActive: {
        equals: true,
      },
    },
  })

  return (
    <>
      <PageHeader richText={headerInfo?.richText} image={headerImage?.url!} />
      <div className="container py-16">
        {contactInfo && <ContactInfoComponent contactInfo={contactInfo?.docs[0]!} />}
        <div className="mt-16">
          <div className="border rounded-lg p-6 md:p-10 max-w-3xl mx-auto">
            <div className="text-center">
              <p className="mb-2 text-4xl font-semibold">Send Us a Message</p>
              <p className="text-muted-foreground">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
            </div>
            <FormBlock
              form={
                contactUsDetails?.layout!.find((item) => item.blockType === 'formBlock')
                  ?.form as unknown as FormType
              }
              enableIntro={false}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default ContactUsComponent
