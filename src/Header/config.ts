import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
          required: false, // Making link optional
        }),
        {
          name: 'subMenuItems',
          label: 'Submenu Items',
          type: 'array',
          fields: [
            link({
              appearances: false,
              required: true,
            }),
          ],
        },
      ],
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo',
      required: true,
      admin: {
        description: 'Site Logo',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
