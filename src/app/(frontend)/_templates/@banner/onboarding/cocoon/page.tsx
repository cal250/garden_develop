'use client'

import React, { useEffect } from 'react'
import { RegularOctagon } from '@/components/atoms/polygon/regular-octagon'
import { useLayoutContext } from '@/app/(frontend)/_templates/_context/layout'

const CocoonBanner: React.FC<CocoonBannerProps> = (props) => {
  const { updateLayout } = useLayoutContext()

  useEffect(() => {
    updateLayout({ background: '/assets/onboarding/cocoon-background.webp' })
  }, [])

  return (
    <RegularOctagon
      strokeWidth={5}
      stroke="#5B4883"
      className="w-full h-full flex flex-col items-center justify-center relative"
      style={{
        background:
          'conic-gradient(from 89.99deg at 50% 50%, #100E1A 0deg, #100E1A 212.4deg, #825FA3 313.2deg, #100E1A 360deg)',
      }}
    >
      <div className="absolute top-[60px] flex flex-col items-center font-black">
        <p className="text-center text-[20.85px] text-white">prepare your first</p>
        <p className="text-center text-[31.27px] text-[#F4EB22]">cocoon</p>
      </div>
      <RegularOctagon
        strokeWidth={5}
        stroke="#825FA3"
        className="w-[225px] flex flex-col items-center justify-center"
      >
        <img
          alt="banner"
          src={'/assets/onboarding/bee.png'}
          className="h-full object-cover object-bottom"
        />
      </RegularOctagon>
    </RegularOctagon>
  )
}

interface CocoonBannerProps {}

export default CocoonBanner
