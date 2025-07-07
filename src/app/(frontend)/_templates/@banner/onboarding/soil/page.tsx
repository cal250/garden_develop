'use client'

import React from 'react'
import RadialPolygon from '@/components/molecules/radial-polygon/radial-polygon'
import { WedgeData } from '@/components/atoms/polygon/utils'
import { PinkFlowerIcon } from '@/app/(frontend)/_templates/_icons/pink-flower-icon'
import { YellowFlowerIcon } from '@/app/(frontend)/_templates/_icons/yellow-flower-icon'

const soilData: Array<WedgeData> = Array.from({ length: 8 })
  .fill({})
  .map((value: any, index) => ({
    className: index === 7 ? 'bg-color-2' : '',
    segments: [
      {
        content: index === 7 ? <PinkFlowerIcon /> : <YellowFlowerIcon />,
      },
    ],
    boundary: {
      inner: {
        stroke: '#825FA3',
        strokeWidth: 4,
      },
      outer: {
        stroke: '#825FA3',
        strokeWidth: 4,
      },
    },
  })) as Array<WedgeData>

const SoilBanner: React.FC<SoilBannerProps> = (props) => {
  return (
    <RadialPolygon
      sides={8}
      boundary={{ radii: { strokeWidth: 0 } }}
      style={{
        background:
          'conic-gradient(from 89.99deg at 50% 50%, #100E1A 0deg, #100E1A 212.4deg, #825FA3 313.2deg, #100E1A 360deg)',
      }}
      width={517}
      height={517}
      coreSize={0.45}
      data={soilData}
    >
      <img
        alt="banner"
        src="/assets/home/avatar.png"
        className="h-full object-cover object-bottom"
      />
    </RadialPolygon>
  )
}

interface SoilBannerProps {}

export default SoilBanner
