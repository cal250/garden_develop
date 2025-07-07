'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  //   ChevronLeftIcon,
  //   ChevronRightIcon,
  LeftBracketIcon,
  RightBracketIcon,
} from '@/components/atoms/icons'
import { RegularOctagon } from '@/components/atoms/polygon/regular-octagon'
import { DesignContextProvider } from '@/hooks/use-design-context'
// import { useStepperContentContext } from '@/hooks/use-stepper-content-context'
import { useResponsiveValue } from '@/hooks/use-responsive-value'
// import { Rexagon } from '@/components/atoms/polygon/rexagon'
import { twMerge } from 'tailwind-merge'
import { RegularPolygon } from '@/components/atoms/polygon/regular-polygon'
// import { useAuth } from '@/features/providers/auth'
import { Cocoon, Specialeco } from '@/payload-types'
import { CustomHeaderCard } from '@/features/layout/footer/custom-header-card'
import CommonBodyCard from '@/components/common-body-card'
import { Rectagon } from '@/components/atoms/polygon/rectagon'
// import SearchIcon from '@/features/icons/search-icon'
// import { LoaderCircle } from 'lucide-react'

interface props {
  specialEcosystems: Specialeco[]
  cocoons: Cocoon[] | null
}
const OnboardingActionClientPage = ({ specialEcosystems, cocoons }: props) => {
  //   const [inputValue, setInputValue] = useState('')
  const [specialEco, setSpecialEco] = useState(specialEcosystems[0].id)
  const [hoveredSeason, setHoveredSeason] = useState<string | null>(null)
  const [disableSproutBloom, setDisableSproutBloom] = useState(true)

  // const { setStepperContent, stepperContent, currentStep, setCurrentStep } =
  //   useStepperContentContext()

  //   const { isLoading } = useAuth()

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
    // setStepperContent((prev) =>
    //   prev.map((step) => {
    //     if (step.tooltip === 'action') {
    //       return {
    //         ...step,
    //         isCompleted: true,
    //       }
    //     }
    //     return step
    //   }),
    // )

    // setCurrentStep(1)

    router.push(`/${specialEco}/onboarding/landscape`)
  }

  useEffect(() => {
    if (!cocoons) {
      setDisableSproutBloom(true)
    } else if (cocoons.length < 2) {
      setDisableSproutBloom(true)
    } else {
      setDisableSproutBloom(false)
    }
  }, [cocoons])

  // useEffect(() => {
  //   console.log(disableSproutBloom)
  //   console.log(specialEcosystems[2].compulsory)
  //   console.log(hoveredSeason)
  // }, [disableSproutBloom, hoveredSeason])

  return (
    <div className="flex size-full flex-col gap-16 sm:gap-20 md:gap-[84px] items-center">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-7 md:gap-9 -mt-10 md:mt-[30px] z-20">
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
                  // 'linear-gradient(337.13deg, rgb(var(--color-9)) 3.4%, rgb(var(--color-8)) 99.7%)',
                  'radial-gradient(circle, rgb(var(--color-9)) 10%, rgb(var(--color-8)) 80%)',
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

            <div className="flex flex-col gap-[3px] items-center">
              {/* <p className="text-color-2 text-[12px] md:text-[13px] leading-[15px] text-center font-extrabold">
                new beginnings
              </p> */}

              <p className="text-color-13 text-[9px] md:text-[11px] leading-[15px] text-center font-extrabold">
                what are you planting?
              </p>
            </div>
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
                background:
                  'radial-gradient(circle, rgb(var(--color-9)) 10%, rgb(var(--color-8)) 80%)',
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

            <div className="flex flex-col gap-[3px] items-center">
              {/* <p className="text-color-2 text-[12px] md:text-[13px] leading-[15px] text-center font-extrabold">
                rising momentum
              </p> */}

              <p className="text-color-13 text-[9px] md:text-[11px] leading-[15px] text-center font-extrabold">
                what are you plucking?
              </p>
            </div>
          </section>
        </button>

        <div
          className="w-fit flex flex-col items-center justify-center relative"
          onMouseEnter={() => setHoveredSeason('fall')}
          onMouseLeave={() => setHoveredSeason(null)}
        >
          <button
            disabled={disableSproutBloom && specialEcosystems[2].compulsory === 'No'}
            onClick={() => setSpecialEco(specialEcosystems[2].id)}
            className={twMerge(`w-fit flex flex-col items-center gap-0`)}
            // onMouseEnter={() => setHoveredSeason('fall')}
            // onMouseLeave={() => setHoveredSeason(null)}
          >
            <DesignContextProvider
              stroke={
                disableSproutBloom && specialEcosystems[2].compulsory === 'No'
                  ? 'rgb(var(--color-12))'
                  : specialEco === specialEcosystems[2].id || hoveredSeason === 'fall'
                    ? 'rgb(var(--color-1))'
                    : 'rgb(var(--color-2))'
              }
              strokeWidth={4}
            >
              <RegularOctagon
                className="relative flex flex-col items-center justify-center"
                style={{
                  width: octagonSize,
                  background: `conic-gradient(from 89.99deg at 50% 50%, rgb(var(--color-8)) 0deg, rgb(var(--color-8)) 212.4deg, rgb(var(--color-9)) 313.2deg, rgb(var(--color-8)) 360deg)`,
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
                  disableSproutBloom && specialEcosystems[2].compulsory === 'No'
                    ? 'rgb(var(--color-12))'
                    : specialEco === specialEcosystems[2].id || hoveredSeason === 'fall'
                      ? 'rgb(var(--color-1))'
                      : 'rgb(var(--color-2))'
                }
                style={{
                  background:
                    disableSproutBloom && specialEcosystems[2].compulsory === 'No'
                      ? `radial-gradient(101.89% 1356.63% at 50.76% 1248.92%, rgb(var(--color-9)) 42.61%, rgb(var(--color-8)) 99.68%)`
                      : 'radial-gradient(circle, rgb(var(--color-9)) 10%, rgb(var(--color-8)) 80%)',
                }}
                className="w-full h-[26px] md:h-[45px]"
              >
                <div className=" items-center gap-0 flex">
                  <LeftBracketIcon
                    className="h-3 md:h-4 w-2 md:w-3"
                    fill={
                      disableSproutBloom && specialEcosystems[2].compulsory === 'No'
                        ? '#A2A2A2'
                        : 'rgb(var(--color-13))'
                    }
                    strokeWidth={2}
                  />
                  <p
                    className={twMerge(
                      'text-[10px] md:text-lg leading-[100%] font-black',
                      disableSproutBloom && specialEcosystems[2].compulsory === 'No'
                        ? 'text-[#A2A2A2]'
                        : 'text-color-1',
                    )}
                  >
                    inner
                  </p>
                  <RightBracketIcon
                    className="h-3 md:h-4 w-2 md:w-3"
                    fill={
                      disableSproutBloom && specialEcosystems[2].compulsory === 'No'
                        ? '#A2A2A2'
                        : 'rgb(var(--color-13))'
                    }
                    strokeWidth={2}
                  />
                  <p
                    className={twMerge(
                      'text-[10px] md:text-lg leading-[100%] font-black',
                      disableSproutBloom && specialEcosystems[2].compulsory === 'No'
                        ? 'text-[#A2A2A2]'
                        : 'text-color-13',
                    )}
                  >
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
          </button>
          {hoveredSeason === 'fall' &&
            disableSproutBloom &&
            specialEcosystems[2].compulsory === 'No' && (
              <section
                className="absolute bottom-[-40px] left-1/2 -translate-x-1/3 md:translate-x-5/8 z-50"
                style={{ zIndex: 100 }}
              >
                <Rectagon
                  chamferLength={{ x: 10, y: 10 }}
                  className="h-[28.5px] w-fit bg-color-1 flex items-center justify-center relative before:absolute before:-translate-y-[14px] before:w-[40px] before:h-[40px] before:bg-color-2 before:rotate-45 before:transform-origin-center"
                  stroke="rgb(var(--color-1))"
                  strokeWidth={0}
                >
                  <p className="whitespace-nowrap text-color-6 text-xs md:text-sm text-center font-extrabold mx-3 md:mx-4">
                    If you’re new, start with seeds or weeds
                  </p>
                </Rectagon>
              </section>
            )}
        </div>

        <div
          className="w-fit flex flex-col items-center justify-center relative"
          onMouseEnter={() => setHoveredSeason('winter')}
          onMouseLeave={() => setHoveredSeason(null)}
        >
          <button
            disabled={disableSproutBloom && specialEcosystems[3].compulsory === 'No'}
            onClick={() => setSpecialEco(specialEcosystems[3].id)}
            className={twMerge(`w-fit flex flex-col items-center gap-0`)}
            // onMouseEnter={() => setHoveredSeason('winter')}
            // onMouseLeave={() => setHoveredSeason(null)}
          >
            <DesignContextProvider
              stroke={
                disableSproutBloom && specialEcosystems[3].compulsory === 'No'
                  ? 'rgb(var(--color-12))'
                  : specialEco === specialEcosystems[3].id || hoveredSeason === 'winter'
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
                  disableSproutBloom && specialEcosystems[3].compulsory === 'No'
                    ? 'rgb(var(--color-12))'
                    : specialEco === specialEcosystems[3].id || hoveredSeason === 'winter'
                      ? 'rgb(var(--color-1))'
                      : 'rgb(var(--color-2))'
                }
                style={{
                  background:
                    disableSproutBloom && specialEcosystems[3].compulsory === 'No'
                      ? `radial-gradient(101.89% 1356.63% at 50.76% 1248.92%, rgb(var(--color-9)) 42.61%, rgb(var(--color-8)) 99.68%)`
                      : 'radial-gradient(circle, rgb(var(--color-9)) 10%, rgb(var(--color-8)) 80%)',
                }}
                className="w-full h-[26px] md:h-[45px]"
              >
                <div className=" items-center gap-0 flex">
                  <LeftBracketIcon
                    className="h-3 md:h-4 w-2 md:w-3"
                    fill={
                      disableSproutBloom && specialEcosystems[3].compulsory === 'No'
                        ? '#A2A2A2'
                        : 'rgb(var(--color-13))'
                    }
                    strokeWidth={2}
                  />
                  <p
                    className={twMerge(
                      'text-[10px] md:text-lg leading-[100%] font-black',
                      disableSproutBloom && specialEcosystems[3].compulsory === 'No'
                        ? 'text-[#A2A2A2]'
                        : 'text-color-1',
                    )}
                  >
                    inner
                  </p>
                  <RightBracketIcon
                    className="h-3 md:h-4 w-2 md:w-3"
                    fill={
                      disableSproutBloom && specialEcosystems[3].compulsory === 'No'
                        ? '#A2A2A2'
                        : 'rgb(var(--color-13))'
                    }
                    strokeWidth={2}
                  />
                  <p
                    className={twMerge(
                      'text-[10px] md:text-lg leading-[100%] font-black',
                      disableSproutBloom && specialEcosystems[3].compulsory === 'No'
                        ? 'text-[#A2A2A2]'
                        : 'text-color-13',
                    )}
                  >
                    Blooms
                  </p>
                </div>
              </CustomHeaderCard>

              <div className="flex flex-col gap-[3px] items-center">
                {/* <p className="text-color-2 text-[12px] md:text-[13px] leading-[15px] text-center font-extrabold">
                deep reflection
              </p> */}

                <p className="text-color-13 text-[9px] md:text-[11px] leading-[15px] text-center font-extrabold">
                  what&apos;s blooming in XR?
                </p>
              </div>
            </section>
          </button>

          {hoveredSeason === 'winter' &&
            disableSproutBloom &&
            specialEcosystems[3].compulsory === 'No' && (
              <section
                className="absolute bottom-[-40px] left-1/2 -translate-x-2/3 md:-translate-x-1/2 z-50"
                style={{ zIndex: 100 }}
              >
                <Rectagon
                  chamferLength={{ x: 10, y: 10 }}
                  className="h-[28.5px] w-fit bg-color-1 flex items-center justify-center relative before:absolute before:-translate-y-[14px] before:w-[40px] before:h-[40px] before:bg-color-2 before:rotate-45 before:transform-origin-center"
                  stroke="rgb(var(--color-1))"
                  strokeWidth={0}
                >
                  <p className="whitespace-nowrap text-color-6 text-xs md:text-sm text-center font-extrabold mx-3 md:mx-4">
                    If you’re new, start with seeds or weeds
                  </p>
                </Rectagon>
              </section>
            )}
        </div>
      </div>

      <DesignContextProvider stroke="rgb(var(--color-11))" strokeWidth={4}>
        <CommonBodyCard
          title={['inner', 'Seasons']}
          headerCardType="bracketed"
          className="mb-[60px] md:mb-0 h-full flex-grow w-full justify-start md:pb-[200px]"
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
              {/* <CustomHeaderCard
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
                    fill="rgb(var(--color-13))"
                    strokeWidth={2}
                  />
                  <p className="text-color-1 text-2xl sm:text-3xl md:text-4xl leading-[100%] font-black">
                    inner
                  </p>
                  <RightBracketIcon
                    className="h-6 sm:h-7 md:h-8 w-3 md:w-4"
                    fill="rgb(var(--color-13))"
                    strokeWidth={2}
                  />
                  <p className="text-color-2 text-2xl sm:text-3xl md:text-4xl leading-[100%] font-black">
                    Garden
                  </p>
                </div>
              </CustomHeaderCard> */}

              <div className="w-full flex flex-col items-center gap-6 md:gap-10">
                <p className="max-w-[545px] mx-4 text-center text-base font-bold text-color-13">
                  Select your path—plant, pluck, grow, or bloom.
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
                    what are you in the mood for? <br /> enter a keyword, and we'll recommend a
                    season
                  </p>
                </div> */}
              </div>
            </section>

            <section className="z-40 p-5 flex md:hidden w-full items-center justify-center">
              {/* <RegularPolygon
                as="button"
                type="button"
                disabled={true}
                sides={8}
                className="flex items-center gap-7 size-10 bg-color-4 disabled:bg-color-5 group disabled:opacity-0"
                stroke={'rgb(var(--color-1))'}
                strokeWidth={2}
              >
                <ArrowLeftIcon className="size-3 text-color-1" />
              </RegularPolygon> */}

              {/* <Rexagon
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
              </Rexagon> */}

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

export default OnboardingActionClientPage
