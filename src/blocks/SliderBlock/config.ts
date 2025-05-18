import type { Block } from 'payload'
import { linkGroup } from '../../fields/linkGroup'

export const SliderBlock: Block = {
  slug: 'slider',
  interfaceName: 'SliderBlock',
  labels: {
    singular: 'Slider',
    plural: 'Sliders',
  },
  fields: [
    {
      name: 'slides',
      type: 'array',
      label: 'Slides',
      minRows: 1,
      required: true,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Slide Image',
        },
        {
          name: 'header',
          type: 'text',
          label: 'Header',
        },
        {
          name: 'shortDescription',
          type: 'textarea',
          label: 'Short Description',
        },
        linkGroup({
          appearances: ['default', 'outline'],
          overrides: {
            maxRows: 1,
            label: 'Slide Link',
          },
        }),
      ],
    },
    {
      name: 'settings',
      type: 'group',
      label: 'Slider Settings',
      fields: [
        {
          name: 'autoplay',
          type: 'checkbox',
          label: 'Enable Autoplay',
          defaultValue: true,
        },
        {
          name: 'showNavigation',
          type: 'checkbox',
          label: 'Show Navigation Arrows',
          defaultValue: true,
        },
        {
          name: 'showPagination',
          type: 'checkbox',
          label: 'Show Pagination Dots',
          defaultValue: true,
        },
        {
          name: 'loop',
          type: 'checkbox',
          label: 'Enable Autoplay',
          defaultValue: true,
        },
        {
          name: 'contentAlignment',
          type: 'select',
          label: 'Content Alignment',
          options: [
            {
              label: 'Left',
              value: 'left',
            },
            {
              label: 'Center',
              value: 'center',
            },
            {
              label: 'Right',
              value: 'right',
            },
          ],
          defaultValue: 'center',
        },

        {
          name: 'speed',
          type: 'number',
          label: 'Transition Speed (ms)',
          defaultValue: 500,
        },
        {
          name: 'delay',
          type: 'number',
          label: 'Delay Between Slides (ms)',
          defaultValue: 3000,
        },
      ],
    },
  ],
}
