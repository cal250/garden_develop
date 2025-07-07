'use client'

import { create } from 'zustand'

interface StepperStore {
  builderStepperContent: Stepper[]
  currentBuilderStep: number
  setBuilderStepperContent: (steps: Stepper[]) => void
  setCurrentBuilderStep: (step: number) => void
  initializeStepper: (specialEco: string) => void
}

export const useBuilderStepperStore = create<StepperStore>((set) => ({
  builderStepperContent: [],
  currentBuilderStep: 1,
  setBuilderStepperContent: (steps) => set({ builderStepperContent: steps }),
  setCurrentBuilderStep: (step) => set({ currentBuilderStep: step }),
  initializeStepper: (specialEco) => {
    const steps = [
      { tooltip: 'actions', path: `/builder-actions`, isCompleted: false },
      { tooltip: 'soil', path: `/${specialEco}/builder/soil`, isCompleted: false },
      { tooltip: 'word', path: `/${specialEco}/builder/word`, isCompleted: false },
      { tooltip: 'image', path: `/${specialEco}/builder/image`, isCompleted: false },
      { tooltip: 'intention', path: `/${specialEco}/builder/intention`, isCompleted: false },
    ]
    set({ builderStepperContent: steps })
  },
}))
