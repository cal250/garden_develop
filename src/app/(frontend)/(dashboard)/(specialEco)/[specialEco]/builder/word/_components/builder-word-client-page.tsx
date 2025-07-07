'use client'

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@/components/atoms/icons'
import { Rexagon } from '@/components/atoms/polygon/rexagon'
import { DesignContextProvider } from '@/hooks/use-design-context'
import { useResponsiveValue } from '@/hooks/use-responsive-value'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { RegularPolygon } from '@/components/atoms/polygon/regular-polygon'
import { twMerge } from 'tailwind-merge'
import { useAuth } from '@/features/providers/auth'
import CommonBodyCard from '@/components/common-body-card'
import { useBuilderStepperStore } from '@/stores/builder-stepper-store'
import useBuilderSoilDataStore from '@/stores/builder-soil-data-store'
import { BuilderSoilOctagon } from '../../soil/_components/builder-soil-octagon-data'
import { HeaderCard } from '@/components/molecules/header-card/header-card'

interface props {
  specialEco: string
  specialEcosystem: any
}

const BuilderWordClientPage = ({ specialEco, specialEcosystem }: props) => {
  const router = useRouter()

  const [selectedZones, setSelectedZones] = useState(['', '', '', '', '', '', '', ''])

  const {
    setBuilderStepperContent,
    builderStepperContent,
    currentBuilderStep,
    setCurrentBuilderStep,
  } = useBuilderStepperStore()

  const { cocoonZones, selectedZone, wordType, setWordType } = useBuilderSoilDataStore()

  const [currentWedgeIndex, setCurrentWedgeIndex] = useState(2)
  const [zIndex, setZIndex] = useState(20)
  const [updatingCocoon, setUpdatingCocoon] = useState(false)
  const [hoveredWord, setHoveredWord] = useState('')
  const [wordTypeErr, setWordTypeErr] = useState('')
  const [ecoIcon, setEcoIcon] = useState<string | null>(null)

  const { user } = useAuth()

  const octagonSize = useResponsiveValue({
    base: 350,
    sm: 450,
    md: 528,
  })

  function handleBack() {
    router.push(`/${specialEco}/builder/soil`)
  }

  function cb() {
    // const currentSteppers: Stepper[] = builderStepperContent

    // const updatedSteppers = currentSteppers.map((step: Stepper) => {
    //   if (step.tooltip === 'word') {
    //     return {
    //       ...step,
    //       isCompleted: true,
    //     }
    //   }
    //   return step
    // })

    // setBuilderStepperContent(updatedSteppers)

    // // setCurrentBuilderStep(4)

    router.push(`/${specialEco}/builder/word/${wordType}`)
  }

  async function handleNext() {
    if (wordType) {
      setWordTypeErr('')
      router.push(`/${specialEco}/builder/word/${wordType}`)
    } else {
      setWordTypeErr('Please select a word type')
    }
  }

  useEffect(() => {
    if (currentWedgeIndex === 0 || currentWedgeIndex === 1) {
      setZIndex(10)
    } else {
      setZIndex(20)
    }
  }, [currentWedgeIndex])

  useEffect(() => {
    if (cocoonZones) {
      const selectedZones = cocoonZones?.map((zone: any) => {
        return zone.zone.name
      })

      setSelectedZones(selectedZones)
    } else {
      setSelectedZones(['', '', '', '', '', '', '', ''])
    }
  }, [cocoonZones])

  useEffect(() => {
    if (selectedZone) {
      setCurrentWedgeIndex(selectedZone.position)
    } else {
      router.push(`/${specialEco}/builder/soil`)
    }
  }, [selectedZone, router, setCurrentWedgeIndex, specialEco])

  useEffect(() => {
    if (specialEcosystem?.icon?.url) {
      setEcoIcon(specialEcosystem.icon.url)
    } else {
      setEcoIcon(null)
    }
  }, [specialEcosystem])

  return (
    <div className="flex size-full flex-col items-center">
      <div className="flex items-center gap-10">
        <button
          disabled={updatingCocoon}
          onClick={handleBack}
          className="hidden md:flex items-center mt-[-60px] z-20 disabled:opacity-40"
        >
          <ChevronLeftIcon
            className="h-[53px] w-[27px]"
            fill="rgb(var(--color-2))"
            strokeWidth={0}
          />
        </button>

        <div
          style={{ width: octagonSize, height: octagonSize }}
          className="relative mt-[-65px] md:mt-[-60px] z-20 flex flex-col items-center justify-center"
        >
          <BuilderSoilOctagon
            currentWedgeIndex={currentWedgeIndex}
            octagonData={selectedZones}
            userAvatar={user?.avatar?.url ?? ''}
            ecoIcon={ecoIcon}
          />
        </div>

        <button
          disabled={updatingCocoon}
          onClick={handleNext}
          className="hidden md:flex items-center mt-[-60px] z-20 disabled:opacity-40"
        >
          <ChevronRightIcon
            className="h-[53px] w-[27px]"
            fill="rgb(var(--color-2))"
            strokeWidth={0}
          />
        </button>
      </div>

      <DesignContextProvider stroke="rgb(var(--color-11))" strokeWidth={4}>
        <CommonBodyCard
          title={['inner', 'Words']}
          headerCardType="bracketed"
          style={{
            zIndex: `${zIndex}`,
          }}
          className="mt-[-55px] sm:mt-[-70px] md:mt-[-80px] mb-[60px] md:mb-0 md:pb-[70px] h-full flex-grow w-full justify-start"
        >
          <section className="h-full w-full flex flex-col gap-10 md:gap-[77px] items-center justify-between relative">
            <div
              className="hidden absolute m-auto w-full md:flex justify-between z-40"
              style={{ maxWidth: '820px', transform: `translateY(calc(-50% - 2px))` }}
            >
              <RegularPolygon
                as="button"
                type="button"
                disabled={updatingCocoon}
                sides={8}
                className="flex items-center gap-7 size-[85px] bg-color-4 disabled:bg-color-5 group"
                stroke={updatingCocoon ? 'rgb(var(--color-2))' : 'rgb(var(--color-1))'}
                onClick={handleBack}
                style={{
                  transform: `translateX(calc(-50% - 8px))`,
                }}
              >
                <ArrowLeftIcon
                  className={twMerge(
                    `size-[28px] `,
                    updatingCocoon ? 'text-color-2' : 'text-color-1',
                  )}
                />
              </RegularPolygon>
              <RegularPolygon
                as="button"
                type="button"
                disabled={updatingCocoon}
                sides={8}
                className="flex items-center gap-7 size-[85px] bg-color-4 disabled:bg-color-5 group translate-x-1/2"
                stroke={updatingCocoon ? 'rgb(var(--color-2))' : 'rgb(var(--color-1))'}
                onClick={handleNext}
                style={{
                  transform: `translateX(calc(50% + 8px))`,
                }}
              >
                <ArrowRightIcon
                  className={twMerge(
                    `size-[28px]`,
                    updatingCocoon ? 'text-color-2' : 'text-color-1',
                  )}
                />
              </RegularPolygon>
            </div>

            <section className="w-full mt-[70px] md:mt-[120px] flex flex-col md:flex-row items-center justify-center gap-[30px]">
              <button
                onMouseEnter={() => setHoveredWord('single')}
                onMouseLeave={() => setHoveredWord('')}
                onClick={() => setWordType('single')}
                className="w-[264.26px] sm:w-[307.5px]"
              >
                <HeaderCard
                  text={['single', 'word']}
                  textType="separated"
                  tipAngle={75}
                  strokeWidth={5}
                  stroke={
                    wordType === 'single' || hoveredWord === 'single'
                      ? 'rgb(var(--color-1))'
                      : 'rgb(var(--color-4))'
                  }
                  style={{
                    background: `radial-gradient(100.08% 49.99% at 66.81% 47.94%, rgb(var(--color-9)) 3.4%, rgb(var(--color-8)) 99.68%)`,
                  }}
                  className="w-[264.26px] sm:w-[307.5px] h-[55px] sm:h-[64px]"
                  separatorFill="rgb(var(--color-1))"
                  separatorStroke={0}
                  classNames={{
                    name: 'h-full w-full flex justify-center items-center gap-1',
                    leftTitle:
                      'text-[18px] leading-[100%] sm:text-[20px] md:text-[22px] font-black',
                    rightTitle:
                      'text-[18px] leading-[100%] sm:text-[20px] md:text-[22px] font-black',
                    separator: 'scale-[350%] sm:scale-[450%]',
                  }}
                />
              </button>

              <button
                onMouseEnter={() => setHoveredWord('double')}
                onMouseLeave={() => setHoveredWord('')}
                onClick={() => setWordType('double')}
                className="w-[264.26px] sm:w-[307.5px]"
              >
                <HeaderCard
                  text={['double', 'word']}
                  textType="separated"
                  tipAngle={75}
                  strokeWidth={5}
                  stroke={
                    wordType === 'double' || hoveredWord === 'double'
                      ? 'rgb(var(--color-1))'
                      : 'rgb(var(--color-4))'
                  }
                  style={{
                    background: `radial-gradient(100.08% 49.99% at 66.81% 47.94%, rgb(var(--color-9)) 3.4%, rgb(var(--color-8)) 99.68%)`,
                  }}
                  className="w-[264.26px] sm:w-[307.5px] h-[55px] sm:h-[64px]"
                  separatorFill="rgb(var(--color-1))"
                  separatorStroke={0}
                  classNames={{
                    name: 'h-full w-full flex justify-center items-center gap-1',
                    leftTitle:
                      'text-[18px] leading-[100%] sm:text-[20px] md:text-[22px] font-black',
                    rightTitle:
                      'text-[18px] leading-[100%] sm:text-[20px] md:text-[22px] font-black',
                    separator: 'scale-[350%] sm:scale-[450%]',
                  }}
                />
              </button>
            </section>

            {wordTypeErr && (
              <p className="text-center text-base sm:text-lg md:text-xl font-bold text-[#FF3B30]">
                {wordTypeErr}
              </p>
            )}

            <section className="z-40 p-5 flex md:hidden w-full items-center justify-between">
              <RegularPolygon
                as="button"
                type="button"
                disabled={updatingCocoon}
                sides={8}
                className="flex items-center gap-7 size-10 bg-color-4 disabled:bg-color-5 group"
                stroke={updatingCocoon ? 'rgb(var(--color-2))' : 'rgb(var(--color-1))'}
                strokeWidth={2}
                onClick={handleBack}
              >
                <ArrowLeftIcon
                  className={twMerge(`size-3 `, updatingCocoon ? 'text-color-2' : 'text-color-1')}
                />
              </RegularPolygon>

              <Rexagon
                className="bg-color-1 pl-4 pr-4 h-[37.81px] z-10 flex items-center gap-1"
                tipAngle={100}
                strokeWidth={0}
                overflow={true}
              >
                {builderStepperContent.map((stepper, index) => {
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
                disabled={updatingCocoon}
                sides={8}
                className="flex items-center gap-7 size-10 bg-color-4 disabled:bg-color-5 group"
                stroke={updatingCocoon ? 'rgb(var(--color-2))' : 'rgb(var(--color-1))'}
                strokeWidth={2}
                onClick={handleNext}
              >
                <ArrowRightIcon
                  className={twMerge(`size-3 `, updatingCocoon ? 'text-color-2' : 'text-color-1')}
                />
              </RegularPolygon>
            </section>
          </section>
        </CommonBodyCard>
      </DesignContextProvider>
    </div>
  )
}

export default BuilderWordClientPage
