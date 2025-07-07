// export interface User {
//   id: string
//   firstName?: string | null
//   lastName?: string | null
//   roles?: ('admin' | 'user')[] | null
//   updatedAt: string
//   createdAt: string
//   email: string
//   resetPasswordToken?: string | null
//   resetPasswordExpiration?: string | null
//   salt?: string | null
//   hash?: string | null
//   loginAttempts?: number | null
//   lockUntil?: string | null
//   password?: string | null
// }

export type ResetPassword = (args: {
  password: string
  passwordConfirm: string
  token: string
}) => Promise<any>

export type ForgotPassword = (args: { email: string }) => Promise<any>

export type Create = (args: {
  email: string
  firstName: string
  lastName: string
  password: string
}) => Promise<User | null | undefined>

export type Login = (args: { email: string; password: string }) => Promise<User | null | undefined>

export type Logout = () => Promise<void>

export interface AuthContext {
  create: Create
  forgotPassword: ForgotPassword
  login: Login
  logout: Logout
  resetPassword: ResetPassword
  setUser: (user: null | User) => void
  user?: null | User
  setIsLoading: (isLoading: boolean) => void
  isLoading: boolean
}

export interface User {
  avatar:
    | {
        createdAt: string
        filename: string
        filesize: number
        focalX: number
        focalY: number
        height: number
        id: string
        mimeType: string
        thumbnailURL: string | null
        updatedAt: string
        url: string
        width: number
      }
    | undefined
  collection: string
  createdAt: string
  createdOn: string
  creatorType: {
    createdAt: string
    createdBy: string
    createdOn: string
    description: string
    id: string
    key: string
    lastUpdatedBy: string
    lastUpdatedOn: string
    name: string
    updatedAt: string
  }[]
  email: string
  emailVerificationToken: string
  firstName: string
  id: string
  inspiration: string
  lastName: string
  lastUpdatedOn: string
  loginAttempts: number
  prefferedPassword: string
  updatedAt: string
  username: string
  verified: boolean
}
