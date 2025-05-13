import type { Block } from 'payload'

export const PageHeaderBlock: Block = {
  slug: 'pageHeaderBlock',
  interfaceName: 'PageHeaderBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Image',
    },
    {
      name: 'richText',
      type: 'richText',
      label: 'Rich Text Content',
    },
  ],
}
