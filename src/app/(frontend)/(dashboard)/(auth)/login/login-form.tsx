import React from 'react'
import { Input } from '@/components/atoms/input'
import { Button } from '@/components/atoms/button'
import { Rexagon } from '@/components/atoms/polygon/rexagon'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { logInFormSchema, TLogInFormSchema } from '@/lib/validators'
import { useAuth } from '@/features/providers/auth'
import Link from 'next/link'
import handleLoginRedirect from '@/actions/handle-login-redirect'

export const LoginForm: React.FC<LoginFormProps> = () => {
  const { login } = useAuth()

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<TLogInFormSchema>({
    resolver: zodResolver(logInFormSchema),
  })

  const onSubmit = async (data: TLogInFormSchema) => {
    try {
      const res = await login(data)
      if (res) {
        // handleEcosystemRedirect()
        handleLoginRedirect()
      }
    } catch (error) {
      setError('root', {
        message: 'ooops! try again',
      })

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
      className={`w-full flex flex-col items-center ${errors.email ? 'gap-3' : 'gap-5 sm:gap-[28px] md:gap-[40px]'} transition-all ease-in-out`}
    >
      <div className="w-full sm:w-fit flex flex-col md:flex-row gap-10 sm:gap-[56px] md:gap-8">
        <div className="w-full flex flex-col gap-1.5">
          <Input
            {...register('email')}
            placeholder="| email"
            tipAngle={75}
            classNames={{
              input:
                '!text-color-1 text-center text-[14.9px] md:text-[20px] leading-[100%] font-bold placeholder:text-center placeholder:text-color-1 focus:bg-transparent focus:outline-none hover:bg-transparent',
              // inputWrapper:
              //   'w-full sm:w-[545px] md:w-[350px] h-[52px] sm:h-[60px] md:h-[70px] bg-[radial-gradient(107.86%_128.39%_at_88.14%_47.94%,_rgb(var(--color-9))_3.4%,_rgb(var(--color-8))_99.68%)]',
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
        <div className="flex flex-col items-center gap-1">
          <div className="w-full flex flex-col gap-1.5">
            <Input
              {...register('password')}
              type="password"
              placeholder="| password"
              tipAngle={75}
              classNames={{
                input:
                  '!text-color-1 text-center text-[14.9px] md:text-[20px] leading-[100%] font-bold placeholder:text-center placeholder:text-color-1 focus:bg-transparent focus:outline-none hover:bg-transparent',
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

          <Link
            href="/forgot-password"
            className="text-center text-sm md:text-base font-bold text-color-13 opacity-70"
          >
            forgot password
          </Link>
        </div>
      </div>

      {errors.root && (
        <p className="text-center text-base sm:text-lg md:text-xl font-bold text-[#FF3B30]">
          {errors.root.message}
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
          className="h-[52px] w-full max-w-[34rem] sm:h-[61.26px] bg-color-1 disabled:opacity-40 disabled:hover:!opacity-40"
        >
          <p className="text-xl sm:text-2xl font-bold text-color-6 px-4">
            {isSubmitting ? 'signing in...' : 'enter your ⟨inner⟩Garden'}
          </p>
        </Button>
      </div>
    </form>
  )
}

interface LoginFormProps {}
