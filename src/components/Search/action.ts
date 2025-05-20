'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'

export const fetchSearchResults = async (page = 1, limit = 3, query?: string) => {
  const payload = await getPayload({ config: configPromise })

  const searchParams: any = {
    collection: 'search',
    overrideAccess: false,
    depth: 1,
    limit,
    page,
    sort: '-createdAt', // Sort by newest first
  }

  // Add search query if provided
  if (query && query.trim().length > 0) {
    searchParams.where = {
      or: [
        {
          title: {
            like: query,
          },
        },
        {
          shortDescription: {
            like: query,
          },
        },
        {
          categories: {
            title: {
              like: query,
            },
          },
        },
      ],
    }
  }

  const results = await payload.find(searchParams)
  return results
}
