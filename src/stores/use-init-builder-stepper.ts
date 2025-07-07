'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useBuilderStepperStore } from './builder-stepper-store'

export const useInitBuilderStepper = (specialEcoAlt?: string) => {
  const { specialEco } = useParams() as { specialEco: string }
  const { initializeStepper } = useBuilderStepperStore()

  useEffect(() => {
    if (specialEco) {
      initializeStepper(specialEco)
    } else if (specialEcoAlt) {
      initializeStepper(specialEcoAlt)
    }
  }, [specialEco, specialEcoAlt, initializeStepper])
}
