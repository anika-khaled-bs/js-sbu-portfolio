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
import { revalidateDelete, revalidateTeam } from './hooks/revalidateTeam'
import { formatTeamDisplayName } from './hooks/formatTeamDisplayName'
import { generateTeamSlug } from './hooks/generateTeamSlug'
import { cleanupTeamReferences } from './hooks/cleanupTeamReferences'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { slugField } from '@/fields/slug'

export const Team: CollectionConfig = {
  slug: 'team',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    name: true,
    slug: true,
    role: true,
    profileImage: true,
    meta: {
      image: true,
      description: true,
    },
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'departmentCategory', 'updatedAt'],
    group: 'Content',
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'team',
          req,
        })

        return path
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'team',
        req,
      }),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'text',
      required: true,
      admin: {
        description: 'Job title or role within the organization',
      },
    },
    {
      name: 'profileImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Professional headshot or profile image',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Bio',
          fields: [
            {
              name: 'shortBio',
              type: 'textarea',
              required: true,
              admin: {
                description: 'Brief bio (1-2 sentences) for team listings',
              },
            },
            {
              name: 'fullBio',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
                    BlocksFeature({ blocks: [Banner, Code, MediaBlock] }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                    HorizontalRuleFeature(),
                  ]
                },
              }),
              admin: {
                description: 'Full biography for individual team member page',
              },
            },
          ],
        },
        {
          label: 'Contact & Social',
          fields: [
            {
              name: 'email',
              type: 'email',
              admin: {
                description: 'Work email address (optional)',
              },
            },
            {
              name: 'phone',
              type: 'text',
              admin: {
                description: 'Work phone number (optional)',
              },
            },
            {
              name: 'socialLinks',
              type: 'array',
              admin: {
                description: 'Social media profiles (optional)',
              },
              fields: [
                {
                  name: 'platform',
                  type: 'select',
                  required: true,
                  options: [
                    { label: 'LinkedIn', value: 'linkedin' },
                    { label: 'GitHub', value: 'github' },
                    { label: 'Twitter', value: 'twitter' },
                    { label: 'Personal Website', value: 'website' },
                    { label: 'Other', value: 'other' },
                  ],
                },
                {
                  name: 'url',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'label',
                  type: 'text',
                  admin: {
                    description: 'Display text (optional)',
                    condition: (_, siblingData) => siblingData.platform === 'other',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Experience & Skills',
          fields: [
            {
              name: 'departmentCategory',
              type: 'relationship',
              relationTo: 'categories',
              required: true,
              filterOptions: {
                type: {
                  equals: 'team',
                },
              },
              admin: {
                description: 'Department or team category',
              },
            },
            {
              name: 'expertise',
              type: 'array',
              admin: {
                description: 'Areas of expertise or specialization',
              },
              fields: [
                {
                  name: 'area',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              name: 'techSkills',
              type: 'relationship',
              relationTo: 'tech-stacks',
              hasMany: true,
              admin: {
                description: 'Technical skills and proficiencies',
              },
            },
            {
              name: 'projects',
              type: 'relationship',
              relationTo: 'posts', // Will update to 'portfolio' when that collection is created
              hasMany: true,
              admin: {
                description: 'Projects the team member has contributed to',
              },
            },
          ],
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
      name: 'displayOrder',
      type: 'number',
      admin: {
        description: 'Controls the display order on team listings (lower numbers appear first)',
        position: 'sidebar',
      },
      defaultValue: 99,
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      label: 'Featured Team Member',
      defaultValue: false,
      admin: {
        description: 'Featured team members appear on the home page and in highlighted sections',
        position: 'sidebar',
      },
    },
    {
      name: 'isLeadership',
      type: 'checkbox',
      label: 'Leadership Team',
      defaultValue: false,
      admin: {
        description: 'Designates this person as part of the leadership team',
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
    beforeChange: [formatTeamDisplayName, generateTeamSlug],
    beforeDelete: [cleanupTeamReferences],
    afterChange: [revalidateTeam],
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
  timestamps: true,
}
