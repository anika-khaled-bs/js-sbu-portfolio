import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { revalidateContactDetails, revalidateDelete } from './hooks/revalidateContactDetails'
import { enforceUniqueActive } from './hooks/enforceUniqueActive'

export const ContactDetails: CollectionConfig = {
  slug: 'contact-details',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['email', 'phone', 'addressLine1', 'isActive', 'updatedAt'],
    group: 'Content',
    useAsTitle: 'email',
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
    },
    {
      name: 'time',
      type: 'text',
      required: true,
      label: 'Contact Time',
    },
    {
      name: 'addressLine1',
      type: 'text',
      required: true,
    },
    {
      name: 'addressLine2',
      type: 'text',
    },
    {
      name: 'isActive',
      type: 'checkbox',
      label: 'Active Contact Details',
      admin: {
        description: 'Is this the active set of contact details to display?',
        position: 'sidebar',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
  ],
  hooks: {
    beforeChange: [
      // Use the hook directly - it will properly receive all required parameters
      enforceUniqueActive,
    ],
    afterChange: [revalidateContactDetails],
    afterDelete: [revalidateDelete],
  },
}
