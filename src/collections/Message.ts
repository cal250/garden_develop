import { isAdmin } from '../access/isAdmin'
import { CollectionConfig } from 'payload'

export const Message: CollectionConfig = {
  slug: 'message',
  admin: {
    group: 'Admin',
  },
  access: {
    // Everyone can create new users
    create: isAdmin,
    // Admins can read all, but any other logged in user can only read themselves
    read: isAdmin,
    // Admins can update all, but any other logged in user can only update themselves
    update: isAdmin,
    // Only admins can delete
    delete: isAdmin,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'email',
      type: 'email',
    },
    {
      name: 'message',
      type: 'textarea',
    },
  ],
}
