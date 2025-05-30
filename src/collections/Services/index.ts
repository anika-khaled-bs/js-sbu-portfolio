import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { revalidateDelete, revalidateService } from './hooks/revalidateService'
import { formatServiceTitle } from './hooks/formatServiceTitle'
import { generateServiceSlug } from './hooks/generateServiceSlug'
import { generateMetaDescription } from './hooks/generateMetaDescription'
import { defaultLexicalEditor } from '../../components/RichText/lexicalEditorConfig'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { slugField } from '@/fields/slug'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'

export const Services: CollectionConfig = {
  slug: 'services',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    category: true,
    shortDescription: true,
    meta: {
      image: true,
      description: true,
    },
    featuredImage: true,
    techStacks: true,
  },
  admin: {
    defaultColumns: ['title', 'category', 'slug', 'updatedAt'],
    group: 'Collections',
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'services',
          req,
        })

        return path
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'services',
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
                description: 'Icon representing this service',
              },
            },
            {
              name: 'featuredImage',
              type: 'upload',
              relationTo: 'media',
              required: true,
              admin: {
                description: 'Main image for this service',
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
        {
          fields: [
            {
              name: 'techStacks',
              type: 'relationship',
              relationTo: 'tech-stacks',
              hasMany: true,
              required: true,
              admin: {
                description: 'Technologies used for this service',
              },
            },
            {
              name: 'categories',
              type: 'relationship',
              relationTo: 'categories',
              hasMany: true,
              required: true,
              filterOptions: {
                type: {
                  equals: 'service',
                },
              },
            },
            {
              name: 'content',
              type: 'richText',
              editor: defaultLexicalEditor,
              label: false,
              required: true,
            },
            {
              name: 'keyFeatures',
              type: 'array',
              admin: {
                description: 'Key features of this service',
              },
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                },
                {
                  name: 'icon',
                  type: 'upload',
                  relationTo: 'media',
                },
              ],
            },
            {
              name: 'relatedProjects',
              type: 'relationship',
              relationTo: 'portfolio', // Will update to 'portfolio' when that collection is created
              hasMany: true,
              admin: {
                description: 'Related projects that demonstrate this service',
              },
            },
            {
              name: 'relatedServices',
              type: 'relationship',
              relationTo: 'services',
              hasMany: true,
              maxRows: 3,
              admin: {
                description: 'Other posts that relate to this one',
                // condition: (data) => Boolean(data?.id),
              },
              filterOptions: ({ id }) => {
                return {
                  id: {
                    not_equals: id,
                  },
                }
              },
            },
          ],
          label: 'Details',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),
            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'isHighlighted',
      type: 'checkbox',
      label: 'Featured Service',
      defaultValue: false,
      admin: {
        description: 'Should this service be highlighted on the homepage?',
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
    beforeChange: [formatServiceTitle, generateServiceSlug, generateMetaDescription],
    afterChange: [revalidateService],
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
