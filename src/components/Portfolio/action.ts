// /app/actions/fetchPortfolio.ts
'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'

export const fetchPortfolio = async (
  page: number = 1,
  limit: number = 3,
  filter?: { services: string[] },
) => {
  const payload = await getPayload({ config: configPromise })
  const { services } = filter!

  const data = await payload.find({
    collection: 'portfolio',
    depth: 1,
    page,
    limit,
    where:
      services.length > 0
        ? {
            relatedServices: {
              in: services,
            },
          }
        : {},
  })

  return data
}
