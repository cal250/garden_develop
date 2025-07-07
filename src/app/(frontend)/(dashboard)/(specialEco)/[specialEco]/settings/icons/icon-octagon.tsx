'use client'

import React, { useMemo, useState } from 'react'
import RadialPolygon from '@/components/molecules/radial-polygon/radial-polygon'
import { WedgeData } from '@/components/atoms/polygon/utils'
import clsx from 'clsx'
import { useResponsiveValue } from '@/hooks/use-responsive-value'
import { useAuth } from '@/features/providers/auth'
import { FlowerIcon } from '../flower-icon'
import { Cocoon } from '@/payload-types'

export default function IconOctagon({ iconUrl, cocoon }: { iconUrl: string; cocoon: Cocoon }) {
  const wedgeIndex = -1
  const octagonSize = useResponsiveValue({
    base: 350,
    sm: 450,
    md: 528,
  })

  const innerOctagonSize = useResponsiveValue({
    base: 180,
    sm: 200,
    md: 225,
  })

  const { user } = useAuth()

  const zones =
    cocoon?.zones
      ?.sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
      .map(({ zone }) => (typeof zone === 'string' ? zone : zone?.name)) || []

  const newOctagonData: Array<WedgeData> = useMemo(() => {
    return zones.map((zone, index) => ({
      boundary: {
        // left: index === 1 ? { strokeWidth: 4 } : undefined,
        // right: index === 2 ? { strokeWidth: 4 } : undefined,
        outer:
          index === wedgeIndex
            ? { strokeWidth: 0, stroke: '#ffffff', className: 'shadow-yellow' }
            : undefined,
      },
      className: index === wedgeIndex ? 'bg-color-2 shadow-yellow' : '',
      segments: [
        {
          content: zone ? (
            <div>
              <h1
                className={clsx(
                  'text-[11px] sm:text-xs md:text-sm text-color-1 font-black leading-[100%]',
                  {
                    '!text-[#F469B5]': index === wedgeIndex,
                  },
                )}
              >
                {zone}
              </h1>
            </div>
          ) : (
            <div />
          ),
        },
        {
          content: iconUrl ? (
            <img
              src={iconUrl}
              alt="icon"
              className="h-8 md:h-[50px] w-8 md:w-[50px]"
              style={{
                rotate:
                  index === 3 || index === 4 || index === 5 || index === 6 ? '201deg' : '21deg',
              }}
            />
          ) : (
            <FlowerIcon
              className="h-6 sm:h-8 md:h-10 w-6 sm:w-8 md:w-10"
              active={index === wedgeIndex}
            />
          ),
        },
      ],
    }))
  }, [wedgeIndex, iconUrl])

  return (
    <div
      style={{ width: octagonSize, height: octagonSize }}
      className="relative mt-[-65px] md:mt-[-60px] z-20 flex flex-col items-center justify-center"
    >
      <RadialPolygon
        sides={8}
        data={newOctagonData}
        rotation={45}
        numLayers={2}
        coreSize={0.43}
        classNames={{
          floatingLayer: 'bg-color-2 shadow-lg',
        }}
        boundary={{
          radii: { strokeWidth: 0, stroke: 'rgb(var(--color-2))' },
          chord: { strokeWidth: 0, stroke: 'rgb(var(--color-2))' },
          inner: { stroke: 'rgb(var(--color-4))', strokeWidth: 4 },
          outer: { stroke: 'rgb(var(--color-4))', strokeWidth: 5 },
        }}
        style={{
          background:
            'conic-gradient(from 89.99deg at 50% 50%, rgb(var(--color-8)) 0deg, rgb(var(--color-8)) 212.4deg, rgb(var(--color-9)) 313.2deg, rgb(var(--color-8)) 360deg)',
        }}
      >
        <img
          alt="banner"
          src={user?.avatar ? user.avatar.url : '/assets/home/banner.png'}
          className="h-full object-cover object-center"
          style={{
            width: innerOctagonSize,
          }}
        />
      </RadialPolygon>
    </div>
  )
}

interface IconOctagonProps {
  iconUrl: string
}
