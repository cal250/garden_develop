'use client'

import { create } from 'zustand'

interface StepperStore {
  builderCreateStepperContent: Stepper[]
  currentBuilderCreateStep: number
  setBuilderCreateStepperContent: (steps: Stepper[]) => void
  setCurrentBuilderCreateStep: (step: number) => void
  initializeCreateStepper: (specialEco: string) => void
}

export const useBuilderCreateStepperStore = create<StepperStore>((set) => ({
  builderCreateStepperContent: [],
  currentBuilderCreateStep: 1,
  setBuilderCreateStepperContent: (steps) => set({ builderCreateStepperContent: steps }),
  setCurrentBuilderCreateStep: (step) => set({ currentBuilderCreateStep: step }),
  initializeCreateStepper: (specialEco) => {
    const steps = [
      {
        tooltip: 'compose',
        path: `/${specialEco}/builder/sprout/compose`,
        isCompleted: false,
      },
      {
        tooltip: 'AI humometer',
        path: `/${specialEco}/builder/sprout/ai-humometer`,
        isCompleted: false,
      },
      {
        tooltip: 'final',
        path: `/${specialEco}/builder/sprout/final`,
        isCompleted: false,
      },
    ]
    set({ builderCreateStepperContent: steps })
  },
}))
