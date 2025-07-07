'use client'
import React, { PropsWithChildren } from 'react'
import OctagonBannerLayout from '@/app/(frontend)/_templates/@banner/_components/OctagonBannerLayout'
import { RegularPolygon } from '@/components/atoms/polygon/regular-polygon'

const Page: React.FC<Props> = (props) => {
  return (
    <OctagonBannerLayout>
      <RegularPolygon
        sides={8}
        className="w-full h-full items-start"
        style={{
          background:
            'conic-gradient(from 89.99deg at 50% 50%, #100E1A 0deg, #100E1A 212.4deg, #825FA3 313.2deg, #100E1A 360deg)',
        }}
      >
        <div className="flex flex-col gap-4  items-center py-10">
          <RegularPolygon sides={8} className="size-[122px]">
            <img src="/assets/home/avatar.png" alt="" className="w-full h-full" />
          </RegularPolygon>
          <div className="flex flex-col items-center">
            <span className="text-white text-[20px]">what's your</span>
            <div className="">
              <span className="text-[40px] font-black">challenge</span>
            </div>
            <span className="text-white text-[20px]">with this weed?</span>
          </div>
        </div>
      </RegularPolygon>
    </OctagonBannerLayout>
  )
}

interface Props {}

export default Page
