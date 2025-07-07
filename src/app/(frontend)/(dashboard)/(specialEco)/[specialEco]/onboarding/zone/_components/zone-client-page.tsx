'use client'

import { Button } from '@/components/atoms/button'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  // ChevronLeftIcon,
  // ChevronRightIcon,
  LeftBracketIcon,
  RightBracketIcon,
} from '@/components/atoms/icons'
// import { RegularOctagon } from '@/components/atoms/polygon/regular-octagon'
import { Rexagon } from '@/components/atoms/polygon/rexagon'
// import { HeaderCard } from '@/components/molecules/header-card/header-card'
import { FlowerPicker } from '@/components/organisms/flower-picker/flower-picker'
import { DesignContextProvider } from '@/hooks/use-design-context'
import { useResponsiveValue } from '@/hooks/use-responsive-value'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useStepperContentContext } from '@/hooks/use-stepper-content-context'
import { RegularPolygon } from '@/components/atoms/polygon/regular-polygon'
import { twMerge } from 'tailwind-merge'
import { ZoneOctagon } from './zone-octagon-data'
import { getZonesBySpecialEcosystem } from '@/actions/get-zones-by-special-eco'
import { useQuery } from '@tanstack/react-query'
import handleUpdateCocoon from '../../_handlers/handle-update-cocoon'
import handleCreateZone from '../../_handlers/handle-add-zone'
import { useAuth } from '@/features/providers/auth'
// import { useSearchParams } from 'next/navigation'
import { CustomHeaderCard } from '@/features/layout/footer/custom-header-card'
import { Zone } from '@/payload-types'
import handleCreateCocoon from '../../_handlers/handle-create-cocoon'
import useSoilContentStore from '@/stores/soil-content-store'
import CommonBodyCard from '@/components/common-body-card'

interface props {
  specialEco: string
  // type: string
  cocoon: any
  initialZones: any[] | null
  specialEcosystem: any
}

const OnboardingZoneClientPage = ({
  specialEco,
  cocoon,
  // type,
  initialZones,
  specialEcosystem,
}: props) => {
  // const searchParams = useSearchParams()
  const router = useRouter()

  const {
    data: zonesData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [`zones-${specialEco}`],
    queryFn: () => getZonesBySpecialEcosystem({ specialEcoId: specialEco }),
    initialData: initialZones,
  })

  const { selectedZones, setSelectedZones, selectedZonesData, setSelectedZonesData } =
    useSoilContentStore()

  const [zones, setZones] = useState<{ id: string; name: string }[]>([])

  // const [selectedZones, setSelectedZones] = useState(['', '', '', '', '', '', '', ''])
  // const [selectedZonesData, setSelectedZonesData] = useState<{ zone: string; position: number }[]>(
  //   [],
  // )
  const [inputSoil, setInputSoil] = useState('')
  const [creatingZone, setCreatingZone] = useState(false)

  const [currentWedgeIndex, setCurrentWedgeIndex] = useState(2)
  const [zIndex, setZIndex] = useState(20)

  const [updateErr, setUpdateErr] = useState('')
  const [updatingCocoon, setUpdatingCocoon] = useState(false)
  const [ecoIcon, setEcoIcon] = useState<string | null>(null)

  const { setStepperContent, stepperContent, currentStep, setCurrentStep } =
    useStepperContentContext()

  const { user } = useAuth()

  const octagonSize = useResponsiveValue({
    base: 350,
    sm: 450,
    md: 528,
  })

  // const changeType = (newType: string) => {
  //   const params = new URLSearchParams(searchParams ? searchParams.toString() : '')
  //   params.set('type', newType)
  //   router.push(`?${params.toString()}`, { scroll: false })
  // }

  function handleZonesOnAdd(result: Zone) {
    // update selectedZones
    const newZones = [...selectedZones]
    newZones[currentWedgeIndex] = result.name ?? ''

    setSelectedZones(newZones)

    // update selectedZonesData
    const check = selectedZonesData.find((prev) => prev.position === currentWedgeIndex)
    if (check) {
      const newData = selectedZonesData.filter((prev) => prev.position !== currentWedgeIndex)
      setSelectedZonesData([...newData, { zone: result.id, position: currentWedgeIndex }])
    } else {
      setSelectedZonesData([...selectedZonesData, { zone: result.id, position: currentWedgeIndex }])
    }

    // move to next wedge
    setCurrentWedgeIndex((prev) => (prev === 7 ? 0 : prev + 1))
  }

  async function handleAdd() {
    const payload = {
      name: inputSoil,
      ecosystem: specialEcosystem.ecosystem.id,
      // weedSeedPreference: type ? type : 'Seed',
    }

    try {
      setCreatingZone(true)
      const result = await handleCreateZone(payload)

      if (result) {
        refetch()

        handleZonesOnAdd(result.doc as Zone)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setCreatingZone(false)
    }
    setInputSoil('')
  }

  // function handleSelectedZone(key: any) {
  //   setSelectedZones((prevData) => {
  //     const newData = [...prevData]
  //     newData[currentWedgeIndex] = zones.find((zone) => zone.id == key[0])?.name ?? ''
  //     return newData
  //   })

  //   setSelectedZonesData((prev) => {
  //     const check = prev.find((prev) => prev.position === currentWedgeIndex)
  //     if (check) {
  //       const newData = prev.filter((prev) => prev.position !== currentWedgeIndex)
  //       return [...newData, { zone: key[0], position: currentWedgeIndex }]
  //     }

  //     return [...prev, { zone: key[0], position: currentWedgeIndex }]
  //   })

  //   setCurrentWedgeIndex((prev) => {
  //     if (prev === 7) {
  //       return 0
  //     }

  //     return prev + 1
  //   })
  // }

  function handleSelectedZone(key: any) {
    // update selectedZones
    const newZones = [...selectedZones]
    newZones[currentWedgeIndex] = zones.find((zone) => zone.id == key[0])?.name ?? ''

    setSelectedZones(newZones)

    // update selectedZonesData
    const check = selectedZonesData.find((prev) => prev.position === currentWedgeIndex)
    if (check) {
      const newData = selectedZonesData.filter((prev) => prev.position !== currentWedgeIndex)
      setSelectedZonesData([...newData, { zone: key[0], position: currentWedgeIndex }])
    } else {
      setSelectedZonesData([...selectedZonesData, { zone: key[0], position: currentWedgeIndex }])
    }

    // move to next wedge
    setCurrentWedgeIndex((prev) => (prev === 7 ? 0 : prev + 1))
  }

  function handleBack() {
    router.push(`/${specialEco}/onboarding/landscape`)
  }

  function cb() {
    setStepperContent((prev) =>
      prev.map((step) => {
        if (step.tooltip === 'zone') {
          return {
            ...step,
            isCompleted: true,
          }
        }
        return step
      }),
    )

    if (!cocoon) {
      setCurrentStep(3)
    } else {
      setCurrentStep(Number(cocoon?.step) < 3 ? 3 : Number(cocoon.step))
    }

    router.push(`/${specialEco}/onboarding/name`)
  }

  async function handleNext() {
    if (selectedZonesData.length < 8) {
      setUpdateErr('Please select your 8 zones')
    } else {
      if (cocoon) {
        setUpdatingCocoon(true)
        setUpdateErr('')

        const payload = { zones: selectedZonesData, step: cocoon.step < 3 ? 3 : cocoon.step }

        try {
          const result = await handleUpdateCocoon({ payload, id: cocoon.id })

          if (result) {
            cb()
          }
        } catch (error) {
          console.log(error)
        } finally {
          setUpdatingCocoon(false)
        }
      } else {
        setUpdatingCocoon(true)
        setUpdateErr('')

        const payload = {
          specialeco: specialEco,
          creator: user?.id,
          name: specialEcosystem?.ecosystem?.name,
          description: specialEcosystem?.ecosystem?.description,
          zones: selectedZonesData,
          step: 3,
        }

        try {
          const result = await handleCreateCocoon(payload)

          if (result) {
            cb()
          }
        } catch (error) {
          console.log(error)
        } finally {
          setUpdatingCocoon(false)
        }
      }
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
    if (zonesData) {
      setZones(
        zonesData.map((zone: Zone) => {
          return { id: zone?.id ?? '', name: zone?.name ?? '' }
        }),
      )
    }
  }, [zonesData])

  useEffect(() => {
    if (cocoon && cocoon.zones && cocoon.zones.length > 0) {
      const filteredData = cocoon?.zones?.sort((a: any, b: any) => a.position - b.position)

      const selectedZones = filteredData?.map((zone: any) => {
        return zone.zone.name
      })

      const selectedZonesData = filteredData?.map((zone: any) => {
        return { zone: zone.zone.id, position: zone.position }
      })

      setSelectedZones(selectedZones)
      setSelectedZonesData(selectedZonesData)
    } else {
      setSelectedZones(['', '', '', '', '', '', '', ''])
      setSelectedZonesData([])
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
      <div className="flex items-center gap-[57.85px]">
        {/* <button
          disabled={updatingCocoon || isLoading}
          onClick={handleBack}
          className="hidden md:flex items-center gap-7 mt-[-60px] z-20 disabled:opacity-40"
        >
          <p className="text-2xl font-bold text-white">back </p>
          <ChevronLeftIcon className="h-[86px] w-[45px]" fill="#F4EB22" strokeWidth={0} />
        </button> */}

        <div
          style={{ width: octagonSize, height: octagonSize }}
          className="relative mt-[-65px] md:mt-[-60px] z-20 flex flex-col items-center justify-center"
        >
          <ZoneOctagon
            currentWedgeIndex={currentWedgeIndex}
            octagonData={selectedZones}
            setCurrentWedgeIndex={setCurrentWedgeIndex}
            userAvatar={user?.avatar?.url ?? ''}
            ecoIcon={ecoIcon}
          />
        </div>
        {/* <button
          disabled={updatingCocoon || isLoading}
          onClick={handleNext}
          className="hidden md:flex items-center gap-7 mt-[-60px] z-20 disabled:opacity-40"
        >
          <ChevronRightIcon className="h-[86px] w-[45px]" fill="#F4EB22" strokeWidth={0} />
          <p className="text-2xl font-bold text-white">next </p>
        </button> */}
      </div>

      <DesignContextProvider stroke="rgb(var(--color-11))" strokeWidth={4}>
        <CommonBodyCard
          title={['inner', 'Soil']}
          headerCardType="bracketed"
          style={{
            zIndex: `${zIndex}`,
          }}
          className="mt-[-55px] sm:mt-[-70px] md:mt-[-80px] mb-[60px] md:mb-0 md:pb-[75px] h-full flex-grow w-full justify-start"
        >
          <section className="h-full w-full flex flex-col gap-10 items-center justify-between relative">
            <div
              className="hidden absolute m-auto w-full md:flex justify-between z-40"
              style={{ maxWidth: '820px', transform: `translateY(calc(-50% - 2px))` }}
            >
              <RegularPolygon
                as="button"
                type="button"
                disabled={updatingCocoon || isLoading}
                sides={8}
                className="flex items-center gap-7 size-[85px] bg-color-4 disabled:bg-color-5 group"
                stroke={updatingCocoon || isLoading ? 'rgb(var(--color-2))' : 'rgb(var(--color-1))'}
                onClick={handleBack}
                style={{
                  transform: `translateX(calc(-50% - 8px))`,
                }}
              >
                <ArrowLeftIcon
                  className={twMerge(
                    `size-[28px] `,
                    updatingCocoon || isLoading ? 'text-color-2' : 'text-color-1',
                  )}
                />
              </RegularPolygon>
              <RegularPolygon
                as="button"
                type="button"
                disabled={updatingCocoon || isLoading}
                sides={8}
                className="flex items-center gap-7 size-[85px] bg-color-4 disabled:bg-color-5 group translate-x-1/2"
                stroke={updatingCocoon || isLoading ? 'rgb(var(--color-2))' : 'rgb(var(--color-1))'}
                onClick={handleNext}
                style={{
                  transform: `translateX(calc(50% + 8px))`,
                }}
              >
                <ArrowRightIcon
                  className={twMerge(
                    `size-[28px]`,
                    updatingCocoon || isLoading ? 'text-color-2' : 'text-color-1',
                  )}
                />
              </RegularPolygon>
            </div>

            <section className="w-full mt-[70px] md:mt-[80px] flex flex-col items-center gap-[30px]">
              {/* <DesignContextProvider stroke="rgb(var(--color-4))">
                <HeaderCard
                  text="name your zone"
                  classNames={{
                    title: 'text-[32px] text-color-1 font-black',
                    outerTitle:
                      'text-white text-[24px] sm:text-[28px] md:text-[32px] leading-[100%] text-color-1 font-black',
                    base: 'w-[90%] sm:w-[545px] md:w-[523px] h-[51.42px] sm:h-[70px] md:h-[88.5px] before:absolute before:inset-0 before:bg-[radial-gradient(circle,rgb(var(--color-2))_3%,rgb(var(--color-8))_100%)] before:z-0 after:absolute after:inset-0 after:bg-[#1E2C27] after:opacity-50 after:z-0',
                    name: 'h-full w-full flex justify-center items-center',
                  }}
                />
              </DesignContextProvider> */}
              {/* <div className="w-full flex flex-col items-center gap-0">
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
                    Soil
                  </p>
                </div>
              </CustomHeaderCard>

              <div className="flex gap-2 mt-[-14px]">
                  <Button
                    type="button"
                    onPress={() => changeType('Seed')}
                    polygon={Rexagon}
                    strokeWidth={3}
                    stroke="rgb(var(--color-4))"
                    tipAngle={90}
                    className="h-[26px] w-[88px]"
                    style={{
                      background:
                        !type || type === 'Seed'
                          ? 'rgb(var(--color-2))'
                          : `linear-gradient(337.13deg, rgb(var(--color-9)) 3.4%, rgb(var(--color-8)) 99.7%)`,
                    }}
                  >
                    <p
                      className={twMerge(
                        'text-[12px]',
                        !type || type === 'Seed'
                          ? 'text-[rgb(var(--color-8))] font-extrabold'
                          : 'text-color-1 font-semibold opacity-55',
                      )}
                    >
                      seeds
                    </p>
                  </Button>

                  <Button
                    type="button"
                    onPress={() => changeType('Weed')}
                    polygon={Rexagon}
                    strokeWidth={3}
                    stroke="rgb(var(--color-4))"
                    tipAngle={90}
                    className="h-[26px] w-[88px]"
                    style={{
                      background:
                        type === 'Weed'
                          ? 'rgb(var(--color-2))'
                          : `linear-gradient(337.13deg, rgb(var(--color-9)) 3.4%, rgb(var(--color-8)) 99.7%)`,
                    }}
                  >
                    <p
                      className={twMerge(
                        'text-[12px]',
                        type === 'Weed'
                          ? 'text-[rgb(var(--color-8))] font-extrabold'
                          : 'text-color-1 font-semibold opacity-55',
                      )}
                    >
                      weeds
                    </p>
                  </Button>
                </div>
              </div> */}

              <p className="text-base md:text-lg font-bold text-color-13 text-center px-3 md:px-0">
                What would you like to plant this season?
              </p>

              <FlowerPicker
                flowers={zones}
                selectionMode="single"
                onSelectionChange={(keys: any) => handleSelectedZone(Array.from(keys))}
                style={{ width: 300 }}
              />
              <div className="flex items-center gap-4">
                <input
                  placeholder="| create your own"
                  className="border-none bg-transparent text-center text-base font-black text-color-13 placeholder:text-color-13 focus:border-none focus:outline-none"
                  onChange={(e) => setInputSoil(e.target.value)}
                  value={inputSoil}
                />
                {inputSoil && (
                  <Button
                    onPress={handleAdd}
                    polygon={Rexagon}
                    strokeWidth={0}
                    disabled={creatingZone}
                    variant="solid"
                    className="h-[39.25px] w-[84.08px] bg-[#F4EB22] disabled:opacity-40 disabled:hover:!opacity-40"
                  >
                    <p className="text-bse font-bold text-color-8">add</p>
                  </Button>
                )}
              </div>

              {updateErr && (
                <p className="text-center text-base sm:text-lg md:text-xl font-bold text-[#FF3B30]">
                  {updateErr}
                </p>
              )}
            </section>

            <section className="z-40 p-5 flex md:hidden w-full items-center justify-between">
              {/* <button
                type="button"
                onClick={handleBack}
                disabled={updatingCocoon || isLoading}
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
                disabled={updatingCocoon || isLoading}
                sides={8}
                className="flex items-center gap-7 size-10 bg-color-4 disabled:bg-color-5 group"
                stroke={updatingCocoon || isLoading ? 'rgb(var(--color-2))' : 'rgb(var(--color-1))'}
                strokeWidth={2}
                onClick={handleBack}
              >
                <ArrowLeftIcon
                  className={twMerge(
                    `size-3 `,
                    updatingCocoon || isLoading ? 'text-color-2' : 'text-color-1',
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
                disabled={updatingCocoon || isLoading}
                sides={8}
                className="flex items-center gap-7 size-10 bg-color-4 disabled:bg-color-5 group"
                stroke={updatingCocoon || isLoading ? 'rgb(var(--color-2))' : 'rgb(var(--color-1))'}
                strokeWidth={2}
                onClick={handleNext}
              >
                <ArrowRightIcon
                  className={twMerge(
                    `size-3 `,
                    updatingCocoon || isLoading ? 'text-color-2' : 'text-color-1',
                  )}
                />
              </RegularPolygon>

              {/* <button
                type="button"
                disabled={updatingCocoon || isLoading}
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

export default OnboardingZoneClientPage
