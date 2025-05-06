import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { anyone } from '../../access/anyone'
import { slugField } from '@/fields/slug'
import { revalidateHeroSlider, revalidateDelete } from './hooks/revalidateHeroSlider'
import { generateHeroSliderSlug } from './hooks/generateHeroSliderSlug'

export const HeroSliders: CollectionConfig = {
  slug: 'hero-sliders',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },

  admin: {
    useAsTitle: 'title',
    group: 'Content',
    description: 'Hero sliders for landing pages and sections',
  },

  hooks: {
    beforeChange: [generateHeroSliderSlug],
    afterChange: [revalidateHeroSlider],
    afterDelete: [revalidateDelete],
  },

  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'textarea',
    },
    {
      name: 'buttonText',
      type: 'text',
      admin: {
        description: 'Text to display on the call-to-action button',
      },
    },
    {
      name: 'buttonUrl',
      type: 'text',
      admin: {
        description: 'URL to navigate to when the button is clicked',
      },
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Background image for this hero slider (recommended: 1920x1080)',
      },
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Whether this slider is currently active',
        position: 'sidebar',
      },
    },
    {
      name: 'sortOrder',
      type: 'number',
      admin: {
        description: 'Order in which this slider appears (lower numbers appear first)',
        position: 'sidebar',
      },
    },
    ...slugField('title'),
  ],
  timestamps: true,
}
