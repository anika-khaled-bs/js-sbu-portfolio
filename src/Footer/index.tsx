import { getCachedGlobal } from '@/utilities/getGlobals'
import { FooterComponent } from './Footer'
import { Footer } from '@/payload-types'

const GlobalFooter = async () => {
  const footerData: Footer = (await getCachedGlobal('footer', 1)()) as Footer

  return <FooterComponent footer={footerData} />
}

export default GlobalFooter
