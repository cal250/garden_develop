import { z } from 'zod'

//Common email schema
const email = z.string().min(1, 'Email is required')

//Schema for sending invitation
export const inviteSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: email,
  prefferedPassword: z
    .string()
    .min(1, 'Password is required')
    .refine((val) => /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/.test(val), {
      message:
        'Must contain a number, a special character, upper case, lower case, and a minimum of 8 characters',
    }),
  inspiration: z.string().min(1, 'Please let us know what inspires you.'),
})

export type TInviteSchema = z.infer<typeof inviteSchema>

//Schema for logging users in
export const logInFormSchema = z.object({
  email: email,
  password: z.string().min(1, 'Password is required'),
})

export type TLogInFormSchema = z.infer<typeof logInFormSchema>

//Schema for forgot password form
export const forgotPasswordFormSchema = z.object({
  email: email,
})

export type TForgotPasswordFormSchema = z.infer<typeof forgotPasswordFormSchema>

//Schema for reset password form
export const resetPasswordFormSchema = z
  .object({
    password: z
      .string()
      .min(1, 'New password is required')
      .refine((val) => /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/.test(val), {
        message:
          'Must contain a number, a special character, upper case, lower case, and a minimum of 8 characters',
      }),
    passwordConfirm: z.string().min(1, 'Confirm Password is required'),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: 'Passwords does not match',
  })

export type TResetPasswordFormSchema = z.infer<typeof resetPasswordFormSchema>

//Schema for username form
export const usernameFormSchema = z.object({
  username: z.string().trim().min(1, 'Username is required'),
})

export type TUsernameFormSchema = z.infer<typeof usernameFormSchema>

//Schema for welcome message form
export const welcomeMessageFormSchema = z.object({
  welcomeMessage: z.string().trim().min(1, 'Welcome message is required'),
})

export type TWelcomeMessageFormSchema = z.infer<typeof welcomeMessageFormSchema>
