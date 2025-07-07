'use client'
import React, { PropsWithChildren, useEffect } from 'react'
import SubHeader from '@/app/(frontend)/_templates/@banner/_components/sub-header'
import { StepIndicator } from '@/app/(frontend)/_templates/@banner/_components/step-indicator'
import { usePathname } from 'next/navigation'
import OctagonBannerLayout from '@/app/(frontend)/_templates/@banner/_components/OctagonBannerLayout'
import { usePageStepsContext } from '@/app/(frontend)/_templates/_context/page-steps'

const steps = [
  { title: 'cocoon', path: '/templates/onboarding/cocoon' },
  { title: 'soil', path: '/templates/onboarding/soil' },
  { title: 'name', path: '/templates/onboarding/name' },
  { title: 'welcome', path: '/templates/onboarding/welcome-sign' },
  { title: 'grow', path: '/templates/onboarding/grow' },
]

const BannerLayout: React.FC<PropsWithChildren<BannerLayoutProps>> = ({ children }) => {
  const pathname = usePathname()
  const { updateSteps } = usePageStepsContext()

  useEffect(() => {
    updateSteps(steps)

    return () => updateSteps([])
  }, [])

  return (
    <>
      <SubHeader endContent={<StepIndicator />} />
      {pathname?.endsWith('login') ? (
        children
      ) : (
        <OctagonBannerLayout>{children}</OctagonBannerLayout>
      )}
    </>
  )
}

interface BannerLayoutProps {}

export default BannerLayout
