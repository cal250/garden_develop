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
import { HeaderCard } from '@/components/molecules/header-card/header-card'
import BuilderCommonOctagon from '../../_components/builder-common-octagon'

interface props {
  specialEco: string
}

const BuilderSingleWordClientPage = ({ specialEco }: props) => {
  const router = useRouter()

  const {
    setBuilderStepperContent,
    builderStepperContent,
    currentBuilderStep,
    setCurrentBuilderStep,
  } = useBuilderStepperStore()

  const { singleWord, setSingleWord } = useBuilderSoilDataStore()

  const [updatingCocoon, setUpdatingCocoon] = useState(false)
  const [singleWordErr, setSingleWordErr] = useState('')

  function handleBack() {
    router.push(`/${specialEco}/builder/word`)
  }

  function cb() {
    const currentSteppers: Stepper[] = builderStepperContent

    const updatedSteppers = currentSteppers.map((step: Stepper) => {
      if (step.tooltip === 'word') {
        return {
          ...step,
          isCompleted: true,
        }
      }
      return step
    })

    setBuilderStepperContent(updatedSteppers)

    setCurrentBuilderStep(4)

    router.push(`/${specialEco}/builder/image`)
  }

  async function handleNext() {
    if (singleWord) {
      cb()
    } else {
      setSingleWordErr('Please provide your single word')
    }
  }

  return (
    <div className="flex size-full flex-col items-center">
      <BuilderCommonOctagon>
        <div className="w-full max-w-[252px]">
          <input
            type="text"
            value={singleWord}
            onChange={(e) => setSingleWord(e.target.value)}
            placeholder="| what's your word?"
            className="w-full border-b-[1px] border-b-color-13 text-center placeholder:text-center text-color-13/80 placeholder:text-color-13/80 text-base md:text-lg font-extrabold bg-transparent focus:outline-none py-2"
          />

          {singleWordErr && (
            <p className="text-center text-xs md:text-sm font-bold text-[#FF3B30]">
              {singleWordErr}
            </p>
          )}
        </div>
      </BuilderCommonOctagon>

      <DesignContextProvider stroke="rgb(var(--color-11))" strokeWidth={4}>
        <CommonBodyCard
          style={{
            zIndex: 20,
          }}
          className="mt-[-55px] sm:mt-[-70px] md:mt-[-80px] mb-[60px] md:mb-0 md:pb-[200px] h-full flex-grow w-full justify-start md:justify-start"
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

            <section className="w-full mt-[-30px] sm:mt-[-40px] md:mt-[-50px] flex flex-col md:flex-row items-center justify-center gap-[30px]">
              <DesignContextProvider stroke="rgb(var(--color-4))">
                <HeaderCard
                  text={singleWord}
                  tipAngle={90}
                  strokeWidth={4}
                  className="!min-w-[340px] !w-[80%] sm:!w-[450px] md:!w-[480px] min-h-[52px] sm:min-h-[70px] md:min-h-[88.5px] py-1 pointer-events-none"
                  classNames={{
                    name: 'h-full w-full flex justify-center items-center',
                    title: 'text-[24px] sm:text-[28px] md:text-[32px] leading-[100%] font-black',
                    outerTitle:
                      'text-[24px] sm:text-[28px] md:text-[32px] leading-[100%] font-black text-color-13',
                  }}
                  stroke="rgb(var(--color-4))"
                  style={{
                    background: `radial-gradient(100.08% 49.99% at 66.81% 47.94%, rgb(var(--color-9)) 3.4%, rgb(var(--color-8)) 99.68%)`,
                  }}
                />
              </DesignContextProvider>
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

export default BuilderSingleWordClientPage
