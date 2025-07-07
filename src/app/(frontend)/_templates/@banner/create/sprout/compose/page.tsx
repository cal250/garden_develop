'use client'
import React, { PropsWithChildren } from 'react'
import OctagonBannerLayout from '@/app/(frontend)/_templates/@banner/_components/OctagonBannerLayout'
import { RegularPolygon } from '@/components/atoms/polygon/regular-polygon'
import { ArrowUpIcon } from '@/app/(frontend)/_templates/_icons/arrow-up-icon'

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
      <div className="absolute right-[-200px] top-1/2 -translate-y-1/2 flex flex-col items-center">
        <RegularPolygon sides={8} as="button" className="size-[76px] bg-[#A665A3]">
          <ArrowUpIcon className="size-[30px] text-[#F5C1D8]" />
        </RegularPolygon>
        <span className="text-white text-[24px] font-bold">upload</span>
      </div>
    </OctagonBannerLayout>
  )
}

interface Props {}

export default Page
