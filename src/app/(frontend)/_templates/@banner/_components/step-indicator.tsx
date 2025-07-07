'use client'
import React from 'react'
import { Stepper } from '@/components/molecules/stepper/stepper'
import { Rexagon } from '@/components/atoms/polygon/rexagon'
import { RegularPolygon } from '@/components/atoms/polygon/regular-polygon'
import { useRouter } from 'next/navigation'
import { twMerge } from 'tailwind-merge'
import { usePageStepsContext } from '@/app/(frontend)/_templates/_context/page-steps'

export const StepIndicator: React.FC<StepIndicatorProps> = () => {
  const router = useRouter()
  const { steps, pageIndex } = usePageStepsContext()

  if (!steps.length || pageIndex < 0) return null

  return (
    <Rexagon className="bg-color-1 px-10 h-[35px]" strokeWidth={0} overflow={true}>
      <Stepper
        value={pageIndex + 1}
        onChange={(value: number) => {
          router.push(steps[value - 1].path)
        }}
        numSteps={steps.length}
        stepIndicator={({ step, isCurrentStep, isComplete }) => {
          if (isCurrentStep) {
            return (
              <div className="relative">
                <RegularPolygon
                  sides={8}
                  className="size-[45px] bg-color-2"
                  stroke="rgb(var(--color-1))"
                  strokeWidth={5}
                >
                  <span className="text-color-1 font-black text-[20px]">{step}</span>
                </RegularPolygon>
                <span className="absolute bottom-[-30px] left-1/2 -translate-x-1/2 ">
                  <p className="text-color-13 font-black text-[12px] whitespace-nowrap">
                    {steps[step - 1].title}
                  </p>
                </span>
              </div>
            )
          }
          return (
            <span
              className={twMerge(
                'w-8 h-8 flex items-center justify-center text-[#825FA3] font-black text-[20px]',
                isComplete && 'opacity-30',
              )}
            >
              {step}
            </span>
          )
        }}
      />
    </Rexagon>
  )
}

interface StepIndicatorProps {}
