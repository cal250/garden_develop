import { Access } from 'payload'

export const isAdminOrSelf: Access = ({ req: { user } }) => {
  // Need to be logged in
  if (user) {
    // If user has role of 'admin'
    if (user?.collection === 'admin' && user?.role?.includes('admin')) {
      return true
    }
    //!user || user.collection !== 'admin'

    // If any other type of user, only provide access to themselves
    return {
      id: {
        equals: user.id,
      },
    }
  }

  // Reject everyone else
  return false
}
