import type { CollectionConfig } from 'payload'

import {
  AlignFeature,
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  LinkFeature,
  UnderlineFeature,
  BoldFeature,
  ItalicFeature,
  SubscriptFeature,
  SuperscriptFeature,
  UploadFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { Banner } from '../../blocks/Banner/config'
import { Code } from '../../blocks/Code/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateDelete, revalidatePortfolio } from './hooks/revalidatePortfolio'
import { formatPortfolioTitle } from './hooks/formatPortfolioTitle'
import { generatePortfolioSlug } from './hooks/generatePortfolioSlug'
import { generateMetaDescription } from './hooks/generateMetaDescription'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { slugField } from '@/fields/slug'

export const Portfolio: CollectionConfig = {
  slug: 'portfolio',
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
    meta: {
      image: true,
      description: true,
    },
    featuredImage: true,
    techStacks: true,
    client: true,
  },
  admin: {
    defaultColumns: ['title', 'client', 'category', 'slug', 'updatedAt'],
    group: 'Content',
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'portfolio',
          req,
        })

        return path
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'portfolio',
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
              name: 'featuredImage',
              type: 'upload',
              relationTo: 'media',
              required: true,
              admin: {
                description: 'Main image for this portfolio item',
              },
            },
            {
              name: 'content',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                    BlocksFeature({ blocks: [Banner, Code, MediaBlock] }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                    HorizontalRuleFeature(),
                    AlignFeature(),
                    LinkFeature(),
                    UnderlineFeature(),
                    BoldFeature(),
                    ItalicFeature(),
                    SubscriptFeature(),
                    SuperscriptFeature(),
                    UploadFeature(),
                  ]
                },
              }),
              label: false,
              required: true,
            },
          ],
          label: 'Content',
        },
        {
          fields: [
            {
              name: 'client',
              // required: true,
              type: 'relationship',
              relationTo: 'testimonials',

              admin: {
                description: 'The client for this project',
              },
            },
            {
              name: 'projectURL',
              type: 'text',
              admin: {
                description: 'URL to live project (if available)',
              },
            },
            {
              name: 'completionDate',
              type: 'date',
              admin: {
                description: 'When the project was completed',
                date: {
                  pickerAppearance: 'dayAndTime',
                },
              },
            },
            {
              name: 'techStacks',
              type: 'relationship',
              relationTo: 'tech-stacks',
              hasMany: true,
              required: true,
              admin: {
                description: 'Technologies used in this project',
              },
            },
            {
              name: 'gallery',
              type: 'array',
              admin: {
                description: 'Additional images showcasing the project',
              },
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
                {
                  name: 'caption',
                  type: 'text',
                },
              ],
            },
            {
              name: 'keyFeatures',
              type: 'array',
              admin: {
                description: 'Key features of this project',
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
                  required: true,
                },
              ],
            },
            {
              name: 'relatedProjects',
              type: 'relationship',
              relationTo: 'portfolio',
              hasMany: true,
              admin: {
                description: 'Other portfolio projects that relate to this one',
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
            {
              name: 'relatedServices',
              type: 'relationship',
              relationTo: 'services',
              hasMany: true,
              admin: {
                description: 'Services that were part of this project',
              },
            },
            {
              name: 'category',
              type: 'relationship',
              relationTo: 'categories',
              // required: true,
              filterOptions: {
                type: {
                  equals: 'portfolio',
                },
              },
              admin: {
                description: 'The portfolio category this belongs to',
                position: 'sidebar',
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
      name: 'isFeatured',
      type: 'checkbox',
      label: 'Featured Project',
      defaultValue: false,
      admin: {
        description: 'Should this project be featured on the homepage?',
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
    beforeChange: [formatPortfolioTitle, generatePortfolioSlug, generateMetaDescription],
    afterChange: [revalidatePortfolio],
    afterDelete: [revalidateDelete],
  },
  // versions: {
  //   drafts: {
  //     autosave: {
  //       interval: 100, // Interval for optimal live preview
  //     },
  //     schedulePublish: true,
  //   },
  //   maxPerDoc: 50,
  // },
}
