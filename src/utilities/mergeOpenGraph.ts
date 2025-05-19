import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: 'Portal for SBU JS | Brain Station 23',
  images: [
    {
      url: `${getServerSideURL()}/js-sbu-logo-500x500.png`,
    },
  ],
  siteName: 'SBU JS | Brain Station 23',
  title: 'SBU JS | Brain Station 23',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
