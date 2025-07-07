import React, { useEffect } from 'react'
import { Input, Textarea } from '@/components/atoms/input'
import { Rectagon } from '@/components/atoms/polygon/rectagon'
import { Button } from '@/components/atoms/button'
import { motion } from 'framer-motion'
import { Rexagon } from '@/components/atoms/polygon/rexagon'
import useWindowWidth from '@/hooks/use-window-width'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { inviteSchema, TInviteSchema } from '@/lib/validators'

export const NewInviteForm: React.FC<NewInviteFormProps> = () => {
  const [expanded, setExpanded] = React.useState(false)
  const [messageSent, setMessageSent] = React.useState(false)
  const [inviteErr, setInviteErr] = React.useState('')
  const width = useWindowWidth()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<TInviteSchema>({
    resolver: zodResolver(inviteSchema),
  })

  const onSubmit = async (data: TInviteSchema) => {
    try {
      setInviteErr('')
      const res = await fetch('/api/invites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await res.json()

      if (result && result.message.includes('successfully')) {
        setMessageSent(true)
      }
    } catch (error) {
      setInviteErr('Error sending an invite')

      // Safely log the error message
      if (error instanceof Error) {
        console.log(error.message)
      } else {
        console.log('An unknown error occurred:', error)
      }
    }
  }

  return (
    <>
      {messageSent ? (
        <p className="w-full px-3 pt-10 md:pt-20 text-center text-[22px] md:text-[32px] leading-[150%] font-bold">
          Invite successfully sent.
        </p>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`px-4 flex flex-col  ${expanded ? 'gap-10 sm:gap-[69px]' : 'gap-0'}`}
        >
          <div className="flex flex-col sm:flex-row gap-10">
            <div className="w-full flex flex-col gap-1.5">
              <Input
                {...register('firstName')}
                placeholder="| first name"
                classNames={{
                  input:
                    'text-white text-center text-[14px] md:text-[22px] leading-[150%] font-bold placeholder:text-center placeholder:text-white focus:bg-[#6E947A] focus:outline-none hover:bg-[#6E947A]',
                  inputWrapper: 'h-[50px] sm:h-[83px] !bg-[#6E947A] text-white',
                }}
                chamferLength={width < 640 ? { x: 20, y: 15 } : { x: 40, y: 30 }}
                onFocus={() => setExpanded(true)}
                onChange={(e) => setValue('firstName', e.target.value)}
                stroke="#95B69B"
                strokeWidth={2}
                polygon={Rectagon}
              />

              {errors.firstName && (
                <p className="text-center text-xs sm:text-sm font-bold text-[#FF3B30]">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div className="w-full flex flex-col gap-1.5">
              <Input
                {...register('lastName')}
                placeholder="| last name"
                classNames={{
                  input:
                    'text-white text-center text-[14px] md:text-[22px] leading-[150%] font-bold placeholder:text-center placeholder:text-white focus:bg-[#6E947A] focus:outline-none hover:bg-[#6E947A]',
                  inputWrapper: 'h-[50px] sm:h-[83px] !bg-[#6E947A] ',
                }}
                chamferLength={width < 640 ? { x: 20, y: 15 } : { x: 40, y: 30 }}
                onFocus={() => setExpanded(true)}
                onChange={(e) => setValue('lastName', e.target.value)}
                stroke="#95B69B"
                strokeWidth={2}
                polygon={Rectagon}
              />
              {errors.lastName && (
                <p className="text-center text-xs sm:text-sm font-bold text-[#FF3B30]">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>
          <motion.div
            className="flex flex-col gap-[69px] overflow-hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={expanded ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <div className="flex flex-col sm:flex-row gap-10">
              <div className="w-full flex flex-col gap-1.5">
                <Input
                  {...register('email')}
                  placeholder="| email"
                  type="email"
                  classNames={{
                    input:
                      'text-white text-center text-[14px] md:text-[22px] leading-[150%] font-bold placeholder:text-center placeholder:text-white focus:bg-[#6E947A] focus:outline-none hover:bg-[#6E947A]',
                    inputWrapper: 'h-[50px] sm:h-[83px] !bg-[#6E947A] text-white',
                  }}
                  chamferLength={width < 640 ? { x: 20, y: 15 } : { x: 40, y: 30 }}
                  onChange={(e) => setValue('email', e.target.value)}
                  stroke="#95B69B"
                  strokeWidth={2}
                  polygon={Rectagon}
                />
                {errors.email && (
                  <p className="text-center text-xs sm:text-sm font-bold text-[#FF3B30]">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="w-full flex flex-col gap-1.5">
                <Input
                  {...register('prefferedPassword')}
                  placeholder="| Password"
                  type="password"
                  classNames={{
                    input:
                      'text-white text-center text-[14px] md:text-[22px] leading-[150%] font-bold placeholder:text-center placeholder:text-white focus:bg-[#6E947A] focus:outline-none hover:bg-[#6E947A]',
                    inputWrapper: 'h-[50px] sm:h-[83px] !bg-[#6E947A] text-white',
                  }}
                  chamferLength={width < 640 ? { x: 20, y: 15 } : { x: 40, y: 30 }}
                  onChange={(e) => setValue('prefferedPassword', e.target.value)}
                  stroke="#95B69B"
                  strokeWidth={2}
                  polygon={Rectagon}
                />
                {errors.prefferedPassword && (
                  <p className="text-center text-xs sm:text-sm font-bold text-[#FF3B30]">
                    {errors.prefferedPassword.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col items-start gap-1.5">
              <Textarea
                {...register('inspiration')}
                placeholder={`we love meeting new people. \n what inspires you to journey with us? \n | \n`}
                classNames={{
                  input:
                    'min-h-[150px] sm:min-h-[200px] text-white text-center text-[14px] md:text-[22px] leading-[150%] font-bold placeholder:text-center p-[28px] placeholder:text-white focus:bg-[#6E947A] focus:outline-none hover:bg-[#6E947A]',
                  inputWrapper: 'h-[150px] sm:h-[200px] !bg-[#6E947A] text-white',
                }}
                rows={7}
                chamferLength={width < 640 ? { x: 20, y: 15 } : { x: 40, y: 30 }}
                onChange={(e) => setValue('inspiration', e.target.value)}
                stroke="#FFF3D1"
                strokeWidth={3}
                polygon={Rectagon}
              />

              {errors.inspiration && (
                <p className="text-center text-xs sm:text-sm font-bold text-[#FF3B30]">
                  {errors.inspiration.message}
                </p>
              )}
            </div>

            <div className="flex justify-center mt-[-100px] sm:mt-[-108px]">
              <Button
                type="submit"
                polygon={Rexagon}
                strokeWidth={0}
                tipAngle={75}
                variant="bordered"
                stroke="white"
                className="h-[60px] sm:h-[73.5px] w-[280px] sm:w-[377px]  bg-[#FFF3D1]"
              >
                <p className="text-[22px] sm:text-[36px] font-extrabold text-[#476750]">
                  {isSubmitting ? 'sending...' : 'invite me'}
                </p>
              </Button>
            </div>

            {inviteErr && (
              <p className="text-center text-xs sm:text-sm font-bold text-[#FF3B30]">{inviteErr}</p>
            )}
          </motion.div>
        </form>
      )}
    </>
  )
}

interface NewInviteFormProps {}
