import React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { SettingsMenu } from '@/features/layout/navigation/settings-menu'
import { Rexagon } from '@/components/atoms/polygon/rexagon'
import { useStepperContentContext } from '@/hooks/use-stepper-content-context'
import { RegularPolygon } from '@/components/atoms/polygon/regular-polygon'
import { twMerge } from 'tailwind-merge'
import { TutorialVideoCard } from '@/features/pages/onboarding/tutorial-video-card'
import RefreshSoilPage from '@/features/layout/navigation/refresh-soil-page'
import { useBuilderStepperStore } from '@/stores/builder-stepper-store'
import YellowFlowerIcon from '@/features/icons/yellow-flower-icon'
import { useBuilderCreateStepperStore } from '@/stores/builder-create-stepper-store'

export const SubHeader: React.FC<SubHeaderProps> = (props) => {
  const pathname = usePathname()
  // const router = useRouter()

  const { stepperContent, currentStep } = useStepperContentContext()

  const { builderStepperContent, currentBuilderStep } = useBuilderStepperStore()

  const { builderCreateStepperContent, currentBuilderCreateStep } = useBuilderCreateStepperStore()

  if (pathname?.endsWith('/login')) {
    return null
  }

  return (
    <header className="z-10 flex pb-3.5 fixed justify-between md:justify-start top-0 h-[calc(var(--navbar-height)+60px)] w-full items-end gap-6  bg-color-12 px-4 md:px-8 max-w-[1440px]">
      {(pathname?.endsWith('/onboarding/grow') ||
        pathname?.includes('/settings') ||
        pathname?.includes('/builder')) && (
        <SettingsMenu className="order-2 md:order-none h-8 z-30" />
      )}
      <div className="w-full md:w-fit flex gap-2 items-center justify-between md:justify-start">
        {(pathname?.endsWith('/onboarding-action') ||
          pathname?.endsWith('/onboarding/landscape') ||
          pathname?.endsWith('/onboarding/zone')) && (
          <div className="hidden md:block opacity-50 text-color-2">
            <YellowFlowerIcon />
          </div>
        )}

        <TutorialVideoCard iconOnly />

        {pathname?.endsWith('/onboarding/zone') && <RefreshSoilPage />}
      </div>

      <div className="hidden md:block ml-auto">
        {pathname?.includes('/onboarding/') && (
          <Rexagon
            className="bg-color-1 px-4 h-[37.81px] flex items-center gap-1"
            tipAngle={100}
            strokeWidth={0}
            overflow={true}
          >
            {/* {stepperContent.map((stepper, index) => {
              if (pathname === `${stepper.path}`) {
                return (
                  <div key={index} className="relative">
                    <RegularPolygon
                      sides={8}
                      className="w-12 h-12 bg-color-2"
                      stroke="rgb(var(--color-1))"
                      strokeWidth={5}
                    >
                      <span className="text-color-1 font-black text-[20px]">{index + 1}</span>
                    </RegularPolygon>
                    <span className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 ">
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
            })} */}

            {stepperContent.map((stepper, index) => (
              <StepperNode key={index} index={index} stepper={stepper} currentStep={currentStep} />
            ))}
          </Rexagon>
        )}

        {pathname?.includes('/builder') && !pathname?.includes('/builder/completed') && (
          <Rexagon
            className="bg-color-1 px-4 h-[37.81px] flex items-center gap-1"
            tipAngle={100}
            strokeWidth={0}
            overflow={true}
          >
            {pathname?.includes('/builder/sprout')
              ? builderCreateStepperContent.map((stepper, index) => (
                  <StepperNode
                    key={index}
                    index={index}
                    stepper={stepper}
                    currentStep={currentBuilderCreateStep}
                  />
                ))
              : builderStepperContent.map((stepper, index) => (
                  <StepperNode
                    key={index}
                    index={index}
                    stepper={stepper}
                    currentStep={currentBuilderStep}
                  />
                ))}
          </Rexagon>
        )}
      </div>
    </header>
  )
}

interface SubHeaderProps {}

function StepperNode({
  index,
  stepper,
  currentStep,
}: {
  index: number
  stepper: Stepper
  currentStep: number
}) {
  const pathname = usePathname()

  if (pathname?.includes(`${stepper.path}`)) {
    return <StepperActiveComponent key={index} index={index} tooltip={stepper.tooltip} />
  }

  return (
    <StepperComponent
      key={index}
      index={index}
      path={stepper.path}
      isCompleted={stepper.isCompleted}
      currentStep={currentStep}
    />
  )
}

function StepperActiveComponent({ index, tooltip }: { index: number; tooltip: string }) {
  return (
    <div className="relative">
      <RegularPolygon
        sides={8}
        className="w-12 h-12 bg-color-2"
        stroke="rgb(var(--color-1))"
        strokeWidth={5}
      >
        <span className="text-color-1 font-black text-[20px]">{index + 1}</span>
      </RegularPolygon>
      <span className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 ">
        <p className="text-color-1 font-black text-xs leading-[100%]">{tooltip}</p>
      </span>
    </div>
  )
}

function StepperComponent({
  index,
  path,
  isCompleted,
  currentStep,
}: {
  index: number
  path: string
  isCompleted: boolean
  currentStep: number
}) {
  const router = useRouter()
  return (
    <button
      type="button"
      onClick={() => router.push(`${path}`)}
      disabled={!isCompleted && currentStep < index + 1}
      className={twMerge(
        'z-50 w-8 h-8 flex disabled:opacity-30 cursor-pointer items-center justify-center text-color-2 font-black text-[20px]',
      )}
    >
      {index + 1}
    </button>
  )
}
