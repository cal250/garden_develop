'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useBuilderCreateStepperStore } from './builder-create-stepper-store'

export const useInitBuilderCreateStepper = () => {
  const { specialEco } = useParams() as { specialEco: string }
  const { initializeCreateStepper } = useBuilderCreateStepperStore()

  useEffect(() => {
    if (specialEco) {
      initializeCreateStepper(specialEco)
    }
  }, [specialEco, initializeCreateStepper])
}
