import React from 'react'
import { forwardRef, PropsOf } from '@/components/utils/react/polymorphism'
import { AriaSliderProps, useSlider } from 'react-aria'
import { useSliderState } from '@react-stately/slider'
import { useDOMRef } from '@/components/utils/react/dom'
import { RegularPolygon } from '@/components/atoms/polygon/regular-polygon'
import { twMerge } from 'tailwind-merge'
import { dataAttr } from '@/components/utils/assertion'

export interface StepIndicatorProps {
  isComplete?: boolean
  isCurrentStep?: boolean
  step: number
}

export interface StepperGapIndicatorProps {
  isComplete?: boolean
  previousStep?: number
  nextStep?: number
}

interface Props extends Omit<AriaSliderProps<number>, 'step' | 'minValue' | 'maxValue'> {
  /**
   * The component to use for the step indicator
   */
  stepIndicator?: React.ComponentType<StepIndicatorProps>
  /**
   * The number of steps in the stepper
   */
  numSteps: number

  /**
   * The component to use for the gap indicator
   */
  gapIndicator?: React.ComponentType<StepperGapIndicatorProps>
}

const DefaultStepIndicator = ({ isComplete = false }: StepIndicatorProps) => {
  return (
    <RegularPolygon
      sides={6}
      data-complete={dataAttr(isComplete)}
      className="h-8 data-[complete=true]:bg-color-2 data-[complete=true]:text-black"
      stroke="var(--color-9--80)"
    />
  )
}

const DefaultGapIndicator = (props: StepperGapIndicatorProps) => {
  return <span className="w-2"></span>
}

export const Stepper = forwardRef<Props>(
  (
    {
      as,
      stepIndicator: StepIndicator = DefaultStepIndicator,
      gapIndicator: GapIndicator = DefaultGapIndicator,
      ...props
    },
    ref,
  ) => {
    const state = useSliderState<number>({
      ...props,
      minValue: 0,
      maxValue: props.numSteps,
      step: 1,
      numberFormatter: new Intl.NumberFormat(undefined, { style: 'percent' }),
    })
    const domRef = useDOMRef(ref)
    const { trackProps } = useSlider(props, state, domRef)
    const Component = as || 'div'
    return (
      <Component
        {...trackProps}
        className={twMerge('flex items-center', props.className)}
        ref={domRef}
      >
        {[...Array(props.numSteps)].map((_, i) => (
          <>
            <StepIndicator
              key={`indicator-${i}`}
              isComplete={i < state.values[0]}
              isCurrentStep={i === state.values[0] - 1}
              step={i + 1}
            />
            {i !== props.numSteps - 1 && (
              <GapIndicator
                key={`gap-${i}`}
                isComplete={i < state.values[0] - 1}
                previousStep={i}
                nextStep={i + 2}
              />
            )}
          </>
        ))}
      </Component>
    )
  },
)

export type StepperProps = PropsOf<typeof Stepper>
