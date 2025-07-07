'use client'

import React, { useEffect, useMemo, useState } from 'react'
import RadialPolygon, {
  RadialPolygonProps,
} from '@/components/molecules/radial-polygon/radial-polygon'
import { WedgeData } from '@/components/atoms/polygon/utils'
import clsx from 'clsx'
import { useResponsiveValue } from '@/hooks/use-responsive-value'
import { Trapezoid } from '@/components/atoms/polygon/trapezoid'
import { useAuth } from '@/features/providers/auth'
import { Cocoon } from '@/payload-types'
import { twMerge } from 'tailwind-merge'

export default function OuterBoundariesOctagon({
  cocoon,
  currentWedgeIndex,
  onSegmentClick,
  octagonData,
}: OuterBoundariesOctagonProps) {
  const [zIndex, setZIndex] = useState<number>(10)

  const isMobile = useResponsiveValue({
    base: true,
    sm: false,
  })
  const isTablet = useResponsiveValue({
    base: true,
    sm: true,
    md: false,
  })

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

  const generateSlopeAngle = (index: number) => {
    const slopeAngles = {
      0: isMobile ? 8 : isTablet ? 7 : 6,
      1: isMobile ? 8 : isTablet ? 7 : 6,
      2: isMobile ? 2.5 : isTablet ? 2 : 1.5,
      3: isMobile ? 2.5 : isTablet ? 2 : 1.5,
      4: isMobile ? 8 : isTablet ? 7 : 6,
      5: isMobile ? 8 : isTablet ? 7 : 6,
      6: isMobile ? 2.5 : isTablet ? 2 : 1.5,
      7: isMobile ? 2.5 : isTablet ? 2 : 1.5,
    }

    return slopeAngles[index as keyof typeof slopeAngles]
  }

  const newOctagonData: Array<WedgeData> = useMemo(() => {
    return zones.map((zone, index) => ({
      boundary: {
        outer:
          index === currentWedgeIndex ? { strokeWidth: 0, className: 'shadow-yellow' } : undefined,
      },
      wedgeStyle: {
        zIndex: index === currentWedgeIndex ? 20 : undefined,
      },
      className: index === currentWedgeIndex ? 'bg-color-1 shadow-yellow' : '',
      floatingContentClassName: twMerge(
        index === currentWedgeIndex ? 'bg-color-[#F6AA22] z-20' : 'bg-color-2',
        'w-[calc(100%+24px)] block',
      ),
      floatingContent: octagonData[index] ? (
        <Trapezoid
          className="w-full mx-auto"
          strokeWidth={0}
          slopeAngle={generateSlopeAngle(index)}
          style={{
            height: 30,
            backgroundColor: index === currentWedgeIndex ? '#F6AA22' : 'transparent',
          }}
        >
          <span
            style={{
              rotate: [3, 4, 5, 6].includes(index) ? '180deg' : '0deg',
            }}
            className="text-[11px] sm:text-xs md:text-sm text-color-1 font-black leading-[100%]"
          >
            {octagonData[index]}
          </span>
        </Trapezoid>
      ) : (
        <div />
      ),
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
      ],
    }))
  }, [octagonData, currentWedgeIndex])

  useEffect(() => {
    if (currentWedgeIndex === 4 || currentWedgeIndex === 5) {
      setZIndex(50)
      return
    }

    if ([0, 1, 2, 7].includes(currentWedgeIndex)) {
      setZIndex(30)
      return
    }

    setZIndex(10)
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
          outer: { stroke: 'rgb(var(--color-4))', strokeWidth: 4 },
          inner: { stroke: 'rgb(var(--color-4))', strokeWidth: 5 },
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

interface OuterBoundariesOctagonProps extends Pick<RadialPolygonProps, 'onSegmentClick'> {
  currentWedgeIndex: number
  octagonData: string[]
  cocoon: Cocoon
}
