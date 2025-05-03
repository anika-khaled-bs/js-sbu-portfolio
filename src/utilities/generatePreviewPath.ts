import { PayloadRequest } from 'payload'

type CollectionSlug = 'posts' | 'pages' | 'team' | 'services' | 'tech-stacks' | 'testimonials'

const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {
  posts: '/posts',
  pages: '',
  team: '/about/team',
  services: '/services',
  'tech-stacks': '/tech-stacks',
  testimonials: '/testimonials',
}

type Props = {
  collection: keyof typeof collectionPrefixMap
  slug: string
  req: PayloadRequest
}

export const generatePreviewPath = ({ collection, slug }: Props) => {
  const encodedParams = new URLSearchParams({
    slug,
    collection,
    path: `${collectionPrefixMap[collection]}/${slug}`,
    previewSecret: process.env.PREVIEW_SECRET || '',
  })

  const url = `/next/preview?${encodedParams.toString()}`

  return url
}
