import { RequiredDataFromCollectionSlug } from 'payload'
import { Form, Media } from '@/payload-types'

import PageHeader from '../PageHeader'
import { FormBlock } from '@/blocks/Form/Component'

interface ContactUsProps {
  contactUsDetails: RequiredDataFromCollectionSlug<'pages'> | null
}

const ContactUsComponent = async ({ contactUsDetails }: ContactUsProps) => {
  const headerInfo = contactUsDetails?.heroItems?.[0]
  const headerImage = headerInfo?.hero?.media as Media

  return (
    <>
      <PageHeader
        title={headerInfo?.heading!}
        description={headerInfo?.subHeading!}
        image={headerImage?.url!}
      />
      <div className="py-12">
        <FormBlock form={contactUsDetails?.form! as Form} enableIntro={false} />
      </div>
    </>
  )
}

export default ContactUsComponent
