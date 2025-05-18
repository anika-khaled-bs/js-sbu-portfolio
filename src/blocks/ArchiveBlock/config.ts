import type { Block } from 'payload'

import { defaultLexicalEditor } from '@/components/RichText/lexicalEditorConfig'
import { linkGroup } from '@/fields/linkGroup'

export const Archive: Block = {
  slug: 'archive',
  interfaceName: 'ArchiveBlock',
  labels: {
    plural: 'Archives',
    singular: 'Archive',
  },
  fields: [
    // {
    //   name: 'introContent',
    //   type: 'richText',
    //   editor: defaultLexicalEditor,
    //   label: 'Intro Content',
    // },
    {
      name: 'header',
      type: 'text',
      label: 'Header',
      admin: {
        description: 'Optional header text for the archive block',
      },
    },
    {
      name: 'subheader',
      type: 'text',
      label: 'Subheader',
      admin: {
        description: 'Optional subheader text for the archive block',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      admin: {
        description: 'Optional description for the archive block',
      },
    },
    linkGroup({
      overrides: {
        label: 'Link',
        maxRows: 1,
        admin: {
          description: 'Optional link for the archive block',
        },
      },
    }),
    {
      name: 'populateBy',
      type: 'select',
      defaultValue: 'collection',
      options: [
        {
          label: 'Collection',
          value: 'collection',
        },
        {
          label: 'Individual Selection',
          value: 'selection',
        },
      ],
    },
    {
      name: 'relationTo',
      type: 'select',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
      },
      label: 'Collections To Show',
      options: [
        {
          label: 'Posts',
          value: 'posts',
        },
        {
          label: 'Contact Details',
          value: 'contact-details',
        },
        {
          label: 'Values',
          value: 'values',
        },
        {
          label: 'Testimonials',
          value: 'testimonials',
        },
        {
          label: 'Team',
          value: 'team',
        },
        {
          label: 'Services',
          value: 'services',
        },
        {
          label: 'Portfolio',
          value: 'portfolio',
        },
        {
          label: 'Tech Stacks',
          value: 'tech-stacks',
        },
        {
          label: 'Tutorials',
          value: 'tutorials',
        },
      ],
    },
    {
      name: 'displayType',
      type: 'select',
      defaultValue: 'grid',
      label: 'Display Type',
      options: [
        {
          label: 'Default',
          value: 'default',
        },
        {
          label: 'Grid',
          value: 'grid',
        },
        {
          label: 'Feature Block',
          value: 'feature',
        },
        {
          label: 'Card',
          value: 'card',
        },
        {
          label: 'List',
          value: 'list',
        },
      ],
    },
    {
      name: 'categories',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
      },
      hasMany: true,
      label: 'Categories To Show',
      relationTo: 'categories',
    },
    {
      name: 'limit',
      type: 'number',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
        step: 1,
      },
      defaultValue: 10,
      label: 'Limit',
    },
    {
      name: 'selectedDocs',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'selection',
      },
      hasMany: true,
      label: 'Selection',
      relationTo: [
        'posts',
        'contact-details',
        'values',
        'testimonials',
        'team',
        'services',
        'portfolio',
        'tech-stacks',
      ],
    },
  ],
}
