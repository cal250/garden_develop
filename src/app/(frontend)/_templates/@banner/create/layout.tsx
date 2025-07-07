import React, { PropsWithChildren } from 'react'
import SubHeader from '@/app/(frontend)/_templates/@banner/_components/sub-header'
import { StepIndicator } from '@/app/(frontend)/_templates/@banner/_components/step-indicator'

const BuilderBannerLayout: React.FC<PropsWithChildren<BuilderBannerLayoutProps>> = ({
  children,
}) => {
  return (
    <>
      <SubHeader endContent={<StepIndicator />} />
      {children}
    </>
  )
}

interface BuilderBannerLayoutProps {}

export default BuilderBannerLayout
