'use client'
import React, { PropsWithChildren } from 'react'
import OctagonBannerLayout from '@/app/(frontend)/_templates/@banner/_components/OctagonBannerLayout'
import { RegularPolygon } from '@/components/atoms/polygon/regular-polygon'
import { UploadIcon } from '@/app/(frontend)/_templates/create/sprout/_components/icons'
import { Checkbox } from '@/components/atoms/checkbox'
import { twMerge } from 'tailwind-merge'

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
            <span className="text-white text-[20px]">choose your</span>
            <div className="">
              <span className="text-[40px] font-black">image</span>
            </div>
            <UploadIcon className="size-[60px]" />
          </div>
        </div>
      </RegularPolygon>
      <div className="absolute right-[-200px] bottom-[30%]">
        <Checkbox
          wrapperComponent={(props) => (
            <RegularPolygon
              sides={8}
              {...props}
              className={twMerge(props.className, 'size-8 bg-black')}
              stroke="#F5C1D8"
            />
          )}
        >
          <span className="text-[#F5C1D8] font-black">monochromatic</span>
        </Checkbox>
      </div>
    </OctagonBannerLayout>
  )
}

interface Props {}

export default Page
