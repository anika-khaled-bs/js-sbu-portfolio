import type { Block } from 'payload'

import {
  AlignFeature,
  BlocksFeature,
  BoldFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  ItalicFeature,
  lexicalEditor,
  LinkFeature,
  SubscriptFeature,
  SuperscriptFeature,
  UnderlineFeature,
  UploadFeature,
} from '@payloadcms/richtext-lexical'
import { MediaBlock } from '../MediaBlock/config'
import { Banner } from '../Banner/config'
import { Code } from '../Code/config'

export const Archive: Block = {
  slug: 'archive',
  interfaceName: 'ArchiveBlock',
  labels: {
    plural: 'Archives',
    singular: 'Archive',
  },
  fields: [
    {
      name: 'introContent',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }),
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
      label: 'Intro Content',
    },
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
          label: 'Slider',
          value: 'slider',
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
