import React from 'react'
import { Input } from '@/components/atoms/input'
import { Button } from '@/components/atoms/button'
import { Rexagon } from '@/components/atoms/polygon/rexagon'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { resetPasswordFormSchema, TResetPasswordFormSchema } from '@/lib/validators'
import { useAuth } from '@/features/providers/auth'
import { toast } from '@payloadcms/ui'
import handleLoginRedirect from '@/actions/handle-login-redirect'

export const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ token }) => {
  const [err, setErr] = React.useState('')
  const { resetPassword } = useAuth()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<TResetPasswordFormSchema>({
    resolver: zodResolver(resetPasswordFormSchema),
  })

  const onSubmit = async (data: TResetPasswordFormSchema) => {
    console.log(data)
    try {
      setErr('')

      const res = await resetPassword({ ...data, token: token })

      // console.log(res, 'This is res')
      if (res) {
        toast.success('Password reset successful')
        handleLoginRedirect()
      }
    } catch (error) {
      setErr('An error occurred! Please try again')

      // Safely log the error message
      if (error instanceof Error) {
        console.error(error.message, 'Checking the error')
      } else {
        console.error('An unknown error occurred:', error)
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`px-4 w-full flex flex-col items-center ${err ? 'gap-3' : 'gap-10 md:gap-[64px]'} transition-all ease-in-out`}
    >
      <div className="w-full sm:w-fit flex flex-col md:flex-row gap-10 sm:gap-[56px] md:gap-8">
        <div className="w-full flex flex-col gap-1.5">
          <Input
            {...register('password')}
            type="password"
            placeholder="| password"
            tipAngle={75}
            classNames={{
              input:
                '!text-[#F2EB2E] text-center text-[14.9px] md:text-[20px] leading-[100%] font-bold placeholder:text-center placeholder:text-[#F2EB2E] focus:bg-transparent focus:outline-none hover:bg-transparent',
              inputWrapper:
                'w-full sm:w-[545px] md:w-[350px] h-[52px] sm:h-[60px] md:h-[70px] bg-[radial-gradient(circle,_#825FA3_10%,_#100E1A_70%)]',
            }}
            onChange={(e) => setValue('password', e.target.value)}
            stroke="rgb(var(--color-4))"
            strokeWidth={4}
            polygon={Rexagon}
            style={{
              height: '100%',
              background:
                'radial-gradient(circle, rgb(var(--color-9)) 10%, rgb(var(--color-8)) 80%)',
            }}
          />

          {errors.password && (
            <p className="text-center text-xs sm:text-sm font-bold text-[#FF3B30]">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="w-full flex flex-col gap-1.5">
          <Input
            {...register('passwordConfirm')}
            type="password"
            placeholder="| confirm password"
            tipAngle={75}
            classNames={{
              input:
                '!text-[#F2EB2E] text-center text-[14.9px] md:text-[20px] leading-[100%] font-bold placeholder:text-center placeholder:text-[#F2EB2E] focus:bg-transparent focus:outline-none hover:bg-transparent',
              inputWrapper:
                'w-full sm:w-[545px] md:w-[350px] h-[52px] sm:h-[60px] md:h-[70px] bg-[radial-gradient(circle,_#825FA3_10%,_#100E1A_70%)]',
            }}
            onChange={(e) => setValue('passwordConfirm', e.target.value)}
            stroke="rgb(var(--color-4))"
            strokeWidth={4}
            polygon={Rexagon}
            style={{
              height: '100%',
              background:
                'radial-gradient(circle, rgb(var(--color-9)) 10%, rgb(var(--color-8)) 80%)',
            }}
          />
          {errors.passwordConfirm && (
            <p className="text-center text-xs sm:text-sm font-bold text-[#FF3B30]">
              {errors.passwordConfirm.message}
            </p>
          )}
        </div>
      </div>

      {err && (
        <p className="text-center text-base sm:text-lg md:text-xl font-bold text-[#FF3B30]">
          passwords don’t match
        </p>
      )}

      <div className="w-full flex justify-center">
        <Button
          tipAngle={75}
          disabled={isSubmitting}
          type="submit"
          polygon={Rexagon}
          strokeWidth={0}
          variant="solid"
          className="h-[52px] sm:h-[61.26px] w-full sm:w-[381px] sm:max-w-[381px] bg-[#F4EB22]"
        >
          <p className="text-xl sm:text-2xl font-bold text-[#100E1A]">
            {isSubmitting ? 'please wait...' : 'reset password'}
          </p>
        </Button>
      </div>
    </form>
  )
}

interface ResetPasswordFormProps {
  token: string
}
