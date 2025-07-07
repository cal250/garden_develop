import React from 'react'
import RadialPolygon from '@/components/molecules/radial-polygon/radial-polygon'
import { data } from '../_data/octagon-data'

export const Octagon: React.FC<OctagonProps> = () => {
  return (
    <RadialPolygon
      sides={8}
      data={data}
      numLayers={2}
      coreSize={0.43}
      classNames={{
        floatingLayer: 'bg-color-2 shadow-lg',
      }}
      boundary={{
        radii: { strokeWidth: 0, stroke: 'rgb(var(--color-2))' },
        chord: { strokeWidth: 0, stroke: 'rgb(var(--color-2))' },
        inner: { stroke: 'rgb(var(--color-4))', strokeWidth: 4 },
        outer: { stroke: 'rgb(var(--color-4))', strokeWidth: 4 },
      }}
      style={{
        background:
          'conic-gradient(from 89.99deg at 50% 50%, #442E5D 0deg, #482B6A 175.94deg, #6B4596 222.83deg, #8759BA 269.34deg, #7E52AF 315.38deg, #442E5D 360deg)',
      }}
    >
      <img
        alt="banner"
        src="/assets/home/banner.png"
        className="h-full object-cover object-bottom"
      />
    </RadialPolygon>
  )
}

interface OctagonProps {}
