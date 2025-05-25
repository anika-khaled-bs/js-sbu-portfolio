import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateDelete, revalidateValue } from './hooks/revalidateValue'
import { formatValueTitle } from './hooks/formatValueTitle'
import { generateValueSlug } from './hooks/generateValueSlug'
import { generateMetaDescription } from './hooks/generateMetaDescription'
import { slugField } from '@/fields/slug'

export const Values: CollectionConfig = {
  slug: 'values',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    shortDescription: true,
    meta: {
      image: true,
      description: true,
    },
    icon: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    group: 'Collections',
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'values',
          req,
        })

        return path
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'values',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [
            {
              name: 'icon',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Icon representing this value',
              },
            },
            {
              name: 'shortDescription',
              type: 'textarea',
              required: true,
            },
          ],
          label: 'Content',
        },
      ],
    },
    {
      name: 'isHighlighted',
      type: 'checkbox',
      label: 'Featured Value',
      defaultValue: false,
      admin: {
        description: 'Should this value be highlighted on the about page?',
        position: 'sidebar',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
    ...slugField(),
  ],
  hooks: {
    beforeChange: [formatValueTitle, generateValueSlug, generateMetaDescription],
    afterChange: [revalidateValue],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // Interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
