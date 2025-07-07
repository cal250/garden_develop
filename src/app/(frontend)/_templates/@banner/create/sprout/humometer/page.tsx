'use client'
import React, { PropsWithChildren } from 'react'
import OctagonBannerLayout from '@/app/(frontend)/_templates/@banner/_components/OctagonBannerLayout'
import { RegularPolygon } from '@/components/atoms/polygon/regular-polygon'

const Page: React.FC<Props> = (props) => {
  return (
    <OctagonBannerLayout>
      <RegularPolygon
        sides={8}
        className="w-full h-full"
        style={{
          background:
            'conic-gradient(from 89.99deg at 50% 50%, #100E1A 0deg, #100E1A 212.4deg, #825FA3 313.2deg, #100E1A 360deg)',
        }}
      >
        <RegularPolygon sides={8} className="size-[224px]">
          <img src="/assets/home/avatar.png" alt="" className="w-full h-full" />
        </RegularPolygon>
      </RegularPolygon>
    </OctagonBannerLayout>
  )
}

interface Props {}

export default Page
