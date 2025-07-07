'use client'

import React, { Dispatch, SetStateAction, useMemo } from 'react'
import RadialPolygon from '@/components/molecules/radial-polygon/radial-polygon'
import { createIcon } from '@/components/atoms/icons/utils/create-icon'
import { WedgeData } from '@/components/atoms/polygon/utils'
import clsx from 'clsx'
import { useResponsiveValue } from '@/hooks/use-responsive-value'

const FlowerIcon = createIcon<{ active?: boolean }>({
  viewBox: '0 0 45 46',
  path: ({ active }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="45" height="46" fill="none" viewBox="0 0 45 46">
      <path
        fill={active ? 'rgb(var(--color-1))' : 'rgb(var(--color-13))'}
        stroke="#F469B5"
        d="M24.89 27.56a5.267 5.267 0 0 0 3.161-6.744 5.267 5.267 0 0 0-6.75-3.146 5.267 5.267 0 0 0-3.163 6.744 5.267 5.267 0 0 0 6.751 3.146Z"
      ></path>
      <path
        fill={active ? 'rgb(var(--color-4))' : 'rgb(var(--color-12))'}
        stroke="#fff"
        strokeWidth={active ? '2' : '0'}
        d="M14.277 39.03h.005c2.556.195 4.523-.82 6.029-2.464 1.05 1.763 2.206 3.067 3.533 3.832 1.713.987 3.566.997 5.509.221 1.932-.771 3.275-2.03 3.887-3.856.484-1.445.477-3.149.087-5.083 2.164.025 3.992-.353 5.398-1.214 1.745-1.068 2.694-2.79 2.892-4.978.333-3.34-1.763-6.685-5.751-7.524 1-1.53 1.581-3.039 1.648-4.505.09-1.974-.758-3.699-2.39-5.107-1.39-1.27-3.03-1.935-4.967-1.819-2.138.11-3.815 1.013-5.103 2.467-.838-1.62-1.835-2.852-3.045-3.629-1.627-1.044-3.485-1.172-5.495-.583-1.75.49-3.083 1.646-3.974 3.102l-.004.006-.003.007c-1.21 2.041-1.226 4.061-.59 6.016-1.853-.095-3.465.17-4.778.843-1.749.899-2.834 2.456-3.267 4.492l-.002.01c-.352 1.739-.176 3.51.841 5.082 1.174 1.87 2.812 2.902 4.763 3.295-.913 1.285-1.466 2.621-1.603 3.965-.196 1.907.459 3.7 1.86 5.213 1.196 1.3 2.723 2.066 4.52 2.211Zm9.902-12.402c-2.057.746-4.512-.423-5.265-2.498-.761-2.099.37-4.473 2.503-5.254 2.095-.704 4.533.485 5.233 2.549.71 2.097-.403 4.453-2.47 5.203Z"
      ></path>
    </svg>
  ),
})

export const BuilderSoilOctagon: React.FC<BuilderSoilOctagonProps> = ({
  currentWedgeIndex,
  setCurrentWedgeIndex,
  octagonData,
  userAvatar,
  ecoIcon,
}) => {
  const innerOctagonSize = useResponsiveValue({
    base: 180,
    sm: 200,
    md: 225,
  })

  function onSegmentClick(index: number, wedgeIndex: number) {
    // console.log({ index, wedgeIndex })
    if (setCurrentWedgeIndex) setCurrentWedgeIndex(wedgeIndex)
  }

  const newOctagonData: Array<WedgeData> = useMemo(() => {
    return octagonData.map((zone, index) => ({
      boundary: {
        // left: index === 1 ? { strokeWidth: 4 } : undefined,
        // right: index === 2 ? { strokeWidth: 4 } : undefined,
        outer:
          index === currentWedgeIndex
            ? { strokeWidth: 0, stroke: '#ffffff', className: 'shadow-yellow' }
            : undefined,
      },
      className: index === currentWedgeIndex ? 'bg-color-1 shadow-yellow' : '',
      segments: [
        {
          content: zone ? (
            <div>
              <h1
                className={clsx(
                  'text-[11px] sm:text-xs md:text-sm font-black leading-[100%]',
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
          content: ecoIcon ? (
            <div
              style={{
                rotate:
                  index === 3 || index === 4 || index === 5 || index === 6 ? '201deg' : '21deg',
              }}
            >
              <img
                alt="icon"
                src={ecoIcon}
                className="h-8 md:h-[50px] w-8 md:w-[50px] object-cover object-center"
              />
            </div>
          ) : (
            <FlowerIcon
              className="h-6 sm:h-8 md:h-10 w-6 sm:w-8 md:w-10"
              active={index === currentWedgeIndex}
            />
          ),
        },
      ],
    }))
  }, [octagonData, currentWedgeIndex, ecoIcon])

  return (
    <RadialPolygon
      sides={8}
      data={newOctagonData}
      rotation={45}
      numLayers={2}
      coreSize={0.43}
      onSegmentClick={onSegmentClick}
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
        src={userAvatar ? userAvatar : '/assets/home/banner.png'}
        className="h-full object-cover object-center"
        style={{
          width: innerOctagonSize,
        }}
      />
    </RadialPolygon>
  )
}

interface BuilderSoilOctagonProps {
  currentWedgeIndex: number | null
  octagonData: any[]
  setCurrentWedgeIndex?: Dispatch<SetStateAction<number | null>>
  userAvatar: string
  ecoIcon?: string | null
}
