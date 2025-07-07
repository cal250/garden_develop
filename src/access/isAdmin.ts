import { Admin } from '../payload-types'
import { Access, FieldAccess } from 'payload'

export const isAdmin: Access<Admin> = ({ req: { user } }) => {
  // Return true or false based on if the user has an admin role
  if (!user || user.collection !== 'admin') {
    return false
  } else {
    return Boolean(user?.role?.includes('admin'))
  }
}
