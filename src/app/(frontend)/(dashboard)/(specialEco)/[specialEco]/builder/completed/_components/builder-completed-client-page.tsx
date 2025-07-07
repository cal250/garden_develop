'use client'

import { Button } from '@/components/atoms/button'
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
import { Rectagon } from '@/components/atoms/polygon/rectagon'
import useWindowWidth from '@/hooks/use-window-width'
import { Input } from '@/components/atoms/input'
import { CompletedFlowerSelector } from './completed-flower-select'
import Link from 'next/link'

interface props {
  specialEco: string
}

const BuilderCompletedClientPage = ({ specialEco }: props) => {
  const router = useRouter()

  const width = useWindowWidth()

  const {
    setBuilderStepperContent,
    builderStepperContent,
    currentBuilderStep,
    setCurrentBuilderStep,
  } = useBuilderStepperStore()

  const { wordType, singleWord, innerWord, outerWord, intention, setIntention } =
    useBuilderSoilDataStore()

  const [updatingCocoon, setUpdatingCocoon] = useState(false)
  const [intentionErr, setIntentionErr] = useState('')
  const [inputValue, setInputValue] = useState('')
  const [selectedFlower, setSelectedFlower] = useState<string>('')

  function handleAdd() {
    console.log(inputValue)
  }

  function handleBack() {
    router.push(`/${specialEco}/builder/intention`)
  }

  // function cb() {
  //   const currentSteppers: Stepper[] = builderStepperContent

  //   const updatedSteppers = currentSteppers.map((step: Stepper) => {
  //     if (step.tooltip === 'intention') {
  //       return {
  //         ...step,
  //         isCompleted: true,
  //       }
  //     }
  //     return step
  //   })

  //   setBuilderStepperContent(updatedSteppers)

  //   setCurrentBuilderStep(5)

  //   router.push(`/${specialEco}/builder/intention`)
  // }

  // async function handleNext() {
  //   if (intention) {
  //     cb()
  //   } else {
  //     setIntentionErr('Please enter your intention with this seed')
  //   }
  // }

  return (
    <div className="flex size-full flex-col items-center">
      <section
        className={`relative mt-[0px] md:mt-[0px] z-20 flex flex-col gap-[30px] items-center justify-center`}
      >
        <div className="flex flex-col">
          <h1 className="text-center text-[32px] sm:text-[36px] md:text-[40px] font-black text-color-1">
            congratulations!
          </h1>

          <p className="text-center text-base sm:text-lg md:text-xl font-bold text-color-13">
            your seed is planted.
          </p>
        </div>

        <div className="flex gap-2 items-center">
          <h2 className="text-center text-[24px] sm:text-[28px] md:text-[32px] font-black text-color-13">
            you’ve earned
          </h2>

          <RegularPolygon
            sides={8}
            className="w-[60px] md:w-[77px] h-[60px] md:h-[77px] bg-color-11"
            stroke="rgb(var(--color-1))"
            strokeWidth={4}
          >
            <span className="text-center text-[24px] sm:text-[28px] md:text-[32px] font-black text-color-13">
              10
            </span>
          </RegularPolygon>

          <h2 className="text-center text-[24px] sm:text-[28px] md:text-[32px] font-black text-color-13">
            Flowers
          </h2>
        </div>

        <div className="flex flex-col items-center gap-4 md:gap-5">
          <p className="text-center text-base sm:text-lg md:text-xl font-bold text-color-13">
            what type of flowers would you like?
          </p>

          <div className="flex flex-col sm:flex-row items-start gap-6 md:gap-[37px]">
            <CompletedFlowerSelector
              selectedFlower={selectedFlower}
              onFlowerChange={setSelectedFlower}
            />
            <div className="flex items-center gap-4">
              <Input
                placeholder="| create"
                classNames={{
                  input:
                    'text-color-13 text-center text-[14px] md:text-lg leading-[100%] font-black placeholder:text-center placeholder:text-color-13 focus:bg-color-2 focus:outline-none hover:bg-color-2',
                  inputWrapper: 'h-12 sm:h-12 w-[164px] !bg-color-2 text-color-13',
                }}
                chamferLength={{ x: 20, y: 15 }}
                onChange={(e) => setInputValue(e.target.value)}
                stroke="rgb(var(--color-4))"
                strokeWidth={2}
                polygon={Rectagon}
              />

              <Button
                // disabled={isAddingTag}
                onPress={handleAdd}
                polygon={Rexagon}
                strokeWidth={0}
                variant="solid"
                className="h-[34px] w-[72.38px] bg-[#F4EB22]"
              >
                <p className="text-sm font-bold text-color-8">add</p>
              </Button>
            </div>
          </div>
        </div>
      </section>

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
            zIndex: 10,
          }}
          className="mt-[100px] sm:mt-[100px] md:mt-[100px] mb-[60px] md:mb-0 md:pb-[70px] h-full flex-grow w-full justify-start md:justify-start"
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
                disabled={true}
                sides={8}
                className="flex items-center gap-7 size-[85px] bg-color-4 disabled:opacity-0 disabled:bg-color-5 group translate-x-1/2"
                stroke={updatingCocoon ? 'rgb(var(--color-2))' : 'rgb(var(--color-1))'}
                // onClick={handleNext}
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

            <section className="w-full mt-[90px] md:mt-[100px] flex flex-col items-center justify-center gap-[30px]">
              <div className="w-full px-4 md:px-0 flex flex-col md:flex-row items-center justify-center gap-10 md:gap-[85px]">
                <Button
                  polygon={Rexagon}
                  tipAngle={75}
                  overflow
                  className="bg-color-1 text-color-6 w-[290px] md:w-[254px] h-[61.26px] flex flex-col gap-0 relative"
                  strokeWidth={0}
                >
                  <span className="text-center text-xl md:text-2xl font-bold">share</span>
                  <img
                    src="/assets/create/share.png"
                    className="w-10 h-10 absolute -top-7 left-1/2 -translate-x-1/2"
                  />
                </Button>

                <Link href={`/${specialEco}/builder/sprout/compose`}>
                  <Button
                    polygon={Rexagon}
                    tipAngle={75}
                    overflow
                    className="bg-color-1 text-color-6 w-[290px] md:w-[254px] h-[61.26px] flex flex-col gap-0 relative"
                    strokeWidth={0}
                  >
                    <span className="text-center text-xl md:text-2xl font-bold">sprout</span>
                    <img
                      src="/assets/create/sprout.png"
                      className="w-10 h-10 absolute -top-7 left-1/2 -translate-x-1/2"
                    />
                  </Button>
                </Link>
              </div>

              <p className="max-w-[410px] text-center text-sm md:text-base font-bold text-color-13">
                Share your seeds with the community, or sprout them now in your{' '}
                <span className="text-color-1">⟨</span>
                inner<span className="text-color-1">⟩</span>
                <span className="text-color-1">Garden</span>.
              </p>
            </section>

            <section className="z-40 p-5 flex md:hidden w-full items-center justify-center">
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

              {/* <Rexagon
                className="bg-color-1 pl-4 pr-4 h-[37.81px] z-10"
                strokeWidth={0}
                overflow={true}
              >
                {builderStepperContent.map((stepper, index) => {
                  if (index === 4) {
                    return (
                      <div key={index} className="relative">
                        <RegularPolygon
                          sides={6}
                          className="w-[50px] h-[38px] bg-color-4"
                          stroke="rgb(var(--color-4))"
                          strokeWidth={0}
                        >
                          <span className="text-color-13 font-black text-[20px]">{index + 1}</span>
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
                // onClick={handleNext}
              >
                <ArrowRightIcon
                  className={twMerge(`size-3 `, updatingCocoon ? 'text-color-2' : 'text-color-1')}
                />
              </RegularPolygon> */}
            </section>
          </section>
        </CommonBodyCard>
      </DesignContextProvider>
    </div>
  )
}

export default BuilderCompletedClientPage
