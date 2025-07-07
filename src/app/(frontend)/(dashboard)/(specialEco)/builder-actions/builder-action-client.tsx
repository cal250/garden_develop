'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  LeftBracketIcon,
  RightBracketIcon,
} from '@/components/atoms/icons'
import { RegularOctagon } from '@/components/atoms/polygon/regular-octagon'
import { DesignContextProvider } from '@/hooks/use-design-context'
// import { useStepperContentContext } from '@/hooks/use-stepper-content-context'
import { useResponsiveValue } from '@/hooks/use-responsive-value'
import { twMerge } from 'tailwind-merge'
import { RegularPolygon } from '@/components/atoms/polygon/regular-polygon'
import { Specialeco } from '@/payload-types'
import { CustomHeaderCard } from '@/features/layout/footer/custom-header-card'
import CommonBodyCard from '@/components/common-body-card'
import { Rexagon } from '@/components/atoms/polygon/rexagon'
import { useBuilderStepperStore } from '@/stores/builder-stepper-store'

interface props {
  specialEcosystems: Specialeco[]
}
const BuilderActionClientPage = ({ specialEcosystems }: props) => {
  const [specialEco, setSpecialEco] = useState(specialEcosystems[0].id)
  const [hoveredSeason, setHoveredSeason] = useState<string | null>(null)

  // const { setStepperContent, stepperContent, currentStep, setCurrentStep } =
  //   useStepperContentContext()

  const {
    setBuilderStepperContent,
    builderStepperContent,
    currentBuilderStep,
    setCurrentBuilderStep,
    initializeStepper,
  } = useBuilderStepperStore()

  const octagonSize = useResponsiveValue({
    base: 117,
    sm: 150,
    md: 224,
  })
  const innerOctagonSize = useResponsiveValue<string | number>({
    base: 58,
    sm: 80,
    md: 111,
  })

  const router = useRouter()

  async function handleNext() {
    const currentSteppers: Stepper[] = builderStepperContent

    const updatedSteppers = currentSteppers.map((step: Stepper) => {
      if (step.tooltip === 'actions') {
        return {
          ...step,
          isCompleted: true,
        }
      }
      return step
    })

    setBuilderStepperContent(updatedSteppers)

    setCurrentBuilderStep(2)

    router.push(`/${specialEco}/builder/soil`)
  }

  useEffect(() => {
    initializeStepper(specialEco)
  }, [specialEco])

  return (
    <div className="flex size-full flex-col gap-10 md:gap-[84px] items-center">
      <div className="grid grid-cols-2 gap-7 md:gap-9 mt-[0px] md:mt-[30px] z-20">
        <button
          onClick={() => setSpecialEco(specialEcosystems[0].id)}
          className={twMerge(`w-fit flex flex-col items-center gap-0`)}
          onMouseEnter={() => setHoveredSeason('spring')}
          onMouseLeave={() => setHoveredSeason(null)}
        >
          <DesignContextProvider
            stroke={
              specialEco === specialEcosystems[0].id || hoveredSeason === 'spring'
                ? 'rgb(var(--color-1))'
                : 'rgb(var(--color-2))'
            }
            strokeWidth={4}
          >
            <RegularOctagon
              className="relative flex flex-col items-center justify-center"
              style={{
                width: octagonSize,
                background:
                  'conic-gradient(from 89.99deg at 50% 50%, rgb(var(--color-8)) 0deg, rgb(var(--color-8)) 212.4deg, rgb(var(--color-9)) 313.2deg, rgb(var(--color-8)) 360deg)',
              }}
            >
              <RegularOctagon
                className="flex flex-col"
                style={{
                  width: innerOctagonSize,
                }}
              >
                <img
                  alt="banner"
                  src={'/assets/onboarding/action/seeds.webp'}
                  className="h-full object-cover object-bottom"
                />
              </RegularOctagon>
            </RegularOctagon>
          </DesignContextProvider>

          <section className="w-full mt-[-25px] md:mt-[-35px] flex flex-col gap-3 items-center">
            <CustomHeaderCard
              tipAngle={75}
              strokeWidth={3}
              stroke={
                specialEco === specialEcosystems[0].id || hoveredSeason === 'spring'
                  ? 'rgb(var(--color-1))'
                  : 'rgb(var(--color-2))'
              }
              style={{
                background:
                  'linear-gradient(337.13deg, rgb(var(--color-9)) 3.4%, rgb(var(--color-8)) 99.7%)',
              }}
              className="w-full h-[26px] md:h-[45px]"
            >
              <div className=" items-center gap-0 flex">
                <LeftBracketIcon
                  className="h-3 md:h-4 w-2 md:w-3"
                  fill="rgb(var(--color-13))"
                  strokeWidth={2}
                />
                <p className="text-color-1 text-[10px] md:text-lg leading-[100%] font-black">
                  inner
                </p>
                <RightBracketIcon
                  className="h-3 md:h-4 w-2 md:w-3"
                  fill="rgb(var(--color-13))"
                  strokeWidth={2}
                />
                <p className="text-color-13 text-[10px] md:text-lg leading-[100%] font-black">
                  Seeds
                </p>
              </div>
            </CustomHeaderCard>

            <p className="text-color-13 text-[9px] md:text-[11px] leading-[15px] text-center font-extrabold">
              what are you planting?
            </p>
          </section>
        </button>

        <button
          onClick={() => setSpecialEco(specialEcosystems[1].id)}
          className={twMerge(`w-fit flex flex-col items-center gap-0`)}
          onMouseEnter={() => setHoveredSeason('summer')}
          onMouseLeave={() => setHoveredSeason(null)}
        >
          <DesignContextProvider
            stroke={
              specialEco === specialEcosystems[1].id || hoveredSeason === 'summer'
                ? 'rgb(var(--color-1))'
                : 'rgb(var(--color-2))'
            }
            strokeWidth={4}
          >
            <RegularOctagon
              className="relative flex flex-col items-center justify-center"
              style={{
                width: octagonSize,
                background:
                  'conic-gradient(from 89.99deg at 50% 50%, rgb(var(--color-8)) 0deg, rgb(var(--color-8)) 212.4deg, rgb(var(--color-9)) 313.2deg, rgb(var(--color-8)) 360deg)',
              }}
            >
              <RegularOctagon
                className="flex flex-col"
                style={{
                  width: innerOctagonSize,
                }}
              >
                <img
                  alt="banner"
                  src={'/assets/onboarding/action/weeds.webp'}
                  className="h-full object-cover object-bottom"
                />
              </RegularOctagon>
            </RegularOctagon>
          </DesignContextProvider>

          <section className="w-full mt-[-25px] md:mt-[-35px] flex flex-col gap-3 items-center">
            <CustomHeaderCard
              tipAngle={75}
              strokeWidth={3}
              stroke={
                specialEco === specialEcosystems[1].id || hoveredSeason === 'summer'
                  ? 'rgb(var(--color-1))'
                  : 'rgb(var(--color-2))'
              }
              style={{
                background: `linear-gradient(337.13deg, rgb(var(--color-9)) 3.4%, rgb(var(--color-8)) 99.7%)`,
              }}
              className="w-full h-[26px] md:h-[45px]"
            >
              <div className=" items-center gap-0 flex">
                <LeftBracketIcon
                  className="h-3 md:h-4 w-2 md:w-3"
                  fill="rgb(var(--color-13))"
                  strokeWidth={2}
                />
                <p className="text-color-1 text-[10px] md:text-lg leading-[100%] font-black">
                  inner
                </p>
                <RightBracketIcon
                  className="h-3 md:h-4 w-2 md:w-3"
                  fill="rgb(var(--color-13))"
                  strokeWidth={2}
                />
                <p className="text-color-13 text-[10px] md:text-lg leading-[100%] font-black">
                  Weeds
                </p>
              </div>
            </CustomHeaderCard>

            <p className="text-color-13 text-[9px] md:text-[11px] leading-[15px] text-center font-extrabold">
              what are you plucking?
            </p>
          </section>
        </button>

        {/* <button
          onClick={() => setSpecialEco(specialEcosystems[2].id)}
          className={twMerge(`w-fit flex flex-col items-center gap-0`)}
          onMouseEnter={() => setHoveredSeason('fall')}
          onMouseLeave={() => setHoveredSeason(null)}
        >
          <DesignContextProvider
            stroke={
              specialEco === specialEcosystems[2].id || hoveredSeason === 'fall'
                ? 'rgb(var(--color-1))'
                : 'rgb(var(--color-2))'
            }
            strokeWidth={4}
          >
            <RegularOctagon
              className="relative flex flex-col items-center justify-center"
              style={{
                width: octagonSize,
                background:
                  'conic-gradient(from 89.99deg at 50% 50%, rgb(var(--color-8)) 0deg, rgb(var(--color-8)) 212.4deg, rgb(var(--color-9)) 313.2deg, rgb(var(--color-8)) 360deg)',
              }}
            >
              <RegularOctagon
                className="flex flex-col"
                style={{
                  width: innerOctagonSize,
                }}
              >
                <img
                  alt="banner"
                  src={'/assets/onboarding/action/sprouts.webp'}
                  className="h-full object-cover object-bottom"
                />
              </RegularOctagon>
            </RegularOctagon>
          </DesignContextProvider>

          <section className="w-full mt-[-25px] md:mt-[-35px] flex flex-col gap-3 items-center">
            <CustomHeaderCard
              tipAngle={75}
              strokeWidth={3}
              stroke={
                specialEco === specialEcosystems[2].id || hoveredSeason === 'fall'
                  ? 'rgb(var(--color-1))'
                  : 'rgb(var(--color-2))'
              }
              style={{
                background:
                  'linear-gradient(337.13deg, rgb(var(--color-9)) 3.4%, rgb(var(--color-8)) 99.7%)',
              }}
              className="w-full h-[26px] md:h-[45px]"
            >
              <div className=" items-center gap-0 flex">
                <LeftBracketIcon
                  className="h-3 md:h-4 w-2 md:w-3"
                  fill="rgb(var(--color-13))"
                  strokeWidth={2}
                />
                <p className="text-color-1 text-[10px] md:text-lg leading-[100%] font-black">
                  inner
                </p>
                <RightBracketIcon
                  className="h-3 md:h-4 w-2 md:w-3"
                  fill="rgb(var(--color-13))"
                  strokeWidth={2}
                />
                <p className="text-color-13 text-[10px] md:text-lg leading-[100%] font-black">
                  Sprouts
                </p>
              </div>
            </CustomHeaderCard>

            <p className="text-color-13 text-[9px] md:text-[11px] leading-[15px] text-center font-extrabold">
              what are you growing?
            </p>
          </section>
        </button> */}

        {/* <button
          onClick={() => setSpecialEco(specialEcosystems[3].id)}
          className={twMerge(`w-fit flex flex-col items-center gap-0`)}
          onMouseEnter={() => setHoveredSeason('winter')}
          onMouseLeave={() => setHoveredSeason(null)}
        >
          <DesignContextProvider
            stroke={
              specialEco === specialEcosystems[3].id || hoveredSeason === 'winter'
                ? 'rgb(var(--color-1))'
                : 'rgb(var(--color-2))'
            }
            strokeWidth={4}
          >
            <RegularOctagon
              className="relative flex flex-col items-center justify-center"
              style={{
                width: octagonSize,
                background:
                  'conic-gradient(from 89.99deg at 50% 50%, rgb(var(--color-8)) 0deg, rgb(var(--color-8)) 212.4deg, rgb(var(--color-9)) 313.2deg, rgb(var(--color-8)) 360deg)',
              }}
            >
              <RegularOctagon
                className="flex flex-col"
                style={{
                  width: innerOctagonSize,
                }}
              >
                <img
                  alt="banner"
                  src={'/assets/onboarding/action/blooms.webp'}
                  className="h-full object-cover object-bottom"
                />
              </RegularOctagon>
            </RegularOctagon>
          </DesignContextProvider>

          <section className="w-full mt-[-25px] md:mt-[-35px] flex flex-col gap-3 items-center">
            <CustomHeaderCard
              tipAngle={75}
              strokeWidth={3}
              stroke={
                specialEco === specialEcosystems[3].id || hoveredSeason === 'winter'
                  ? 'rgb(var(--color-1))'
                  : 'rgb(var(--color-2))'
              }
              style={{
                background:
                  'linear-gradient(337.13deg, rgb(var(--color-9)) 3.4%, rgb(var(--color-8)) 99.7%)',
              }}
              className="w-full h-[26px] md:h-[45px]"
            >
              <div className=" items-center gap-0 flex">
                <LeftBracketIcon
                  className="h-3 md:h-4 w-2 md:w-3"
                  fill="rgb(var(--color-13))"
                  strokeWidth={2}
                />
                <p className="text-color-1 text-[10px] md:text-lg leading-[100%] font-black">
                  inner
                </p>
                <RightBracketIcon
                  className="h-3 md:h-4 w-2 md:w-3"
                  fill="rgb(var(--color-13))"
                  strokeWidth={2}
                />
                <p className="text-color-13 text-[10px] md:text-lg leading-[100%] font-black">
                  Blooms
                </p>
              </div>
            </CustomHeaderCard>

            
              

              <p className="text-color-13 text-[9px] md:text-[11px] leading-[15px] text-center font-extrabold">
                what&apos;s blooming in XR?
              </p>
          
          </section>
        </button> */}
      </div>

      <DesignContextProvider stroke="rgb(var(--color-11))" strokeWidth={4}>
        <CommonBodyCard
          title={['inner', 'Action']}
          headerCardType="bracketed"
          className="mb-[60px] md:mb-0 md:pb-[70px] h-full flex-grow w-full justify-start"
        >
          <section className="h-full w-full flex flex-col gap-10 items-center justify-between relative">
            <div
              className="hidden absolute m-auto w-full md:flex justify-between z-40"
              style={{ maxWidth: '820px', transform: `translateY(calc(-50% - 2px))` }}
            >
              <RegularPolygon
                as="button"
                disabled={true}
                sides={8}
                className="flex items-center gap-7 size-[85px] bg-color-4 disabled:bg-color-5 disabled:opacity-0 group"
                stroke={'rgb(var(--color-2))'}
                style={{
                  transform: `translateX(calc(-50% - 8px))`,
                }}
              >
                <ArrowLeftIcon className="size-[28px] text-color-2" />
              </RegularPolygon>
              <RegularPolygon
                as="button"
                sides={8}
                className="flex items-center gap-7 size-[85px] bg-color-4 disabled:bg-color-5 group translate-x-1/2"
                stroke={'rgb(var(--color-1))'}
                onClick={handleNext}
                style={{
                  transform: `translateX(calc(50% + 8px))`,
                }}
              >
                <ArrowRightIcon className="size-[28px] text-color-1" />
              </RegularPolygon>
            </div>

            <section className="w-full mt-[70px] md:mt-[80px] flex flex-col items-center gap-8">
              <p className="max-w-[514px] mx-4 text-center text-base font-bold text-color-13">
                Creating your own Wellgorithm — whether a seed or weed — is your first act of
                freedom. You are declaring that you have the right and the authority and the ability
                to be the master gardener of your psyche.
              </p>
            </section>

            <section className="z-40 p-5 flex md:hidden w-full items-center justify-between">
              <RegularPolygon
                as="button"
                type="button"
                disabled={true}
                sides={8}
                className="flex items-center gap-7 size-10 bg-color-4 disabled:bg-color-5 group disabled:opacity-0"
                stroke={'rgb(var(--color-1))'}
                strokeWidth={2}
              >
                <ArrowLeftIcon className="size-3 text-color-1" />
              </RegularPolygon>

              <Rexagon
                className="bg-color-1 pl-0 pr-4 h-[37.81px] z-10 flex items-center gap-1"
                tipAngle={100}
                strokeWidth={0}
                overflow={true}
              >
                {builderStepperContent.map((stepper, index) => {
                  if (index === 0) {
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
                      disabled={!stepper.isCompleted && currentBuilderStep < index + 1}
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
                type="button"
                sides={8}
                className="flex items-center gap-7 size-10 bg-color-4 disabled:bg-color-5 group"
                stroke={'rgb(var(--color-1))'}
                strokeWidth={2}
                onClick={handleNext}
              >
                <ArrowRightIcon className="size-3 text-color-1" />
              </RegularPolygon>
            </section>
          </section>
        </CommonBodyCard>
      </DesignContextProvider>
    </div>
  )
}

export default BuilderActionClientPage
