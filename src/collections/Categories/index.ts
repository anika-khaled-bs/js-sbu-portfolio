import type { CollectionConfig } from 'payload'

import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'
import { slugField } from '@/fields/slug'
import { generateCategorySlug } from './hooks/generateCategorySlug'
import { validateCategoryHierarchy } from './hooks/validateCategoryHierarchy'
import { buildCategoryBreadcrumbs } from './hooks/buildCategoryBreadcrumbs'
import { revalidateCategory, revalidateDelete } from './hooks/revalidateCategory'

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    group: 'Collections',
    defaultColumns: ['title', 'type', 'parent', 'updatedAt'],
  },
  hooks: {
    beforeChange: [validateCategoryHierarchy, generateCategorySlug],
    afterRead: [buildCategoryBreadcrumbs],
    afterChange: [revalidateCategory],
    afterDelete: [revalidateDelete],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'type',
      type: 'select',
      options: [
        { label: 'Blog', value: 'blog' },
        { label: 'Service', value: 'service' },
        { label: 'Portfolio', value: 'portfolio' },
        { label: 'Team', value: 'team' },
        { label: 'Tutorial', value: 'tutorial' },
        { label: 'Skill', value: 'skill' },
        { label: 'Other', value: 'other' },
      ],
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Brief description of this category',
      },
    },
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
      label: 'Category Icon',
      admin: {
        description: 'Icon to represent this category (SVG or small image)',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Featured Image',
      admin: {
        description: 'Featured image for category pages',
      },
    },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'categories',
      admin: {
        description: 'Parent category, if this is a sub-category',
        position: 'sidebar',
      },
    },
    ...slugField(),
  ],
  versions: {
    drafts: {
      autosave: {
        interval: 100, // Interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
  timestamps: true,
}
