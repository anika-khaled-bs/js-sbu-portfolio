import type { CollectionConfig } from 'payload'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { slugField } from '@/fields/slug'
import { revalidateDelete } from '../Categories/hooks/revalidateCategory'
import { generateMetaDescription } from '../Services/hooks/generateMetaDescription'
import { formatBlogTitle } from './hooks/formatBlogTitle'
import { generateBlogSlug } from './hooks/generateBlogSlug'

export const Blogs: CollectionConfig = {
  slug: 'blogs',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'tags', 'status', 'publishedDate'],
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
      admin: {
        description: 'The title of your blog post',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        {
          label: 'Draft',
          value: 'draft',
        },
        {
          label: 'Published',
          value: 'published',
        },
        {
          label: 'Archived',
          value: 'archived',
        },
      ],
      admin: {
        description: 'Only published posts will be visible on the website',
      },
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Tags',
      minRows: 0,
      maxRows: 10,
      fields: [
        {
          name: 'tag',
          type: 'relationship',
          relationTo: 'tags',
          admin: {
            description: 'The category for this blog',
          },
        },
      ],
      admin: {
        description: 'Add relevant tags to help with search and categorization',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'The main image for this blog post (1200×630px recommended)',
      },
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      admin: {
        description: 'A brief summary of the post (appears in previews)',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      admin: {
        description: 'The main content of your blog post',
      },
    },
    {
      name: 'publishedDate',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        description: 'The date this post was or will be published',
      },
    },
    {
      name: 'readingTime',
      type: 'number',
      admin: {
        description: 'Estimated reading time in minutes (auto-calculated)',
      },
      hooks: {
        beforeChange: [
          ({ data }) => {
            // Auto-calculate reading time based on content length
            // Average reading speed: 200-250 words per minute
            if (data!.content) {
              const wordCount = JSON.stringify(data!.content).split(/\s+/).length
              return Math.ceil(wordCount / 225) // Round up to nearest minute
            }
            return 1 // Default to 1 minute
          },
        ],
      },
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Feature this post on the homepage',
      },
    },
    {
      name: 'meta',
      label: 'SEO',
      type: 'group',
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
    ...slugField(),
  ],
  hooks: {
    beforeChange: [formatBlogTitle, generateBlogSlug, generateMetaDescription],
    // afterChange: [revalidateBlog],
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
