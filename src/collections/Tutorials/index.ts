import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateDelete, revalidateTutorial } from './hooks/revalidateTutorial'
import { defaultLexicalEditor } from '../../components/RichText/lexicalEditorConfig'
import { generateMetaDescription } from './hooks/generateMetaDescription'
import { generateTutorialSlug } from './hooks/generateTutorialSlug'
import { populateAuthors } from './hooks/populateAuthors'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { slugField } from '@/fields/slug'

export const Tutorials: CollectionConfig<'tutorials'> = {
  slug: 'tutorials',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  // This config controls what's populated by default when a tutorial is referenced
  defaultPopulate: {
    title: true,
    slug: true,
    categories: true,
    featuredImage: true,
    thumbnailImage: true,
    shortDescription: true,
    publishedAt: true,
    difficultyLevel: true,
    duration: true,
    authors: true,
    videoFile: true,
    meta: {
      image: true,
      description: true,
    },
  },
  admin: {
    defaultColumns: ['title', 'difficultyLevel', 'duration', 'slug', 'updatedAt'],
    group: 'Collections',
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'tutorials',
          req,
        })

        return path
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'tutorials',
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
              name: 'thumbnailImage',
              type: 'upload',
              relationTo: 'media',
              required: true,
              admin: {
                description: 'Thumbnail image for this tutorial (16:9 ratio recommended)',
              },
            },
            {
              name: 'featuredImage',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Featured image for this tutorial',
              },
            },
            {
              name: 'videoFile',
              type: 'upload',
              relationTo: 'media',
              required: true,
              admin: {
                description: 'Upload the video file for this tutorial',
              },
              filterOptions: {
                mimeType: {
                  contains: 'video',
                },
              },
            },
            {
              name: 'externalVideoUrl',
              type: 'text',
              admin: {
                description:
                  'Optional: URL to an external video (YouTube, Vimeo, etc.) if not uploading directly',
                condition: (data) => !data.videoFile,
              },
            },
            {
              name: 'shortDescription',
              type: 'textarea',
              required: true,
              defaultValue: '',
              admin: {
                description: 'Brief summary of the tutorial (shown in listings)',
              },
            },
            {
              name: 'content',
              type: 'richText',
              editor: defaultLexicalEditor,
              label: 'Tutorial Content',
              required: true,
              admin: {
                description: 'Written tutorial content, can include code snippets, steps, etc.',
              },
            },
          ],
          label: 'Content',
        },
        {
          fields: [
            {
              name: 'prerequisites',
              type: 'richText',
              editor: defaultLexicalEditor,
              admin: {
                description: 'Prerequisites or requirements for this tutorial',
              },
            },
            {
              name: 'resources',
              type: 'array',
              admin: {
                description: 'Additional resources for this tutorial',
              },
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'url',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                },
              ],
            },
            {
              name: 'codeRepository',
              type: 'text',
              admin: {
                description: 'URL to the code repository (GitHub, GitLab, etc.)',
              },
            },
            {
              name: 'demoURL',
              type: 'text',
              admin: {
                description: 'URL to a live demo of the tutorial project',
              },
            },
            {
              name: 'relatedTutorials',
              type: 'relationship',
              admin: {
                description: 'Other tutorials that relate to this one',
              },
              filterOptions: ({ id }) => {
                return {
                  id: {
                    not_in: [id],
                  },
                }
              },
              hasMany: true,
              relationTo: 'tutorials',
            },
            {
              name: 'relatedPosts',
              type: 'relationship',
              admin: {
                description: 'Blog posts that relate to this tutorial',
              },
              hasMany: true,
              relationTo: 'posts',
            },
            {
              name: 'categories',
              type: 'relationship',
              admin: {
                description: 'Categories for this tutorial',
              },
              hasMany: true,
              relationTo: 'categories',
              filterOptions: {
                type: {
                  equals: 'tutorial',
                },
              },
            },
            {
              name: 'techStacks',
              type: 'relationship',
              relationTo: 'tech-stacks',
              hasMany: true,
              admin: {
                description: 'Technologies used in this tutorial',
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
      name: 'difficultyLevel',
      type: 'select',
      options: [
        { label: 'Beginner', value: 'beginner' },
        { label: 'Intermediate', value: 'intermediate' },
        { label: 'Advanced', value: 'advanced' },
      ],
      required: true,
      defaultValue: 'intermediate',
      admin: {
        description: 'Difficulty level of this tutorial',
        position: 'sidebar',
      },
    },
    {
      name: 'duration',
      type: 'number',
      admin: {
        description: 'Estimated duration in minutes',
        position: 'sidebar',
      },
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      label: 'Featured Tutorial',
      defaultValue: false,
      admin: {
        description: 'Feature this tutorial on the homepage or tutorial index',
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
    {
      name: 'authors',
      type: 'relationship',
      admin: {
        position: 'sidebar',
      },
      hasMany: true,
      relationTo: 'users',
    },
    // This field is only used to populate the user data via the `populateAuthors` hook
    {
      name: 'populatedAuthors',
      type: 'array',
      access: {
        update: () => false,
      },
      admin: {
        disabled: true,
        readOnly: true,
      },
      fields: [
        {
          name: 'id',
          type: 'text',
        },
        {
          name: 'name',
          type: 'text',
        },
      ],
    },
    ...slugField(),
  ],
  hooks: {
    afterChange: [revalidateTutorial],
    beforeChange: [generateTutorialSlug, generateMetaDescription],
    afterRead: [populateAuthors],
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
