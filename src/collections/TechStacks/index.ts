import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { anyone } from '../../access/anyone'
import { slugField } from '@/fields/slug'
import { checkReferencesBeforeDelete } from './hooks/checkReferencesBeforeDelete'
import { revalidateTechStack, revalidateDelete } from './hooks/revalidateTechStack'
import { formatTechStackName } from './hooks/formatTechStackName'
import { generateTechStackSlug } from './hooks/generateTechStackSlug'

export const TechStacks: CollectionConfig = {
  slug: 'tech-stacks',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },

  admin: {
    useAsTitle: 'name',
    group: 'Content',
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
      defaultValue: 'other',
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
  timestamps: true,
}
