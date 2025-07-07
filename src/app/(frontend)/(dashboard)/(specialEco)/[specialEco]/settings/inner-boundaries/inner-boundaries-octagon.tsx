'use client'

import React, { useEffect, useMemo, useState } from 'react'
import RadialPolygon, {
  RadialPolygonProps,
} from '@/components/molecules/radial-polygon/radial-polygon'
import { WedgeData } from '@/components/atoms/polygon/utils'
import clsx from 'clsx'
import { useResponsiveValue } from '@/hooks/use-responsive-value'
import { Cocoon } from '@/payload-types'
import { useAuth } from '@/features/providers/auth'

export default function InnerBoundariesOctagon({
  cocoon,
  currentWedgeIndex,
  onSegmentClick,
  octagonData,
}: InnerBoundariesOctagonProps) {
  const [zIndex, setZIndex] = useState<number>(10)
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

  const handleSegmentClick = (index: number, wedgeIndex: number) => {
    onSegmentClick?.(index, wedgeIndex)
  }

  const newOctagonData: Array<WedgeData> = useMemo(() => {
    return zones.map((zone, index) => ({
      className: index === currentWedgeIndex ? 'bg-color-1 shadow-yellow' : '',
      segments: [
        {
          content: zone ? (
            <div>
              <h1
                className={clsx(
                  'text-[11px] sm:text-xs md:text-sm text-color-1 font-black leading-[100%]',
                  index === currentWedgeIndex ? 'text-color-4' : 'text-color-1',
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
          content: (
            <div
              style={{
                alignSelf: index >= 3 && index < 7 ? 'end' : 'start',
                backgroundColor: index === currentWedgeIndex ? '#F6AA22' : 'rgb(var(--color-2))',
                filter: index === currentWedgeIndex ? 'drop-shadow(0px 2px 15px #F80)' : 'none',
              }}
              className="py-2 font-black w-full text-color-1 text-[8.85px] sm:text-[10px] md:text-xs h-[25px] sm:h-[30px] flex items-center justify-center"
            >
              {octagonData[index]}
            </div>
          ),
        },
      ],
    }))
  }, [octagonData, currentWedgeIndex])

  useEffect(() => {
    if (currentWedgeIndex === 0 || currentWedgeIndex === 1) {
      setZIndex(30)
    } else {
      setZIndex(10)
    }
  }, [currentWedgeIndex])

  return (
    <div
      style={{
        width: octagonSize,
        height: octagonSize,
        zIndex: zIndex,
      }}
      className="relative mt-[-65px] md:mt-[-60px] z-20 flex flex-col items-center justify-center"
    >
      <RadialPolygon
        sides={8}
        data={newOctagonData}
        rotation={45}
        numLayers={2}
        coreSize={0.43}
        onSegmentClick={handleSegmentClick}
        classNames={{
          floatingLayer: 'bg-color-2 shadow-lg',
        }}
        boundary={{
          radii: { strokeWidth: 0, stroke: 'rgb(var(--color-2))' },
          chord: { strokeWidth: 0, stroke: 'rgb(var(--color-2))' },
          inner: { stroke: 'rgb(var(--color-2))', strokeWidth: 0 },
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

interface InnerBoundariesOctagonProps extends Pick<RadialPolygonProps, 'onSegmentClick'> {
  currentWedgeIndex: number
  octagonData: string[]
  cocoon: Cocoon
}
