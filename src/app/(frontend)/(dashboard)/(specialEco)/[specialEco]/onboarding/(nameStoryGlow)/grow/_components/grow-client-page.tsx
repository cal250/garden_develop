'use client'

import { ChevronLeftIcon, ChevronRightIcon } from '@/components/atoms/icons'
import { Rexagon } from '@/components/atoms/polygon/rexagon'
import { DesignContextProvider } from '@/hooks/use-design-context'
import { useRouter } from 'next/navigation'
import { useStepperContentContext } from '@/hooks/use-stepper-content-context'
import { RegularPolygon } from '@/components/atoms/polygon/regular-polygon'
import { twMerge } from 'tailwind-merge'
import { Button } from '@/components/atoms/button'
import { useAuth } from '@/features/providers/auth'
import CommonBodyCard from '@/components/common-body-card'

interface props {
  specialEco: string
}

const OnboardingGrowClientPage = ({ specialEco }: props) => {
  const router = useRouter()

  const { stepperContent, currentStep } = useStepperContentContext()

  const { user } = useAuth()

  function handleBack() {
    router.push(`/${specialEco}/onboarding/bio`)
  }

  return (
    <DesignContextProvider stroke="rgb(var(--color-11))" strokeWidth={4}>
      <CommonBodyCard
        title={user?.username ?? ''}
        style={{
          zIndex: 20,
        }}
        headerCardProps={{
          classNames: {
            outerTitle:
              'text-[24px] sm:text-[28px] md:text-[32px] leading-[100%] font-black text-color-1',
          },
        }}
        className="mt-[-55px] sm:mt-[-70px] md:mt-[-80px] mb-[60px] md:mb-0 md:pb-[50px] h-full flex-grow w-full justify-start"
      >
        <section className="h-full w-full flex flex-col gap-10 items-center justify-between relative">
          <section className="mt-[55px] sm:mt-[70px] md:mt-[80px] h-full w-full flex flex-col items-center gap-[42px] md:gap-[52px]">
            <p className="text-xl md:text-2xl leading-[100%] font-black text-color-13 text-center px-3 md:px-0">
              ready to grow?
            </p>

            <div className="w-full flex flex-col md:flex-row items-center md:items-start md:justify-center gap-[58px] md:gap-10 px-3">
              <Button
                polygon={Rexagon}
                tipAngle={75}
                overflow
                className="bg-color-1 text-color-6 w-[290px] md:w-[260px] h-[73px] flex flex-col gap-0 relative"
                strokeWidth={0}
              >
                <span className="text-base md:text-lg font-bold">explore</span>
                <span className="text-xl md:text-[22px] font-black">wellgorithms</span>
                <img
                  src="/assets/onboarding/gold-telescope.png"
                  className="w-10 h-10 absolute -top-6 left-1/2 -translate-x-1/2"
                />
              </Button>

              <div className="flex flex-col gap-[4.18px] md:gap-[10.77px]">
                <Button
                  polygon={Rexagon}
                  tipAngle={75}
                  overflow
                  className="bg-color-1 text-color-6 w-[290px] md:w-[260px] h-[73px] flex flex-col gap-0 relative"
                  strokeWidth={0}
                >
                  <span className="text-base md:text-lg font-bold">seed a</span>
                  <span className="text-xl md:text-[22px] font-black">wellgorithm</span>
                  <img
                    src="/assets/onboarding/seedling.png"
                    className="w-10 h-10 absolute -top-6 left-1/2 -translate-x-1/2"
                  />
                </Button>

                <p className="font-semibold text-xs text-center text-white">donation required</p>
              </div>
            </div>
          </section>

          <section className="z-40 p-5 flex md:hidden w-full items-center justify-between">
            <button
              type="button"
              onClick={handleBack}
              disabled={true}
              className="md:hidden flex disabled:opacity-0"
            >
              <ChevronLeftIcon
                className="h-[33.76px] w-[17.67px]"
                fill="rgb(var(--color-2))"
                strokeWidth={0}
              />
            </button>

            <Rexagon
              className="bg-color-1 pl-4 pr-4 h-[37.81px] z-10 flex items-center gap-1"
              tipAngle={100}
              strokeWidth={0}
              overflow={true}
            >
              {stepperContent.map((stepper, index) => {
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

            <button type="button" disabled={true} className="md:hidden flex disabled:opacity-0">
              <ChevronRightIcon
                className="h-[33.76px] w-[17.67px]"
                fill="rgb(var(--color-2))"
                strokeWidth={0}
              />
            </button>
          </section>
        </section>
      </CommonBodyCard>
    </DesignContextProvider>
  )
}

export default OnboardingGrowClientPage
