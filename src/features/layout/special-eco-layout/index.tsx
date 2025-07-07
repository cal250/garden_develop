'use client'

import { SubHeader } from '@/app/(frontend)/(dashboard)/(specialEco)/[specialEco]/onboarding/_components/sub-header'
import StepperContentContextProvider from '@/hooks/use-stepper-content-context'
import useLandscapeStore from '@/stores/landscape-store'
import { useInitBuilderCreateStepper } from '@/stores/use-init-builder-create-stepper'
import { useInitBuilderStepper } from '@/stores/use-init-builder-stepper'

export default function SpecialEcoLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { url, isLoading } = useLandscapeStore()
  
  useInitBuilderStepper()

  useInitBuilderCreateStepper()

  return (
    <StepperContentContextProvider>
      <div className="grid w-full max-w-[1440px] grid-rows-[auto_1fr]">
        <SubHeader />
        <main className="relative min-h-[100dvh] pt-[145px] md:pt-[125px] w-full">
          <div
            className="absolute left-0 top-0 z-0 flex h-full w-full flex-col bg-cover bg-center bg-no-repeat pointer-events-none"
            style={{
              backgroundImage: isLoading ? '' : `url(${url})`,
              backgroundColor: 'rgb(var(--color-9))',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundBlendMode: 'luminosity',
              opacity: 0.5,
            }}
          />
          {children}
        </main>
      </div>
    </StepperContentContextProvider>
  )
}
