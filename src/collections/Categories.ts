import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { slugField } from '@/fields/slug'

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
        { label: 'Blog Category', value: 'blog' },
        { label: 'Service Category', value: 'service' },
        { label: 'Portfolio Category', value: 'portfolio' },
        { label: 'Tutorial Category', value: 'tutorial' },
        { label: 'Skill Category', value: 'skill' },
      ],
      defaultValue: 'blog',
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
      name: 'isHighlighted',
      type: 'checkbox',
      label: 'Highlight in Navigation',
      defaultValue: false,
      admin: {
        description: 'Should this category be highlighted in navigation menus?',
        position: 'sidebar',
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
  timestamps: true,
}
