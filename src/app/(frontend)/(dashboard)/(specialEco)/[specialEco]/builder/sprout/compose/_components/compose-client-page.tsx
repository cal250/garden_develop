'use client'

import { ArrowLeftIcon, ArrowRightIcon } from '@/components/atoms/icons'
import { Rexagon } from '@/components/atoms/polygon/rexagon'
import { DesignContextProvider } from '@/hooks/use-design-context'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { RegularPolygon } from '@/components/atoms/polygon/regular-polygon'
import { twMerge } from 'tailwind-merge'
import CommonBodyCard from '@/components/common-body-card'
import useBuilderSoilDataStore from '@/stores/builder-soil-data-store'
import { useBuilderCreateStepperStore } from '@/stores/builder-create-stepper-store'
import SproutCommonOctagon from '../../_components/sprout-common-octagon'

interface props {
  specialEco: string
}

const ComposeClientPage = ({ specialEco }: props) => {
  const router = useRouter()

  const {
    setBuilderCreateStepperContent,
    builderCreateStepperContent,
    currentBuilderCreateStep,
    setCurrentBuilderCreateStep,
  } = useBuilderCreateStepperStore()

  const { wordType, singleWord, innerWord, outerWord } = useBuilderSoilDataStore()

  const [loading, setLoading] = useState(false)

  function cb() {
    const currentSteppers: Stepper[] = builderCreateStepperContent

    const updatedSteppers = currentSteppers.map((step: Stepper) => {
      if (step.tooltip === 'compose') {
        return {
          ...step,
          isCompleted: true,
        }
      }
      return step
    })

    setBuilderCreateStepperContent(updatedSteppers)

    setCurrentBuilderCreateStep(2)

    router.push(`/${specialEco}/builder/completed`)
  }

  function handleBack() {
    router.push(`/${specialEco}/builder/completed`)
  }

  async function handleNext() {
    cb()
  }

  return (
    <div className="flex size-full flex-col items-center">
      <div className="relative mt-[-65px] md:mt-[-60px] z-20 flex items-center justify-center gap-[60px]">
        <div className="hidden md:flex flex-col items-center justify-center gap-1">
          <RegularPolygon
            as="button"
            type="button"
            sides={8}
            className="flex items-center justify-center size-[60px] bg-color-4 disabled:bg-color-5"
            stroke={loading ? 'rgb(var(--color-2))' : 'rgb(var(--color-1))'}
            strokeWidth={2.78}
            // onClick={handleNext}
          >
            <ArrowRightIcon
              className={twMerge(`size-5 -rotate-90`, loading ? 'text-color-2' : 'text-color-1')}
            />
          </RegularPolygon>

          <p className="font-bold text-sm text-color-1 text-center">upload</p>
        </div>

        <SproutCommonOctagon />

        <RegularPolygon
          as="button"
          type="button"
          disabled={true}
          sides={8}
          className="hidden md:flex items-center justify-center size-[60px] bg-color-4 disabled:bg-color-5 disabled:opacity-0"
          stroke={loading ? 'rgb(var(--color-2))' : 'rgb(var(--color-1))'}
          strokeWidth={2.78}
          // onClick={handleNext}
        >
          <ArrowRightIcon
            className={twMerge(`size-5 -rotate-90`, loading ? 'text-color-2' : 'text-color-1')}
          />
        </RegularPolygon>
      </div>

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
          className="mt-[-55px] sm:mt-[-70px] md:mt-[-80px] mb-[60px] md:mb-0 md:pb-[150px] h-full flex-grow w-full justify-start md:justify-start"
        >
          <section className="h-full w-full flex flex-col gap-10 md:gap-[77px] items-center justify-between relative">
            <div
              className="hidden absolute m-auto w-full md:flex justify-between z-40"
              style={{ maxWidth: '820px', transform: `translateY(calc(-50% - 2px))` }}
            >
              <RegularPolygon
                as="button"
                type="button"
                disabled={loading}
                sides={8}
                className="flex items-center gap-7 size-[85px] bg-color-4 disabled:bg-color-5 group"
                stroke={loading ? 'rgb(var(--color-2))' : 'rgb(var(--color-1))'}
                onClick={handleBack}
                style={{
                  transform: `translateX(calc(-50% - 8px))`,
                }}
              >
                <ArrowLeftIcon
                  className={twMerge(`size-[28px] `, loading ? 'text-color-2' : 'text-color-1')}
                />
              </RegularPolygon>
              <RegularPolygon
                as="button"
                type="button"
                disabled={loading}
                sides={8}
                className="flex items-center gap-7 size-[85px] bg-color-4 disabled:bg-color-5 group translate-x-1/2"
                stroke={loading ? 'rgb(var(--color-2))' : 'rgb(var(--color-1))'}
                onClick={handleNext}
                style={{
                  transform: `translateX(calc(50% + 8px))`,
                }}
              >
                <ArrowRightIcon
                  className={twMerge(`size-[28px]`, loading ? 'text-color-2' : 'text-color-1')}
                />
              </RegularPolygon>
            </div>

            <section className="w-full mt-[70px] md:mt-[80px] flex flex-col items-center justify-center gap-4 md:gap-5"></section>

            <section className="z-40 p-5 flex md:hidden w-full items-center justify-between">
              <RegularPolygon
                as="button"
                type="button"
                disabled={loading}
                sides={8}
                className="flex items-center gap-7 size-10 bg-color-4 disabled:bg-color-5 group"
                stroke={loading ? 'rgb(var(--color-2))' : 'rgb(var(--color-1))'}
                strokeWidth={2}
                onClick={handleBack}
              >
                <ArrowLeftIcon
                  className={twMerge(`size-3 `, loading ? 'text-color-2' : 'text-color-1')}
                />
              </RegularPolygon>

              <Rexagon
                className="bg-color-1 pl-4 pr-0 h-[37.81px] z-10 flex items-center gap-1"
                tipAngle={100}
                strokeWidth={0}
                overflow={true}
              >
                {builderCreateStepperContent.map((stepper, index) => {
                  if (index === 4) {
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
                      disabled={!stepper.isCompleted && currentBuilderCreateStep < index + 1}
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
                disabled={loading}
                sides={8}
                className="flex items-center gap-7 size-10 bg-color-4 disabled:bg-color-5 group"
                stroke={loading ? 'rgb(var(--color-2))' : 'rgb(var(--color-1))'}
                strokeWidth={2}
                onClick={handleNext}
              >
                <ArrowRightIcon
                  className={twMerge(`size-3 `, loading ? 'text-color-2' : 'text-color-1')}
                />
              </RegularPolygon>
            </section>
          </section>
        </CommonBodyCard>
      </DesignContextProvider>
    </div>
  )
}

export default ComposeClientPage
