import type { CollectionConfig } from 'payload'

import { defaultLexicalEditor } from '../../components/RichText/lexicalEditorConfig'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateDelete, revalidateTestimonial } from './hooks/revalidateTestimonial'
import { formatClientInfo } from './hooks/formatClientInfo'
import { generateTestimonialSlug } from './hooks/generateTestimonialSlug'
import { generateMetaDescription } from './hooks/generateMetaDescription'
import { validateTestimonialContent } from './hooks/validateTestimonialContent'
import { slugField } from '@/fields/slug'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'

/**
 * Testimonials Collection
 * Uses optimized schema and hooks for best performance
 */
export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultSort: 'rating',
  defaultPopulate: {
    clientName: true,
    clientCompany: true,
    clientLogo: true,
    clientTitle: true,
    rating: true,
    testimonial: true,
    clientImage: true,
    featured: true,
    // Selective field population for performance
  },
  admin: {
    useAsTitle: 'clientCompany',
    defaultColumns: [
      'clientName',
      'clientCompany',
      // 'clientLogo',
      'rating',
      'featured',
      'updatedAt',
    ],
    group: 'Collections',
    preview: (doc, { req }) => {
      return generatePreviewPath({
        slug: typeof doc?.slug === 'string' ? doc.slug : '',
        collection: 'testimonials',
        req,
      })
    },
  },
  fields: [
    {
      name: 'testimonial',
      type: 'richText',
      label: 'Testimonial Content',
      required: true,
      editor: defaultLexicalEditor,
      admin: {
        description: 'The testimonial content from your client or customer',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'clientName',
          type: 'text',
          admin: {
            description: 'Name of the person giving the testimonial',
            width: '50%',
          },
          validate: (value?: string | null) => {
            // Optional but if provided, must be at least two characters
            if (value && value.length < 2) {
              return 'Client name must be at least 2 characters'
            }
            return true
          },
        },
        {
          name: 'clientTitle',
          type: 'text',
          admin: {
            description: 'Job title or role of the person',
            width: '50%',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'clientCompany',
          type: 'text',
          admin: {
            description: 'Company or organization name',
            width: '50%',
          },
        },
        {
          name: 'rating',
          type: 'select',
          options: [
            { label: '5 Stars', value: '5' },
            { label: '4 Stars', value: '4' },
            { label: '3 Stars', value: '3' },
            { label: '2 Stars', value: '2' },
            { label: '1 Star', value: '1' },
          ],
          defaultValue: 5,
          admin: {
            description: 'Rating given by the client',
            width: '50%',
          },
          required: true,
        },
      ],
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Media',
          fields: [
            {
              name: 'clientImage',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Photo or avatar of the client (optional)',
              },
            },
            {
              name: 'clientLogo',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: "Client company's logo (optional)",
              },
            },
            {
              name: 'projectImages',
              type: 'array',
              labels: {
                singular: 'Project Image',
                plural: 'Project Images',
              },
              minRows: 0,
              maxRows: 5,
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
              admin: {
                description: 'Optional images of the project being referred to',
              },
            },
          ],
        },
        {
          label: 'Relationships',
          fields: [
            {
              name: 'relatedServices',
              type: 'relationship',
              relationTo: 'services',
              hasMany: true,
              admin: {
                description: 'Services this testimonial relates to',
              },
            },
            {
              name: 'relatedProjects',
              type: 'relationship',
              relationTo: 'portfolio', // Will update to 'portfolio' when that collection exists
              hasMany: true,
              admin: {
                description: 'Projects this testimonial relates to',
              },
            },
            {
              name: 'relatedTechStacks',
              type: 'relationship',
              relationTo: 'tech-stacks',
              hasMany: true,
              admin: {
                description: 'Technologies used in the project',
              },
            },
          ],
        },
        {
          label: 'SEO',
          name: 'meta',
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
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Feature this testimonial on the homepage',
        position: 'sidebar',
      },
    },
    {
      name: 'projectDate',
      type: 'date',
      admin: {
        description: 'When was the project completed',
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
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
    beforeValidate: [validateTestimonialContent],
    beforeChange: [formatClientInfo, generateTestimonialSlug, generateMetaDescription],
    afterChange: [revalidateTestimonial],
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
