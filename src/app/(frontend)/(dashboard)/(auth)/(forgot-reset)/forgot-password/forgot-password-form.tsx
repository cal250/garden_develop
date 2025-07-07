import React from 'react'
import { Input } from '@/components/atoms/input'
import { Button } from '@/components/atoms/button'
import { Rexagon } from '@/components/atoms/polygon/rexagon'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { forgotPasswordFormSchema, TForgotPasswordFormSchema } from '@/lib/validators'
import { useAuth } from '@/features/providers/auth'

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = () => {
  const [emailSent, setEmailSent] = React.useState(false)
  const [err, setErr] = React.useState('')

  const { forgotPassword } = useAuth()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<TForgotPasswordFormSchema>({
    resolver: zodResolver(forgotPasswordFormSchema),
  })

  const onSubmit = async (data: TForgotPasswordFormSchema) => {
    console.log(data)

    try {
      setErr('')

      const res = await forgotPassword(data)

      if (res) {
        setEmailSent((prev) => !prev)
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
        <div className="flex flex-col items-center gap-5 md:gap-8">
          <div className="w-full flex flex-col gap-1.5">
            <Input
              {...register('email')}
              placeholder="| email"
              tipAngle={75}
              classNames={{
                input:
                  '!text-[#F2EB2E] text-center text-[14.9px] md:text-[20px] leading-[100%] font-bold placeholder:text-center placeholder:text-[#F2EB2E] focus:bg-transparent focus:outline-none hover:bg-transparent',
                inputWrapper:
                  'w-full sm:w-[545px] md:w-[350px] h-[52px] sm:h-[60px] md:h-[70px] bg-[radial-gradient(circle,_#825FA3_10%,_#100E1A_70%)]',
              }}
              onChange={(e) => setValue('email', e.target.value)}
              stroke="rgb(var(--color-4))"
              strokeWidth={4}
              polygon={Rexagon}
              style={{
                height: '100%',
                background:
                  'radial-gradient(circle, rgb(var(--color-9)) 10%, rgb(var(--color-8)) 80%)',
              }}
            />

            {errors.email && (
              <p className="text-center text-xs sm:text-sm font-bold text-[#FF3B30]">
                {errors.email.message}
              </p>
            )}
          </div>
          {!emailSent && (
            <p className="text-xl sm:text-2xl text-center font-bold text-white">
              enter your email address
            </p>
          )}
        </div>

        <div className="flex flex-col items-center gap-1">
          <div className="w-full flex flex-col gap-1.5">
            <Input
              disabled={true}
              placeholder="| password"
              tipAngle={75}
              classNames={{
                input:
                  'text-[#6B6B6B] text-center text-[14.9px] md:text-[20px] leading-[100%] font-bold placeholder:text-center placeholder:text-[#6B6B6B] focus:bg-transparent focus:outline-none hover:bg-transparent',
                inputWrapper:
                  'w-full sm:w-[545px] md:w-[350px] h-[52px] sm:h-[60px] md:h-[70px] !bg-[#393939]',
              }}
              stroke="#262626"
              strokeWidth={4}
              polygon={Rexagon}
            />
          </div>

          <p className="text-center text-sm md:text-base font-bold text-[#F6AA22]">
            forgot password
          </p>
        </div>
      </div>

      {err && (
        <p className="text-center text-base sm:text-lg md:text-xl font-bold text-[#FF3B30]">
          ooops! try again
        </p>
      )}

      {emailSent ? (
        <div className="w-full flex flex-col items-center justify-center gap-6">
          <p className="text-xl sm:text-2xl text-center font-bold text-white">check your inbox</p>
          <p className="text-base sm:text-[18px] text-center font-semibold text-white">
            we’ve sent you a password recovery link
          </p>
        </div>
      ) : (
        <div className="w-full flex justify-center">
          <Button
            tipAngle={75}
            disabled={isSubmitting}
            type="submit"
            polygon={Rexagon}
            strokeWidth={0}
            variant="solid"
            className="h-[52px] sm:h-[61.26px] w-full sm:w-[381px] sm:max-w-[381px] bg-[#F4EB22] disabled:opacity-40 disabled:hover:!opacity-40"
          >
            <p className="text-xl sm:text-2xl font-bold text-[#100E1A]">
              {isSubmitting ? 'please wait...' : 'send recovery link'}
            </p>
          </Button>
        </div>
      )}
    </form>
  )
}

interface ForgotPasswordFormProps {}
