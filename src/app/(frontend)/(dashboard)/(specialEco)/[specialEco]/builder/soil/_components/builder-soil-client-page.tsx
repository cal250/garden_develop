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
import { BuilderSoilOctagon } from './builder-soil-octagon-data'
import { useBuilderStepperStore } from '@/stores/builder-stepper-store'
import useBuilderSoilDataStore from '@/stores/builder-soil-data-store'

interface props {
  specialEco: string
  cocoon: any
  specialEcosystem: any
}

const BuilderSoilClientPage = ({ specialEco, cocoon, specialEcosystem }: props) => {
  // const searchParams = useSearchParams()
  const router = useRouter()

  const [selectedZones, setSelectedZones] = useState(['', '', '', '', '', '', '', ''])

  const {
    setBuilderStepperContent,
    builderStepperContent,
    currentBuilderStep,
    setCurrentBuilderStep,
  } = useBuilderStepperStore()

  const { cocoonZones, setCocoonZones, selectedZone, setSelectedZone } = useBuilderSoilDataStore()

  const [currentWedgeIndex, setCurrentWedgeIndex] = useState<number | null>(
    selectedZone?.position ?? null,
  )
  const [zIndex, setZIndex] = useState(20)
  const [selectedZoneErr, setSelectedZoneErr] = useState('')

  const [updatingCocoon, setUpdatingCocoon] = useState(false)
  const [ecoIcon, setEcoIcon] = useState<string | null>(null)

  const { user } = useAuth()

  const octagonSize = useResponsiveValue({
    base: 350,
    sm: 450,
    md: 528,
  })

  function handleBack() {
    router.push(`/builder-actions`)
  }

  function cb() {
    const currentSteppers: Stepper[] = builderStepperContent

    const updatedSteppers = currentSteppers.map((step: Stepper) => {
      if (step.tooltip === 'soil') {
        return {
          ...step,
          isCompleted: true,
        }
      }
      return step
    })

    setBuilderStepperContent(updatedSteppers)

    if (!cocoon) {
      setCurrentBuilderStep(3)
    } else {
      setCurrentBuilderStep(Number(cocoon?.step) < 3 ? 3 : Number(cocoon.step))
    }

    router.push(`/${specialEco}/builder/word`)
  }

  async function handleNext() {
    if (selectedZone) {
      setSelectedZoneErr('')
      cb()
    } else {
      setSelectedZoneErr('Please select a zone')
    }
  }

  useEffect(() => {
    if (currentWedgeIndex === 0 || currentWedgeIndex === 1) {
      setZIndex(10)
    } else {
      setZIndex(20)
    }

    if (cocoonZones) {
      const findZone = cocoonZones.find((item) => item.position === currentWedgeIndex)
      if (findZone) setSelectedZone(findZone)
    }
  }, [currentWedgeIndex, cocoonZones, setSelectedZone])

  useEffect(() => {
    if (cocoon && cocoon.zones && cocoon.zones.length > 0) {
      const filteredData = cocoon?.zones?.sort((a: any, b: any) => a.position - b.position)

      setCocoonZones(filteredData)

      const selectedZones = filteredData?.map((zone: any) => {
        return zone.zone.name
      })

      setSelectedZones(selectedZones)
    } else {
      setSelectedZones(['', '', '', '', '', '', '', ''])
    }
  }, [cocoon])

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
            setCurrentWedgeIndex={setCurrentWedgeIndex}
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
          title={['inner', 'Soil']}
          headerCardType="bracketed"
          style={{
            zIndex: `${zIndex}`,
          }}
          className="mt-[-55px] sm:mt-[-70px] md:mt-[-80px] mb-[60px] md:mb-0 md:pb-[70px] h-full flex-grow w-full justify-start"
        >
          <section className="h-full w-full flex flex-col gap-10 items-center justify-between relative">
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

            <section className="w-full mt-[70px] md:mt-[80px] flex flex-col items-center gap-[30px]">
              <p className="text-base md:text-lg font-bold text-color-13 text-center px-3 md:px-0">
                Awesome! Spring is the season of ...
              </p>

              <p className="text-base md:text-lg font-bold text-color-13 text-center px-3 md:px-0">
                In this season, where do you want to focus your energy?
              </p>

              {selectedZoneErr && (
                <p className="text-center text-base sm:text-lg md:text-xl font-bold text-[#FF3B30]">
                  {selectedZoneErr}
                </p>
              )}
            </section>

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
                  if (index === 1) {
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

export default BuilderSoilClientPage
