import type { CollectionConfig } from 'payload'

import { slugField } from '@/fields/slug'

export const Tags: CollectionConfig = {
  slug: 'tags',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'createdAt', 'updatedAt'],
    group: 'Collections',
  },
  access: {
    read: () => true, // Anyone can read blog posts
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    ...slugField('name'),
  ],
}
