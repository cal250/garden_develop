'use client'

import getCocoon from '@/actions/get-cocoon'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  // useEffect,
  useState,
} from 'react'

type Step = { tooltip: string; path: string; isCompleted: boolean }
type StepperContentContext = {
  stepperContent: Step[]
  setStepperContent: Dispatch<SetStateAction<Step[]>>
  currentStep: number
  setCurrentStep: Dispatch<SetStateAction<number>>
  // handleNext?: () => void
  // handlePrevious?: () => void
  // setHandleNext: Dispatch<SetStateAction<(() => void) | undefined>>
  // setHandlePrevious: Dispatch<SetStateAction<(() => void) | undefined>>
}

const StepperContentContext = createContext<StepperContentContext | null>(null)

export default function StepperContentContextProvider({ children }: { children: ReactNode }) {
  const { specialEco: currentSpecialEco } = useParams() as { specialEco: string | undefined }

  const steps = [
    {
      tooltip: 'landscape',
      path: `/${currentSpecialEco}/onboarding/landscape`,
      isCompleted: false,
    },
    { tooltip: 'soil', path: `/${currentSpecialEco}/onboarding/zone`, isCompleted: false },
    { tooltip: 'name', path: `/${currentSpecialEco}/onboarding/name`, isCompleted: false },
    { tooltip: 'literacy', path: `/${currentSpecialEco}/onboarding/bio`, isCompleted: false },
    { tooltip: 'kindness', path: `/${currentSpecialEco}/onboarding/grow`, isCompleted: false },
  ]

  const [stepperContent, setStepperContent] = useState(steps)
  const [currentStep, setCurrentStep] = useState(1)
  // const [handleNext, setHandleNext] = useState<(() => void) | undefined>()
  // const [handlePrevious, setHandlePrevious] = useState<(() => void) | undefined>()

  // useEffect(() => {
  //   console.log(handleNext, 'This is handle next context')
  // }, [handleNext])

  const { data: cocoon } = useQuery({
    queryKey: [`cocoon-${currentSpecialEco}`],
    queryFn: () => getCocoon(currentSpecialEco as string),
  })

  useEffect(() => {
    if (cocoon) {
      setCurrentStep(cocoon.step ? (cocoon.step as number) : 1)
    }
  }, [cocoon])

  useEffect(() => {
    if (currentSpecialEco) {
      const steps = [
        {
          tooltip: 'landscape',
          path: `/${currentSpecialEco}/onboarding/landscape`,
          isCompleted: false,
        },
        { tooltip: 'soil', path: `/${currentSpecialEco}/onboarding/zone`, isCompleted: false },
        { tooltip: 'name', path: `/${currentSpecialEco}/onboarding/name`, isCompleted: false },
        { tooltip: 'literacy', path: `/${currentSpecialEco}/onboarding/bio`, isCompleted: false },
        { tooltip: 'kindness', path: `/${currentSpecialEco}/onboarding/grow`, isCompleted: false },
      ]

      setStepperContent(steps)
    }
  }, [currentSpecialEco])

  return (
    <StepperContentContext.Provider
      value={{
        stepperContent,
        setStepperContent,
        currentStep,
        setCurrentStep,
        // handleNext,
        // handlePrevious,
        // setHandleNext,
        // setHandlePrevious,
      }}
    >
      {children}
    </StepperContentContext.Provider>
  )
}

export function useStepperContentContext() {
  const context = useContext(StepperContentContext)

  if (!context) {
    throw new Error('use modal context within the context provider')
  }
  return context
}
