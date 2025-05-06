import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Footer Logo',
      admin: {
        description: 'Upload a logo to display in the footer',
      },
    },
    {
      name: 'quickLinks',
      type: 'array',
      label: 'Quick Links',
      fields: [
        link({
          appearances: false,
          required: true,
        }),
      ],
      maxRows: 10,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'serviceCategories',
      type: 'relationship',
      label: 'Service Categories',
      relationTo: 'categories',
      hasMany: true,
      filterOptions: {
        type: {
          equals: 'service',
        },
      },
      admin: {
        description: 'Select service categories to display in the footer',
        condition: () => true,
      },
    },
    {
      name: 'featuredTechStacks',
      type: 'relationship',
      label: 'Featured Tech Stacks',
      relationTo: 'tech-stacks',
      hasMany: true,
      admin: {
        description: 'Select technology stacks to feature in the footer',
      },
    },
    {
      name: 'showAllTechCategories',
      type: 'checkbox',
      label: 'Show All Tech Categories',
      defaultValue: true,
      admin: {
        description:
          'If checked, all technology stack categories will be shown grouped in the footer',
      },
    },
    {
      name: 'socialLinks',
      type: 'group',
      label: 'Follow Us',
      fields: [
        {
          name: 'linkedin',
          type: 'text',
          label: 'LinkedIn URL',
        },
        {
          name: 'github',
          type: 'text',
          label: 'GitHub URL',
        },
      ],
    },
    {
      name: 'copyrightText',
      type: 'text',
      label: 'Copyright Text',
      defaultValue: '© 2025 JS-SBU. All rights reserved.',
      required: true,
      admin: {
        description: 'Text to display in the copyright section of the footer',
      },
    },
    {
      name: 'name',
      type: 'text',
      label: 'Name',
      admin: {
        description: 'Name to display in the footer, besides the logo',
      },
    },
    {
      name: 'description',
      type: 'text',
      label: 'Footer Description',
      admin: {
        description: 'A short description',
      },
    },
    {
      name: 'subscription',
      type: 'group',
      label: 'Subscription',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Subscription Title',
          defaultValue: 'Subscribe to our newsletter',
        },
        {
          name: 'description',
          type: 'text',
          label: 'Subscription Description',
          defaultValue: 'Get the latest updates and news delivered to your inbox',
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
