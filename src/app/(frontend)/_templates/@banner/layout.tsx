import React, { PropsWithChildren } from 'react'
import MainHeader from './_components/main-header'

const BannerLayout: React.FC<PropsWithChildren<BannerLayoutProps>> = ({ children }) => {
  return (
    <div className="z-20 absolute left-0 top-0 flex h-[505px] w-full flex-col">
      <MainHeader />
      {children}
    </div>
  )
}

interface BannerLayoutProps {}

export default BannerLayout
