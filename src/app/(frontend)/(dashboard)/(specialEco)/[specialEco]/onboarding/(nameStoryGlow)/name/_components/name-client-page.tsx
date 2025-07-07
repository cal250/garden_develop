'use client'

import { ArrowLeftIcon, ArrowRightIcon } from '@/components/atoms/icons'
import { Rexagon } from '@/components/atoms/polygon/rexagon'
import { DesignContextProvider } from '@/hooks/use-design-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useStepperContentContext } from '@/hooks/use-stepper-content-context'
import { RegularPolygon } from '@/components/atoms/polygon/regular-polygon'
import { twMerge } from 'tailwind-merge'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { TUsernameFormSchema, usernameFormSchema } from '@/lib/validators'
import { useAuth } from '@/features/providers/auth'
import handleUpdateCocoon from '../../../_handlers/handle-update-cocoon'
import { Cocoon } from '@/payload-types'
import CommonBodyCard from '@/components/common-body-card'

interface props {
  specialEco: string
  cocoon: Cocoon
}

const OnboardingNameClientPage = ({ specialEco, cocoon }: props) => {
  const router = useRouter()

  const { user, setUser, isLoading } = useAuth()

  const { setStepperContent, stepperContent, currentStep, setCurrentStep } =
    useStepperContentContext()

  function handleBack() {
    router.push(`/${specialEco}/onboarding/zone`)
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TUsernameFormSchema>({
    resolver: zodResolver(usernameFormSchema),
    defaultValues: { username: user?.username },
  })

  async function handleNext(data: TUsernameFormSchema) {
    try {
      if (user) {
        const res = await fetch(`/api/creator/${user?.id}`, {
          method: 'PATCH',
          body: JSON.stringify({ username: data.username }),
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        })

        const userResult = await res.json()
        // console.log(userResult, 'This is user result')
        const payload = { step: (cocoon?.step ?? 0) < 4 ? 4 : cocoon?.step }
        const result = await handleUpdateCocoon({ payload, id: cocoon.id })

        if (result) {
          setStepperContent((prev) =>
            prev.map((step) => {
              if (step.tooltip === 'name') {
                return {
                  ...step,
                  isCompleted: true,
                }
              }
              return step
            }),
          )

          setCurrentStep((cocoon?.step ?? 0) < 4 ? 4 : (cocoon?.step ?? 0))

          setUser(userResult.doc)
          router.push(`/${specialEco}/onboarding/bio`)
        }
      }
    } catch (error) {
      // Safely log the error message
      if (error instanceof Error) {
        console.log(error.message, 'Checking the error')
        // setLoginErr('Error logging in')
      } else {
        console.log('An unknown error occurred:', error)
      }
    }
  }

  useEffect(() => {
    if (user) {
      reset(user)
    }
  }, [user, reset])

  return (
    <DesignContextProvider stroke="rgb(var(--color-11))" strokeWidth={4}>
      <CommonBodyCard
        title={['inner', 'Name']}
        headerCardType="bracketed"
        style={{
          zIndex: 20,
        }}
        className="mt-[-55px] sm:mt-[-70px] md:mt-[-80px] mb-[60px] md:mb-0 md:pb-[100px] h-full flex-grow w-full justify-start"
      >
        <form
          onSubmit={handleSubmit(handleNext)}
          className="h-full w-full flex flex-col gap-10 items-center justify-between relative"
        >
          <div
            className="hidden absolute m-auto w-full md:flex justify-between z-40"
            style={{ maxWidth: '820px', transform: `translateY(calc(-50% - 2px))` }}
          >
            <RegularPolygon
              as="button"
              type="button"
              disabled={isLoading || isSubmitting}
              sides={8}
              className="flex items-center gap-7 size-[85px] bg-color-4 disabled:bg-color-5 group"
              stroke={isLoading || isSubmitting ? 'rgb(var(--color-2))' : 'rgb(var(--color-1))'}
              onClick={handleBack}
              style={{
                transform: `translateX(calc(-50% - 8px))`,
              }}
            >
              <ArrowLeftIcon
                className={twMerge(
                  `size-[28px] `,
                  isLoading || isSubmitting ? 'text-color-2' : 'text-color-1',
                )}
              />
            </RegularPolygon>
            <RegularPolygon
              as="button"
              type="submit"
              disabled={isLoading || isSubmitting}
              sides={8}
              className="flex items-center gap-7 size-[85px] bg-color-4 disabled:bg-color-5 group translate-x-1/2"
              stroke={isLoading || isSubmitting ? 'rgb(var(--color-2))' : 'rgb(var(--color-1))'}
              // onClick={handleNext}
              style={{
                transform: `translateX(calc(50% + 8px))`,
              }}
            >
              <ArrowRightIcon
                className={twMerge(
                  `size-[28px]`,
                  isLoading || isSubmitting ? 'text-color-2' : 'text-color-1',
                )}
              />
            </RegularPolygon>
          </div>

          <section className="w-full flex flex-col items-center gap-[30px]">
            <div className="w-full flex flex-col items-center px-5 mt-16">
              <Rexagon
                tipAngle={75}
                stroke="rgb(var(--color-4))"
                strokeWidth={5}
                className="w-full sm:w-[450px] md:w-[510px] h-[69px] sm:h-[60px] md:h-[69px] flex items-center justify-center before:absolute before:inset-0 before:bg-[radial-gradient(107.86%_128.39%_at_88.14%_47.94%,_rgb(var(--color-2))_3.4%,_rgb(var(--color-8))_99.68%)] before:z-0 after:absolute after:inset-0 after:bg-[#1E2C27] after:opacity-50 after:z-0"
              >
                <input
                  {...register('username')}
                  type="text"
                  disabled={isLoading || isSubmitting}
                  placeholder="| how would you like to be known?"
                  className="w-full relative z-50 h-full text-color-1 text-center text-base md:text-xl leading-[100%] font-bold !bg-transparent placeholder:text-center placeholder:text-color-1 focus:!bg-transparent focus:outline-none hover:!bg-transparent"
                />
              </Rexagon>
              {errors.username && (
                <p className="text-center text-xs sm:text-sm font-bold text-[#FF3B30]">
                  {errors.username.message}
                </p>
              )}
            </div>

            <p className="max-w-[400px] font-bold text-center text-sm sm:text-base px-3 text-color-13">
              Keep your name or, if you feel adventurous, give yourself a new identity. 
            </p>
          </section>

          <section className="z-40 p-5 flex md:hidden w-full items-center justify-between">
            {/* <button
                type="button"
                onClick={handleBack}
                disabled={isLoading || isSubmitting}
                className="md:hidden flex disabled:opacity-30"
              >
                <ChevronLeftIcon
                  className="h-[33.76px] w-[17.67px]"
                  fill="rgb(var(--color-2))"
                  strokeWidth={0}
                />
              </button> */}

            <RegularPolygon
              as="button"
              type="button"
              disabled={isLoading || isSubmitting}
              sides={8}
              className="flex items-center gap-7 size-10 bg-color-4 disabled:bg-color-5 group"
              stroke={isLoading || isSubmitting ? 'rgb(var(--color-2))' : 'rgb(var(--color-1))'}
              strokeWidth={2}
              onClick={handleBack}
            >
              <ArrowLeftIcon
                className={twMerge(
                  `size-3 `,
                  isLoading || isSubmitting ? 'text-color-2' : 'text-color-1',
                )}
              />
            </RegularPolygon>

            <Rexagon
              className="bg-color-1 pl-4 pr-4 h-[37.81px] z-10 flex items-center gap-1"
              tipAngle={100}
              strokeWidth={0}
              overflow={true}
            >
              {stepperContent.map((stepper, index) => {
                if (index === 2) {
                  return (
                    <div key={index} className="relative">
                      <RegularPolygon
                        sides={6}
                        className="w-[50px] h-[38px] bg-color-4"
                        stroke="rgb(var(--color-4))"
                        strokeWidth={0}
                      >
                        <span className="text-color-1 font-black text-[20px]">{index + 1}</span>
                      </RegularPolygon>
                      <span className="absolute top-[-15px] left-1/2 -translate-x-1/2 ">
                        <p className="text-color-1 font-black text-xs leading-[100%]">
                          {stepper.tooltip}
                        </p>
                      </span>
                    </div>
                  )
                }

                return (
                  <button
                    type="button"
                    onClick={() => router.push(`${stepper.path}`)}
                    key={index}
                    disabled={!stepper.isCompleted && currentStep < index + 1}
                    className={twMerge(
                      'z-50 w-8 h-8 flex disabled:opacity-30 cursor-pointer items-center justify-center text-color-2 font-black text-[20px]',
                    )}
                  >
                    {index + 1}
                  </button>
                )
              })}
            </Rexagon>

            <RegularPolygon
              as="button"
              type="submit"
              disabled={isLoading || isSubmitting}
              sides={8}
              className="flex items-center gap-7 size-10 bg-color-4 disabled:bg-color-5 group"
              stroke={isLoading || isSubmitting ? 'rgb(var(--color-2))' : 'rgb(var(--color-1))'}
              strokeWidth={2}
              // onClick={handleNext}
            >
              <ArrowRightIcon
                className={twMerge(
                  `size-3 `,
                  isLoading || isSubmitting ? 'text-color-2' : 'text-color-1',
                )}
              />
            </RegularPolygon>

            {/* <button
                type="submit"
                disabled={isLoading || isSubmitting}
                className="md:hidden flex disabled:opacity-30"
              >
                <ChevronRightIcon
                  className="h-[33.76px] w-[17.67px]"
                  fill="rgb(var(--color-2))"
                  strokeWidth={0}
                />
              </button> */}
          </section>
        </form>
      </CommonBodyCard>
    </DesignContextProvider>
  )
}

export default OnboardingNameClientPage
