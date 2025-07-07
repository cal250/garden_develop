'use client'

import { ArrowLeftIcon, ArrowRightIcon } from '@/components/atoms/icons'
import { Rexagon } from '@/components/atoms/polygon/rexagon'
import { DesignContextProvider } from '@/hooks/use-design-context'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { RegularPolygon } from '@/components/atoms/polygon/regular-polygon'
import { twMerge } from 'tailwind-merge'
import CommonBodyCard from '@/components/common-body-card'
import { useBuilderStepperStore } from '@/stores/builder-stepper-store'
import useBuilderSoilDataStore from '@/stores/builder-soil-data-store'
import BuilderCommonOctagon from '../../_components/builder-common-octagon'
import SearchIcon from '@/features/icons/search-icon'
import CloudUploadArrowIcon from '@/features/icons/cloud-upload-arrow-icon'
import { Rectagon } from '@/components/atoms/polygon/rectagon'

interface props {
  specialEco: string
}

const BuilderImageClientPage = ({ specialEco }: props) => {
  const router = useRouter()

  const {
    setBuilderStepperContent,
    builderStepperContent,
    currentBuilderStep,
    setCurrentBuilderStep,
  } = useBuilderStepperStore()

  const { wordType, singleWord, innerWord, outerWord, image, setImage } = useBuilderSoilDataStore()

  const [updatingCocoon, setUpdatingCocoon] = useState(false)
  const [imageErr, setImageErr] = useState('')
  const [inputValue, setInputValue] = useState('')

  function handleBack() {
    router.push(`/${specialEco}/builder/word/${wordType}`)
  }

  function cb() {
    const currentSteppers: Stepper[] = builderStepperContent

    const updatedSteppers = currentSteppers.map((step: Stepper) => {
      if (step.tooltip === 'image') {
        return {
          ...step,
          isCompleted: true,
        }
      }
      return step
    })

    setBuilderStepperContent(updatedSteppers)

    setCurrentBuilderStep(5)

    router.push(`/${specialEco}/builder/intention`)
  }

  async function handleNext() {
    if (image) {
      cb()
    } else {
      setImageErr('Please select an image')
    }
  }

  return (
    <div className="flex size-full flex-col items-center">
      <BuilderCommonOctagon>
        <div className="w-full flex flex-col items-center justify-center">
          <p className="text-center text-base sm:text-lg md:text-xl font-semibold text-color-13">
            choose your
          </p>
          <p className="text-center text-[32px] sm:text-[36px] md:text-[40px] font-black text-color-13">
            image
          </p>
          <div
            className={twMerge(
              'w-[50px] md:w-[69px] h-[35px] md:h-[49px] mt-2',
              imageErr ? 'text-[#FF3B30]' : 'text-color-13',
            )}
          >
            <CloudUploadArrowIcon />
          </div>

          {imageErr && (
            <p className="text-center text-xs md:text-sm font-bold text-[#FF3B30]">{imageErr}</p>
          )}
        </div>
      </BuilderCommonOctagon>

      <DesignContextProvider stroke="rgb(var(--color-11))" strokeWidth={4}>
        <CommonBodyCard
          title={wordType === 'single' ? singleWord : [innerWord, outerWord]}
          headerCardType={wordType === 'single' ? undefined : 'separated'}
          headerCardProps={{
            separatorFill: 'rgb(var(--color-1))',
            separatorStroke: 0,
            classNames: {
              title: 'text-[24px] sm:text-[28px] md:text-[32px] leading-[100%] font-black',
              outerTitle:
                'text-[24px] sm:text-[28px] md:text-[32px] leading-[100%] font-black text-color-13',
              leftTitle:
                'w-[150px] sm:w-[200px] text-end text-[24px] sm:text-[28px] md:text-[32px] leading-[100%] font-black text-color-13',
              rightTitle:
                'w-[150px] sm:w-[200px] text-start text-[24px] sm:text-[28px] md:text-[32px] leading-[100%] font-black text-color-13',
              separator: 'scale-[500%] sm:scale-[600%] md:scale-[700%]',
            },
          }}
          style={{
            zIndex: 20,
          }}
          className="mt-[-55px] sm:mt-[-70px] md:mt-[-80px] mb-[60px] md:mb-0 md:pb-[50px] h-full flex-grow w-full justify-start md:justify-start"
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

            <section className="w-full mt-[70px] md:mt-[80px] flex flex-col items-center justify-center gap-4 md:gap-5">
              <div className="max-w-[252px] relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="border-b-[1px] border-b-[#CFE0B8] text-center text-color-13/80 bg-transparent focus:outline-none py-2"
                  style={{ paddingLeft: !inputValue ? '10px' : '5px' }} // Adjust padding
                />
                {!inputValue && (
                  <div className="w-full absolute top-1/2 left-2 -translate-y-1/2 text-gray-500 pointer-events-none flex items-center justify-center gap-10">
                    <div className="w-5 h-5 text-[#CFE0B8]">
                      <SearchIcon />
                    </div>
                    <p className="text-base text-color-13/80">Search</p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, index) => {
                  return (
                    <Rectagon
                      stroke={`${index}` === image ? 'rgb(var(--color-1))' : 'rgb(var(--color-2))'}
                      strokeWidth={`${index}` === image ? 4 : 2}
                      onClick={() => setImage(`${index}`)}
                      chamferLength={30}
                      className="w-[99px] md:w-[110px] h-[70px] md:h-[78px]"
                      key={index}
                      as="button"
                    >
                      <img src="/assets/create/gallery.png" alt="" />
                    </Rectagon>
                  )
                })}
              </div>
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

export default BuilderImageClientPage
