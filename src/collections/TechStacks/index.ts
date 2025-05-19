import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { anyone } from '../../access/anyone'
import { slugField } from '@/fields/slug'
import { checkReferencesBeforeDelete } from './hooks/checkReferencesBeforeDelete'
import { revalidateTechStack, revalidateDelete } from './hooks/revalidateTechStack'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'

export const TechStacks: CollectionConfig = {
  slug: 'tech-stacks',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  defaultPopulate: {
    name: true,
    description: true,
    icon: true,
    // Selective field population for performance
  },
  admin: {
    useAsTitle: 'name',
    group: 'Collections',
    description: 'Technology stacks used across different services',
  },
  hooks: {
    // beforeChange: [formatTechStackName, generateTechStackSlug],
    // beforeChange: [generateTechStackSlug],
    beforeDelete: [checkReferencesBeforeDelete],
    afterChange: [revalidateTechStack],
    afterDelete: [revalidateDelete],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'keyFeatures',
      type: 'array',
      admin: {
        description: 'Key features of this technology stack',
      },
      fields: [
        {
          name: 'featureDetails',
          type: 'text',
        },
      ],
    },
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Icon representing this technology (SVG preferred)',
      },
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Frontend', value: 'frontend' },
        { label: 'Backend', value: 'backend' },
        { label: 'Mobile', value: 'mobile' },
        { label: 'DevOps', value: 'devops' },
        { label: 'Database', value: 'database' },
        { label: 'ML/AI', value: 'ml-ai' },
        { label: 'Other', value: 'other' },
      ],
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Show in featured technology sections',
        position: 'sidebar',
      },
    },
    ...slugField('name'),
  ],
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
