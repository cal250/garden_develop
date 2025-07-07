'use client'

import React, { PropsWithChildren } from 'react'

const OctagonBannerLayout: React.FC<PropsWithChildren<Props>> = ({ children }) => {
  return (
    <div className="absolute flex left-1/2 -translate-x-1/2 items-center justify-center gap-[57.85px] mt-[70px] z-20 w-full">
      <div className="relative size-[517px]">{children}</div>
    </div>
  )
}

interface Props {}

export default OctagonBannerLayout
