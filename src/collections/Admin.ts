import { isAdmin } from '../access/isAdmin'
import { CollectionConfig } from 'payload'

const Admin: CollectionConfig = {
  slug: 'admin',
  auth: true,
  admin: {
    useAsTitle: 'email',
    group: 'Admin',
  },
  access: {
    // Only admins can create admins
    create: isAdmin,
    // Only admins can read admins
    read: isAdmin,
    // Only admins can update admins
    update: isAdmin,
    // Only admins can delete admins
    delete: isAdmin,
  },
  versions: {
    maxPerDoc: 10,
  },
  fields: [
    {
      name: 'role',
      type: 'radio',
      options: ['admin'],
      defaultValue: 'admin',
      required: true,
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}

export default Admin
