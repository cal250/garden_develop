'use client'
import React from 'react'
import { WedgeData } from '@/components/atoms/polygon/utils'
import { YellowFlowerIcon } from '@/app/(frontend)/_templates/_icons/yellow-flower-icon'
import RadialPolygon from '@/components/molecules/radial-polygon/radial-polygon'
import OctagonBannerLayout from '@/app/(frontend)/_templates/@banner/_components/OctagonBannerLayout'

const soilData: Array<WedgeData> = [
  'seasons',
  '',
  '',
  'tending',
  'tending',
  'weaves',
  'weaves',
  'seeds',
].map((value: string, index) => ({
  segments: [
    {
      content: <span className="text-[17px] font-bold text-color-2">{value}</span>,
    },
    {
      content: value ? <YellowFlowerIcon /> : '',
    },
  ],
  boundary: {
    inner: {
      stroke: '#825FA3',
      strokeWidth: 5,
    },
    outer: {
      stroke: '#825FA3',
      strokeWidth: 5,
    },
  },
})) as Array<WedgeData>

const EnergyPageBanner: React.FC<EnergyPageBannerProps> = (props) => {
  return (
    <OctagonBannerLayout>
      <RadialPolygon
        sides={8}
        boundary={{ radii: { strokeWidth: 0 }, chord: { strokeWidth: 0 } }}
        style={{
          background:
            'conic-gradient(from 89.99deg at 50% 50%, #100E1A 0deg, #100E1A 212.4deg, #825FA3 313.2deg, #100E1A 360deg)',
        }}
        width={517}
        height={517}
        coreSize={0.5}
        numLayers={2}
        data={soilData}
      >
        <img
          alt="banner"
          src="/assets/home/avatar.png"
          className="h-full object-cover object-bottom"
        />
      </RadialPolygon>
    </OctagonBannerLayout>
  )
}

interface EnergyPageBannerProps {}

export default EnergyPageBanner
