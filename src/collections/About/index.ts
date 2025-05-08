import type { CollectionConfig } from 'payload'

import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { Banner } from '../../blocks/Banner/config'
import { Code } from '../../blocks/Code/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateDelete, revalidateAbout } from './hooks/revalidateAbout'
import { generateAboutSlug } from './hooks/generateAboutSlug'
import { generateMetaDescription } from './hooks/generateMetaDescription'
import { validateSingletonDocument } from './hooks/validateSingletonDocument'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { slugField } from '@/fields/slug'
import { hero } from '@/heros/config'

/**
 * About Collection
 * Used to store company information, history, mission, values, and other about-related content
 * This is a singleton collection - only one document can exist
 */
export const About: CollectionConfig = {
  slug: 'about',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    meta: {
      image: true,
      description: true,
    },
    featuredImage: true,
    statistics: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    group: 'Content',
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'about',
          req,
        })

        return path
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'about',
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
            hero,
            {
              name: 'heading',
              type: 'text',
            },
            {
              name: 'subHeading',
              type: 'text',
            },
          ],
          label: 'Hero',
        },
        {
          label: 'Overview',
          fields: [
            {
              name: 'featuredImage',
              type: 'upload',
              relationTo: 'media',
              required: true,
              admin: {
                description: 'Main image for this about section',
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
                  ]
                },
              }),
              label: false,
              required: true,
            },
          ],
        },
        // {
        //   label: 'Company Details',
        //   fields: [
        //     {
        //       name: 'foundedYear',
        //       type: 'number',
        //       min: 1900,
        //       max: new Date().getFullYear(),
        //       admin: {
        //         description: 'Year the company was founded',
        //       },
        //     },
        //     {
        //       name: 'companySize',
        //       type: 'select',
        //       options: [
        //         { label: '1-10 employees', value: '1-10' },
        //         { label: '11-50 employees', value: '11-50' },
        //         { label: '51-200 employees', value: '51-200' },
        //         { label: '201-500 employees', value: '201-500' },
        //         { label: '501-1000 employees', value: '501-1000' },
        //         { label: '1000+ employees', value: '1000+' },
        //       ],
        //       admin: {
        //         description: 'Size of the company',
        //       },
        //     },
        //     {
        //       name: 'headquarters',
        //       type: 'text',
        //       admin: {
        //         description: 'Location of company headquarters',
        //       },
        //     },
        //     {
        //       name: 'locations',
        //       type: 'array',
        //       admin: {
        //         description: 'Office locations',
        //       },
        //       fields: [
        //         {
        //           name: 'city',
        //           type: 'text',
        //           required: true,
        //         },
        //         {
        //           name: 'country',
        //           type: 'text',
        //           required: true,
        //         },
        //         {
        //           name: 'address',
        //           type: 'textarea',
        //         },
        //         {
        //           name: 'isHeadquarters',
        //           type: 'checkbox',
        //           defaultValue: false,
        //         },
        //       ],
        //     },
        //     {
        //       name: 'statistics',
        //       type: 'array',
        //       admin: {
        //         description: 'Key company statistics to highlight',
        //       },
        //       fields: [
        //         {
        //           name: 'label',
        //           type: 'text',
        //           required: true,
        //         },
        //         {
        //           name: 'value',
        //           type: 'text',
        //           required: true,
        //         },
        //         {
        //           name: 'icon',
        //           type: 'upload',
        //           relationTo: 'media',
        //         },
        //       ],
        //     },
        //   ],
        // },
        {
          label: 'Mission & Values',
          fields: [
            {
              name: 'mission',
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
                  ]
                },
              }),
              admin: {
                description: 'Company mission statement',
              },
            },
            {
              name: 'missionImage',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Image representing the company mission',
              },
            },
            {
              name: 'vision',
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
                  ]
                },
              }),
              admin: {
                description: 'Company vision statement',
              },
            },
            {
              name: 'visionImage',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Image representing the company vision',
              },
            },
            {
              name: 'values',
              type: 'array',
              admin: {
                description: 'Core company values',
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
                {
                  name: 'icon',
                  type: 'upload',
                  relationTo: 'media',
                },
              ],
            },
          ],
        },
        {
          label: 'Team & Testimonials',
          fields: [
            {
              name: 'featuredTeamMembers',
              type: 'relationship',
              relationTo: 'team',
              maxRows: 6,
              hasMany: true,
              admin: {
                description: 'Team members to feature on the about page',
              },
            },
            {
              name: 'featuredTestimonials',
              type: 'relationship',
              relationTo: 'testimonials',
              hasMany: true,
              admin: {
                description: 'Testimonials to feature on the about page',
              },
            },
            {
              name: 'partnerLogos',
              type: 'array',
              admin: {
                description: 'Partner or client logos to display',
              },
              fields: [
                {
                  name: 'logo',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'url',
                  type: 'text',
                },
              ],
            },
          ],
        },
        // {
        //   label: 'Timeline',
        //   fields: [
        //     {
        //       name: 'history',
        //       type: 'array',
        //       admin: {
        //         description: 'Company history timeline events',
        //       },
        //       fields: [
        //         {
        //           name: 'year',
        //           type: 'number',
        //           required: true,
        //         },
        //         {
        //           name: 'month',
        //           type: 'number',
        //           min: 1,
        //           max: 12,
        //         },
        //         {
        //           name: 'title',
        //           type: 'text',
        //           required: true,
        //         },
        //         {
        //           name: 'description',
        //           type: 'textarea',
        //         },
        //         {
        //           name: 'image',
        //           type: 'upload',
        //           relationTo: 'media',
        //         },
        //         {
        //           name: 'isHighlighted',
        //           type: 'checkbox',
        //           defaultValue: false,
        //           admin: {
        //             description: 'Whether to highlight this event in the timeline',
        //           },
        //         },
        //       ],
        //     },
        //   ],
        // },
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
    beforeValidate: [validateSingletonDocument],
    beforeChange: [generateAboutSlug, generateMetaDescription],
    afterChange: [revalidateAbout],
    afterDelete: [revalidateDelete],
  },
}
