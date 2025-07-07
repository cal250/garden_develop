'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  LeftBracketIcon,
  RightBracketIcon,
} from '@/components/atoms/icons'
import { RegularOctagon } from '@/components/atoms/polygon/regular-octagon'
import { DesignContextProvider } from '@/hooks/use-design-context'
import { useStepperContentContext } from '@/hooks/use-stepper-content-context'
import { useResponsiveValue } from '@/hooks/use-responsive-value'
import { Rexagon } from '@/components/atoms/polygon/rexagon'
import { twMerge } from 'tailwind-merge'
import { RegularPolygon } from '@/components/atoms/polygon/regular-polygon'
import { Cocoon, Specialeco } from '@/payload-types'
import Link from 'next/link'
import { CustomHeaderCard } from '@/features/layout/footer/custom-header-card'
import CommonBodyCard from '@/components/common-body-card';

interface props {
  specialEco: string
  specialEcosystems: Specialeco[]
  cocoon: Cocoon | null
}
const OnboardingSeasonClientPage = ({ specialEco, specialEcosystems, cocoon }: props) => {
  const [inputValue, setInputValue] = useState('')

  const [springHovered, setSpringHovered] = useState(false)
  const [summerHovered, setSummerHovered] = useState(false)
  const [fallHovered, setFallHovered] = useState(false)
  const [winterHovered, setWinterHovered] = useState(false)

  const { setStepperContent, stepperContent, currentStep, setCurrentStep } =
    useStepperContentContext()

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
    setStepperContent((prev) =>
      prev.map((step) => {
        if (step.tooltip === 'action') {
          return {
            ...step,
            isCompleted: true,
          }
        }
        return step
      }),
    )

    if (!cocoon) {
      setCurrentStep(2)
    } else {
      setCurrentStep(Number(cocoon?.step) < 2 ? 2 : Number(cocoon?.step))
    }
    router.push(`/${specialEco}/onboarding/zone`)
  }

  return (
    <div className="flex size-full flex-col gap-10 md:gap-[84px] items-center">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-7 md:gap-9 mt-[0px] md:mt-[30px] z-20">
        <Link
          href={`/${encodeURIComponent(specialEcosystems[0].id)}`}
          className={twMerge(`w-fit flex flex-col items-center gap-0`)}
          onMouseEnter={() => setSpringHovered(true)}
          onMouseLeave={() => setSpringHovered(false)}
        >
          <DesignContextProvider
            stroke={
              specialEco === specialEcosystems[0].id || springHovered
                ? 'rgb(var(--color-2))'
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
                specialEco === specialEcosystems[0].id || springHovered
                  ? 'rgb(var(--color-2))'
                  : 'rgb(var(--color-2))'
              }
              style={{
                background: 'linear-gradient(337.13deg, rgb(var(--color-9)) 3.4%, rgb(var(--color-8)) 99.7%)',
              }}
              className="w-full h-[26px] md:h-[45px]"
            >
              <div className=" items-center gap-0 flex">
                <LeftBracketIcon
                  className="h-3 md:h-4 w-2 md:w-3"
                  fill="rgb(var(--color-2))"
                  strokeWidth={2}
                />
                <p className="text-color-1 text-[10px] md:text-lg leading-[100%] font-black">
                  inner
                </p>
                <RightBracketIcon
                  className="h-3 md:h-4 w-2 md:w-3"
                  fill="rgb(var(--color-2))"
                  strokeWidth={2}
                />
                <p className="text-color-13 text-[10px] md:text-lg leading-[100%] font-black">
                  Seeds
                </p>
              </div>
            </CustomHeaderCard>

            <div className="flex flex-col gap-[3px] items-center">
              {/* <p className="text-color-2 text-[12px] md:text-[13px] leading-[15px] text-center font-extrabold">
                new beginnings
              </p> */}

              <p className="text-color-13 text-[9px] md:text-[11px] leading-[15px] text-center font-extrabold">
                what are you planting?
              </p>
            </div>
          </section>
        </Link>

        <Link
          href={`/${encodeURIComponent(specialEcosystems[1].id)}`}
          className={twMerge(`w-fit flex flex-col items-center gap-0`)}
          onMouseEnter={() => setSummerHovered(true)}
          onMouseLeave={() => setSummerHovered(false)}
        >
          <DesignContextProvider
            stroke={
              specialEco === specialEcosystems[1].id || summerHovered
                ? 'rgb(var(--color-2))'
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
                specialEco === specialEcosystems[1].id || summerHovered
                  ? 'rgb(var(--color-2))'
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
                  fill="rgb(var(--color-2))"
                  strokeWidth={2}
                />
                <p className="text-color-1 text-[10px] md:text-lg leading-[100%] font-black">
                  inner
                </p>
                <RightBracketIcon
                  className="h-3 md:h-4 w-2 md:w-3"
                  fill="rgb(var(--color-2))"
                  strokeWidth={2}
                />
                <p className="text-color-13 text-[10px] md:text-lg leading-[100%] font-black">
                  Weeds
                </p>
              </div>
            </CustomHeaderCard>

            <div className="flex flex-col gap-[3px] items-center">
              {/* <p className="text-color-2 text-[12px] md:text-[13px] leading-[15px] text-center font-extrabold">
                rising momentum
              </p> */}

              <p className="text-color-13 text-[9px] md:text-[11px] leading-[15px] text-center font-extrabold">
                what are you plucking?
              </p>
            </div>
          </section>
        </Link>

        <Link
          href={`/${encodeURIComponent(specialEcosystems[2].id)}`}
          className={twMerge(`w-fit flex flex-col items-center gap-0`)}
          onMouseEnter={() => setFallHovered(true)}
          onMouseLeave={() => setFallHovered(false)}
        >
          <DesignContextProvider
            stroke={
              specialEco === specialEcosystems[2].id || fallHovered
                ? 'rgb(var(--color-2))'
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
                specialEco === specialEcosystems[2].id || fallHovered
                  ? 'rgb(var(--color-2))'
                  : 'rgb(var(--color-2))'
              }
              style={{
                background: 'linear-gradient(337.13deg, rgb(var(--color-9)) 3.4%, rgb(var(--color-8)) 99.7%)',
              }}
              className="w-full h-[26px] md:h-[45px]"
            >
              <div className=" items-center gap-0 flex">
                <LeftBracketIcon
                  className="h-3 md:h-4 w-2 md:w-3"
                  fill="rgb(var(--color-2))"
                  strokeWidth={2}
                />
                <p className="text-color-1 text-[10px] md:text-lg leading-[100%] font-black">
                  inner
                </p>
                <RightBracketIcon
                  className="h-3 md:h-4 w-2 md:w-3"
                  fill="rgb(var(--color-2))"
                  strokeWidth={2}
                />
                <p className="text-color-13 text-[10px] md:text-lg leading-[100%] font-black">
                  Sprouts
                </p>
              </div>
            </CustomHeaderCard>

            <div className="flex flex-col gap-[3px] items-center">
              {/* <p className="text-color-2 text-[12px] md:text-[13px] leading-[15px] text-center font-extrabold">
                letting go
              </p> */}

              <p className="text-color-13 text-[9px] md:text-[11px] leading-[15px] text-center font-extrabold">
                what are you growing?
              </p>
            </div>
          </section>
        </Link>

        <Link
          href={`/${encodeURIComponent(specialEcosystems[3].id)}`}
          className={twMerge(`w-fit flex flex-col items-center gap-0`)}
          onMouseEnter={() => setWinterHovered(true)}
          onMouseLeave={() => setWinterHovered(false)}
        >
          <DesignContextProvider
            stroke={
              specialEco === specialEcosystems[3].id || winterHovered
                ? 'rgb(var(--color-2))'
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
                specialEco === specialEcosystems[3].id || winterHovered
                  ? 'rgb(var(--color-2))'
                  : 'rgb(var(--color-2))'
              }
              style={{
                background: 'linear-gradient(337.13deg, rgb(var(--color-9)) 3.4%, rgb(var(--color-8)) 99.7%)',
              }}
              className="w-full h-[26px] md:h-[45px]"
            >
              <div className=" items-center gap-0 flex">
                <LeftBracketIcon
                  className="h-3 md:h-4 w-2 md:w-3"
                  fill="rgb(var(--color-2))"
                  strokeWidth={2}
                />
                <p className="text-color-1 text-[10px] md:text-lg leading-[100%] font-black">
                  inner
                </p>
                <RightBracketIcon
                  className="h-3 md:h-4 w-2 md:w-3"
                  fill="rgb(var(--color-2))"
                  strokeWidth={2}
                />
                <p className="text-color-13 text-[10px] md:text-lg leading-[100%] font-black">
                  Blooms
                </p>
              </div>
            </CustomHeaderCard>

            <div className="flex flex-col gap-[3px] items-center">
              {/* <p className="text-color-2 text-[12px] md:text-[13px] leading-[15px] text-center font-extrabold">
                deep reflection
              </p> */}

              <p className="text-color-13 text-[9px] md:text-[11px] leading-[15px] text-center font-extrabold">
                what’s blooming in XR?
              </p>
            </div>
          </section>
        </Link>
      </div>

      <DesignContextProvider stroke="rgb(var(--color-11))" strokeWidth={4}>
        <CommonBodyCard
          className="mb-[60px] md:mb-0 h-full flex-grow w-full justify-start"
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
                className="flex items-center gap-7 size-[85px] bg-color-4 disabled:bg-color-5 group"
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

            <section className="w-full mt-[-35px] md:mt-[-45px] flex flex-col items-center gap-8">
              <CustomHeaderCard
                tipAngle={75}
                strokeWidth={3}
                stroke="rgb(var(--color-4))"
                style={{
                  background: `linear-gradient(337.13deg, rgb(var(--color-9)) 3.4%, rgb(var(--color-8)) 99.7%)`,
                }}
                className="w-[90%] sm:w-[545px] md:w-[523px] h-[51.42px] sm:h-[70px] md:h-[88.5px]"
              >
                <div className=" items-center gap-0 flex">
                  <LeftBracketIcon
                    className="h-6 sm:h-7 md:h-8 w-3 md:w-4"
                    fill="rgb(var(--color-2))"
                    strokeWidth={2}
                  />
                  <p className="text-color-1 text-2xl sm:text-3xl md:text-4xl leading-[100%] font-black">
                    inner
                  </p>
                  <RightBracketIcon
                    className="h-6 sm:h-7 md:h-8 w-3 md:w-4"
                    fill="rgb(var(--color-2))"
                    strokeWidth={2}
                  />
                  <p className="text-color-2 text-2xl sm:text-3xl md:text-4xl leading-[100%] font-black">
                    Garden
                  </p>
                </div>
              </CustomHeaderCard>

              <div className="w-full flex flex-col items-center gap-6 md:gap-10">
                <p className="max-w-[545px] text-center text-base font-bold text-color-1">
                  Enter your ⟨inner⟩Garden and begin the cycle of self-tending: Seed what calls to
                  grow. Weed what asks to go. Sprout your truth in form. Bloom the love you carry
                  inside.
                </p>

                {/* <div className="w-full flex flex-col items-center gap-2">
                  <div className="max-w-[282px] relative">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      className="border-b-[1px] border-b-color-7 text-center bg-transparent focus:outline-none py-2"
                      style={{ paddingLeft: !inputValue ? '10px' : '5px' }} // Adjust padding
                    />
                    {!inputValue && (
                      <div className="w-full absolute top-1/2 left-2 -translate-y-1/2 text-gray-500 pointer-events-none flex items-center justify-center gap-2">
                        <div className="w-5 h-5 text-color-2">
                          <SearchIcon />
                        </div>
                        <p className="text-base text-color-1/80">Search</p>
                      </div>
                    )}
                  </div>

                  <p className="max-w-[545px] px-3 text-center text-xs font-semibold text-color-1 opacity-50">
                    what are you in the mood for? <br /> enter a keyword, and we’ll recommend a
                    season
                  </p>
                </div> */}
              </div>
            </section>

            <section className="z-40 p-5 flex md:hidden w-full items-center justify-between">
              {/* <button type="button" disabled={true} className="md:hidden flex disabled:opacity-30">
                <ChevronLeftIcon
                  className="h-[33.76px] w-[17.67px]"
                  fill="rgb(var(--color-2))"
                  strokeWidth={0}
                />
              </button> */}

              <RegularPolygon
                as="button"
                type="button"
                disabled={true}
                sides={8}
                className="flex items-center gap-7 size-10 bg-color-4 disabled:bg-color-5 group"
                stroke={'rgb(var(--color-1))'}
                strokeWidth={2}
              >
                <ArrowLeftIcon className="size-3 text-color-2" />
              </RegularPolygon>

              <Rexagon
                className="bg-color-1 pl-0 pr-4 h-[37.81px] z-10"
                strokeWidth={0}
                overflow={true}
              >
                {stepperContent.map((stepper, index) => {
                  if (index === 0) {
                    return (
                      <div key={index} className="relative">
                        <RegularPolygon
                          sides={6}
                          className="w-[50px] h-[38px] bg-color-4"
                          stroke="rgb(var(--color-4))"
                          strokeWidth={0}
                        >
                          <span className="text-color-1 font-black text-[20px]">
                            {index + 1}
                          </span>
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
                type="button"
                sides={8}
                className="flex items-center gap-7 size-10 bg-color-4 disabled:bg-color-5 group"
                stroke={'rgb(var(--color-1))'}
                strokeWidth={2}
                onClick={handleNext}
              >
                <ArrowRightIcon className="size-3 text-color-1" />
              </RegularPolygon>

              {/* <button
                type="button"
                disabled={isLoading}
                onClick={handleNext}
                className="md:hidden flex disabled:opacity-30"
              >
                <ChevronRightIcon
                  className="h-[33.76px] w-[17.67px]"
                  fill="rgb(var(--color-2))"
                  strokeWidth={0}
                />
              </button> */}
            </section>
          </section>
        </CommonBodyCard>
      </DesignContextProvider>
    </div>
  )
}

export default OnboardingSeasonClientPage
