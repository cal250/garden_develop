'use client'

import { ArrowLeftIcon, ArrowRightIcon } from '@/components/atoms/icons'
import { Rexagon } from '@/components/atoms/polygon/rexagon'
import { DesignContextProvider } from '@/hooks/use-design-context'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useStepperContentContext } from '@/hooks/use-stepper-content-context'
import { RegularPolygon } from '@/components/atoms/polygon/regular-polygon'
import { twMerge } from 'tailwind-merge'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { TWelcomeMessageFormSchema, welcomeMessageFormSchema } from '@/lib/validators'
import useWindowWidth from '@/hooks/use-window-width'
import { Rectagon } from '@/components/atoms/polygon/rectagon'
import handleUpdateCocoon from '../../../_handlers/handle-update-cocoon'
import { useAuth } from '@/features/providers/auth'
import { Cocoon } from '@/payload-types'
import CommonBodyCard from '@/components/common-body-card'

interface Props {
  specialEco: string
  cocoon: Cocoon
}

const OnboardingBioClientPage = ({ specialEco, cocoon }: Props) => {
  const router = useRouter()
  const [isTextareaVisible, setIsTextareaVisible] = useState(false)

  const { isLoading } = useAuth()

  const { setStepperContent, stepperContent, currentStep, setCurrentStep } =
    useStepperContentContext()

  const width = useWindowWidth()

  function handleBack() {
    router.push(`/${specialEco}/onboarding/name`)
  }

  const {
    register,
    handleSubmit,
    setError,
    getValues,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TWelcomeMessageFormSchema>({
    resolver: zodResolver(welcomeMessageFormSchema),
    defaultValues: { welcomeMessage: cocoon?.welcomeMessage ?? '' },
  })

  async function handleNext(data: TWelcomeMessageFormSchema) {
    const step = (cocoon?.step ?? 0) < 5 ? 5 : (cocoon?.step ?? 0)
    try {
      setError('root', {
        message: '',
      })
      const result = await handleUpdateCocoon({
        payload: { welcomeMessage: data.welcomeMessage, step },
        id: cocoon.id,
      })

      if (result) {
        setStepperContent((prev) =>
          prev.map((step) => {
            if (step.tooltip === 'literacy') {
              return {
                ...step,
                isCompleted: true,
              }
            }
            return step
          }),
        )

        setCurrentStep(step)
        router.push(`/${specialEco}/onboarding/grow`)
      }
    } catch (error) {
      console.log(error)
      setError('root', {
        message: 'Error updating story message!',
      })
    }
  }

  useEffect(() => {
    if (cocoon) {
      reset({ welcomeMessage: cocoon.welcomeMessage ?? '' })
    }
  }, [cocoon, reset])

  return (
    <DesignContextProvider stroke="rgb(var(--color-11))" strokeWidth={4}>
      <CommonBodyCard
        title={['inner', 'Story']}
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
                  `size-[28px] `,
                  isLoading || isSubmitting ? 'text-color-2' : 'text-color-1',
                )}
              />
            </RegularPolygon>
          </div>

          <section className="w-full flex flex-col items-center gap-[30px]">
            <div className="w-full flex flex-col px-5 mt-16 items-center">
              {!isTextareaVisible ? (
                <Rexagon
                  onClick={() => setIsTextareaVisible(true)}
                  tipAngle={75}
                  stroke="rgb(var(--color-4))"
                  strokeWidth={5}
                  className="w-full sm:w-[450px] md:w-[510px] h-[69px] sm:h-[60px] md:h-[69px] flex items-center justify-center before:absolute before:inset-0 before:bg-[radial-gradient(107.86%_128.39%_at_88.14%_47.94%,_rgb(var(--color-2))_3.4%,_rgb(var(--color-8))_99.68%)] before:z-0 after:absolute after:inset-0 after:bg-[#1E2C27] after:opacity-50 after:z-0 cursor-pointer"
                >
                  <p
                    className={twMerge(
                      `w-full relative z-50 h-full flex items-center justify-center text-center text-base md:text-xl leading-[100%] font-bold text-color-1`,
                      getValues('welcomeMessage') && 'justify-center',
                    )}
                  >
                    {getValues('welcomeMessage')
                      ? getValues('welcomeMessage')
                      : '| introduce yourself'}
                  </p>
                </Rexagon>
              ) : (
                <Rectagon
                  className="h-[200px] sm:h-[308px] w-full max-w-[670px] sm:w-[500px] md:w-[670px] flex items-center justify-center z-0 bg-color-13"
                  strokeWidth={2.5}
                  stroke="rgb(var(--color-4))"
                  chamferLength={
                    width < 640
                      ? { x: 30, y: 30 }
                      : width < 1024
                        ? { x: 40, y: 40 }
                        : { x: 60, y: 60 }
                  }
                >
                  <textarea
                    id="welcomeMessage"
                    {...register('welcomeMessage')}
                    autoFocus
                    className="w-full relative z-50 h-full text-center text-base leading-[22px] font-bold !bg-transparent placeholder:text-center focus:!bg-transparent focus:outline-none hover:!bg-transparent px-10 py-[30px] md:px-20  text-color-3"
                    // rows={3}
                  />
                </Rectagon>
              )}
              {errors.welcomeMessage && (
                <p className="text-center text-xs sm:text-sm font-bold text-[#FF3B30]">
                  {errors.welcomeMessage.message}
                </p>
              )}
            </div>

            <p className="max-w-[500px] font-bold text-center text-sm sm:text-base px-3 text-color-13">
              Your unique presence is a gift to us all. <br /> We’re grateful you’ve arrived.
            </p>

            {errors.root && (
              <p className="text-center text-base sm:text-lg md:text-xl font-bold text-[#FF3B30]">
                {errors.root.message}
              </p>
            )}
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
                if (index === 3) {
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

export default OnboardingBioClientPage
